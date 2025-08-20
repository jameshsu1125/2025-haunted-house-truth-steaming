import CoverNode from '@/components/coverNode';
import { memo, useContext, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { TaipeiContext, TaipeiPageType } from '../config';
import Background from './background';
import { TaipeiGameContext, TaipeiGameState } from './config';
import Countdown from './countdown';
import Dirt from './dirt';
import './index.less';
import Picture from './picture';
import Dialog from './dialog';
import Clear from './clear';
import End from './end';

const Game = memo(() => {
  const [{ page }] = useContext(TaipeiContext);
  const value = useState(TaipeiGameState);

  return (
    <TaipeiGameContext.Provider value={value}>
      <div className={twMerge('Game', page === TaipeiPageType.game ? 'visible' : 'invisible')}>
        <CoverNode>
          <Background />
          <Picture />
          <Dirt />
          <Dialog />
          <Clear />
          <End />
        </CoverNode>
        <Countdown />
      </div>
    </TaipeiGameContext.Provider>
  );
});
export default Game;
