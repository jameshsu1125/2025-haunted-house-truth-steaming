import { Context } from '@/settings/constant';
import OnloadProvider from 'lesca-react-onload';
import { memo, useContext, useEffect, useState } from 'react';
import Background from './background';
import { HomeContext, HomeState, HomeStepType, THomeState } from './config';
import Header from './header';
import './index.less';
import Logo from './logo';
import { ActionType } from '@/settings/type';

const Home = memo(() => {
  const [, setContext] = useContext(Context);
  const [state, setState] = useState<THomeState>(HomeState);

  useEffect(() => {
    setContext({ type: ActionType.LoadingProcess, state: { enabled: true } });
  }, []);

  return (
    <HomeContext.Provider value={[state, setState]}>
      <OnloadProvider
        onload={() => {
          setContext({ type: ActionType.LoadingProcess, state: { enabled: false } });
          setState((S) => ({ ...S, step: HomeStepType.fadeIn }));
        }}
      >
        <div className='Home'>
          <Background />
          <Logo />
          <Header />
        </div>
      </OnloadProvider>
    </HomeContext.Provider>
  );
});

export default Home;
