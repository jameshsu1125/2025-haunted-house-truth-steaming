import { memo, useContext, useEffect, useState } from 'react';
import './index.less';
import { ERROR_TIME, TaipeiGameContext, TaipeiGameStepType } from '../config';
import useTween from 'lesca-use-tween';
import { twMerge } from 'tailwind-merge';

const Error = memo(() => {
  const [style, setStyle] = useTween({ opacity: 0 });
  const [{ isError, step }, setState] = useContext(TaipeiGameContext);
  const [blank, setBlank] = useState(false);

  useEffect(() => {
    if (step !== TaipeiGameStepType.start) return;
    if (isError) {
      setStyle(
        { opacity: 1 },
        {
          duration: 100,
          onEnd: () => {
            setBlank(true);
            setStyle(
              { opacity: 1 },
              {
                duration: ERROR_TIME,
                onEnd: () => {
                  setBlank(false);
                  setStyle({ opacity: 0 }, 1);
                  setState((S) => ({ ...S, isError: false }));
                },
              },
            );
          },
        },
      );
    }
  }, [step, isError]);

  return <div className={twMerge('Error', blank && 'animate-blank-1s')} style={style} />;
});
export default Error;
