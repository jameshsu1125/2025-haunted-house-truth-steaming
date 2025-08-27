import Container from '@/components/container';
import Effect from '@/components/effect';
import Fail from '@/components/fail';
import LoadingProcess from '@/components/loadingProcess';
import { PAGE } from '@/settings/config';
import { Context, InitialState, Reducer } from '@/settings/constant';
import '@/settings/global.css';
import { ActionType, TContext } from '@/settings/type';
import Click from 'lesca-click';
import Fetcher, { contentType, formatType } from 'lesca-fetcher';
import { Suspense, lazy, memo, useContext, useMemo, useReducer, useState } from 'react';
import ReactDOM from 'react-dom/client';

Click.install();

Fetcher.install({
  hostUrl: import.meta.env.VITE_API_PATH || './api',
  contentType: contentType.JSON,
  formatType: formatType.JSON,
});

if (import.meta.env.VITE_MOCKING === 'true') {
  import('@/mocks/browser').then((e) => {
    e.worker.start({ serviceWorker: { url: './mockServiceWorker.js' } });
  });
}

const Pages = memo(() => {
  const [context] = useContext(Context);
  const page = context[ActionType.Page];

  const Page = useMemo(() => {
    const [target] = Object.values(PAGE).filter((data) => data === page);
    if (target) {
      const Element = lazy(() => import(`./${target}/index.tsx`));
      return (
        <Suspense fallback=''>
          <Element />
        </Suspense>
      );
    }
    return null;
  }, [page]);

  return Page;
});

const App = () => {
  const [state, setState] = useReducer(Reducer, InitialState);
  const value: TContext = useMemo(() => [state, setState], [state]);
  const [key, setKey] = useState(0);

  return (
    <div className='App m-0'>
      <Context.Provider {...{ value }}>
        <Container>
          <Pages key={key} />
          <Effect display={state[ActionType.SmokeEffect]} />
          {state[ActionType.Fail]?.enabled && <Fail setKey={setKey} />}
        </Container>
        {state[ActionType.LoadingProcess]?.enabled && <LoadingProcess />}
      </Context.Provider>
    </div>
  );
};

if (document.getElementById('app')?.children.length === 0) {
  ReactDOM.createRoot(document.getElementById('app')!).render(<App />);
}
