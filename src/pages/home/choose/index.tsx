import { memo, useContext, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
import { HomeContext, HomePageType } from '../config';
import Description from './description';
import Folder from './folder';
import Button from './button';
import Arrow from './arrow';

const Choose = memo(() => {
  const [{ page }] = useContext(HomeContext);
  useEffect(() => {}, []);
  return (
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
  );
});
export default Choose;
