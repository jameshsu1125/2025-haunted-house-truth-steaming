import { memo, useEffect } from 'react';
import ReactPlayer from 'react-player';
import videoURL from './img/smoke.mp4';
import './index.less';

const Clear = memo(() => {
  useEffect(() => {}, []);
  return (
    <div className='Clear'>
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
