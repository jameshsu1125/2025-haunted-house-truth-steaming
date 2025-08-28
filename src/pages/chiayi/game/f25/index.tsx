import { memo, useContext, useEffect } from 'react';
import './index.less';
import useTween from 'lesca-use-tween';
import { ChiayiContext, ChiayiPageType } from '../../config';
import { ChiayiGameContext, ChiayiGameStepType } from '../config';

const F25 = memo(() => {
  const [{ page }] = useContext(ChiayiContext);
  const [{ step }, setState] = useContext(ChiayiGameContext);

  const [style, setStyle] = useTween({ opacity: 0, x: 100 });

  useEffect(() => {
    if (page === ChiayiPageType.game && step === ChiayiGameStepType.unset) {
      setStyle({ opacity: 1, x: 0 });
    } else if (page === ChiayiPageType.game && step === ChiayiGameStepType.dialog) {
      setStyle({ opacity: 0 }, { duration: 300, delay: 1000 });
    }
  }, [page, step]);

  return (
    <div className='F25'>
      <div
        style={style}
        onPointerDown={() => {
          setState((S) => ({ ...S, step: ChiayiGameStepType.dialog }));
        }}
      />
    </div>
  );
});
export default F25;
