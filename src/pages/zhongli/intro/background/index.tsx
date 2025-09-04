import { fadeOutSound } from '@/components/sounds';
import useTween, { Bezier } from 'lesca-use-tween';
import { memo, useContext, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';
import { ZhongliContext, ZhongliPageType } from '../../config';
import { ZhongliIntroContext, ZhongliIntroStepType } from '../config';
import VideoURL from './img/zhongli-intro.mp4';
import './index.less';

const DarkScreen = memo(() => {
  const [{ page }] = useContext(ZhongliContext);
  const [{ step }, setState] = useContext(ZhongliIntroContext);
  const [style, setStyle] = useTween({ opacity: 1 });

  useEffect(() => {
    if (page === ZhongliPageType.intro) {
      if (step === ZhongliIntroStepType.unset) {
        setStyle({ opacity: 0 }, { duration: 1000, easing: Bezier.outQuart });
      } else if (step === ZhongliIntroStepType.fadeOut) {
        setStyle(
          { opacity: 1 },
          {
            duration: 1200,
            easing: Bezier.inQuart,
            onEnd: () => {
              setState((S) => ({ ...S, step: ZhongliIntroStepType.door }));
              fadeOutSound('footstep');
            },
          },
        );
      } else if (step === ZhongliIntroStepType.door) {
        setStyle({ opacity: 0 }, { duration: 800, easing: Bezier.inOutQuart });
      }
    }
  }, [page, step]);

  return <div className='darkScreen' style={style} />;
});

const Video = memo(() => {
  const [{ page }, setZhongliState] = useContext(ZhongliContext);
  const [, setState] = useContext(ZhongliIntroContext);
  const videoRef = useRef<HTMLVideoElement>(null);
  const checkStatusRef = useRef(false);

  useEffect(() => {
    if (page === ZhongliPageType.intro) {
      checkStatusRef.current = true;
      videoRef.current?.play();
      setTimeout(() => {
        fadeOutSound('footstep');
      }, 1000);

      const checkVideoStatus = () => {
        if (videoRef.current?.paused) {
          videoRef.current?.play();
        }
        if (checkStatusRef.current) {
          requestAnimationFrame(checkVideoStatus);
        }
      };
      checkVideoStatus();
    }
    return () => {
      checkStatusRef.current = false;
    };
  }, [page]);

  useEffect(() => {
    const onVideoReady = () => {
      setZhongliState((S) => ({ ...S, videoLoaded: true }));
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 1;
      }
      videoRef.current?.removeEventListener('loadeddata', onVideoReady);
      videoRef.current?.removeEventListener('playing', onVideoReady);
    };

    if (videoRef.current?.readyState === 0) {
      videoRef.current?.addEventListener('loadeddata', onVideoReady);
    } else {
      videoRef.current?.addEventListener('playing', onVideoReady);
    }

    const onVideoEnd = () => {
      if (videoRef.current) {
        videoRef.current.pause();
        checkStatusRef.current = false;
        videoRef.current.currentTime = videoRef.current.duration;
        setState((S) => ({ ...S, step: ZhongliIntroStepType.entry }));
        videoRef.current?.removeEventListener('ended', onVideoEnd);
      }
    };
    videoRef.current?.addEventListener('ended', onVideoEnd);

    const onUpdate = () => {
      if (videoRef.current) {
        const percent = videoRef.current?.currentTime / videoRef.current?.duration;
        if (percent > 0.6) {
          setState((S) => ({ ...S, step: ZhongliIntroStepType.fadeOut }));
          videoRef.current?.removeEventListener('timeupdate', onUpdate);
        }
      }
    };
    videoRef.current?.addEventListener('timeupdate', onUpdate);
  }, []);

  return (
    <ReactPlayer
      ref={videoRef}
      src={VideoURL}
      width='100%'
      height='100%'
      autoPlay={false}
      preload='auto'
      playbackRate={1}
      playsInline
      loop={false}
    />
  );
});

const Background = memo(() => {
  const [{ step }] = useContext(ZhongliIntroContext);
  const [{ page }, setState] = useContext(ZhongliContext);
  const [style, setStyle] = useTween({ opacity: 1, scale: 1 });

  useEffect(() => {
    if (page === ZhongliPageType.intro && step === ZhongliIntroStepType.entry) {
      setStyle(
        { opacity: 0, scale: 1.2 },
        {
          duration: 800,
          onEnd: () => {
            setState((S) => ({ ...S, page: ZhongliPageType.game }));
          },
        },
      );
    }
  }, [step, page]);

  return (
    <div className='Background' style={style}>
      {step <= ZhongliIntroStepType.fadeOut && <Video />}
      <DarkScreen />
    </div>
  );
});
export default Background;
