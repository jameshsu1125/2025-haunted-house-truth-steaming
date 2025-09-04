import { memo, useContext, useEffect } from 'react';
import './index.less';
import { ResultContext, ResultStepType } from '../config';
import useTween, { Bezier } from 'lesca-use-tween';

const Text = memo(({ index }: { index: number }) => {
  const [{ step }] = useContext(ResultContext);
  const [style, setStyle] = useTween({ opacity: 0, y: 50 });
  useEffect(() => {
    if (step === ResultStepType.entry) {
      setStyle(
        { opacity: 1, y: 0 },
        {
          duration: 500,
          delay: 2000 + index * 100,
          onEnd: () => {
            setTimeout(() => {
              setStyle(
                { opacity: 0, y: -50 },
                { duration: 500, delay: index * 100, easing: Bezier.inQuart },
              );
            }, 4000);
          },
        },
      );
    }
  }, [step]);
  return <div style={style} />;
});

const Info = memo(() => {
  useEffect(() => {}, []);
  return (
    <div className='Info'>
      {[...new Array(2).keys()].map((index) => (
        <Text key={`info-${index}`} index={index} />
      ))}
    </div>
  );
});
export default Info;
