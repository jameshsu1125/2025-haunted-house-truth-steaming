import { memo, useContext, useEffect } from 'react';
import './index.less';
import { TaipeiLandingContext, TaipeiLandingStepType } from '../config';
import { ChiayiContext, ChiayiPageType, ChiayiStepType } from '../../config';
import useTween from 'lesca-use-tween';

const DarkScreen = memo(() => {
  const [{ step: landingStep }] = useContext(TaipeiLandingContext);
  const [{ step }] = useContext(ChiayiContext);
  const [style, setStyle] = useTween({ opacity: 1 });

  useEffect(() => {
    if (step === ChiayiStepType.loaded) {
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
  const [, setState] = useContext(ChiayiContext);

  useEffect(() => {
    if (step === TaipeiLandingStepType.fadeOut) {
      setStyle(
        { opacity: 0, scale: 1.2 },
        {
          duration: 800,
          onEnd: () => setState((S) => ({ ...S, page: ChiayiPageType.intro })),
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
