import Cistern from '@/components/cistern';
import { playSound, stopAllSounds } from '@/components/sounds';
import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import OnloadProvider from 'lesca-react-onload';
import { memo, useContext, useEffect, useState } from 'react';
import { ZhongliContext, ZhongliPageType, ZhongliState, ZhongliStepType } from './config';
import Game from './game';
import './index.less';
import Intro from './intro';
import Landing from './landing';

const Zhongli = memo(() => {
  const [, setContext] = useContext(Context);
  const [state, setState] = useState(ZhongliState);

  useEffect(() => {
    setContext({ type: ActionType.LoadingProcess, state: { enabled: true } });
  }, []);

  useEffect(() => {
    if (state.page === ZhongliPageType.landing && state.step === ZhongliStepType.loaded) {
      stopAllSounds();
      playSound('gamingBGM');
    }
  }, [state]);

  useEffect(() => {
    if (state.step === ZhongliStepType.loaded && state.videoLoaded) {
      setContext({ type: ActionType.LoadingProcess, state: { enabled: false } });
      setState((S) => ({ ...S, step: ZhongliStepType.ready }));
    }
  }, [state.videoLoaded, state.step]);

  return (
    <ZhongliContext.Provider value={[state, setState]}>
      <OnloadProvider
        onload={() => {
          setState((S) => ({ ...S, step: ZhongliStepType.loaded }));
        }}
      >
        <div className='Zhongli'>
          <Cistern>
            {state.page <= ZhongliPageType.landing && <Landing />}
            {state.page <= ZhongliPageType.intro && <Intro />}
            {state.page <= ZhongliPageType.game && <Game />}
          </Cistern>
        </div>
      </OnloadProvider>
    </ZhongliContext.Provider>
  );
});
export default Zhongli;
