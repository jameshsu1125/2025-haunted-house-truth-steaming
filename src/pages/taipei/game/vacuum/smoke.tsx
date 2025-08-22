import { smokeMachine } from 'pixijs-shader-smoke';
import { memo, useContext, useEffect, useRef } from 'react';
import { TaipeiGameContext, TaipeiGameStepType } from '../config';

const Smoke = memo(({ dot }: { dot: React.RefObject<HTMLDivElement | null> }) => {
  const ref = useRef<HTMLCanvasElement>(null);
  const interval = useRef<ReturnType<typeof setInterval> | null>(null);
  const [{ step }] = useContext(TaipeiGameContext);

  useEffect(() => {
    if (step === TaipeiGameStepType.dirt) {
      const createSmokeEffect = () => {
        if (
          ref.current &&
          ref.current!.clientWidth > 0 &&
          ref.current!.clientHeight > 0 &&
          dot.current
        ) {
          const ctx = ref.current.getContext('2d');
          ref.current.setAttribute('width', ref.current.clientWidth.toString());
          ref.current.setAttribute('height', ref.current.clientHeight.toString());

          const smoke = smokeMachine.smokeMachine(ctx, [255, 255, 255], 0.3);
          smoke.start();

          interval.current = setInterval(function () {
            const { left: x, top: y } = dot.current!.getBoundingClientRect();
            const offsetX = (window.innerWidth - ref.current!.width) / 2;
            smoke.addsmoke(x - offsetX, y, 5, 2000);
          }, 100);
        } else {
          requestAnimationFrame(createSmokeEffect);
        }
      };

      createSmokeEffect();

      return () => {
        if (interval.current) clearInterval(interval.current);
      };
    }
  }, [step]);
  return (
    <div className='smoke'>
      <canvas ref={ref} />
    </div>
  );
});

export default Smoke;
