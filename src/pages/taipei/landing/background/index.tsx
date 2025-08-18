import { memo, useContext, useEffect } from 'react';
import './index.less';
import { TaipeiLandingContext, TaipeiLandingStepType } from '../config';
import { TaipeiContext, TaipeiStepType } from '../../config';
import useTween from 'lesca-use-tween';

const Background = memo(() => {
  const [{ step: landingStep }] = useContext(TaipeiLandingContext);
  const [{ step }] = useContext(TaipeiContext);
  const [style, setStyle] = useTween({ opacity: 0.65 });

  useEffect(() => {
    if (landingStep === TaipeiLandingStepType.entry && step === TaipeiStepType.loaded) {
      setStyle({ opacity: 0 });
    }
  }, [landingStep, step]);

  return (
    <div className='Background'>
      <div style={style} />
    </div>
  );
});
export default Background;
