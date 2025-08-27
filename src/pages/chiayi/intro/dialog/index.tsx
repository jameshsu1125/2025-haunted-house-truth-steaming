import { memo, useContext, useEffect } from 'react';
import './index.less';
import { ChiayiContext, ChiayiPageType } from '../../config';
import useTween, { Bezier } from 'lesca-use-tween';
import { ChiayiIntroContext, ChiayiIntroStepType } from '../config';

const Dialog = memo(() => {
  const [{ page }] = useContext(ChiayiContext);
  const [{ step }] = useContext(ChiayiIntroContext);
  const [style, setStyle] = useTween({ opacity: 0, y: -300, scale: 1 });

  useEffect(() => {
    if (page === ChiayiPageType.intro) {
      if (step === ChiayiIntroStepType.unset) {
        setStyle({ opacity: 1, y: 0 }, { duration: 1000, delay: 3800, easing: Bezier.outQuart });
      } else if (step === ChiayiIntroStepType.entry) {
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
