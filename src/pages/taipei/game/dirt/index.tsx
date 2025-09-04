import useTween from 'lesca-use-tween';
import { memo, useContext, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
import { TaipeiContext, TaipeiPageType } from '../../config';
import { TaipeiGameContext, TaipeiGameStepType } from '../config';
import './index.less';
import Gtag from 'lesca-gtag';

const Dirt = memo(() => {
  const [{ page }] = useContext(TaipeiContext);
  const [style, setStyle] = useTween({ opacity: 0 });

  const [{ step, clearTimes }, setState] = useContext(TaipeiGameContext);
  const onPointerDown = () => {
    if (step === TaipeiGameStepType.unset) {
      setState((S) => ({ ...S, step: TaipeiGameStepType.dialog }));
      Gtag.event('Taipei', 'dirt');
    }
  };

  useEffect(() => {
    if (page !== TaipeiPageType.game) return;
    setStyle({ opacity: 1 }, { duration: 500, onEnd: () => {} });
  }, [page]);

  return (
    <div className='Dirt' style={style}>
      <div
        onPointerDown={onPointerDown}
        className={twMerge(
          clearTimes === 0
            ? 'opacity-100'
            : clearTimes === 1
              ? 'opacity-70'
              : clearTimes === 2
                ? 'opacity-35'
                : 'opacity-0',
        )}
      >
        <div />
      </div>
    </div>
  );
});
export default Dirt;
