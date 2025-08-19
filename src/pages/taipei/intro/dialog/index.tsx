import { memo, useContext, useEffect } from 'react';
import './index.less';
import { TaipeiContext, TaipeiPageType } from '../../config';
import useTween, { Bezier } from 'lesca-use-tween';

const Dialog = memo(() => {
  const [{ page }] = useContext(TaipeiContext);
  const [style, setStyle] = useTween({ opacity: 0, y: -300 });

  useEffect(() => {
    if (page === TaipeiPageType.intro) {
      setStyle({ opacity: 1, y: 0 }, { duration: 1000, delay: 2200, easing: Bezier.outQuart });
    }
  }, [page]);

  return (
    <div className='Dialog'>
      <div style={style}>
        <div />
      </div>
    </div>
  );
});
export default Dialog;
