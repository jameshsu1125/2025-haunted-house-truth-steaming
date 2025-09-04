import { playSound } from '@/components/sounds';
import useTween, { Bezier } from 'lesca-use-tween';
import { forwardRef, useCallback, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

export type PictureHandler = {
  drop: () => void;
};

const Picture = forwardRef(({ dotA }: { dotA: React.RefObject<HTMLDivElement | null> }, ref) => {
  const pictureRef = useRef<HTMLDivElement | null>(null);
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

  const drop = useCallback(() => {
    if (shock) return;
    if (pictureRef.current && dotA.current) {
      const { bottom } = dotA.current.getBoundingClientRect();
      const { top, height } = pictureRef.current.getBoundingClientRect();
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
  }, [shock]);

  useImperativeHandle(ref, () => ({
    drop() {
      setTimeout(() => {
        drop();
      }, 1000);
    },
  }));

  return (
    <div
      ref={pictureRef}
      className={twMerge('picture', shock && 'shock')}
      style={style}
      // onPointerDown={() => {
      //   drop();
      // }}
    />
  );
});
export default Picture;
