import Container from '@/components/container';
import Effect from '@/components/effect';
import Fail from '@/components/fail';
import LoadingProcess from '@/components/loadingProcess';
import Sounds from '@/components/sounds';
import { PAGE } from '@/settings/config';
import { Context, InitialState, Reducer } from '@/settings/constant';
import '@/settings/global.css';
import { ActionType, TContext } from '@/settings/type';
import Click from 'lesca-click';
import Facebook from 'lesca-facebook-share';
import Fetcher, { contentType, formatType } from 'lesca-fetcher';
import Gtag from 'lesca-gtag';
import { Suspense, lazy, memo, useContext, useEffect, useMemo, useReducer, useState } from 'react';
import ReactDOM from 'react-dom/client';

Facebook.install(import.meta.env.VITE_FACEBOOK_ID);

Click.install();

Fetcher.install({
  hostUrl: import.meta.env.VITE_API_PATH || './api',
  contentType: contentType.JSON,
  formatType: formatType.JSON,
});

Gtag.install(import.meta.env.VITE_GTAG_ID || 'G-5GKEKPJ8M4');

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
  const [context, setContext]: TContext = useMemo(() => [state, setState], [state]);
  const [key, setKey] = useState(0);

  useEffect(() => {
    Sounds.install(() => {
      setContext({ type: ActionType.Sounds, state: { enabled: true } });
    });

    window.addEventListener('focus', () => {
      window.location.reload();
    });
  }, []);

  return (
    <div className='App m-0'>
      <Context.Provider value={[context, setContext]}>
        <Container>
          {context[ActionType.Sounds]?.enabled && <Pages key={key} />}
          <Effect display={context[ActionType.SmokeEffect]} />
          {context[ActionType.Fail]?.enabled && <Fail setKey={setKey} />}
        </Container>
        {state[ActionType.LoadingProcess]?.enabled && <LoadingProcess />}
      </Context.Provider>
    </div>
  );
};

if (document.getElementById('app')?.children.length === 0) {
  ReactDOM.createRoot(document.getElementById('app')!).render(<App />);
}
