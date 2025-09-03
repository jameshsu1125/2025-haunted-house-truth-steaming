import { playSound } from '@/components/sounds';
import useTween, { Bezier } from 'lesca-use-tween';
import { memo, useMemo, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

const Picture = memo(({ dotA }: { dotA: React.RefObject<HTMLDivElement | null> }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shock, setShock] = useState(false);
  const [tweener, setStyle] = useTween({
    opacity: 1,
    y: 0,
    scale: 1,
    left: 0,
  });

  const style = useMemo(() => {
    const skew = `skew(${tweener.left}deg, 0deg)`;
    const cloneStyle = { ...tweener };
    delete cloneStyle.left;
    return { ...cloneStyle, transform: `${tweener.transform} ${skew}` };
  }, [tweener]);

  return (
    <div
      ref={ref}
      className={twMerge('picture', shock && 'shock')}
      style={style}
      onPointerDown={() => {
        if (shock) return;
        if (ref.current && dotA.current) {
          const { bottom } = dotA.current.getBoundingClientRect();
          const { top, height } = ref.current.getBoundingClientRect();
          const offset = Math.abs(top - bottom + height - 5);

          setStyle(
            { opacity: 1, y: offset, scale: 1 },
            {
              duration: 500,
              easing: Bezier.inQuart,
              onEnd: () => {
                setShock(true);
                setStyle(
                  { opacity: 1, left: -5, scale: 1 },
                  { duration: 300, easing: Bezier.inOutQuart },
                );
                playSound('drop');
              },
            },
          );
        }
      }}
    />
  );
});
export default Picture;
