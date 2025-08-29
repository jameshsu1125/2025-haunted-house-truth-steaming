import { IReactProps } from '@/settings/type';
import useTween from 'lesca-use-tween';
import { memo, useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { twMerge } from 'tailwind-merge';
import videoURL from './img/smoke.mp4';
import './index.less';
import SVG from './svg';

type TClearProps = {
  visible: boolean;
  active: boolean;
  onEnd?: () => void;
};

type TTweenerProviderProps = IReactProps & {
  active: boolean;
  onEnd?: () => void;
};

const TweenerProvider = ({ children, active, onEnd }: TTweenerProviderProps) => {
  const [style, setStyle] = useTween({ opacity: 1 });
  useEffect(() => {
    if (!active) return;
    setStyle(
      { opacity: 0 },
      {
        duration: 1000,
        onEnd: () => onEnd?.(),
      },
    );
  }, [active]);
  return <div style={style}>{children}</div>;
};

const Clear = memo(({ visible, active, onEnd }: TClearProps) => {
  const ref = useRef<HTMLVideoElement>(null);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (active && ref.current) {
      ref.current!.currentTime = 0;
      ref.current!.play();
    }
  }, [active]);

  return (
    <div className={twMerge('Clear', visible ? 'visible' : 'invisible')}>
      <div>
        <ReactPlayer
          ref={ref}
          src={videoURL}
          muted
          autoPlay
          loop={false}
          width={1280}
          height={720}
          playsInline
          playbackRate={2.0}
        />
      </div>
      <div>
        <div>
          <TweenerProvider active={fadeOut} onEnd={onEnd}>
            <SVG fill='none' active={active} />
            <SVG fill='#ea0029' active={active} onEnd={() => setFadeOut(true)} />
          </TweenerProvider>
        </div>
      </div>
    </div>
  );
});
export default Clear;
