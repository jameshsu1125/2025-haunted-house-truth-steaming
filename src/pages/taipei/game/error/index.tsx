import { memo, useContext, useEffect } from 'react';
import './index.less';
import { TaipeiGameContext } from '../config';
import useTween from 'lesca-use-tween';

const Error = memo(() => {
  const [style, setStyle] = useTween({ opacity: 0 });
  const [{ isError }] = useContext(TaipeiGameContext);

  useEffect(() => {
    if (isError) {
      setStyle({ opacity: 1 }, 300);
    }
  }, [isError]);

  return <div className='Error' style={style} />;
});
export default Error;
