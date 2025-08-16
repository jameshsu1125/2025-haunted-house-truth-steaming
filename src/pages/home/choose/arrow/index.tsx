import { memo, useEffect } from 'react';
import './index.less';

const Arrow = memo(() => {
  useEffect(() => {}, []);
  return (
    <div className='Arrow'>
      <div className='cistern'>
        <div>
          <div />
        </div>
        <div>
          <div />
        </div>
      </div>
    </div>
  );
});
export default Arrow;
