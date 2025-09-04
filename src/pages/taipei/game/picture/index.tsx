import { memo, useContext, useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { TaipeiGameContext, TaipeiGameStepType } from '../config';
import './index.less';
import { fadeOutSound, playSound } from '@/components/sounds';
import Gtag from 'lesca-gtag';

const Picture = memo(() => {
  const ref = useRef<ReturnType<typeof setTimeout>>(null);
  const [shake, setShake] = useState(false);

  const [{ step }] = useContext(TaipeiGameContext);
  const onPointerDown = () => {
    if (step === TaipeiGameStepType.unset) {
      playSound('laugh');
      setShake(true);
      ref.current = setTimeout(() => {
        setShake(false);
      }, 1000);
      Gtag.event('Taipei', 'picture');
    }
  };

  useEffect(() => {
    return () => {
      if (ref.current) clearTimeout(ref.current);
      fadeOutSound('laugh');
    };
  }, []);

  return (
    <div className='Picture'>
      <div onPointerDown={onPointerDown} className={twMerge(shake && 'animate-shake')}>
        <div />
      </div>
    </div>
  );
});
export default Picture;
