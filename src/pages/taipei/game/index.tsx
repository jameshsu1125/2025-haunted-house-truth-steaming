import Clear from '@/components/clear';
import Countdown from '@/components/countdown';
import CoverNode from '@/components/coverNode';
import { PAGE } from '@/settings/config';
import { Context } from '@/settings/constant';
import { ActionType, IReactProps } from '@/settings/type';
import useTween from 'lesca-use-tween';
import { memo, useContext, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { TaipeiContext, TaipeiPageType, TaipeiState } from '../config';
import Background from './background';
import { TaipeiGameContext, TaipeiGameState, TaipeiGameStepType } from './config';
import Dialog from './dialog';
import Dirt from './dirt';
import Error from './error';
import './index.less';
import Picture from './picture';
import Vacuum from './vacuum';
import End from '@/components/end';

const TweenerProvider = memo(({ children }: IReactProps) => {
  const [, setContext] = useContext(Context);
  const [{ page }, setState] = useContext(TaipeiContext);
  const [{ step }, setGameState] = useContext(TaipeiGameContext);

  const [style, setStyle] = useTween({ opacity: 1 });

  useEffect(() => {
    if (page === TaipeiPageType.game && step === TaipeiGameStepType.fadeOut) {
      setStyle(
        { opacity: 0 },
        {
          onEnd: () => {
            setContext({ type: ActionType.Page, state: PAGE.result });
            setState(TaipeiState);
            setGameState(TaipeiGameState);
          },
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
  const [{ page }] = useContext(TaipeiContext);
  const value = useState(TaipeiGameState);
  const [{ step }, setState] = value;
  return (
    <TaipeiGameContext.Provider value={value}>
      <TweenerProvider>
        <CoverNode>
          <Background />
          <Picture />
          {step < TaipeiGameStepType.clear && <Dirt />}
          {step < TaipeiGameStepType.dirt && <Error />}
          {step <= TaipeiGameStepType.dialog && <Dialog />}
          {step <= TaipeiGameStepType.dirt2Clear && <Vacuum />}
          {step < TaipeiGameStepType.end && (
            <Clear
              active={step === TaipeiGameStepType.clear}
              visible={step === TaipeiGameStepType.clear}
              onEnd={() => setState((S) => ({ ...S, step: TaipeiGameStepType.end }))}
            />
          )}
          <End
            onPointerDown={() => setState((S) => ({ ...S, step: TaipeiGameStepType.fadeOut }))}
            onFadeOut={() => setState((S) => ({ ...S, step: TaipeiGameStepType.fadeOut }))}
            visible={step === TaipeiGameStepType.end}
          />
        </CoverNode>
        {step <= TaipeiGameStepType.unset && (
          <Countdown status={page === TaipeiPageType.game ? 'start' : 'stop'} totalTime={60000} />
        )}
      </TweenerProvider>
    </TaipeiGameContext.Provider>
  );
});
export default Game;
