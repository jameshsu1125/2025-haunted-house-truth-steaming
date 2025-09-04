import { memo, useContext, useEffect } from 'react';
import './index.less';
import useTween, { Bezier } from 'lesca-use-tween';
import { TaipeiContext, TaipeiPageType } from '../../config';
import { TaipeiIntroContext, TaipeiIntroStepType } from '../config';

const DarkScreen = memo(() => {
  const [{ page }] = useContext(TaipeiContext);
  const [{ step }] = useContext(TaipeiIntroContext);
  const [style, setStyle] = useTween({ opacity: 1 });

  useEffect(() => {
    if (page === TaipeiPageType.intro) {
      if (step === TaipeiIntroStepType.unset) {
        setStyle({ opacity: 0 }, { duration: 1000, easing: Bezier.outQuart });
      } else if (step === TaipeiIntroStepType.entry) {
        setStyle({ opacity: 0.5 }, { duration: 800, easing: Bezier.inOutQuart });
      }
    }
  }, [page, step]);

  return <div className='darkScreen' style={style} />;
});

const Kitchen = memo(() => {
  const [{ step }] = useContext(TaipeiIntroContext);
  const [style, setStyle] = useTween({ opacity: 0 });

  useEffect(() => {
    if (step === TaipeiIntroStepType.entry) setStyle({ opacity: 1 }, 1);
  }, [step]);

  return (
    <div className='kitchen'>
      <div style={style}>
        <div />
      </div>
    </div>
  );
});

const Background = memo(() => {
  const [{ page }, setState] = useContext(TaipeiContext);
  const [{ step }] = useContext(TaipeiIntroContext);
  const [style, setStyle] = useTween({ opacity: 1, scale: 1, x: 0 });

  useEffect(() => {
    if (page === TaipeiPageType.intro) {
      if (step === TaipeiIntroStepType.unset) {
        setStyle({ scale: 1.7, opacity: 1 }, { duration: 8000, easing: Bezier.inOutSine });
      } else if (step === TaipeiIntroStepType.entry) {
        setStyle(
          { scale: 2.9, opacity: 0, x: 10 },
          {
            duration: 800,
            easing: Bezier.inOutQuart,
            onEnd: () => setState((S) => ({ ...S, page: TaipeiPageType.game })),
          },
        );
      }
    }
  }, [page, step]);

  return (
    <div className='Background' style={style}>
      <DarkScreen />
      <Kitchen />
    </div>
  );
});
export default Background;
