import useTween from 'lesca-use-tween';
import { forwardRef, useContext, useEffect, useImperativeHandle } from 'react';
import { twMerge } from 'tailwind-merge';
import { ChiayiContext, ChiayiPageType } from '../../config';
import { ChiayiGameContext, ChiayiGameStepType } from '../config';
import { playSound } from '@/components/sounds';

export type VacuumHandle = {
  suck: () => void;
};

const maxOffsetX = 5;

const Vacuum = forwardRef((_, ref) => {
  const [{ page }] = useContext(ChiayiContext);
  const [{ step }] = useContext(ChiayiGameContext);
  const [style, setStyle] = useTween({ y: 155, x: 0 });

  useEffect(() => {
    if (page === ChiayiPageType.game && step === ChiayiGameStepType.bacteria) {
      setStyle({ y: 0 }, { duration: 500 });
    }
  }, [page, step]);

  useImperativeHandle(ref, () => ({
    suck() {
      playSound('virusDead');
      setStyle(
        { x: -Math.random() * maxOffsetX },
        {
          duration: 50,
          onEnd: () => {
            setStyle(
              { x: Math.random() * maxOffsetX },
              {
                duration: 50,
                onEnd: () => {
                  setStyle(
                    { x: -Math.random() * maxOffsetX },
                    {
                      duration: 50,
                      onEnd: () => {
                        setStyle(
                          { x: Math.random() * maxOffsetX },
                          {
                            duration: 50,
                            onEnd: () => {
                              setStyle({ x: 0 }, { duration: 50 });
                            },
                          },
                        );
                      },
                    },
                  );
                },
              },
            );
          },
        },
      );
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
