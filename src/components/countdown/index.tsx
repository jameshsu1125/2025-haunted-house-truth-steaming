import EnterFrame from 'lesca-enterframe';
import useTween from 'lesca-use-tween';
import { memo, useEffect, useState } from 'react';
import './index.less';

const Text = memo(
  ({
    status,
    onGameOver,
    totalTime,
  }: {
    status: 'start' | 'stop';
    onGameOver?: () => void;
    totalTime: number;
  }) => {
    const [time, setTime] = useState(totalTime / 1000);

    useEffect(() => {
      if (time <= 0) {
        EnterFrame.stop();
        // TODO: Handle game over state
        onGameOver?.();
      }
    }, [time]);

    useEffect(() => {
      if (status === 'start') {
        EnterFrame.reset();
        EnterFrame.add(({ delta }) => {
          const time = totalTime - delta;
          setTime(Math.floor(time / 1000));
        });
        EnterFrame.play();
      }
    }, [status]);
    return <div className='text'>{Math.max(time, 0)}</div>;
  },
);

const Countdown = memo(
  ({
    status,
    onGameOver,
    onFadeOut,
    totalTime = 60,
  }: {
    status: 'start' | 'stop';
    onFadeOut?: () => void;
    onGameOver?: () => void;
    totalTime: number;
  }) => {
    const [style, setStyle] = useTween({ opacity: 0 });

    useEffect(() => {
      if (status === 'start') {
        setStyle({ opacity: 1 });
      } else if (status === 'stop') {
        setStyle({ opacity: 0 }, { duration: 300, onEnd: () => onFadeOut?.() });
        EnterFrame.stop();
        EnterFrame.destroy();
      }
    }, [status]);
    return (
      <div className='Countdown' style={style}>
        <div className='ico'>
          <div />
        </div>
        <Text status={status} onGameOver={onGameOver} totalTime={totalTime} />
      </div>
    );
  },
);
export default Countdown;
