import { memo, useContext, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { TaipeiGameContext, TaipeiGameStepType } from '../config';
import './index.less';

const Picture = memo(() => {
  const [shake, setShake] = useState(false);

  const [{ step }] = useContext(TaipeiGameContext);
  const onPointerDown = () => {
    if (step === TaipeiGameStepType.unset) {
      console.log('sound');
      setShake(true);
      setTimeout(() => {
        setShake(false);
      }, 1000);
    }
  };
  return (
    <div className='Picture'>
      <div onPointerDown={onPointerDown} className={twMerge(shake && 'animate-shake')}>
        <div />
      </div>
    </div>
  );
});
export default Picture;
