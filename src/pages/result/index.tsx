import Cistern from '@/components/cistern';
import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import Gtag from 'lesca-gtag';
import OnloadProvider from 'lesca-react-onload';
import { memo, useContext, useEffect, useState } from 'react';
import Logo from '../home/landing/logo';
import Button from './button';
import { ResultContext, ResultState } from './config';
import Folder from './folder';
import Forms from './forms';
import './index.less';
import Info from './info';

const Result = memo(() => {
  const [{ location }, setContext] = useContext(Context);
  const [state, setState] = useState(ResultState);

  useEffect(() => {
    if (location) setContext({ type: ActionType.Solve, state: { [location]: true } });
  }, [location]);

  useEffect(() => {
    setContext({ type: ActionType.LoadingProcess, state: { enabled: true } });
    Gtag.pv(`Result-${location}`);
  }, []);

  return (
    <ResultContext.Provider value={[state, setState]}>
      <Cistern>
        <OnloadProvider
          onload={() => {
            setState((S) => ({ ...S, step: 1 }));
            setContext({ type: ActionType.LoadingProcess, state: { enabled: false } });
          }}
        >
          <div className='Result'>
            <Folder />
            <Logo />
            <Info />
            <Forms />
            <Button />
          </div>
        </OnloadProvider>
      </Cistern>
    </ResultContext.Provider>
  );
});
export default Result;
