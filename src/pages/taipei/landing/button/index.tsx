import { memo, useContext, useEffect } from 'react';
import './index.less';
import { TaipeiLandingContext, TaipeiLandingStepType } from '../config';
import useTween from 'lesca-use-tween';
import { TaipeiContext, TaipeiStepType } from '../../config';

const Button = memo(() => {
  const [{ step: landingStep }] = useContext(TaipeiLandingContext);
  const [{ step }] = useContext(TaipeiContext);
  const [style, setStyle] = useTween({ opacity: 0 });

  useEffect(() => {
    if (landingStep === TaipeiLandingStepType.entry && step === TaipeiStepType.loaded) {
      setStyle({ opacity: 1 });
    }
  }, [landingStep, step]);

  return (
    <div className='Button'>
      <div style={style}>
        <div />
      </div>
    </div>
  );
});
export default Button;
