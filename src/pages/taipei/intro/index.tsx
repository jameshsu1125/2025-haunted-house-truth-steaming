import CoverNode from '@/components/coverNode';
import { memo, useContext, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { TaipeiContext, TaipeiPageType } from '../config';
import Background from './background';
import Button from './button';
import { TaipeiIntroContext, TaipeiIntroState } from './config';
import Dialog from './dialog';
import './index.less';

const Intro = memo(() => {
  const [{ page }] = useContext(TaipeiContext);
  const value = useState(TaipeiIntroState);

  return (
    <TaipeiIntroContext.Provider value={value}>
      <div className={twMerge('Intro', page === TaipeiPageType.intro ? 'visible' : 'invisible')}>
        <CoverNode>
          <Background />
          <Dialog />
          <Button />
        </CoverNode>
      </div>
    </TaipeiIntroContext.Provider>
  );
});
export default Intro;
