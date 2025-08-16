import { memo, useContext, useEffect } from 'react';
import './index.less';
import { HomeContext } from '../../config';
import { twMerge } from 'tailwind-merge';

const Text = memo(({ index }: { index: number }) => {
  return (
    <div className={twMerge('text', `text-${index}`)}>
      <div>
        <div />
      </div>
      <div>
        <div />
      </div>
    </div>
  );
});

const Description = memo(() => {
  const [{ chooseIndex }] = useContext(HomeContext);
  useEffect(() => {}, []);
  return (
    <div className='Description'>
      <Text index={chooseIndex} />
    </div>
  );
});

export default Description;
