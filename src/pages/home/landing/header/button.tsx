import useTween, { Bezier } from 'lesca-use-tween';
import { memo, useContext, useEffect } from 'react';
import { HomeContext, HomeStepType } from '../../config';

const Button = memo(() => {
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

  return (
    <div className='button'>
      <div
        style={style}
        onClick={() => {
          setState((S) => ({ ...S, step: HomeStepType.fadeOut }));
        }}
      >
        <div>
          <div className='start' />
        </div>
      </div>
    </div>
  );
});
export default Button;
