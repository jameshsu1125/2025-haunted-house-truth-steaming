import Click from 'lesca-click';
import useTween, { Bezier } from 'lesca-use-tween';
import { memo, useContext, useEffect, useId } from 'react';
import { twMerge } from 'tailwind-merge';
import { HomeContext, HomeStepType } from '../../config';
import { playSound } from '@/components/sounds';

const Button = memo(() => {
  const id = useId();

  const [{ step }, setState] = useContext(HomeContext);
  const [style, setStyle] = useTween({ opacity: 0, scale: 2 });

  useEffect(() => {
    if (step === HomeStepType.FadeIn) {
      setStyle(
        { opacity: 1, scale: 1 },
        {
          duration: 500,
          delay: 3500,
          easing: Bezier.outBack,
          onEnd: () => {
            setState((S) => ({ ...S, step: HomeStepType.Loop }));
          },
        },
      );
    } else if (step === HomeStepType.FadeOut) {
      setStyle({ opacity: 0, scale: 1 }, 1);
    }
  }, [step]);

  useEffect(() => {
    Click.add(`#${id}`, () => {
      if (step === HomeStepType.Loop) {
        setState((S) => ({ ...S, step: HomeStepType.FadeOut }));
        Click.remove(`#${id}`);
        playSound('click');
      }
    });
  }, [step]);

  return (
    <div className={twMerge('button', step === HomeStepType.Loop && 'cursor-pointer')}>
      <div id={id} style={style} className='[&_*]:pointer-events-none'>
        <div>
          <div className='start' />
        </div>
      </div>
    </div>
  );
});
export default Button;
