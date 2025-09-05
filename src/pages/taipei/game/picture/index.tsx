import { memo, useContext, useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { TaipeiGameContext, TaipeiGameStepType } from '../config';
import './index.less';
import { fadeOutSound, playSound } from '@/components/sounds';
import Gtag from 'lesca-gtag';
import { TaipeiContext, TaipeiPageType } from '../../config';

const Picture = memo(() => {
  const ref = useRef<ReturnType<typeof setTimeout>>(null);
  const ref2 = useRef<ReturnType<typeof setTimeout>>(null);
  const [shake, setShake] = useState(false);

  const [{ page }] = useContext(TaipeiContext);
  const [{ step }] = useContext(TaipeiGameContext);

  const shakeIt = () => {
    if (step === TaipeiGameStepType.unset) {
      setShake(true);
      ref.current = setTimeout(() => {
        setShake(false);
      }, 1000);
    }
  };

  useEffect(() => {
    if (step === TaipeiGameStepType.unset && page === TaipeiPageType.game) {
      ref2.current = setTimeout(shakeIt, 3000 + Math.random() * 3000);
    }
    return () => {
      if (ref2.current) clearTimeout(ref2.current);
    };
  }, [page, step]);

  const onPointerDown = () => {
    if (step === TaipeiGameStepType.unset) {
      playSound('laugh');
      shakeIt();
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
