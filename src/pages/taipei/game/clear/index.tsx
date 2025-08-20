import { memo, useContext, useEffect } from 'react';
import ReactPlayer from 'react-player';
import videoURL from './img/smoke.mp4';
import './index.less';
import { TaipeiGameContext, TaipeiGameStepType } from '../config';
import { twMerge } from 'tailwind-merge';

const Clear = memo(() => {
  const [{ step }] = useContext(TaipeiGameContext);
  useEffect(() => {}, [step]);
  return (
    <div className={twMerge('Clear', step === TaipeiGameStepType.clear ? 'visible' : 'invisible')}>
      <div>
        <ReactPlayer src={videoURL} muted autoPlay loop={false} width={1280} height={720} />
      </div>
      <div>
        <div />
      </div>
    </div>
  );
});
export default Clear;
