import { HOME_BACKGROUND_LOOP_DURATION } from '@/settings/config';
import { IReactProps } from '@/settings/type';
import EnterFrame from 'lesca-enterframe';
import { CoverSize } from 'lesca-number';
import useTween, { Bezier } from 'lesca-use-tween';
import { memo, useContext, useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { HomeContext, HomePageType, HomeStepType } from '../../config';
import ChiayiVideo from './img/bg-chiayi.mp4';
import TaipeiVideo from './img/bg-taipei.mp4';
import ZhongliVideo from './img/bg-zhongli.mp4';
import './index.less';

const CoverNode = ({ children, index }: IReactProps & { index: number }) => {
  const [{ locationIndex, page }, setState] = useContext(HomeContext);
  const locationStartIndex = useRef(locationIndex);
  const [style, setStyle] = useTween({ opacity: 0 });

  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [size, setSize] = useState({ width: 0, height: 0, top: 0, left: 0 });
  useEffect(() => {
    const resize = () => {
      if (ref.current) {
        setSize(
          CoverSize(
            { width: 1280, height: 1920 },
            { width: ref.current.clientWidth, height: ref.current.clientHeight },
          ),
        );
      }
    };
    resize();
    window.addEventListener('resize', resize);

    const onVideoReady = () => {
      setState((S) => ({ ...S, videoLoadedIndex: S.videoLoadedIndex + 1 }));
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
        videoRef.current.currentTime = 0;
        videoRef.current.play();
      }
    };
    videoRef.current?.addEventListener('ended', onVideoEnd);

    videoRef.current?.addEventListener('pause', () => {
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play();
      }
    });

    return () => window.removeEventListener('resize', resize);
  }, []);

  useEffect(() => {
    if (locationStartIndex.current === locationIndex) {
      if (index === locationIndex % 3) setStyle({ opacity: 1 }, 1);
      return;
    }

    if (index === locationIndex % 3) {
      setStyle(
        { opacity: 1 },
        {
          duration: 2000,
          delay: 300,
          easing: Bezier.inQuart,
          onStart: () => {
            if (videoRef.current) {
              videoRef.current.currentTime = 0;
              videoRef.current.play();
            }
          },
        },
      );
    } else {
      setStyle({ opacity: 0 }, { duration: 2000, easing: Bezier.outQuart });
    }
  }, [locationIndex]);

  useEffect(() => {
    if (page === HomePageType.choose) {
      videoRef.current?.pause();
    } else if (page === HomePageType.landing) {
      videoRef.current?.play();
    }
  }, [page]);

  return (
    <div ref={ref} className='absolute top-0 left-0 h-full w-full' style={style}>
      <div
        className='absolute'
        style={{
          width: `${size.width}px`,
          height: `${size.height}px`,
          top: `${size.top}px`,
          left: `${size.left}px`,
        }}
      >
        {children}
        <ReactPlayer
          ref={videoRef}
          src={[TaipeiVideo, ZhongliVideo, ChiayiVideo][index] || TaipeiVideo}
          width='100%'
          height='100%'
          autoPlay
          loop
          playbackRate={1}
          playsInline
          muted
        />
      </div>
    </div>
  );
};

const Background = memo(() => {
  const [{ step, locationIndex }, setState] = useContext(HomeContext);
  const [style, setStyle] = useTween({ opacity: 0, scale: 1 });
  const locationStartIndex = useRef(locationIndex);
  const [index, setIndex] = useState(locationIndex);

  useEffect(() => {
    if (locationStartIndex.current !== index) {
      setState((S) => ({ ...S, locationIndex: index }));
    }
  }, [index]);

  useEffect(() => {
    if (step === HomeStepType.fadeIn) {
      setStyle({ opacity: 1 }, { duration: 2000 });
    } else if (step === HomeStepType.fadeOut) {
      EnterFrame.stop();
      setStyle(
        { opacity: 0, scale: 1.2 },
        {
          duration: 1200,
          easing: Bezier.inOutQuart,
          onEnd: () => {
            setState((S) => ({ ...S, page: HomePageType.choose }));
          },
        },
      );
    }
    if (step === HomeStepType.loop) {
      EnterFrame.add(({ delta }) => {
        setIndex(locationStartIndex.current + Math.floor(delta / HOME_BACKGROUND_LOOP_DURATION));
      });
      EnterFrame.play();
    }
  }, [step]);

  return (
    <div className='Background h-full w-full' style={style}>
      {[...new Array(3).keys()].map((index) => {
        return (
          <CoverNode key={`bg-${index}`} index={index}>
            <div className={`bg-${index}`} />
          </CoverNode>
        );
      })}
    </div>
  );
});

export default Background;
