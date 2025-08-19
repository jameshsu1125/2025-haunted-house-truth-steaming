import { memo, useEffect } from 'react';
import './index.less';

const Background = memo(() => {
  useEffect(() => {}, []);
  return (
    <div className='Background'>
      <div className='ghost'>
        <div />
      </div>
      <div className='image' />
      <div className='light'>
        <div />
      </div>
    </div>
  );
});
export default Background;
