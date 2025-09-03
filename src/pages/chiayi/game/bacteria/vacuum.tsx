import useTween from 'lesca-use-tween';
import { forwardRef, useContext, useEffect, useImperativeHandle } from 'react';
import { twMerge } from 'tailwind-merge';
import { ChiayiContext, ChiayiPageType } from '../../config';
import { ChiayiGameContext, ChiayiGameStepType } from '../config';

export type VacuumHandle = {
  suck: () => void;
};

const Vacuum = forwardRef((_, ref) => {
  const [{ page }] = useContext(ChiayiContext);
  const [{ step }] = useContext(ChiayiGameContext);
  const [style, setStyle] = useTween({ y: 155 });

  useEffect(() => {
    if (page === ChiayiPageType.game && step === ChiayiGameStepType.bacteria) {
      setStyle({ y: 0 }, { duration: 500 });
    }
  }, [page, step]);

  useImperativeHandle(ref, () => ({
    suck() {
      console.log('a');
    },
  }));

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
