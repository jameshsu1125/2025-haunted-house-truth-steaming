import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import OnloadProvider from 'lesca-react-onload';
import { memo, useContext, useEffect, useState } from 'react';
import Logo from '../home/landing/logo';
import Button from './button';
import { ResultContext, ResultState } from './config';
import Folder from './folder';
import './index.less';
import Forms from './forms';

const Result = memo(() => {
  const [, setContext] = useContext(Context);
  const [state, setState] = useState(ResultState);

  useEffect(() => {
    setContext({ type: ActionType.LoadingProcess, state: { enabled: true } });
  }, []);

  return (
    <ResultContext.Provider value={[state, setState]}>
      <OnloadProvider
        onload={() => {
          setState((S) => ({ ...S, step: 1 }));
          setContext({ type: ActionType.LoadingProcess, state: { enabled: false } });
        }}
      >
        <div className='Result'>
          <Folder />
          <Logo />
          <Forms />
          <Button />
        </div>
      </OnloadProvider>
    </ResultContext.Provider>
  );
});
export default Result;
