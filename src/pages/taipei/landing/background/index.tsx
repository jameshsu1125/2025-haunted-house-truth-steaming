import { memo, useContext, useEffect } from 'react';
import './index.less';
import { TaipeiLandingContext, TaipeiLandingStepType } from '../config';
import { TaipeiContext, TaipeiPageType, TaipeiStepType } from '../../config';
import useTween from 'lesca-use-tween';

const DarkScreen = memo(() => {
  const [{ step: landingStep }] = useContext(TaipeiLandingContext);
  const [{ step }] = useContext(TaipeiContext);
  const [style, setStyle] = useTween({ opacity: 1 });

  useEffect(() => {
    if (step === TaipeiStepType.loaded) {
      if (landingStep === TaipeiLandingStepType.unset)
        setStyle({ opacity: 0.65 }, { duration: 2000 });
      else if (landingStep === TaipeiLandingStepType.entry) setStyle({ opacity: 0 });
    }
  }, [landingStep, step]);

  return <div style={style} />;
});

const Background = memo(() => {
  const [style, setStyle] = useTween({ opacity: 1, scale: 1 });
  const [{ step }] = useContext(TaipeiLandingContext);
  const [, setState] = useContext(TaipeiContext);

  useEffect(() => {
    if (step === TaipeiLandingStepType.fadeOut) {
      setStyle(
        { opacity: 0, scale: 1.2 },
        {
          duration: 800,
          onEnd: () => setState((S) => ({ ...S, page: TaipeiPageType.intro })),
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
