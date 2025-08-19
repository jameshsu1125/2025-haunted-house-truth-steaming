import Cistern from '@/components/cistern';
import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import OnloadProvider from 'lesca-react-onload';
import { memo, useContext, useEffect, useState } from 'react';
import Choose from './choose';
import { HomeContext, HomeState, HomeStepType, THomeState } from './config';
import './index.less';
import Landing from './landing';

const Home = memo(() => {
  const [, setContext] = useContext(Context);
  const [state, setState] = useState<THomeState>(HomeState);

  useEffect(() => {
    setContext({ type: ActionType.LoadingProcess, state: { enabled: true } });
  }, []);

  useEffect(() => {
    const { step, smokeImageLoaded, steamImageLoaded, videoLoadedIndex } = state;
    if (
      step === HomeStepType.loaded &&
      smokeImageLoaded &&
      steamImageLoaded &&
      videoLoadedIndex === 3
    ) {
      setContext({ type: ActionType.LoadingProcess, state: { enabled: false } });
      setState((S) => ({ ...S, step: HomeStepType.fadeIn }));
    }
  }, [state]);

  return (
    <HomeContext.Provider value={[state, setState]}>
      <OnloadProvider
        onload={() => {
          setState((S) => ({ ...S, step: HomeStepType.loaded }));
        }}
      >
        <div className='Home'>
          <Cistern>
            <Landing />
            <Choose />
          </Cistern>
        </div>
      </OnloadProvider>
    </HomeContext.Provider>
  );
});

export default Home;
