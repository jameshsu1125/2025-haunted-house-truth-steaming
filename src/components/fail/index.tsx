import { FAIL_INK_COUNT, PAGE } from '@/settings/config';
import { Context, FailState } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import Click from 'lesca-click';
import useTween, { Bezier } from 'lesca-use-tween';
import { Dispatch, memo, SetStateAction, useContext, useEffect, useId, useRef } from 'react';
import { twMerge } from 'tailwind-merge';
import './index.less';
import { HomePageType } from '@/pages/home/config';

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
  ({
    className,
    active,
    index,
    setKey,
  }: {
    className: string;
    active: boolean;
    index: number;
    setKey: Dispatch<SetStateAction<number>>;
  }) => {
    const id = useId();
    const ref = useRef<HTMLDivElement>(null);

    const [, setContext] = useContext(Context);

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
                  if (className === 'home') {
                    setContext({
                      type: ActionType.Redirect,
                      state: { enabled: true, category: HomePageType.choose },
                    });
                    setContext({ type: ActionType.Page, state: PAGE.home });
                  }
                  if (className === 'restart') {
                    setKey((S) => S + 1);
                  }
                  setContext({ type: ActionType.Fail, state: FailState });
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

const Buttons = memo(({ setKey }: { setKey: Dispatch<SetStateAction<number>> }) => {
  const [{ fail }] = useContext(Context);
  const { active } = fail || { active: false };

  return (
    <div className='buttons'>
      <Btn className='restart' active={active || false} index={0} setKey={setKey} />
      <Btn className='home' active={active || false} index={1} setKey={setKey} />
    </div>
  );
});

const Fail = memo(({ setKey }: { setKey: Dispatch<SetStateAction<number>> }) => {
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
        <Buttons setKey={setKey} />
      </div>
    </div>
  );
});
export default Fail;
