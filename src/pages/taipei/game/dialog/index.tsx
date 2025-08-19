import { memo, useEffect } from 'react';
import './index.less';

const Dialog = memo(() => {
  useEffect(() => {}, []);
  return (
    <div className='Dialog'>
      <div className='dialog'>
        <div>
          <div>
            <div className='ctx'>
              <div className='text-0' />
              <div className='text-1' />
              <div className='text-2' />
              <div className='text-3' />
              <div className='text-4' />
              <div className='image' />
              <div className='button'>
                <div />
              </div>
              <div className='f25' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
export default Dialog;
