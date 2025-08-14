import { memo, useState } from 'react';
import { HomeContext, HomeState, HomeStepType, THomeState } from './config';
import './index.less';
import OnloadProvider from 'lesca-react-onload';
import Background from './background';
import Logo from './logo';

const Home = memo(() => {
  const [state, setState] = useState<THomeState>(HomeState);

  return (
    <HomeContext.Provider value={[state, setState]}>
      <OnloadProvider
        onload={() => {
          setState((S) => ({ ...S, step: HomeStepType.fadeIn }));
        }}
      >
        <div className='Home'>
          <Background />
          <Logo />
        </div>
      </OnloadProvider>
    </HomeContext.Provider>
  );
});

export default Home;
