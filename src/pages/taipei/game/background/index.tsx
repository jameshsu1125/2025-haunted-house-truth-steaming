import { memo, useContext, useEffect } from 'react';
import { TaipeiGameContext, TaipeiGameStepType } from '../config';
import './index.less';
import useTween from 'lesca-use-tween';

const Clear = memo(() => {
  const [style, setStyle] = useTween({ opacity: 0 });
  const [{ step }] = useContext(TaipeiGameContext);
  useEffect(() => {
    if (step === TaipeiGameStepType.clear) setStyle({ opacity: 1 });
  }, [step]);
  return <div className='clear' style={style} />;
});

const Ghost = memo(() => {
  const [style, setStyle] = useTween({ opacity: 0 });
  const [{ step }] = useContext(TaipeiGameContext);

  useEffect(() => {
    if (step === TaipeiGameStepType.start) {
      setStyle({ opacity: 1 });
    }
  }, [step]);

  return (
    <div className='ghost' style={style}>
      <div />
    </div>
  );
});

const Background = memo(() => (
  <div className='Background'>
    <Ghost />
    <div className='image' />
    <div className='light'>
      <div />
    </div>
    <Clear />
  </div>
));
export default Background;
