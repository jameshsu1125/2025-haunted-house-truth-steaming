import Click from 'lesca-click';
import useTween from 'lesca-use-tween';
import { memo, useContext, useEffect, useId, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { ZhongliContext, ZhongliStepType } from '../../config';
import { ZhongliLandingContext, ZhongliLandingStepType } from '../config';
import './index.less';
import { playSound } from '@/components/sounds';

const Button = memo(() => {
  const id = useId();

  const [{ step: landingStep }, setState] = useContext(ZhongliLandingContext);
  const [{ step }] = useContext(ZhongliContext);
  const [style, setStyle] = useTween({ opacity: 0, scale: 1.5 });

  const [active, setActive] = useState(false);

  useEffect(() => {
    if (step === ZhongliStepType.ready) {
      if (landingStep === ZhongliLandingStepType.entry) {
        setStyle(
          { opacity: 1, scale: 1 },
          {
            delay: 500,
            onEnd: () => {
              setActive(true);
              Click.add(`#${id}`, () => {
                setState((S) => ({ ...S, step: ZhongliLandingStepType.fadeOut }));
                playSound('footstep', 2);
              });
            },
          },
        );
      } else if (landingStep === ZhongliLandingStepType.fadeOut) {
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
