import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import useTween from 'lesca-use-tween';
import { memo, useContext, useEffect, useRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { ChiayiContext, ChiayiPageType } from '../../config';
import { ChiayiGameContext, ChiayiGameStepType } from '../config';
import './index.less';
import Smoke from './smoke';
import Vacuum, { VacuumHandle } from './vacuum';
import Virus from './virus';
import Counter, { CounterHandle } from './counter';

const Floor = memo(() => {
  const [, setContext] = useContext(Context);
  const [{ page }] = useContext(ChiayiContext);
  const [{ step }] = useContext(ChiayiGameContext);
  const [style, setStyle] = useTween({ opacity: 0 });

  useEffect(() => {
    if (page === ChiayiPageType.game && step === ChiayiGameStepType.bacteria) {
      setStyle({ opacity: 1 });
      setContext({ type: ActionType.SmokeEffect, state: { enabled: true } });
    }
  }, [page, step]);

  return <div style={style} className='floor' />;
});

const Bacteria = memo(() => {
  const vacuumRef = useRef<VacuumHandle | null>(null);
  const counterRef = useRef<CounterHandle | null>(null);
  const [, setContext] = useContext(Context);
  const [{ page }] = useContext(ChiayiContext);
  const [{ step }, setState] = useContext(ChiayiGameContext);
  const [style, setStyle] = useTween({ opacity: 1 });

  useEffect(() => {
    if (page === ChiayiPageType.game && step === ChiayiGameStepType.bacteriaFadeOut) {
      setContext({ type: ActionType.SmokeEffect, state: { enabled: false } });
      setStyle(
        { opacity: 0 },
        {
          duration: 500,
          onEnd: () => {
            setState((S) => ({ ...S, step: ChiayiGameStepType.result }));
          },
        },
      );
    }
  }, [page, step]);

  const onSuck = (event: React.PointerEvent<HTMLDivElement>) => {
    if (vacuumRef.current) vacuumRef.current.suck();
    if (counterRef.current) counterRef.current.increase(event);
  };

  return (
    <div
      className={twMerge(
        'Bacteria',
        page === ChiayiPageType.game &&
          (step === ChiayiGameStepType.bacteriaFadeOut || step === ChiayiGameStepType.bacteria)
          ? 'visible'
          : 'invisible',
      )}
      style={style}
    >
      <Floor />
      <Smoke />
      <Virus onSuck={onSuck} />
      <Vacuum ref={vacuumRef} />
      <Counter ref={counterRef} />
    </div>
  );
});
export default Bacteria;
