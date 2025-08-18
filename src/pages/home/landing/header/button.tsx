import useTween, { Bezier } from 'lesca-use-tween';
import { memo, useContext, useEffect, useId } from 'react';
import { HomeContext, HomeStepType } from '../../config';
import Click from 'lesca-click';
import { twMerge } from 'tailwind-merge';

const Button = memo(() => {
  const id = useId();

  const [{ step }, setState] = useContext(HomeContext);
  const [style, setStyle] = useTween({ opacity: 0, scale: 2 });

  useEffect(() => {
    if (step === HomeStepType.fadeIn) {
      setStyle(
        { opacity: 1, scale: 1 },
        {
          duration: 500,
          delay: 3500,
          easing: Bezier.outBack,
          onEnd: () => {
            setState((S) => ({ ...S, step: HomeStepType.loop }));
          },
        },
      );
    } else if (step === HomeStepType.fadeOut) {
      setStyle({ opacity: 0, scale: 1 }, 1);
    }
  }, [step]);

  useEffect(() => {
    Click.add(`#${id}`, () => {
      if (step === HomeStepType.loop) {
        setState((S) => ({ ...S, step: HomeStepType.fadeOut }));
        Click.remove(`#${id}`);
      }
    });
  }, [step]);

  return (
    <div className={twMerge('button', step === HomeStepType.loop && 'cursor-pointer')}>
      <div id={id} style={style} className='[&_*]:pointer-events-none'>
        <div>
          <div className='start' />
        </div>
      </div>
    </div>
  );
});
export default Button;
