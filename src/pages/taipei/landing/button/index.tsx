import Click from 'lesca-click';
import useTween from 'lesca-use-tween';
import { memo, useContext, useEffect, useId, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { TaipeiContext, TaipeiStepType } from '../../config';
import { TaipeiLandingContext, TaipeiLandingStepType } from '../config';
import './index.less';

const Button = memo(() => {
  const id = useId();

  const [{ step: landingStep }, setState] = useContext(TaipeiLandingContext);
  const [{ step }] = useContext(TaipeiContext);
  const [style, setStyle] = useTween({ opacity: 0, scale: 1.5 });

  const [active, setActive] = useState(false);

  useEffect(() => {
    if (step === TaipeiStepType.loaded) {
      if (landingStep === TaipeiLandingStepType.entry) {
        setStyle(
          { opacity: 1, scale: 1 },
          {
            delay: 500,
            onEnd: () => {
              setActive(true);
              Click.add(`#${id}`, () => {
                setState((S) => ({ ...S, step: TaipeiLandingStepType.fadeOut }));
              });
            },
          },
        );
      } else if (landingStep === TaipeiLandingStepType.fadeOut) {
        setStyle({ opacity: 0 }, 700);
      }
    }
  }, [landingStep, step]);

  return (
    <div className='Button'>
      <div
        id={id}
        style={style}
        className={twMerge(active && 'pointer-events-auto cursor-pointer')}
      >
        <div />
      </div>
    </div>
  );
});
export default Button;
