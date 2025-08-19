import useTween, { Bezier } from 'lesca-use-tween';
import { memo, useContext, useEffect, useRef } from 'react';
import { TaipeiContext, TaipeiStepType } from '../../config';
import { TaipeiLandingContext, TaipeiLandingEntryTime, TaipeiLandingStepType } from '../config';
import './index.less';

const Line = memo(({ index, onAnimated }: { index: number; onAnimated: () => void }) => {
  const [{ step: landingStep }] = useContext(TaipeiLandingContext);
  const [{ step }] = useContext(TaipeiContext);
  const [style, setStyle] = useTween({ opacity: 0, y: 50 });

  useEffect(() => {
    if (step === TaipeiStepType.loaded) {
      if (landingStep === TaipeiLandingStepType.unset)
        setStyle(
          { opacity: 1, y: 0 },
          {
            duration: 1000,
            delay: 1000 + index * 70,
            easing: Bezier.inOutQuart,
            onEnd: () => index === 4 && onAnimated(),
          },
        );
      else if (landingStep === TaipeiLandingStepType.entry) setStyle({ opacity: 0 });
    }
  }, [landingStep, step]);

  return (
    <div style={style}>
      <div />
    </div>
  );
});

const Description = memo(() => {
  const ref = useRef<ReturnType<typeof setTimeout>>(undefined);

  const [, setState] = useContext(TaipeiLandingContext);

  const onAnimated = () => {
    clearTimeout(ref.current);
    ref.current = setTimeout(() => {
      setState((S) => ({ ...S, step: TaipeiLandingStepType.entry }));
    }, TaipeiLandingEntryTime);
  };

  return (
    <div
      className='Description'
      onPointerDown={() => {
        clearTimeout(ref.current);
        setState((S) => ({ ...S, step: TaipeiLandingStepType.entry }));
      }}
    >
      {[...new Array(5).keys()].map((index) => (
        <Line key={index} index={index} onAnimated={onAnimated} />
      ))}
    </div>
  );
});
export default Description;
