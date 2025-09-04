import Click from 'lesca-click';
import useTween, { Bezier } from 'lesca-use-tween';
import { memo, useContext, useEffect, useId, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { ZhongliContext, ZhongliPageType } from '../../config';
import { ZhongliIntroContext, ZhongliIntroStepType } from '../config';
import './index.less';
import { playSound } from '@/components/sounds';
import Gtag from 'lesca-gtag';

const Button = memo(() => {
  const id = useId();

  const [{ page }] = useContext(ZhongliContext);
  const [{ step }, setState] = useContext(ZhongliIntroContext);

  const [style, setStyle] = useTween({ opacity: 0, scale: 1.5 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (page === ZhongliPageType.intro) {
      if (step === ZhongliIntroStepType.door) {
        setStyle(
          { opacity: 1, scale: 1 },
          {
            delay: 1200,
            duration: 500,
            easing: Bezier.outBack,
            onEnd: () => {
              setActive(true);
              Click.add(`#${id}`, () => {
                Click.remove(`#${id}`);
                setState((S) => ({ ...S, step: ZhongliIntroStepType.entry }));
                playSound('doorWood');
                Gtag.event('Zhongli', 'start');
              });
            },
          },
        );
      } else if (step === ZhongliIntroStepType.entry) {
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
