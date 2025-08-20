import { memo, useEffect } from 'react';
import './index.less';
import SteamText from '@/components/steamText';

const End = memo(() => {
  useEffect(() => {}, []);
  return (
    <div className='End'>
      <div>
        <div>
          <div>
            <div className='row'>
              <div className='t0' />
              <div className='t1' />
            </div>
            <div className='row justify-between'>
              <div className='c1'>
                <div className='t2' />
                <div className='t3' />
                <div className='t4' />
              </div>
              <div className='t5' />
            </div>
            <div className='steam-text'>
              <SteamText scale={0.76} noise={{ x: 50, y: 50 }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
export default End;
