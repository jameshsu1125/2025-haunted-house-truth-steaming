import CoverNode from '@/components/coverNode';
import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import { memo, useContext, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { TaipeiContext, TaipeiPageType } from '../config';
import Background from './background';
import Button from './button';
import { TaipeiLandingContext, TaipeiLandingState, TaipeiLandingStepType } from './config';
import Description from './description';
import './index.less';
import Marker from './marker';

const Landing = memo(() => {
  const [, setContext] = useContext(Context);
  const state = useState(TaipeiLandingState);
  const [{ page }] = useContext(TaipeiContext);

  useEffect(() => {
    if (state[0].step === TaipeiLandingStepType.entry) {
      setContext({ type: ActionType.smokeEffect, state: true });
    } else {
      setContext({ type: ActionType.smokeEffect, state: false });
    }
  }, [state[0].step]);

  return (
    <div className={twMerge('Landing', page === TaipeiPageType.landing ? 'visible' : 'invisible')}>
      <TaipeiLandingContext.Provider value={state}>
        <CoverNode align='top'>
          <Background />
          <Description />
          <Marker />
          <Button />
        </CoverNode>
      </TaipeiLandingContext.Provider>
    </div>
  );
});
export default Landing;
