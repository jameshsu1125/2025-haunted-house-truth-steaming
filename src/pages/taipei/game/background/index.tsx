import useTween from 'lesca-use-tween';
import { memo, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { GHOST_TIME, TaipeiGameContext, TaipeiGameStepType } from '../config';
import './index.less';

const Clear = memo(() => {
  const [style, setStyle] = useTween({ opacity: 0 });
  const [{ step }] = useContext(TaipeiGameContext);
  useEffect(() => {
    if (step === TaipeiGameStepType.clear) setStyle({ opacity: 1 });
  }, [step]);
  return <div className='clear' style={style} />;
});

const Ghost = memo(() => {
  const [style, setStyle] = useTween({ opacity: 0 });
  const [{ step }] = useContext(TaipeiGameContext);

  const onPointerDown = useCallback(() => {
    if (step === TaipeiGameStepType.start) {
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
  }, [step]);

  return (
    <div className='ghost' style={style} onPointerDown={onPointerDown}>
      <div />
    </div>
  );
});

const Touch = memo(() => {
  const [{ step, isError }, setState] = useContext(TaipeiGameContext);
  const onPointerDown = useCallback(() => {
    if (step === TaipeiGameStepType.start && !isError) {
      setState((S) => ({ ...S, isError: true }));
    }
  }, [step]);
  return (
    <div className='absolute top-0 h-full w-full bg-transparent' onPointerDown={onPointerDown} />
  );
});

const Light = memo(() => {
  const [{ step }] = useContext(TaipeiGameContext);
  const [style, setStyle, destroy] = useTween({ opacity: 1 });
  const isTween = useRef(false);
  const [appendClass, setAppendClass] = useState(false);

  useEffect(() => {
    if (step === TaipeiGameStepType.start) {
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
                  setTimeout(
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
    if (step > TaipeiGameStepType.start) {
      isTween.current = true;
      destroy();
    }
  }, [step]);

  return (
    <div className={twMerge('light', appendClass && 'animate-blank-1s')} style={style}>
      <div />
    </div>
  );
});

const Background = memo(() => (
  <div className='Background'>
    <Touch />
    <Ghost />
    <div className='image' />
    <Light />
    <Clear />
  </div>
));
export default Background;
