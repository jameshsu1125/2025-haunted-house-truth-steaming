import CoverNode from '@/components/coverNode';
import { memo, useContext, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { ZhongliContext, ZhongliPageType } from '../config';
import Background from './background';
import Button from './button';
import { ZhongliIntroContext, ZhongliIntroState } from './config';
import Dialog from './dialog';
import './index.less';

const Intro = memo(() => {
  const [{ page }] = useContext(ZhongliContext);
  const value = useState(ZhongliIntroState);

  return (
    <ZhongliIntroContext.Provider value={value}>
      <div className={twMerge('Intro', page === ZhongliPageType.intro ? 'visible' : 'invisible')}>
        <CoverNode>
          <Background />
          <Dialog />
          <Button />
        </CoverNode>
      </div>
    </ZhongliIntroContext.Provider>
  );
});
export default Intro;
