import { FAIL_INK_COUNT } from '@/settings/config';
import { Context } from '@/settings/constant';
import Click from 'lesca-click';
import useTween, { Bezier } from 'lesca-use-tween';
import { memo, useContext, useEffect, useId, useRef } from 'react';
import './index.less';
import { twMerge } from 'tailwind-merge';

const Ink = memo(
  ({ style, index, active }: { style: React.CSSProperties; index: number; active: boolean }) => {
    const [{ fail }] = useContext(Context);
    const [tweenStyle, setStyle] = useTween({ opacity: 0 });

    useEffect(() => {
      if (active) {
        setStyle({ opacity: 0.3 }, 100);
      }
    }, [active]);

    useEffect(() => {
      if (fail?.index === index + 1) {
        setStyle({ opacity: 0.1 }, 100);
      }
    }, [fail]);

    return <div className='ink' style={{ ...style, ...tweenStyle }} />;
  },
);

const Text = memo(({ index, active }: { index: number; active: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);

  const [style, setStyle] = useTween({
    opacity: 0,
    scale: index !== 4 ? 2 : 1,
    y: index !== 4 ? 0 : 50,
  });

  useEffect(() => {
    if (active) {
      setStyle(
        { opacity: 1, scale: 1, y: 0 },
        {
          duration: 300,
          delay: index * 500,
          onEnd: () => {
            if (index !== 4) ref.current?.classList.add('animate-shock');
          },
        },
      );
    }
  }, [active]);

  return <div ref={ref} style={style} />;
});

const Headline = memo(() => {
  const [{ fail }] = useContext(Context);
  const { active } = fail || { index: 0, active: false };

  return (
    <div className='headline'>
      <div>
        <div>
          <div>
            {[...new Array(5).keys()].map((i) => (
              <Text key={`t-${i}`} index={i} active={active || false} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

const Btn = memo(
  ({ className, active, index }: { className: string; active: boolean; index: number }) => {
    const id = useId();
    const ref = useRef<HTMLDivElement>(null);
    const [style, setStyle] = useTween({ opacity: 0, scale: 0 });
    const [textStyle, setTextStyle] = useTween({ opacity: 0, y: 50 });
    useEffect(() => {
      if (active) {
        setStyle(
          { opacity: 1, scale: 1 },
          {
            duration: 800,
            easing: Bezier.outBack,
            delay: 3000 + index * 100,
            onEnd: () => {
              requestAnimationFrame(() => {
                ref.current?.removeAttribute('style');
                ref.current?.classList.add('cursor-pointer');
                Click.add(`#${id}`, () => {
                  console.log(className);
                });
              });
            },
          },
        );
        setTextStyle({ opacity: 1, y: 0 }, { duration: 800, delay: 3000 + 300 + index * 100 });
      }
    }, [active]);
    return (
      <div className={className}>
        <div id={id} ref={ref} style={style} />
        <div style={textStyle} />
        <div>
          <div />
        </div>
      </div>
    );
  },
);

const Buttons = memo(() => {
  const [{ fail }] = useContext(Context);
  const { active } = fail || { active: false };

  return (
    <div className='buttons'>
      <Btn className='restart' active={active || false} index={0} />
      <Btn className='home' active={active || false} index={1} />
    </div>
  );
});

const Fail = memo(() => {
  const [{ fail }] = useContext(Context);
  const { active } = fail || { active: false };
  return (
    <div className={twMerge('Fail', active ? 'pointer-events-auto' : 'pointer-events-none')}>
      <div>
        {[...new Array(FAIL_INK_COUNT).keys()].map((index) => {
          const rotate = Math.floor(Math.random() * 360);
          const x = -100 + Math.floor(Math.random() * 200);
          const y = -100 + Math.floor(Math.random() * 200);
          const scale = 0.8 + Math.random() * 0.2;
          return (
            <Ink
              key={`ink-${index}`}
              index={index}
              style={{
                transform: `translate(${x}px, ${y}px) scale(${scale}) rotate(${rotate}deg)`,
              }}
              active={active || false}
            />
          );
        })}
      </div>
      <div>
        <Headline />
        <Buttons />
      </div>
    </div>
  );
});
export default Fail;
