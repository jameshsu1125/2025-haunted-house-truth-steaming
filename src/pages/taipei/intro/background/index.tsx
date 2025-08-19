import { memo, useContext, useEffect } from 'react';
import './index.less';
import useTween, { Bezier } from 'lesca-use-tween';
import { TaipeiContext, TaipeiPageType } from '../../config';

const DarkScreen = memo(() => {
  const [{ page }] = useContext(TaipeiContext);
  const [style, setStyle] = useTween({ opacity: 1 });

  useEffect(() => {
    if (page === TaipeiPageType.intro) {
      setStyle({ opacity: 0 }, { duration: 1000, easing: Bezier.outQuart });
    }
  }, [page]);

  return <div style={style} />;
});

const Background = memo(() => {
  const [{ page }] = useContext(TaipeiContext);
  const [style, setStyle] = useTween({ opacity: 0, scale: 1 });

  useEffect(() => {
    if (page === TaipeiPageType.intro) {
      setStyle({ scale: 1.7, opacity: 1 }, { duration: 3000, easing: Bezier.inOutQuart });
    }
  }, [page]);

  return (
    <div className='Background' style={style}>
      <DarkScreen />
    </div>
  );
});
export default Background;
