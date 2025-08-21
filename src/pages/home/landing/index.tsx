import { memo, useContext } from 'react';
import { twMerge } from 'tailwind-merge';
import { HomeContext, HomePageType } from '../config';
import Background from './background';
import Header from './header';
import Logo from './logo';

const Landing = memo(() => {
  const [{ page }] = useContext(HomeContext);

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
