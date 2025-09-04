import Cistern from '@/components/cistern';
import { PAGE } from '@/settings/config';
import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import OnloadProvider from 'lesca-react-onload';
import { memo, useContext, useEffect, useState } from 'react';
import Choose from './choose';
import { HomeContext, HomePageType, HomeState, HomeStepType, THomeState } from './config';
import './index.less';
import Landing from './landing';

const Home = memo(() => {
  const [{ redirect }, setContext] = useContext(Context);
  const [state, setState] = useState<THomeState>(HomeState);

  useEffect(() => {
    if (redirect && redirect.enabled && state.step === HomeStepType.Loaded) {
      const { category, page } = redirect;
      if (page && page !== PAGE.home) {
        setContext({ type: ActionType.Page, state: page });
      }

      if (category) {
        if (Object.values(HomePageType).includes(category as unknown as HomePageType)) {
          setState((S) => ({ ...S, page: category as HomePageType }));
        }
      }

      setContext({ type: ActionType.Redirect, state: { enabled: false } });
    }
  }, [redirect, state.step]);

  useEffect(() => {
    if (state.page === HomePageType.Landing) {
      setContext({ type: ActionType.SmokeEffect, state: true });
    } else {
      setContext({ type: ActionType.SmokeEffect, state: false });
    }
  }, [state.page]);

  useEffect(() => {
    setContext({ type: ActionType.LoadingProcess, state: { enabled: true } });
  }, []);

  useEffect(() => {
    const { step, smokeImageLoaded, steamImageLoaded, videoLoadedIndex } = state;
    if (
      step === HomeStepType.Loaded &&
      smokeImageLoaded &&
      steamImageLoaded &&
      videoLoadedIndex === 3
    ) {
      setContext({ type: ActionType.LoadingProcess, state: { enabled: false } });
      setState((S) => ({ ...S, step: HomeStepType.Reminder }));
    }
  }, [state]);

  return (
    <HomeContext.Provider value={[state, setState]}>
      <OnloadProvider
        onload={() => {
          setState((S) => ({ ...S, step: HomeStepType.Loaded }));
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
