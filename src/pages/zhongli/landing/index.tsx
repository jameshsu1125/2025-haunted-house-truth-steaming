import CoverNode from '@/components/coverNode';
import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import { memo, useContext, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { ZhongliContext, ZhongliPageType } from '../config';
import Background from './background';
import Button from './button';
import { ZhongliLandingContext, ZhongliLandingState, ZhongliLandingStepType } from './config';
import Description from './description';
import './index.less';
import Marker from './marker';

const Landing = memo(() => {
  const [, setContext] = useContext(Context);
  const state = useState(ZhongliLandingState);
  const [{ page }] = useContext(ZhongliContext);

  useEffect(() => {
    if (state[0].step === ZhongliLandingStepType.entry) {
      setContext({ type: ActionType.SmokeEffect, state: true });
    } else {
      setContext({ type: ActionType.SmokeEffect, state: false });
    }
  }, [state[0].step]);

  return (
    <div className={twMerge('Landing', page === ZhongliPageType.landing ? 'visible' : 'invisible')}>
      <ZhongliLandingContext.Provider value={state}>
        <CoverNode align='center'>
          <Background />
          <Description />
          <Marker />
          <Button />
        </CoverNode>
      </ZhongliLandingContext.Provider>
    </div>
  );
});
export default Landing;
