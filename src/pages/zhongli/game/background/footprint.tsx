import useTween, { Bezier } from 'lesca-use-tween';
import { memo, useEffect, useMemo } from 'react';

const Footprint = memo(({ active }: { active: boolean }) => {
  const [x, setStyle] = useTween({ left: 0 });

  useEffect(() => {
    if (active) setStyle({ left: 6 }, { easing: Bezier.linear, duration: 5000 });
  }, [active]);

  const maskPosition = useMemo(() => {
    if (x && x.left) {
      const step = parseInt(String(x.left));
      return `center ${(100 / 6) * step}% `;
    }
    return `center 0%`;
  }, [x]);

  return (
    <div className='footprint' style={{ maskPosition }}>
      <div></div>
    </div>
  );
});
export default Footprint;
