import { memo, useContext, useRef } from 'react';
import { ChooseContext, ChooseStepType } from '../config';
import './index.less';
import { playSound } from '@/components/sounds';
import Gtag from 'lesca-gtag';

const Touch = memo(() => {
  const [{ step }, setState] = useContext(ChooseContext);

  const ref = useRef({ x: 0, y: 0, isDown: false });

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const { clientX: x, clientY: y } = e;
    ref.current = { x, y, isDown: true };
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const { clientX: x, clientY: y } = e;
    if (ref.current.isDown) {
      const deltaX = x - ref.current.x;
      const deltaY = y - ref.current.y;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      if (distance > 50) {
        const rotation = Math.abs(Math.atan2(deltaY, deltaX) * (180 / Math.PI));
        if (rotation < 45 || rotation > 135) {
          const direction = rotation > 90 ? 'right' : 'left';
          ref.current.isDown = false;
          ref.current.x = 0;
          ref.current.y = 0;
          if (direction === 'left') {
            if (step === ChooseStepType.unset) {
              playSound('flap');
              setState((S) => ({
                ...S,
                step: ChooseStepType.fadeOut,
                lastIndex: S.index,
                index: (S.index + 2) % 3,
              }));
              Gtag.event('Choose', 'previous');
            }
          } else {
            if (step === ChooseStepType.unset) {
              playSound('flap');
              setState((S) => ({
                ...S,
                step: ChooseStepType.fadeOut,
                lastIndex: S.index,
                index: (S.index + 1) % 3,
              }));
              Gtag.event('Choose', 'next');
            }
          }
        }
      }
    }
  };

  const onPointerUp = () => {
    ref.current.isDown = false;
  };

  return (
    <div
      className='Touch'
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    />
  );
});
export default Touch;
