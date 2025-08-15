import useTween, { Bezier } from 'lesca-use-tween';
import { memo, useContext, useEffect } from 'react';
import { HomeContext, HomeStepType } from '../config';
import './index.less';

const Line = memo(({ index }: { index: number }) => {
  const [{ step }] = useContext(HomeContext);

  const [style, setStyle] = useTween({ opacity: 0, y: 50 });

  useEffect(() => {
    if (step === HomeStepType.fadeIn) {
      setStyle(
        { opacity: 1, y: 0 },
        { duration: 2000, delay: 500 + 500 + index * 200, easing: Bezier.inOutCubic },
      );
    }
  }, [step]);

  return (
    <div style={style}>
      <div />
    </div>
  );
});

const Body = memo(() => (
  <div className='body'>
    {[...new Array(2).keys()].map((index) => (
      <Line key={index} index={index} />
    ))}
  </div>
));
export default Body;
