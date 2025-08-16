import useTween from 'lesca-use-tween';
import { memo, useEffect } from 'react';
import './index.less';

const Line = memo(({ index }: { index: number }) => {
  const [style, setStyle] = useTween({ opacity: 0, y: 50 });
  useEffect(() => {
    setStyle({ opacity: 1, y: 0 }, { delay: 300 + 100 * index, duration: 500 });
  }, []);
  return (
    <div style={style}>
      <div />
    </div>
  );
});

const Text = memo(() => (
  <div className={'text'}>
    {[...new Array(2).keys()].map((index) => (
      <Line key={index} index={index} />
    ))}
  </div>
));

const Description = memo(() => (
  <div className='Description'>
    <Text />
  </div>
));

export default Description;
