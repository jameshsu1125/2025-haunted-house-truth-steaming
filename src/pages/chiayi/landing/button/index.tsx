import Click from 'lesca-click';
import useTween from 'lesca-use-tween';
import { memo, useContext, useEffect, useId, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { ChiayiContext, ChiayiStepType } from '../../config';
import { TaipeiLandingContext, TaipeiLandingStepType } from '../config';
import './index.less';
import { playSound } from '@/components/sounds';
import Gtag from 'lesca-gtag';

const Button = memo(() => {
  const id = useId();

  const [{ step: landingStep }, setState] = useContext(TaipeiLandingContext);
  const [{ step }] = useContext(ChiayiContext);
  const [style, setStyle] = useTween({ opacity: 0, scale: 1.5 });

  const [active, setActive] = useState(false);

  useEffect(() => {
    if (step === ChiayiStepType.loaded) {
      if (landingStep === TaipeiLandingStepType.entry) {
        setStyle(
          { opacity: 1, scale: 1 },
          {
            delay: 500,
            onEnd: () => {
              setActive(true);
              Click.add(`#${id}`, () => {
                setState((S) => ({ ...S, step: TaipeiLandingStepType.fadeOut }));
                playSound('footprintGravel');
                Gtag.event('Chiayi', 'entry');
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
