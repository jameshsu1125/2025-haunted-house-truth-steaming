import { playSound } from '@/components/sounds';
import Click from 'lesca-click';
import useTween from 'lesca-use-tween';
import { memo, useContext, useEffect, useId } from 'react';
import { HomeContext, HomeStepType } from '../../config';
import './index.less';
import Gtag from 'lesca-gtag';
import Qrcode from 'lesca-react-qrcode';

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
    setStyle({ opacity: 1, y: 0 }, { duration: 500, delay: 600 });
  }, []);
  return <p style={style}>手機掃描 QR 以獲得最佳體驗，並建議開啟聲音 確認</p>;
});

const QRCode = memo(() => {
  const [style, setStyle] = useTween({ opacity: 0, y: 30 });
  useEffect(() => {
    setStyle({ opacity: 1, y: 0 }, { duration: 800, delay: 300 });
  }, []);
  return (
    <div style={style}>
      <Qrcode size={300} content={new URL(window.location.href).toString()} />
    </div>
  );
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
        delay: 900,
        onEnd: () => {
          Click.add(`#${id}`, () => {
            setState((S) => ({ ...S, step: HomeStepType.FadeIn }));
            playSound('click');
            playSound('homeBGM');
            Gtag.event('Home', 'reminder');
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
      <QRCode />

      <P />
      <Button />
    </div>
  </div>
));
export default Reminder;
