import { memo, useContext, useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { twMerge } from 'tailwind-merge';
import { TaipeiGameContext, TaipeiGameStepType } from '../config';
import videoURL from './img/smoke.mp4';
import './index.less';
import SVG from './svg';
import { IReactProps } from '@/settings/type';
import useTween from 'lesca-use-tween';

const TweenerProvider = ({ children, active }: IReactProps & { active: boolean }) => {
  const [, setState] = useContext(TaipeiGameContext);
  const [style, setStyle] = useTween({ opacity: 1 });
  useEffect(() => {
    if (active)
      setStyle(
        { opacity: 0 },
        {
          duration: 1000,
          onEnd: () => setState((S) => ({ ...S, step: TaipeiGameStepType.end })),
        },
      );
  }, [active]);
  return <div style={style}>{children}</div>;
};

const Clear = memo(() => {
  const ref = useRef<HTMLVideoElement>(null);
  const [{ step }] = useContext(TaipeiGameContext);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (step === TaipeiGameStepType.clear) {
      if (ref.current) {
        ref.current!.currentTime = 0;
        ref.current!.play();
      }
    }
  }, [step]);

  return (
    <div className={twMerge('Clear', step === TaipeiGameStepType.clear ? 'visible' : 'invisible')}>
      <div>
        <ReactPlayer
          ref={ref}
          src={videoURL}
          muted
          autoPlay
          loop={false}
          width={1280}
          height={720}
        />
      </div>
      <div>
        <div>
          <TweenerProvider active={fadeOut}>
            <SVG fill='none' active={step === TaipeiGameStepType.clear} />
            <SVG
              fill='#ea0029'
              active={step === TaipeiGameStepType.clear}
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
