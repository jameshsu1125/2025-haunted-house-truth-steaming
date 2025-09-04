import {
  forwardRef,
  JSX,
  memo,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { Uid } from 'lesca-number';
import useTween, { Bezier } from 'lesca-use-tween';
import { ChiayiContext } from '../../config';

export type CounterHandle = {
  increase: (event: React.PointerEvent<HTMLDivElement>) => void;
};

const Num = memo(
  ({
    uid,
    x,
    y,
    removeCountByUid,
  }: {
    uid: string;
    x: number;
    y: number;
    removeCountByUid: (id: string) => void;
  }) => {
    const [{ bacteriaCount }] = useContext(ChiayiContext);
    const [style, setStyle] = useTween({ opacity: 0, y: 50 });
    const countRef = useRef<number>(bacteriaCount);

    useEffect(() => {
      setStyle(
        { opacity: 1, y: 0 },
        {
          duration: 800,
          onEnd: () => {
            setStyle(
              { opacity: 0, y: -50 },
              {
                duration: 500,
                easing: Bezier.inQuart,
                onEnd: () => {
                  removeCountByUid(uid);
                },
              },
            );
          },
        },
      );
    }, []);

    return (
      <div className='num' style={{ left: x + 10, top: y, ...style }}>
        {`+ ${countRef.current + 1}`}
      </div>
    );
  },
);

const Counter = forwardRef((_, ref) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [count, setCount] = useState<{ element: JSX.Element; id: string }[]>([]);

  const removeCountByUid = (id: string) => {
    setCount((S) => S.filter((item) => item.id !== id));
  };

  useImperativeHandle(ref, () => ({
    increase(event: React.PointerEvent<HTMLDivElement>) {
      setCount((S) => {
        const { left } = containerRef.current?.getBoundingClientRect() || { left: 0 };
        const uid = Uid();
        return [
          ...S,
          {
            element: (
              <Num
                key={uid}
                uid={uid}
                x={event.clientX - left}
                y={event.clientY}
                removeCountByUid={removeCountByUid}
              />
            ),
            id: uid,
          },
        ];
      });
    },
  }));

  return (
    <div ref={containerRef} className='counter'>
      {count.map((item) => item.element)}
    </div>
  );
});

export default Counter;
