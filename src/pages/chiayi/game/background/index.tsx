import { IReactProps } from '@/settings/type';
import useTween from 'lesca-use-tween';
import { memo, useContext, useEffect } from 'react';
import { ChiayiContext, ChiayiPageType } from '../../config';
import { ChiayiGameContext, ChiayiGameStepType } from '../config';
import './index.less';

const TweenerProvider = memo(({ children, className }: IReactProps & { className: string }) => {
  const [{ page }] = useContext(ChiayiContext);
  const [{ step }] = useContext(ChiayiGameContext);

  const [style, setStyle] = useTween({ opacity: 0 });

  useEffect(() => {
    if (page === ChiayiPageType.game && step >= ChiayiGameStepType.unset) {
      setStyle({ opacity: 1 });
    }
  }, [page, step]);

  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
});

const Background = memo(() => {
  return (
    <TweenerProvider className='Background'>
      <div className='image' />
      <div className='light' />
    </TweenerProvider>
  );
});
export default Background;
