import { memo, useContext, useEffect, useRef, useState } from 'react';
import './index.less';
import { ChiayiGameContext, ChiayiGameStepType, RESULT_WAIT_DURATION } from '../config';
import { ChiayiContext, ChiayiPageType } from '../../config';
import { twMerge } from 'tailwind-merge';
import useTween, { Bezier } from 'lesca-use-tween';

const T0 = memo(({ active }: { active: boolean }) => {
  const [style, setStyle] = useTween({ opacity: 0, y: 50 });
  useEffect(() => {
    if (active) {
      setStyle({ opacity: 1, y: 0 }, { delay: 500 });
    }
  }, [active]);
  return <div className='t0' style={style} />;
});

const T1 = memo(({ active }: { active: boolean }) => {
  const [style, setStyle] = useTween({ opacity: 0, y: 50 });
  useEffect(() => {
    if (active) {
      setStyle({ opacity: 1, y: 0 }, { delay: 600 });
    }
  }, [active]);
  return <div className='t1' style={style} />;
});

const T2 = memo(({ active }: { active: boolean }) => {
  const [style, setStyle] = useTween({ opacity: 0, y: 50 });
  useEffect(() => {
    if (active) {
      setStyle({ opacity: 1, y: 0 }, { delay: 700 });
    }
  }, [active]);
  return <div className='t2' style={style} />;
});

const T3 = memo(({ active }: { active: boolean }) => {
  const [style, setStyle] = useTween({ opacity: 0, y: 50 });
  const [increase, setIncrease] = useState(false);
  useEffect(() => {
    if (active) {
      setStyle({ opacity: 1, y: 0 }, { delay: 800, onEnd: () => setIncrease(true) });
    }
  }, [active]);
  return (
    <div className='count' style={style}>
      <Counter increase={increase} />
      <div className='t3' />
    </div>
  );
});

const Counter = memo(({ increase }: { increase: boolean }) => {
  const ref = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [{ bacteriaCount }] = useContext(ChiayiContext);
  const [, setState] = useContext(ChiayiGameContext);
  const [num, setNum, destroy] = useTween({ opacity: 0 });
  useEffect(() => {
    if (increase) {
      setNum(
        { opacity: bacteriaCount },
        {
          duration: 2000,
          easing: Bezier.easeOut,
          onEnd: () => {
            ref.current = setTimeout(() => {
              setState((S) => ({ ...S, step: ChiayiGameStepType.resultFadeOut }));
            }, RESULT_WAIT_DURATION);
          },
        },
      );
    }
    return () => {
      destroy();
      clearTimeout(ref.current!);
    };
  }, [increase]);

  return <div className='num'>{`${Math.floor(Number(num.opacity))}`}</div>;
});

const Result = memo(() => {
  const [{ step }, setState] = useContext(ChiayiGameContext);
  const [{ page }] = useContext(ChiayiContext);

  const [style, setStyle] = useTween({ opacity: 1 });

  useEffect(() => {
    if (step === ChiayiGameStepType.resultFadeOut) {
      setStyle(
        { opacity: 0 },
        {
          duration: 1000,
          onEnd: () => {
            setState((S) => ({ ...S, step: ChiayiGameStepType.clear }));
          },
        },
      );
    }
  }, [step]);

  return (
    <div
      className={twMerge(
        'Result',
        page === ChiayiPageType.game &&
          (step === ChiayiGameStepType.result || step === ChiayiGameStepType.resultFadeOut)
          ? 'visible'
          : 'invisible',
      )}
      onPointerDown={() => {
        setState((S) => ({ ...S, step: ChiayiGameStepType.resultFadeOut }));
      }}
      style={style}
    >
      <T0 active={page === ChiayiPageType.game && step === ChiayiGameStepType.result} />
      <T1 active={page === ChiayiPageType.game && step === ChiayiGameStepType.result} />
      <T2 active={page === ChiayiPageType.game && step === ChiayiGameStepType.result} />
      <T3 active={page === ChiayiPageType.game && step === ChiayiGameStepType.result} />
    </div>
  );
});
export default Result;
