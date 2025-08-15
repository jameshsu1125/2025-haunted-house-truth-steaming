import SmokeEffect from 'pixijs-shader-smoke';
import { memo, useContext, useEffect, useRef } from 'react';
import './index.less';
import { HomeContext, HomeStepType } from '../config';
import { twMerge } from 'tailwind-merge';

const Effect = memo(() => {
  const [{ step }, setState] = useContext(HomeContext);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      new SmokeEffect({
        container: ref.current,
        height: '4.0',
        onload: () => {
          setState((S) => ({ ...S, smokeImageLoaded: true }));
        },
      });
    }
  }, []);

  return (
    <div
      className={twMerge('Effect', step >= HomeStepType.fadeIn && 'animate-fade-in-2s')}
      ref={ref}
    />
  );
});
export default Effect;
