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
import Clear from '@/components/clear';
import End from '@/components/end';
import { fadeOutSound, playSound } from '@/components/sounds';
import Gtag from 'lesca-gtag';

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

  useEffect(() => {
    if (page === ChiayiPageType.game) {
      if (step === ChiayiGameStepType.clear) {
        fadeOutSound('gamingBGM');
        Gtag.event('Chiayi', 'clear');
      }
      if (step === ChiayiGameStepType.unset) {
        fadeOutSound('introBGM');
        playSound('gamingBGM');
      }
    }
  }, [step, page]);

  return (
    <ChiayiGameContext.Provider value={value}>
      <TweenerProvider>
        <CoverNode>
          <Background />
          {step <= ChiayiGameStepType.bacteria && <F25 />}
          {step <= ChiayiGameStepType.dialog && <Dialog />}
          {step <= ChiayiGameStepType.bacteriaFadeOut && <Bacteria />}
          {step <= ChiayiGameStepType.resultFadeOut && <Result />}
          {step <= ChiayiGameStepType.clear && (
            <Clear
              visible={step === ChiayiGameStepType.clear}
              active={step === ChiayiGameStepType.clear}
              onEnd={() => setState((S) => ({ ...S, step: ChiayiGameStepType.end }))}
            />
          )}
          <End
            onPointerDown={() => setState((S) => ({ ...S, step: ChiayiGameStepType.fadeOut }))}
            onFadeOut={() => setState((S) => ({ ...S, step: ChiayiGameStepType.fadeOut }))}
            visible={step === ChiayiGameStepType.end}
          />
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
