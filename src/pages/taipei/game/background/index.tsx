import { memo, useCallback, useContext, useEffect } from 'react';
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

const Touch = memo(() => {
  const [{ step }, setState] = useContext(TaipeiGameContext);
  const onPointerDown = useCallback(() => {
    if (step === TaipeiGameStepType.start) {
      setState((S) => ({ ...S, isError: true }));
    }
  }, [step]);
  return (
    <div className='absolute top-0 h-full w-full bg-transparent' onPointerDown={onPointerDown} />
  );
});

const Background = memo(() => (
  <div className='Background'>
    <Touch />
    <Ghost />
    <div className='image' />
    <div className='light'>
      <div />
    </div>
    <Clear />
  </div>
));
export default Background;
