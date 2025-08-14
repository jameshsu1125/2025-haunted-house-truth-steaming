import { memo, useEffect } from 'react';
import './index.less';

const Body = memo(() => {
  useEffect(() => {}, []);
  return (
    <div className='body'>
      <div>
        <div />
      </div>
      <div>
        <div />
      </div>
    </div>
  );
});
export default Body;
