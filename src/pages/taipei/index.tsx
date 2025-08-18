import OnloadProvider from 'lesca-react-onload';
import { memo, useContext, useEffect, useState } from 'react';
import { TaipeiContext, TaipeiState, TaipeiStepType } from './config';
import './index.less';
import Landing from './landing';
import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import Cistern from '@/components/cistern';

const Taipei = memo(() => {
  const [, setContext] = useContext(Context);
  const [state, setState] = useState(TaipeiState);

  const { step } = state;

  useEffect(() => {
    setContext({ type: ActionType.LoadingProcess, state: { enabled: true } });
  }, []);

  return (
    <TaipeiContext.Provider value={[state, setState]}>
      <OnloadProvider
        onload={() => {
          setState((S) => ({ ...S, step: TaipeiStepType.loaded }));
          setContext({ type: ActionType.LoadingProcess, state: { enabled: false } });
        }}
      >
        <div className='Taipei'>
          <Cistern>{step <= TaipeiStepType.loaded && <Landing />}</Cistern>
        </div>
      </OnloadProvider>
    </TaipeiContext.Provider>
  );
});

export default Taipei;
