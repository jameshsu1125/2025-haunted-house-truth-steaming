import { memo, useEffect } from 'react';
import './index.less';

const Marker = memo(() => {
  useEffect(() => {}, []);
  return (
    <div className='Marker'>
      <div className='marker'>
        <div />
      </div>
      <div className='text'>
        <div />
      </div>
    </div>
  );
});
export default Marker;
