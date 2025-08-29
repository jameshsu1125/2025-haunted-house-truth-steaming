import EnterFrame from 'lesca-enterframe';
import useTween, { Bezier } from 'lesca-use-tween';
import { memo, useContext, useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { ChiayiContext, ChiayiPageType } from '../../config';
import {
  ChiayiGameContext,
  ChiayiGameStepType,
  VIRUS_BEEN_SUCKED_SPEED,
  VIRUS_SHOW_TIME,
} from '../config';
import Germ from './germ';
import { getTimeline } from './misc';

const Germs = memo(({ container }: { container: HTMLDivElement }) => {
  const { clientWidth, clientHeight } = container;

  const [style, setStyle] = useTween({
    left: `${Math.random() * (clientWidth - 128 * 2)}px`,
    top: `${64 + Math.random() * (clientHeight - 128 * 4)}px`,
    scale: Math.random() * 0.5 + 0.5,
    rotate: Math.random() * 360,
  });
  const index = Math.floor(Math.random() * 3) + 1;

  const onSuck = () => {
    setStyle(
      { left: 120, top: container.clientHeight },
      { duration: VIRUS_BEEN_SUCKED_SPEED, easing: Bezier.inQuart },
    );
  };

  return (
    <div className='germs'>
      <Germ index={index} containerWidth={container.clientWidth} style={style} onSuck={onSuck} />
    </div>
  );
});

const Virus = memo(() => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ page }] = useContext(ChiayiContext);
  const [{ step }] = useContext(ChiayiGameContext);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (page === ChiayiPageType.game && step === ChiayiGameStepType.bacteria) {
      const timeline = getTimeline(30000, VIRUS_SHOW_TIME.min, VIRUS_SHOW_TIME.max);
      EnterFrame.reset();
      EnterFrame.add(({ delta }) => {
        setIndex(() => {
          const indexFromArray = timeline.findIndex((t) => t > delta);
          return indexFromArray === -1 ? timeline.length - 1 : indexFromArray;
        });
      });
    }
  }, [page, step]);

  return (
    <div ref={ref} className={twMerge('virus')}>
      {ref.current &&
        ref.current.clientWidth &&
        [...new Array(index).keys()].map((i) => <Germs key={i} container={ref.current!} />)}
    </div>
  );
});
export default Virus;
