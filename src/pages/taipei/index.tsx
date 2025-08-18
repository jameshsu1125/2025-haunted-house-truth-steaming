import OnloadProvider from 'lesca-react-onload';
import { memo, useState } from 'react';
import { TaipeiContext, TaipeiState, TaipeiStepType } from './config';
import './index.less';

const Taipei = memo(() => {
  const [state, setState] = useState(TaipeiState);
  return (
    <TaipeiContext.Provider value={[state, setState]}>
      <OnloadProvider
        onload={() => {
          setState((S) => ({ ...S, step: TaipeiStepType.loaded }));
        }}
      >
        <div className='Taipei'></div>
      </OnloadProvider>
    </TaipeiContext.Provider>
  );
});

export default Taipei;
