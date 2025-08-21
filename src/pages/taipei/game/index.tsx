import CoverNode from '@/components/coverNode';
import { memo, useContext, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { TaipeiContext, TaipeiPageType } from '../config';
import Background from './background';
import Clear from './clear';
import { TaipeiGameContext, TaipeiGameState, TaipeiGameStepType } from './config';
import Countdown from './countdown';
import Dialog from './dialog';
import Dirt from './dirt';
import End from './end';
import Error from './error';
import './index.less';
import Picture from './picture';
import Vacuum from './vacuum';
import useTween from 'lesca-use-tween';
import { ActionType, IReactProps } from '@/settings/type';
import { Context } from '@/settings/constant';
import { PAGE } from '@/settings/config';

const TweenerProvider = memo(({ children }: IReactProps) => {
  const [, setContext] = useContext(Context);
  const [{ page }] = useContext(TaipeiContext);
  const [{ step }] = useContext(TaipeiGameContext);

  const [style, setStyle] = useTween({ opacity: 1 });

  useEffect(() => {
    if (page === TaipeiPageType.game && step === TaipeiGameStepType.fadeOut) {
      setStyle(
        { opacity: 0 },
        {
          onEnd: () => setContext({ type: ActionType.Page, state: PAGE.result }),
        },
      );
    }
  }, [step, page]);

  return (
    <div
      className={twMerge('Game', page === TaipeiPageType.game ? 'visible' : 'invisible')}
      style={style}
    >
      {children}
    </div>
  );
});

const Game = memo(() => {
  const value = useState(TaipeiGameState);
  const [{ step }] = value;
  return (
    <TaipeiGameContext.Provider value={value}>
      <TweenerProvider>
        <CoverNode>
          <Background />
          <Picture />
          {step < TaipeiGameStepType.clear && <Dirt />}
          {step < TaipeiGameStepType.dirt && <Error />}
          {step < TaipeiGameStepType.start && <Dialog />}
          {step <= TaipeiGameStepType.dirt2Clear && <Vacuum />}
          {step < TaipeiGameStepType.end && <Clear />}
          <End />
        </CoverNode>
        {step <= TaipeiGameStepType.start && <Countdown />}
      </TweenerProvider>
    </TaipeiGameContext.Provider>
  );
});
export default Game;
