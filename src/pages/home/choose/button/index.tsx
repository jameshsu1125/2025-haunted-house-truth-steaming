import { memo, useEffect } from 'react';
import './index.less';

const Button = memo(() => {
  useEffect(() => {}, []);
  return (
    <div className='Button'>
      <div className='button'>
        <div>
          <div />
        </div>
      </div>
    </div>
  );
});
export default Button;
