import { memo, useContext, useEffect } from 'react';
import { ChiayiContext, ChiayiPageType } from '../../config';
import { ChiayiGameContext, ChiayiGameStepType } from '../config';
import useTween from 'lesca-use-tween';
import { twMerge } from 'tailwind-merge';

const Vacuum = memo(() => {
  const [{ page }] = useContext(ChiayiContext);
  const [{ step }] = useContext(ChiayiGameContext);
  const [style, setStyle] = useTween({ y: 155 });

  useEffect(() => {
    if (page === ChiayiPageType.game && step === ChiayiGameStepType.bacteria) {
      setStyle({ y: 0 }, { duration: 500 });
    }
  }, [page, step]);

  return (
    <div className='vacuum'>
      <div
        style={style}
        className={twMerge(
          page === ChiayiPageType.game && step === ChiayiGameStepType.bacteria
            ? 'visible'
            : 'invisible',
        )}
      />
    </div>
  );
});
export default Vacuum;
