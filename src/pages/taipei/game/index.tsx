import CoverNode from '@/components/coverNode';
import { memo, useContext, useState } from 'react';
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

const Game = memo(() => {
  const [{ page }] = useContext(TaipeiContext);
  const value = useState(TaipeiGameState);
  const [{ step }] = value;

  return (
    <TaipeiGameContext.Provider value={value}>
      <div className={twMerge('Game', page === TaipeiPageType.game ? 'visible' : 'invisible')}>
        <CoverNode>
          <Background />
          <Picture />
          <Dirt />
          <Error />
          {step < TaipeiGameStepType.start && <Dialog />}
          {step <= TaipeiGameStepType.dirt && <Vacuum />}
          <Clear />
          <End />
        </CoverNode>
        <Countdown />
      </div>
    </TaipeiGameContext.Provider>
  );
});
export default Game;
