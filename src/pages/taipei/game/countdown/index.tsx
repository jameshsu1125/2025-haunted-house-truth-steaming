import EnterFrame from 'lesca-enterframe';
import useTween from 'lesca-use-tween';
import { memo, useContext, useEffect, useState } from 'react';
import { GAME_TIME, TaipeiGameContext, TaipeiGameStepType } from '../config';
import './index.less';
import { TaipeiContext, TaipeiPageType } from '../../config';

const Text = memo(() => {
  const [{ page }] = useContext(TaipeiContext);
  const [{ step }] = useContext(TaipeiGameContext);
  const [time, setTime] = useState(GAME_TIME / 1000);

  useEffect(() => {
    if (time <= 0) {
      EnterFrame.stop();
      EnterFrame.destroy();
      // TODO: Handle game over state
    }
  }, [time]);

  useEffect(() => {
    if (page === TaipeiPageType.game && step === TaipeiGameStepType.unset) {
      EnterFrame.reset();
      EnterFrame.add(({ delta }) => {
        const time = GAME_TIME - delta;
        setTime(Math.floor(time / 1000));
      });
      EnterFrame.play();
    }
  }, [step, page]);
  return <div className='text'>{Math.max(time, 0)}</div>;
});

const Countdown = memo(() => {
  const [{ page }] = useContext(TaipeiContext);
  const [style, setStyle] = useTween({ opacity: 0 });
  const [{ step }] = useContext(TaipeiGameContext);
  useEffect(() => {
    if (page === TaipeiPageType.game && step === TaipeiGameStepType.unset) {
      setStyle({ opacity: 1 });
    } else if (step > TaipeiGameStepType.unset) {
      setStyle({ opacity: 0 }, 300);
      EnterFrame.stop();
      EnterFrame.destroy();
    }
  }, [step, page]);
  return (
    <div className='Countdown' style={style}>
      <div className='ico'>
        <div />
      </div>
      <Text />
    </div>
  );
});
export default Countdown;
