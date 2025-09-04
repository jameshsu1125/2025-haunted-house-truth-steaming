import { fadeOutSound, playSound } from '@/components/sounds';
import useTween from 'lesca-use-tween';
import {
  forwardRef,
  memo,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { twMerge } from 'tailwind-merge';
import { TaipeiContext, TaipeiPageType } from '../../config';
import { GHOST_TIME, TaipeiGameContext, TaipeiGameStepType } from '../config';
import './index.less';

const Clear = memo(() => {
  const [style, setStyle] = useTween({ opacity: 0 });
  const [{ step }] = useContext(TaipeiGameContext);
  useEffect(() => {
    if (step >= TaipeiGameStepType.dirt2Clear) setStyle({ opacity: 1 }, 2000);
  }, [step]);
  return <div className='clear' style={style} />;
});

const Ghost = forwardRef((_, ref) => {
  const [style, setStyle] = useTween({ opacity: 0 });
  const [{ step }] = useContext(TaipeiGameContext);

  const onPointerDown = useCallback(() => {
    if (step === TaipeiGameStepType.unset) {
      setStyle(
        { opacity: 1 },
        {
          duration: 100,
          onEnd: () => {
            setStyle(
              { opacity: 1 },
              { duration: GHOST_TIME, onEnd: () => setStyle({ opacity: 0 }, 10) },
            );
          },
        },
      );
    }
    return () => {
      fadeOutSound('ghost');
    };
  }, [step]);

  useImperativeHandle(ref, () => ({
    active() {
      onPointerDown();
    },
  }));

  return (
    <div
      className='ghost'
      style={style}
      onPointerDown={() => {
        onPointerDown();
        playSound('ghost');
      }}
    >
      <div />
    </div>
  );
});

const Touch = memo(() => {
  const [{ step, isError }, setState] = useContext(TaipeiGameContext);
  const onPointerDown = useCallback(() => {
    if (step === TaipeiGameStepType.unset && !isError) {
      setState((S) => ({ ...S, isError: true }));
    }
  }, [step]);
  return (
    <div className='absolute top-0 h-full w-full bg-transparent' onPointerDown={onPointerDown} />
  );
});

const Light = memo(() => {
  const [{ page }] = useContext(TaipeiContext);
  const [{ step }] = useContext(TaipeiGameContext);
  const [style, setStyle, destroy] = useTween({ opacity: 1 });
  const isTween = useRef(false);
  const [appendClass, setAppendClass] = useState(false);
  const ref = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    if (page === TaipeiPageType.game && step === TaipeiGameStepType.unset) {
      fadeOutSound('door');
      playSound('light');
    }
  }, [page, step]);

  useEffect(() => {
    if (step === TaipeiGameStepType.unset) {
      const blank = () => {
        if (!isTween.current) {
          const is = Math.random() > 0.9;
          if (is) {
            setStyle(
              { opacity: 0 },
              {
                duration: 200 + Math.random() * 500,
                onStart: () => {
                  isTween.current = true;
                },
                onEnd: () => {
                  setAppendClass(true);
                  ref.current = setTimeout(
                    () => {
                      setStyle(
                        { opacity: 1 },
                        {
                          duration: 1,
                          onEnd: () => {
                            setAppendClass(false);
                            isTween.current = false;
                          },
                        },
                      );
                    },
                    2000 + Math.random() * 3000,
                  );
                },
              },
            );
          }
        }
        requestAnimationFrame(blank);
      };
      blank();
    }
    if (step > TaipeiGameStepType.unset) {
      isTween.current = true;
      destroy();
    }
    return () => {
      if (ref.current) clearTimeout(ref.current);
    };
  }, [step]);

  return (
    <div className={twMerge('light', appendClass && 'animate-blank-1s')} style={style}>
      <div />
    </div>
  );
});

const Dish = memo(() => {
  useEffect(() => {
    return () => {
      fadeOutSound('dish');
    };
  }, []);
  return (
    <div
      className='dish'
      onPointerDown={() => {
        playSound('dish');
      }}
    />
  );
});

const Background = memo(() => {
  const [style, setStyle] = useTween({ opacity: 0 });
  const [{ page }] = useContext(TaipeiContext);

  useEffect(() => {
    if (page === TaipeiPageType.game) {
      setStyle({ opacity: 1 }, { duration: 500 });
    }
  }, [page]);

  return (
    <div className='Background' style={style}>
      <Touch />
      <Ghost />
      <div className='image' />
      <Light />
      <Clear />
      <Dish />
    </div>
  );
});
export default Background;
