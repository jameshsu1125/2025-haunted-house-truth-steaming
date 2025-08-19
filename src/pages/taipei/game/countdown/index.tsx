import { memo, useEffect } from 'react';
import './index.less';

const Countdown = memo(() => {
  useEffect(() => {}, []);
  return (
    <div className='Countdown'>
      <div className='ico'>
        <div />
      </div>
      <div className='text'>59</div>
    </div>
  );
});
export default Countdown;
