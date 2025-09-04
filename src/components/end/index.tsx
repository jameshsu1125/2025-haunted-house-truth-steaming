import SteamText from '@/components/steamText';
import { GAME_END_WAIT_DURATION } from '@/settings/config';
import useTween from 'lesca-use-tween';
import { memo, useEffect, useRef } from 'react';
import { twMerge } from 'tailwind-merge';
import './index.less';

const F25 = memo(({ visible }: { visible: boolean }) => {
  const [style, setStyle] = useTween({ opacity: 0, x: 100 });
  useEffect(() => {
    if (visible) setStyle({ opacity: 1, x: 0 }, 800);
  }, [visible]);

  return <div className='t0' style={style} />;
});

const OutlineText = memo(({ visible }: { visible: boolean }) => {
  const [style, setStyle] = useTween({ opacity: 0, scale: 1.2 });
  useEffect(() => {
    if (visible) setStyle({ opacity: 1, scale: 1 }, { duration: 800, delay: 300 });
  }, [visible]);

  return <div className='t1' style={style} />;
});

const 去污 = memo(({ visible }: { visible: boolean }) => {
  const [style, setStyle] = useTween({ opacity: 0, y: 50 });
  useEffect(() => {
    if (visible) setStyle({ opacity: 1, y: 0 }, { duration: 800, delay: 1500 });
  }, [visible]);

  return <div className='t2' style={style} />;
});

const 點 = memo(({ visible }: { visible: boolean }) => {
  const [style, setStyle] = useTween({ opacity: 0 });
  useEffect(() => {
    if (visible) setStyle({ opacity: 1 }, { duration: 800, delay: 2000 });
  }, [visible]);

  return <div className='t3' style={style} />;
});

const 我們來 = memo(({ visible }: { visible: boolean }) => {
  const [style, setStyle] = useTween({ opacity: 0, y: 50 });

  useEffect(() => {
    if (visible) setStyle({ opacity: 1, y: 0 }, { duration: 800, delay: 2500 });
  }, [visible]);

  return <div className='t4' style={style} />;
});

const 蒸 = memo(({ visible }: { visible: boolean }) => {
  const [style, setStyle] = useTween({ opacity: 0 });
  useEffect(() => {
    if (visible) setStyle({ opacity: 1 }, { duration: 800, delay: 3500 });
  }, [visible]);

  return (
    <div className='steam-text' style={style}>
      <SteamText scale={0.65} noise={{ x: 50, y: 50 }} />
    </div>
  );
});

const 的 = memo(({ visible }: { visible: boolean }) => {
  const [style, setStyle] = useTween({ opacity: 0 });

  useEffect(() => {
    if (visible) setStyle({ opacity: 1 }, { duration: 800, delay: 3500 });
  }, [visible]);

  return <div className='t5' style={style} />;
});

const Touch = memo(
  ({ visible, onPointerDown }: { visible: boolean; onPointerDown: () => void }) => (
    <div
      className={twMerge('absolute top-0 left-0 h-full w-full', visible ? 'visible' : 'invisible')}
      onPointerDown={onPointerDown}
    />
  ),
);

const 蒸氣熱水雙效洗地機 = memo(({ visible }: { visible: boolean }) => {
  const [style, setStyle] = useTween({ opacity: 0, y: 50 });

  useEffect(() => {
    if (visible) setStyle({ opacity: 1, y: 0 }, { duration: 800, delay: 800 });
  }, [visible]);
  return <div className='t6' style={style} />;
});

const Line = memo(({ visible }: { visible: boolean }) => {
  const [style, setStyle] = useTween({ opacity: 0, y: 50 });

  useEffect(() => {
    if (visible) setStyle({ opacity: 1, y: 0 }, { duration: 800, delay: 1000 });
  }, [visible]);
  return <div className='line' style={style} />;
});

const End = memo(
  ({
    visible,
    onPointerDown,
    onFadeOut,
  }: {
    visible: boolean;
    onPointerDown: () => void;
    onFadeOut?: () => void;
  }) => {
    const ref = useRef<ReturnType<typeof setTimeout>>(null);
    useEffect(() => {
      if (visible) {
        ref.current = setTimeout(() => onFadeOut?.(), GAME_END_WAIT_DURATION + 2500 + 800);
      }
      return () => {
        if (ref.current) clearTimeout(ref.current);
      };
    }, [visible]);

    return (
      <>
        <div className={twMerge('End', visible ? 'visible' : 'invisible')}>
          <div>
            <div>
              <div>
                <div className='row'>
                  <F25 visible={visible} />
                  <OutlineText visible={visible} />
                </div>
                <div className='row'>
                  <蒸氣熱水雙效洗地機 visible={visible} />
                </div>
                <div className='row'>
                  <Line visible={visible} />
                </div>
                <div className='row justify-between'>
                  <div className='c1'>
                    <去污 visible={visible} />
                    <點 visible={visible} />
                    <我們來 visible={visible} />
                  </div>
                  <的 visible={visible} />
                </div>
                <蒸 visible={visible} />
              </div>
            </div>
          </div>
        </div>
        <Touch visible={visible} onPointerDown={onPointerDown} />
      </>
    );
  },
);
export default End;
