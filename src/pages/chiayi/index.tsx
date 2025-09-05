import Cistern from '@/components/cistern';
import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import OnloadProvider from 'lesca-react-onload';
import { memo, useContext, useEffect, useState } from 'react';
import { ChiayiContext, ChiayiPageType, ChiayiState, ChiayiStepType } from './config';
import Game from './game';
import './index.less';
import Intro from './intro';
import Landing from './landing';
import { playSound } from '@/components/sounds';
import Gtag from 'lesca-gtag';

const Chiayi = memo(() => {
  const [, setContext] = useContext(Context);
  const [state, setState] = useState(ChiayiState);

  useEffect(() => {
    setContext({ type: ActionType.LoadingProcess, state: { enabled: true } });

    const onFocus = () => window.location.reload();
    window.addEventListener('focus', onFocus);
    return () => {
      window.removeEventListener('focus', onFocus);
    };
  }, []);

  useEffect(() => {
    if (state.page === ChiayiPageType.landing && state.step === ChiayiStepType.loaded) {
      playSound('introBGM');
      Gtag.pv('Chiayi');
    }
  }, [state]);

  return (
    <ChiayiContext.Provider value={[state, setState]}>
      <OnloadProvider
        onload={() => {
          setState((S) => ({ ...S, step: ChiayiStepType.loaded }));
          setContext({ type: ActionType.LoadingProcess, state: { enabled: false } });
        }}
      >
        <div className='Chiayi'>
          <Cistern>
            {state.page <= ChiayiPageType.landing && <Landing />}
            {state.page <= ChiayiPageType.intro && <Intro />}
            {state.page <= ChiayiPageType.game && <Game />}
          </Cistern>
        </div>
      </OnloadProvider>
    </ChiayiContext.Provider>
  );
});

export default Chiayi;
