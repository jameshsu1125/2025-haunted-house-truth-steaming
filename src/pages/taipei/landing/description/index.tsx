import { memo, useEffect } from 'react';
import './index.less';

const Line = memo(({ index }: { index: number }) => {
  useEffect(() => {}, [index]);
  return (
    <div>
      <div />
    </div>
  );
});

const Description = memo(() => {
  useEffect(() => {}, []);
  return (
    <div className='Description'>
      {[...new Array(5).keys()].map((index) => (
        <Line key={index} index={index} />
      ))}
    </div>
  );
});
export default Description;
