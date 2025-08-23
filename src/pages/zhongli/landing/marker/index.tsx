import { memo, useContext, useEffect } from 'react';
import './index.less';
import { ZhongliLandingContext, ZhongliLandingStepType } from '../config';
import { ZhongliContext, ZhongliStepType } from '../../config';
import useTween, { Bezier } from 'lesca-use-tween';

const Icon = memo(() => {
  const [{ step: landingStep }] = useContext(ZhongliLandingContext);
  const [{ step }] = useContext(ZhongliContext);
  const [style, setStyle] = useTween({ opacity: 0 });

  useEffect(() => {
    if (step === ZhongliStepType.ready) {
      if (landingStep === ZhongliLandingStepType.entry) {
        setStyle({ opacity: 1 }, { duration: 2000, delay: 1000 });
      } else if (landingStep === ZhongliLandingStepType.fadeOut) setStyle({ opacity: 0 }, 700);
    }
  }, [landingStep, step]);

  return (
    <div className='marker' style={style}>
      <div />
    </div>
  );
});

const Text = memo(() => {
  const [{ step: landingStep }] = useContext(ZhongliLandingContext);
  const [{ step }] = useContext(ZhongliContext);
  const [style, setStyle] = useTween({ opacity: 0, x: 40 });

  useEffect(() => {
    if (step === ZhongliStepType.ready) {
      if (landingStep === ZhongliLandingStepType.entry) {
        setStyle({ opacity: 1, x: 0 }, { duration: 1000, delay: 1200, easing: Bezier.inOutQuart });
      } else if (landingStep === ZhongliLandingStepType.fadeOut) setStyle({ opacity: 0 }, 700);
    }
  }, [landingStep, step]);

  return (
    <div className='text' style={style}>
      <div />
    </div>
  );
});

const Marker = memo(() => (
  <div className='Marker'>
    <Icon />
    <Text />
  </div>
));
export default Marker;
