import Countdown from '@/components/countdown';
import CoverNode from '@/components/coverNode';
import { PAGE } from '@/settings/config';
import { Context } from '@/settings/constant';
import { ActionType, IReactProps } from '@/settings/type';
import useTween from 'lesca-use-tween';
import { memo, useContext, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { ChiayiContext, ChiayiPageType, ChiayiState } from '../config';
import Background from './background';
import Bacteria from './bacteria';
import { ChiayiGameContext, ChiayiGameState, ChiayiGameStepType } from './config';
import Dialog from './dialog';
import F25 from './f25';
import './index.less';
import Result from './result';

const TweenerProvider = memo(({ children }: IReactProps) => {
  const [, setContext] = useContext(Context);
  const [{ page }, setState] = useContext(ChiayiContext);
  const [{ step }, setGameState] = useContext(ChiayiGameContext);
  const [style, setStyle] = useTween({ opacity: 1 });

  useEffect(() => {
    if (page === ChiayiPageType.game && step === ChiayiGameStepType.fadeOut) {
      setStyle(
        { opacity: 0 },
        {
          onEnd: () => {
            setState(ChiayiState);
            setGameState(ChiayiGameState);
            setContext({ type: ActionType.Page, state: PAGE.result });
          },
        },
      );
    }
  }, [step, page]);

  return (
    <div
      className={twMerge('Game', page === ChiayiPageType.game ? 'visible' : 'invisible')}
      style={style}
    >
      {children}
    </div>
  );
});

const Game = memo(() => {
  const value = useState(ChiayiGameState);
  const [{ step }, setState] = value;
  const [{ page }] = useContext(ChiayiContext);
  return (
    <ChiayiGameContext.Provider value={value}>
      <TweenerProvider>
        <CoverNode>
          <Background />
          {step <= ChiayiGameStepType.bacteria && <F25 />}
          {step <= ChiayiGameStepType.dialog && <Dialog />}
          {step <= ChiayiGameStepType.bacteria && <Bacteria />}
          {step <= ChiayiGameStepType.resultFadeOut && <Result />}
        </CoverNode>
        {page === ChiayiPageType.game && step <= ChiayiGameStepType.bacteria && (
          <Countdown
            totalTime={30000}
            status={step === ChiayiGameStepType.bacteria ? 'start' : 'stop'}
            needFail={false}
            onGameOver={() => {
              setState((S) => ({ ...S, step: ChiayiGameStepType.bacteriaFadeOut }));
            }}
          />
        )}
      </TweenerProvider>
    </ChiayiGameContext.Provider>
  );
});
export default Game;
