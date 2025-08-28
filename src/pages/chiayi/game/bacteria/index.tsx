import { memo, useContext, useEffect } from 'react';
import './index.less';
import { twMerge } from 'tailwind-merge';
import { ChiayiContext, ChiayiPageType } from '../../config';
import { ChiayiGameContext, ChiayiGameStepType } from '../config';
import useTween from 'lesca-use-tween';
import Virus from './virus';
import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import Vacuum from './vacuum';

const Floor = memo(() => {
  const [, setContext] = useContext(Context);
  const [{ page }] = useContext(ChiayiContext);
  const [{ step }, setState] = useContext(ChiayiGameContext);
  const [style, setStyle] = useTween({ opacity: 0 });

  useEffect(() => {
    if (page === ChiayiPageType.game && step === ChiayiGameStepType.bacteria) {
      setStyle({ opacity: 1 });
      setContext({ type: ActionType.SmokeEffect, state: { enabled: true } });
    }
    if (page === ChiayiPageType.game && step === ChiayiGameStepType.fadeOut) {
      setContext({ type: ActionType.SmokeEffect, state: { enabled: false } });
      setStyle(
        { opacity: 0 },
        {
          duration: 500,
          onEnd: () => {
            setState((S) => ({ ...S, step: ChiayiGameStepType.result }));
          },
        },
      );
    }
  }, [page, step]);

  return <div style={style} className='floor' />;
});

const Bacteria = memo(() => {
  const [{ page }] = useContext(ChiayiContext);
  const [{ step }] = useContext(ChiayiGameContext);

  return (
    <div
      className={twMerge(
        'Bacteria',
        page === ChiayiPageType.game && step <= ChiayiGameStepType.bacteriaFadeOut
          ? 'visible'
          : 'invisible',
      )}
    >
      <Floor />
      <Virus />
      <Vacuum />
    </div>
  );
});
export default Bacteria;
