import { memo, useContext, useEffect, useRef } from 'react';
import { twMerge } from 'tailwind-merge';
import {
  TaipeiGameContext,
  TaipeiGameStepType,
  VACUUM_DURATION,
  VACUUM_OFFSET,
  VACUUM_WAIT,
} from '../config';
import './index.less';
import Smoke from './smoke';
import { IReactProps } from '@/settings/type';
import useTween, { Bezier } from 'lesca-use-tween';

const Cleaner = memo(({ children }: IReactProps) => {
  const [{ step }, setState] = useContext(TaipeiGameContext);
  const [style, setStyle] = useTween({ x: 672 / 2 });

  useEffect(() => {
    if (step === TaipeiGameStepType.dirt) {
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
                                                  { x: 672 / 2 },
                                                  {
                                                    duration: 1000,
                                                    delay: VACUUM_WAIT,
                                                    easing: Bezier.inOutSine,
                                                    onStart: () => {
                                                      setState((S) => ({
                                                        ...S,
                                                        step: TaipeiGameStepType.dirt2Clear,
                                                      }));
                                                    },
                                                    onEnd: () => {
                                                      setState((S) => ({
                                                        ...S,
                                                        step: TaipeiGameStepType.clear,
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
      {children}
    </div>
  );
});

const Vacuum = memo(() => {
  const [{ step }] = useContext(TaipeiGameContext);
  const dot = useRef<HTMLDivElement>(null);

  return (
    <div
      className={twMerge(
        'Vacuum',
        step === TaipeiGameStepType.dirt || step === TaipeiGameStepType.dirt2Clear
          ? 'visible'
          : 'invisible',
      )}
    >
      <Smoke dot={dot} />
      <Cleaner>
        <div className='dot' ref={dot} />
      </Cleaner>
    </div>
  );
});
export default Vacuum;
