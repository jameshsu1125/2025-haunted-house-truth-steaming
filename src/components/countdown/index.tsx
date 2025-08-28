import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import EnterFrame from 'lesca-enterframe';
import useTween from 'lesca-use-tween';
import { memo, useContext, useEffect, useState } from 'react';
import './index.less';

const Text = memo(
  ({
    status,
    onGameOver,
    totalTime,
    needFail,
  }: {
    status: 'start' | 'stop';
    onGameOver?: () => void;
    totalTime: number;
    needFail: boolean;
  }) => {
    const [, setContext] = useContext(Context);
    const [time, setTime] = useState(totalTime / 1000);
    const [index, setIndex] = useState(0);

    useEffect(() => {
      if (needFail) setContext({ type: ActionType.Fail, state: { index } });
    }, [index]);

    useEffect(() => {
      if (time <= 0) {
        EnterFrame.stop();
        onGameOver?.();
        if (needFail) setContext({ type: ActionType.Fail, state: { active: true } });
      }
    }, [time]);

    useEffect(() => {
      if (status === 'start') {
        if (needFail) setContext({ type: ActionType.Fail, state: { enabled: true } });

        EnterFrame.reset();
        EnterFrame.add(({ delta }) => {
          const time = totalTime - delta;
          setTime(Math.floor(time / 1000));
          const idx = 10 - Math.ceil((time / totalTime) * 10);
          setIndex(idx);
        });
        EnterFrame.play();
      }
    }, [status, needFail]);

    return <div className='text'>{Math.max(time, 0)}</div>;
  },
);

const Countdown = memo(
  ({
    status,
    onGameOver,
    onFadeOut,
    totalTime = 60,
    needFail = true,
  }: {
    needFail?: boolean;
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
        <Text status={status} onGameOver={onGameOver} totalTime={totalTime} needFail={needFail} />
      </div>
    );
  },
);
export default Countdown;
