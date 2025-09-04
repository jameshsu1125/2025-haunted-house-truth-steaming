import { memo, useContext, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
import { HomeContext, HomePageType, HomeStepType } from '../config';
import Background from './background';
import Header from './header';
import Logo from './logo';
import Reminder from './reminder';
import Gtag from 'lesca-gtag';

const Landing = memo(() => {
  const [{ page, step }] = useContext(HomeContext);

  useEffect(() => {
    if (page === HomePageType.Landing && step === HomeStepType.Loaded) {
      Gtag.pv('Home');
    }
  }, [page, step]);

  return (
    <div
      className={twMerge(
        'Landing absolute h-full w-full overflow-hidden',
        page === HomePageType.Landing ? 'visible' : 'invisible',
      )}
    >
      <Background />
      <Logo />
      <Header />
      {step === HomeStepType.Reminder && <Reminder />}
    </div>
  );
});
export default Landing;
