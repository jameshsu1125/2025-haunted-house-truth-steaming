import SmokeEffect from 'pixijs-shader-smoke';
import { memo, useEffect, useRef } from 'react';
import './index.less';

const Effect = memo(() => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      new SmokeEffect({ container: ref.current, height: '4.0' });
    }
  }, []);

  return <div className='Effect' ref={ref} />;
});
export default Effect;
