import Click from 'lesca-click';
import useTween, { Bezier } from 'lesca-use-tween';
import { memo, useContext, useEffect, useId, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { ChiayiContext, ChiayiPageType } from '../../config';
import { ChiayiIntroContext, ChiayiIntroStepType } from '../config';
import './index.less';

const Button = memo(() => {
  const id = useId();

  const [{ page }] = useContext(ChiayiContext);
  const [{ step }, setState] = useContext(ChiayiIntroContext);

  const [style, setStyle] = useTween({ opacity: 0, scale: 1.5 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (page === ChiayiPageType.intro) {
      if (step === ChiayiIntroStepType.unset) {
        setStyle(
          { opacity: 1, scale: 1 },
          {
            delay: 4500,
            duration: 500,
            easing: Bezier.outBack,
            onEnd: () => {
              setActive(true);
              Click.add(`#${id}`, () => {
                Click.remove(`#${id}`);
                setState((S) => ({ ...S, step: ChiayiIntroStepType.entry }));
              });
            },
          },
        );
      } else if (step === ChiayiIntroStepType.entry) {
        setStyle({ opacity: 0 }, 1);
      }
    }
  }, [page, step]);

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
