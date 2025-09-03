import useTween from 'lesca-use-tween';
import { memo, useContext, useEffect, useRef, useState } from 'react';
import { ChiayiContext, ChiayiPageType } from '../../config';
import { ChiayiGameContext, ChiayiGameStepType } from '../config';
import './index.less';
import { twMerge } from 'tailwind-merge';

const F25 = memo(() => {
  const [{ page }] = useContext(ChiayiContext);
  const [{ step }, setState] = useContext(ChiayiGameContext);
  const [style, setStyle] = useTween({ opacity: 0, x: 100 });

  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);
  const [active, setActive] = useState(false);
  const [shouldAppendClass, setShouldAppendClass] = useState(false);

  useEffect(() => {
    if (active) {
      const shock = () => {
        setShouldAppendClass(true);
        setTimeout(() => {
          setShouldAppendClass(false);
        }, 1000);
        timeoutRef.current = setTimeout(shock, 1000 + Math.random() * 2000);
      };
      timeoutRef.current = setTimeout(shock, 1000 + Math.random() * 2000);
    } else if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, [active]);

  useEffect(() => {
    if (page === ChiayiPageType.game && step === ChiayiGameStepType.unset) {
      setStyle(
        { opacity: 1, x: 0 },
        {
          onEnd: () => {
            setActive(true);
          },
        },
      );
    } else if (page === ChiayiPageType.game && step === ChiayiGameStepType.dialog) {
      setStyle({ opacity: 0 }, { duration: 300, delay: 1000 });
    }
  }, [page, step]);

  return (
    <div className='F25'>
      <div
        className={twMerge(shouldAppendClass && 'animate-bigger-shock')}
        style={style}
        onPointerDown={() => {
          setActive(false);
          setState((S) => ({ ...S, step: ChiayiGameStepType.dialog }));
        }}
      />
    </div>
  );
});
export default F25;
