import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import OnloadProvider from 'lesca-react-onload';
import { memo, useContext, useEffect, useState } from 'react';
import Logo from '../home/landing/logo';
import Button from './button';
import { ResultContext, ResultState } from './config';
import Folder from './folder';
import Forms from './forms';
import './index.less';
import Info from './info';
import Cistern from '@/components/cistern';

const Result = memo(() => {
  const [, setContext] = useContext(Context);
  const [state, setState] = useState(ResultState);

  useEffect(() => {
    setContext({ type: ActionType.LoadingProcess, state: { enabled: true } });
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
