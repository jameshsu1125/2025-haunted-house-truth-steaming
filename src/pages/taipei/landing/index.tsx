import CoverNode from '@/components/coverNode';
import Effect from '@/components/effect';
import { memo, useState } from 'react';
import Background from './background';
import Button from './button';
import { TaipeiLandingContext, TaipeiLandingState } from './config';
import Description from './description';
import './index.less';
import Marker from './marker';

const Landing = memo(() => {
  const state = useState(TaipeiLandingState);

  return (
    <div className='Landing'>
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
