import { memo, useContext, useEffect } from 'react';
import './index.less';
import { TaipeiGameContext, TaipeiGameStepType } from '../config';
import { twMerge } from 'tailwind-merge';

const Vacuum = memo(() => {
  const [{ step }] = useContext(TaipeiGameContext);
  useEffect(() => {}, []);

  return (
    <div className={twMerge('Vacuum', step === TaipeiGameStepType.dirt ? 'visible' : 'invisible')}>
      <div className='cleaner' />
    </div>
  );
});
export default Vacuum;
