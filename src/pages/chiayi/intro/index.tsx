import CoverNode from '@/components/coverNode';
import { memo, useContext, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { ChiayiContext, ChiayiPageType } from '../config';
import Background from './background';
import Button from './button';
import { ChiayiIntroContext, ChiayiIntroState } from './config';
import Dialog from './dialog';
import './index.less';

const Intro = memo(() => {
  const [{ page }] = useContext(ChiayiContext);
  const value = useState(ChiayiIntroState);

  return (
    <ChiayiIntroContext.Provider value={value}>
      <div className={twMerge('Intro', page === ChiayiPageType.intro ? 'visible' : 'invisible')}>
        <CoverNode>
          <Background />
          <Dialog />
          <Button />
        </CoverNode>
      </div>
    </ChiayiIntroContext.Provider>
  );
});
export default Intro;
