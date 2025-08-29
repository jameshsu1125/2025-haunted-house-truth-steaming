import { smokeMachine } from 'pixijs-shader-smoke';
import { memo, useContext, useEffect, useRef } from 'react';
import { ChiayiGameContext, ChiayiGameStepType } from '../config';

const Smoke = memo(() => {
  const ref = useRef<HTMLCanvasElement>(null);
  const [{ step }] = useContext(ChiayiGameContext);
  const smokeRef = useRef<any>(null);

  useEffect(() => {
    if (step === ChiayiGameStepType.bacteria) {
      const createSmokeEffect = () => {
        if (ref.current && ref.current!.clientWidth > 0 && ref.current!.clientHeight > 0) {
          const ctx = ref.current.getContext('2d');
          ref.current.setAttribute('width', ref.current.clientWidth.toString());
          ref.current.setAttribute('height', ref.current.clientHeight.toString());

          const smoke = smokeMachine.smokeMachine(ctx, [255, 255, 255], 0.8);
          smoke.start();
          smokeRef.current = smoke;
        } else {
          requestAnimationFrame(createSmokeEffect);
        }
      };

      createSmokeEffect();

      const onPointerDown = (e: PointerEvent) => {
        const { clientX: x, clientY: y } = e;
        const { left } = ref.current!.getBoundingClientRect();

        const n = 0.5;
        const t = 500;
        const currentX = x - left;

        const randomOffset = Math.random() * 20 - 40;

        let time = 20;
        while (time > 0) {
          smokeRef.current.addsmoke(currentX + randomOffset, y + randomOffset, n, t);
          time -= 1;
        }
      };

      window.addEventListener('pointerdown', onPointerDown);
    }
  }, [step]);

  return (
    <div className='smoke'>
      <canvas ref={ref} />
    </div>
  );
});

export default Smoke;
