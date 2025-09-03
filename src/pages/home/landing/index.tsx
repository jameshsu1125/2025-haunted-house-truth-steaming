import { memo, useContext, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
import { HomeContext, HomePageType, HomeStepType } from '../config';
import Background from './background';
import Header from './header';
import Logo from './logo';
import { playSound } from '@/components/sounds';

const Landing = memo(() => {
  const [{ page, step }] = useContext(HomeContext);

  useEffect(() => {
    if (page === HomePageType.landing && step === HomeStepType.loaded) {
      playSound('homeBGM');
    }
  }, [page, step]);

  return (
    <div
      className={twMerge(
        'Landing absolute h-full w-full overflow-hidden',
        page === HomePageType.landing ? 'visible' : 'invisible',
      )}
    >
      <Background />
      <Logo />
      <Header />
    </div>
  );
});
export default Landing;
