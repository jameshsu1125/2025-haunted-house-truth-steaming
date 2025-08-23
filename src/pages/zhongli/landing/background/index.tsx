import useTween from 'lesca-use-tween';
import { memo, useContext, useEffect } from 'react';
import { ZhongliContext, ZhongliPageType, ZhongliStepType } from '../../config';
import { ZhongliLandingContext, ZhongliLandingStepType } from '../config';
import './index.less';

const DarkScreen = memo(() => {
  const [{ step: landingStep }] = useContext(ZhongliLandingContext);
  const [{ step }] = useContext(ZhongliContext);
  const [style, setStyle] = useTween({ opacity: 1 });

  useEffect(() => {
    if (step === ZhongliStepType.ready) {
      if (landingStep === ZhongliLandingStepType.unset)
        setStyle({ opacity: 0.65 }, { duration: 2000 });
      else if (landingStep === ZhongliLandingStepType.entry) setStyle({ opacity: 0 });
    }
  }, [landingStep, step]);

  return <div style={style} />;
});

const Background = memo(() => {
  const [style, setStyle] = useTween({ opacity: 1, scale: 1 });
  const [{ step }] = useContext(ZhongliLandingContext);
  const [, setState] = useContext(ZhongliContext);

  useEffect(() => {
    if (step === ZhongliLandingStepType.fadeOut) {
      setStyle(
        { opacity: 0, scale: 1.2 },
        {
          duration: 800,
          onEnd: () => {
            setState((S) => ({ ...S, page: ZhongliPageType.intro }));
          },
        },
      );
    }
  }, [step]);

  return (
    <div className='Background' style={style}>
      <DarkScreen />
    </div>
  );
});
export default Background;
