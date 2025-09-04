import { playSound } from '@/components/sounds';
import Click from 'lesca-click';
import useTween from 'lesca-use-tween';
import { memo, useContext, useEffect, useId } from 'react';
import { HomeContext, HomeStepType } from '../../config';
import './index.less';

const DarkScreen = memo(() => {
  const [style, setStyle] = useTween({ opacity: 0 });
  useEffect(() => {
    setStyle({ opacity: 0.5 }, 500);
  }, []);
  return <div style={style} />;
});

const P = memo(() => {
  const [style, setStyle] = useTween({ opacity: 0, y: 50 });
  useEffect(() => {
    setStyle({ opacity: 1, y: 0 }, { duration: 500, delay: 300 });
  }, []);
  return <p style={style}>為確保您的體驗效果，建議開啟聲音</p>;
});

const Button = memo(() => {
  const [, setState] = useContext(HomeContext);
  const id = useId();
  const [style, setStyle] = useTween({ opacity: 0, scale: 2 });

  useEffect(() => {
    setStyle(
      { opacity: 1, scale: 1 },
      {
        duration: 500,
        delay: 600,
        onEnd: () => {
          Click.add(`#${id}`, () => {
            setState((S) => ({ ...S, step: HomeStepType.FadeIn }));
            playSound('click');
            playSound('homeBGM');
          });
        },
      },
    );
  }, []);

  return <div id={id} className='btn' style={style} />;
});

const Reminder = memo(() => (
  <div className='Reminder'>
    <DarkScreen />
    <div>
      <P />
      <Button />
    </div>
  </div>
));
export default Reminder;
