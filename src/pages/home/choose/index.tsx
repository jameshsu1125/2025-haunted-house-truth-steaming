import { memo, useContext, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { HomeContext, HomePageType } from '../config';
import Arrow from './arrow';
import Button from './button';
import { ChooseContext, ChooseState } from './config';
import Description from './description';
import Folder from './folder';

const Choose = memo(() => {
  const state = useState(ChooseState);
  const [{ page }] = useContext(HomeContext);

  useEffect(() => {}, []);
  return (
    <ChooseContext.Provider value={state}>
      <div
        className={twMerge(
          'Choose absolute top-0 h-full w-full overflow-hidden',
          page === HomePageType.choose ? 'visible' : 'invisible',
        )}
      >
        <Folder />
        <Description />
        <Arrow />
        <Button />
      </div>
    </ChooseContext.Provider>
  );
});
export default Choose;
