import { IReactProps } from '@/settings/type';
import useTween, { Bezier } from 'lesca-use-tween';
import { memo, useContext, useEffect, useRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { ZhongliContext, ZhongliPageType } from '../../config';
import {
  VACUUM_DURATION,
  VACUUM_OFFSET,
  VACUUM_WAIT,
  ZhongliGameContext,
  ZhongliGameStepType,
} from '../config';
import './index.less';
import Smoke from './smoke';

const Cleaner = memo(({ children }: IReactProps) => {
  const [{ page }] = useContext(ZhongliContext);
  const [style, setStyle] = useTween({ x: 672 });
  const [{ step }, setState] = useContext(ZhongliGameContext);

  useEffect(() => {
    if (page !== ZhongliPageType.game) return;
    if (step === ZhongliGameStepType.dirt) {
      setStyle(
        { x: -VACUUM_OFFSET },
        {
          duration: 2000,
          easing: Bezier.outSine,
          onEnd: () => {
            setStyle(
              { x: 0 },
              {
                duration: VACUUM_DURATION,
                easing: Bezier.linear,
                onEnd: () => {
                  setState((S) => ({ ...S, clearTimes: S.clearTimes + 1 }));
                  setStyle(
                    { x: VACUUM_OFFSET },
                    {
                      duration: VACUUM_DURATION,
                      easing: Bezier.linear,
                      onEnd: () => {
                        setStyle(
                          { x: 0 },
                          {
                            duration: VACUUM_DURATION,
                            easing: Bezier.linear,
                            onEnd: () => {
                              setState((S) => ({ ...S, clearTimes: S.clearTimes + 1 }));
                              setStyle(
                                { x: -VACUUM_OFFSET },
                                {
                                  duration: VACUUM_DURATION,
                                  easing: Bezier.linear,
                                  onEnd: () => {
                                    setStyle(
                                      { x: 0 },
                                      {
                                        duration: VACUUM_DURATION,
                                        easing: Bezier.linear,
                                        onEnd: () => {
                                          setState((S) => ({ ...S, clearTimes: S.clearTimes + 1 }));
                                          setStyle(
                                            { x: VACUUM_OFFSET * 2 },
                                            {
                                              duration: VACUUM_DURATION * 2,
                                              easing: Bezier.linear,
                                              onEnd: () => {
                                                setStyle(
                                                  { x: 672 },
                                                  {
                                                    duration: 1000,
                                                    delay: VACUUM_WAIT,
                                                    easing: Bezier.inOutSine,
                                                    onStart: () => {
                                                      setState((S) => ({
                                                        ...S,
                                                        step: ZhongliGameStepType.dirt2Clear,
                                                      }));
                                                    },
                                                    onEnd: () => {
                                                      setState((S) => ({
                                                        ...S,
                                                        step: ZhongliGameStepType.clear,
                                                      }));
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
    }
  }, [step]);

  return (
    <div className='cleaner' style={style}>
      <div>
        <div>{children}</div>
      </div>
    </div>
  );
});

const Vacuum = memo(() => {
  const dot = useRef<HTMLDivElement>(null);
  return (
    <div className='vacuum'>
      <Smoke dot={dot} />
      <Cleaner>
        <div className='dot' ref={dot} />
      </Cleaner>
    </div>
  );
});

const Dirt = memo(() => {
  const [{ page }] = useContext(ZhongliContext);
  const [style, setStyle] = useTween({ opacity: 1 });
  const [{ step, clearTimes }, setState] = useContext(ZhongliGameContext);

  useEffect(() => {
    if (page !== ZhongliPageType.game) return;
    if (step === ZhongliGameStepType.dirt) {
      setStyle({ opacity: 0 }, { duration: 500, onEnd: () => {} });
    }
  }, [step]);

  return (
    <div
      className={twMerge('dirt', step === ZhongliGameStepType.underBed && 'pointer-events-auto')}
    >
      <div
        onPointerDown={() => {
          setState((S) => ({ ...S, step: ZhongliGameStepType.dirt }));
        }}
        className={twMerge(
          clearTimes === 0
            ? 'opacity-100'
            : clearTimes === 1
              ? 'opacity-70'
              : clearTimes === 2
                ? 'opacity-35'
                : 'opacity-0',
        )}
      />
      <div className='out-line' style={style} />
    </div>
  );
});

const UnderBed = memo(() => {
  const [{ page }] = useContext(ZhongliContext);
  const [style, setStyle] = useTween({ opacity: 0 });
  const [{ step }] = useContext(ZhongliGameContext);

  useEffect(() => {
    if (page !== ZhongliPageType.game) return;
    if (step === ZhongliGameStepType.dialog) {
      setStyle({ opacity: 1 }, { duration: 500, onEnd: () => {} });
    } else if (step === ZhongliGameStepType.dirt2Clear) {
      setStyle({ opacity: 0 }, { duration: 1000, easing: Bezier.inOutCirc });
    }
  }, [page, step]);

  return (
    <div
      className={twMerge(
        'UnderBed',
        page === ZhongliPageType.game && step <= ZhongliGameStepType.dirt2Clear
          ? 'visible'
          : 'invisible',
        step === ZhongliGameStepType.underBed && 'pointer-events-auto',
      )}
      style={style}
    >
      <div className='background' />
      <Dirt />
      <Vacuum />
      <div className='bed' />
    </div>
  );
});
export default UnderBed;
