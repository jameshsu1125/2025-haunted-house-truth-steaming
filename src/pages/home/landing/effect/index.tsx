import SmokeEffect from 'pixijs-shader-smoke';
import { memo, useContext, useEffect, useRef } from 'react';
import './index.less';
import { HomeContext, HomeStepType } from '../../config';
import { twMerge } from 'tailwind-merge';
import shaderImage from './img/smoke-effect.jpg';

const Effect = memo(() => {
  const [{ step }, setState] = useContext(HomeContext);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let smokeEffect: SmokeEffect | null = null;
    if (ref.current) {
      smokeEffect = new SmokeEffect({
        container: ref.current,
        height: '4.0',
        onload: () => {
          setState((S) => ({ ...S, smokeImageLoaded: true }));
        },
        noise: '3.0',
        shaderImage,
        fps: 24,
      });
    }

    const resize = () => {
      if (ref.current) {
        smokeEffect?.resizeTo(ref.current?.clientWidth, ref.current?.clientHeight);
      }
    };

    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
      smokeEffect?.destroy();
    };
  }, []);

  return (
    <div
      className={twMerge('Effect', step >= HomeStepType.fadeIn && 'animate-fade-in-2s')}
      ref={ref}
    />
  );
});
export default Effect;
