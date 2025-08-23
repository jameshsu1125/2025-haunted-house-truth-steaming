import { memo, useContext, useEffect } from 'react';
import './index.less';
import { ZhongliContext, ZhongliPageType } from '../../config';
import useTween, { Bezier } from 'lesca-use-tween';
import { ZhongliIntroContext, ZhongliIntroStepType } from '../config';

const Dialog = memo(() => {
  const [{ page }] = useContext(ZhongliContext);
  const [{ step }] = useContext(ZhongliIntroContext);
  const [style, setStyle] = useTween({ opacity: 0, y: -300, scale: 1 });

  useEffect(() => {
    if (page === ZhongliPageType.intro) {
      if (step === ZhongliIntroStepType.door) {
        setStyle({ opacity: 1, y: 0 }, { duration: 1000, delay: 500, easing: Bezier.outQuart });
      } else if (step === ZhongliIntroStepType.entry) {
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
