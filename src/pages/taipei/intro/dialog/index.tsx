import { memo, useContext, useEffect } from 'react';
import './index.less';
import { TaipeiContext, TaipeiPageType } from '../../config';
import useTween, { Bezier } from 'lesca-use-tween';
import { TaipeiIntroContext, TaipeiIntroStepType } from '../config';
import { fadeOutSound, playSound } from '@/components/sounds';

const Dialog = memo(() => {
  const [{ page }] = useContext(TaipeiContext);
  const [{ step }] = useContext(TaipeiIntroContext);
  const [style, setStyle] = useTween({ opacity: 0, y: -300, scale: 1 });

  useEffect(() => {
    if (page === TaipeiPageType.intro) {
      if (step === TaipeiIntroStepType.unset) {
        setStyle(
          { opacity: 1, y: 0 },
          {
            duration: 1000,
            delay: 5000,
            easing: Bezier.outQuart,
            onStart: () => {
              fadeOutSound('footstep');
            },
            onEnd: () => {
              playSound('hint');
            },
          },
        );
      } else if (step === TaipeiIntroStepType.entry) {
        setStyle({ opacity: 0 }, { duration: 1, easing: Bezier.inOutQuart });
      }
    }
  }, [page, step]);

  return (
    <div className='Dialog'>
      <div style={style}>
        <div />
      </div>
    </div>
  );
});
export default Dialog;
