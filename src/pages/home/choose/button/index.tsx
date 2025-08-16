import { memo, useContext, useEffect } from 'react';
import './index.less';
import { HomeContext, HomePageType, HomeStepType } from '../../config';
import useTween from 'lesca-use-tween';

const Button = memo(() => {
  const [{ step, page }] = useContext(HomeContext);
  const [style, setStyle] = useTween({ opacity: 0, scale: 2 });

  useEffect(() => {
    if (step >= HomeStepType.fadeIn && page === HomePageType.choose) {
      setStyle({ opacity: 1, scale: 1 }, { duration: 500, delay: 1500 });
    }
  }, [page, step]);

  return (
    <div className='Button'>
      <div className='button' style={style}>
        <div>
          <div />
        </div>
      </div>
    </div>
  );
});
export default Button;
