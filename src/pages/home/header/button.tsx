import { memo, useEffect } from 'react';

const Button = memo(() => {
  useEffect(() => {}, []);
  return (
    <div className='button'>
      <div>
        <div>
          <div className='start' />
        </div>
      </div>
    </div>
  );
});
export default Button;
