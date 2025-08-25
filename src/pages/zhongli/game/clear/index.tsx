import { IReactProps } from '@/settings/type';
import useTween from 'lesca-use-tween';
import { memo, useContext, useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { twMerge } from 'tailwind-merge';
import { ZhongliGameContext, ZhongliGameStepType } from '../config';
import videoURL from '@/pages/taipei/game/clear/img/smoke.mp4';
import './index.less';
import SVG from './svg';

const TweenerProvider = ({ children, active }: IReactProps & { active: boolean }) => {
  const [, setState] = useContext(ZhongliGameContext);
  const [style, setStyle] = useTween({ opacity: 1 });
  useEffect(() => {
    if (active)
      setStyle(
        { opacity: 0 },
        {
          duration: 1000,
          onEnd: () => setState((S) => ({ ...S, step: ZhongliGameStepType.end })),
        },
      );
  }, [active]);
  return <div style={style}>{children}</div>;
};

const Clear = memo(() => {
  const ref = useRef<HTMLVideoElement>(null);
  const [{ step }] = useContext(ZhongliGameContext);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (step === ZhongliGameStepType.clear) {
      if (ref.current) {
        ref.current!.currentTime = 0;
        ref.current!.play();
      }
    }
  }, [step]);

  return (
    <div className={twMerge('Clear', step === ZhongliGameStepType.clear ? 'visible' : 'invisible')}>
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
        />
      </div>
      <div>
        <div>
          <TweenerProvider active={fadeOut}>
            <SVG fill='none' active={step === ZhongliGameStepType.clear} />
            <SVG
              fill='#ea0029'
              active={step === ZhongliGameStepType.clear}
              onEnd={() => {
                setFadeOut(true);
              }}
            />
          </TweenerProvider>
        </div>
      </div>
    </div>
  );
});
export default Clear;
