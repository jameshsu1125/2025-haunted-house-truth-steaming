import Click from 'lesca-click';
import useTween, { Bezier } from 'lesca-use-tween';
import { memo, useContext, useEffect, useId, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { TaipeiContext, TaipeiPageType } from '../../config';
import { TaipeiIntroContext, TaipeiIntroStepType } from '../config';
import './index.less';

const Button = memo(() => {
  const id = useId();

  const [{ page }] = useContext(TaipeiContext);
  const [{ step }, setState] = useContext(TaipeiIntroContext);

  const [style, setStyle] = useTween({ opacity: 0, scale: 1.5 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (page === TaipeiPageType.intro) {
      if (step === TaipeiIntroStepType.unset) {
        setStyle(
          { opacity: 1, scale: 1 },
          {
            delay: 3000,
            duration: 500,
            easing: Bezier.outBack,
            onEnd: () => {
              setActive(true);
              Click.add(`#${id}`, () => {
                Click.remove(`#${id}`);
                setState((S) => ({ ...S, step: TaipeiIntroStepType.entry }));
              });
            },
          },
        );
      } else if (step === TaipeiIntroStepType.entry) {
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
