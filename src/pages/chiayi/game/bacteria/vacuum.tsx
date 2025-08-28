import { memo, useContext, useEffect } from 'react';
import { ChiayiContext, ChiayiPageType } from '../../config';
import { ChiayiGameContext, ChiayiGameStepType } from '../config';
import useTween from 'lesca-use-tween';

const Vacuum = memo(() => {
  const [{ page }] = useContext(ChiayiContext);
  const [{ step }] = useContext(ChiayiGameContext);
  const [style, setStyle] = useTween({ y: 100 });

  useEffect(() => {
    if (page === ChiayiPageType.game && step === ChiayiGameStepType.bacteria) {
      setStyle({ y: 0 }, 500);
    }
  }, [page, step]);

  return (
    <div className='vacuum'>
      <div style={style} />
    </div>
  );
});
export default Vacuum;
