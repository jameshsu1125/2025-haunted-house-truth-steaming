import { memo, useContext, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { HomeContext, HomePageType } from '../config';
import Arrow from './arrow';
import Button from './button';
import { ChooseContext, ChooseState } from './config';
import Description from './description';
import Folder from './folder';
import Touch from './touch';
import Gtag from 'lesca-gtag';

const Choose = memo(() => {
  const state = useState(ChooseState);
  const [{ page }] = useContext(HomeContext);

  useEffect(() => {
    if (page === HomePageType.Choose) {
      Gtag.pv('Choose');
    }
  }, [page]);

  return (
    <ChooseContext.Provider value={state}>
      <div
        className={twMerge(
          'Choose absolute top-0 h-full w-full overflow-hidden',
          page === HomePageType.Choose ? 'visible' : 'invisible',
        )}
      >
        <Folder />
        <Description />
        <Touch />
        <Arrow />
        <Button />
      </div>
    </ChooseContext.Provider>
  );
});
export default Choose;
