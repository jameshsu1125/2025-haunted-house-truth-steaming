import SmokeEffect from 'pixijs-shader-smoke';
import { memo, useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import shaderImage from './img/smoke-effect.jpg';
import './index.less';
import Cistern from '../cistern';

const Effect = memo(({ display = true }: { display?: boolean }) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let smokeEffect: SmokeEffect | null = null;

    if (ref.current) {
      const createSmokeEffect = () => {
        if (ref.current!.clientWidth > 0 && ref.current!.clientHeight > 0) {
          smokeEffect = new SmokeEffect({
            container: ref.current!,
            height: '4.0',
            noise: '3.0',
            shaderImage,
            onload: () => setVisible(true),
            fps: 24,
          });
        } else {
          requestAnimationFrame(createSmokeEffect);
        }
      };

      createSmokeEffect();
    }

    const resize = () => {
      requestAnimationFrame(() => {
        if (ref.current) {
          smokeEffect?.resizeTo(
            ref.current.clientWidth,
            ref.current.clientHeight || window.innerHeight,
          );
        }
      });
    };
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
      smokeEffect?.destroy();
    };
  }, []);

  return (
    <Cistern className='pointer-events-none absolute top-0 h-full w-full'>
      <div
        className={twMerge('Effect', visible && (display ? 'animate-fade-in-2s' : 'opacity-0'))}
        ref={ref}
        style={{ width: '100%', height: '100%' }}
      />
    </Cistern>
  );
});
export default Effect;
