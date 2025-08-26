import Countdown from '@/components/countdown';
import CoverNode from '@/components/coverNode';
import { PAGE } from '@/settings/config';
import { Context } from '@/settings/constant';
import { ActionType, IReactProps } from '@/settings/type';
import useTween from 'lesca-use-tween';
import { memo, useContext, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { ZhongliContext, ZhongliPageType, ZhongliState } from '../config';
import Background from './background';
import Clear from './clear';
import { ZhongliGameContext, ZhongliGameState, ZhongliGameStepType } from './config';
import Dialog from './dialog';
import End from './end';
import './index.less';
import UnderBed from './underBed';

const TweenerProvider = memo(({ children }: IReactProps) => {
  const [, setContext] = useContext(Context);
  const [{ page }, setState] = useContext(ZhongliContext);
  const [{ step }, setGameState] = useContext(ZhongliGameContext);
  const [style, setStyle] = useTween({ opacity: 1 });

  useEffect(() => {
    if (page === ZhongliPageType.game && step === ZhongliGameStepType.fadeOut) {
      setStyle(
        { opacity: 0 },
        {
          onEnd: () => {
            setState(ZhongliState);
            setGameState(ZhongliGameState);
            setContext({ type: ActionType.Page, state: PAGE.result });
          },
        },
      );
    }
  }, [step, page]);

  return (
    <div
      className={twMerge('Game', page === ZhongliPageType.game ? 'visible' : 'invisible')}
      style={style}
    >
      {children}
    </div>
  );
});

const Game = memo(() => {
  const value = useState(ZhongliGameState);
  const [{ page }] = useContext(ZhongliContext);
  const [{ step }] = value;
  return (
    <ZhongliGameContext.Provider value={value}>
      <TweenerProvider>
        <CoverNode>
          <Background />
          {step <= ZhongliGameStepType.dialog && <Dialog />}
          {step <= ZhongliGameStepType.dirt2Clear && <UnderBed />}
          {step <= ZhongliGameStepType.clear && <Clear />}
          <End />
        </CoverNode>
        {page === ZhongliPageType.game && step <= ZhongliGameStepType.unset && (
          <Countdown
            totalTime={30000}
            status={step === ZhongliGameStepType.unset ? 'stop' : 'stop'}
          />
        )}
      </TweenerProvider>
    </ZhongliGameContext.Provider>
  );
});
export default Game;
