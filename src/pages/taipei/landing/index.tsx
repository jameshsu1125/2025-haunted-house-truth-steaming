import CoverNode from '@/components/coverNode';
import Effect from '@/components/effect';
import { memo, useContext, useState } from 'react';
import Background from './background';
import Button from './button';
import { TaipeiLandingContext, TaipeiLandingState } from './config';
import Description from './description';
import './index.less';
import Marker from './marker';
import { TaipeiContext, TaipeiPageType } from '../config';
import { twMerge } from 'tailwind-merge';

const Landing = memo(() => {
  const state = useState(TaipeiLandingState);
  const [{ page }] = useContext(TaipeiContext);

  return (
    <div className={twMerge('Landing', page === TaipeiPageType.landing ? 'visible' : 'invisible')}>
      <TaipeiLandingContext.Provider value={state}>
        <CoverNode align='top'>
          <Background />
          <Effect />
          <Description />
          <Marker />
          <Button />
        </CoverNode>
      </TaipeiLandingContext.Provider>
    </div>
  );
});
export default Landing;
