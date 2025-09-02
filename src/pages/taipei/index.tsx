import Cistern from '@/components/cistern';
import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import OnloadProvider from 'lesca-react-onload';
import { memo, useContext, useEffect, useState } from 'react';
import { TaipeiContext, TaipeiPageType, TaipeiState, TaipeiStepType } from './config';
import Game from './game';
import './index.less';
import Intro from './intro';
import Landing from './landing';
import { playSound, stopAllSounds } from '@/components/sounds';

const Taipei = memo(() => {
  const [, setContext] = useContext(Context);
  const [state, setState] = useState(TaipeiState);

  useEffect(() => {
    stopAllSounds();
    setContext({ type: ActionType.LoadingProcess, state: { enabled: true } });
  }, []);

  useEffect(() => {
    if (state.page === TaipeiPageType.landing && state.step === TaipeiStepType.loaded) {
      stopAllSounds();
      playSound('taipeiBGM');
    }
  }, [state]);

  return (
    <TaipeiContext.Provider value={[state, setState]}>
      <OnloadProvider
        onload={() => {
          setState((S) => ({ ...S, step: TaipeiStepType.loaded }));
          setContext({ type: ActionType.LoadingProcess, state: { enabled: false } });
        }}
      >
        <div className='Taipei'>
          <Cistern>
            {state.page <= TaipeiPageType.landing && <Landing />}
            {state.page <= TaipeiPageType.intro && <Intro />}
            {state.page <= TaipeiPageType.game && <Game />}
          </Cistern>
        </div>
      </OnloadProvider>
    </TaipeiContext.Provider>
  );
});

export default Taipei;
