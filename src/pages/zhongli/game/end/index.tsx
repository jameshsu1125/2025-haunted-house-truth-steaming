import SteamText from '@/components/steamText';
import { GAME_END_WAIT_DURATION } from '@/settings/config';
import useTween from 'lesca-use-tween';
import { memo, useContext, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
import { ZhongliGameContext, ZhongliGameStepType } from '../config';
import './index.less';

const F25 = memo(() => {
  const [style, setStyle] = useTween({ opacity: 0, x: 100 });
  const [{ step }] = useContext(ZhongliGameContext);
  useEffect(() => {
    if (step === ZhongliGameStepType.end) {
      setStyle({ opacity: 1, x: 0 }, 800);
    }
  }, [step]);

  return <div className='t0' style={style} />;
});

const OutlineText = memo(() => {
  const [style, setStyle] = useTween({ opacity: 0, scale: 1.2 });
  const [{ step }] = useContext(ZhongliGameContext);
  useEffect(() => {
    if (step === ZhongliGameStepType.end) {
      setStyle({ opacity: 1, scale: 1 }, { duration: 800, delay: 300 });
    }
  }, [step]);

  return <div className='t1' style={style} />;
});

const 去污 = memo(() => {
  const [style, setStyle] = useTween({ opacity: 0, y: 50 });
  const [{ step }] = useContext(ZhongliGameContext);
  useEffect(() => {
    if (step === ZhongliGameStepType.end) {
      setStyle({ opacity: 1, y: 0 }, { duration: 800, delay: 800 });
    }
  }, [step]);

  return <div className='t2' style={style} />;
});

const 點 = memo(() => {
  const [style, setStyle] = useTween({ opacity: 0 });
  const [{ step }] = useContext(ZhongliGameContext);
  useEffect(() => {
    if (step === ZhongliGameStepType.end) {
      setStyle({ opacity: 1 }, { duration: 800, delay: 1200 });
    }
  }, [step]);

  return <div className='t3' style={style} />;
});

const 我們來 = memo(() => {
  const [style, setStyle] = useTween({ opacity: 0, y: 50 });
  const [{ step }] = useContext(ZhongliGameContext);
  useEffect(() => {
    if (step === ZhongliGameStepType.end) {
      setStyle({ opacity: 1, y: 0 }, { duration: 800, delay: 1200 });
    }
  }, [step]);

  return <div className='t4' style={style} />;
});

const 蒸 = memo(() => {
  const [style, setStyle] = useTween({ opacity: 0 });
  const [{ step }] = useContext(ZhongliGameContext);
  useEffect(() => {
    if (step === ZhongliGameStepType.end) {
      setStyle({ opacity: 1 }, { duration: 800, delay: 2500 });
    }
  }, [step]);

  return (
    <div className='steam-text' style={style}>
      <SteamText scale={0.76} noise={{ x: 50, y: 50 }} />
    </div>
  );
});

const 的 = memo(() => {
  const [style, setStyle] = useTween({ opacity: 0 });
  const [{ step }] = useContext(ZhongliGameContext);
  useEffect(() => {
    if (step === ZhongliGameStepType.end) {
      setStyle({ opacity: 1 }, { duration: 800, delay: 2500 });
    }
  }, [step]);

  return <div className='t5' style={style} />;
});

const Touch = memo(() => {
  const [{ step }, setState] = useContext(ZhongliGameContext);

  useEffect(() => {
    if (step === ZhongliGameStepType.end) {
      setTimeout(
        () => {
          setState((S) => ({ ...S, step: ZhongliGameStepType.fadeOut }));
        },
        GAME_END_WAIT_DURATION + 2500 + 800,
      ); // Wait for 5 seconds before fading out
    }
  }, [step]);

  const onPointerDown = () => {
    setState((S) => ({ ...S, step: ZhongliGameStepType.fadeOut }));
  };

  return (
    <div
      className={twMerge(
        'absolute top-0 left-0 h-full w-full',
        step === ZhongliGameStepType.end ? 'visible' : 'invisible',
      )}
      onPointerDown={onPointerDown}
    />
  );
});

const End = memo(() => {
  const [{ step }] = useContext(ZhongliGameContext);
  return (
    <>
      <div className={twMerge('End', step === ZhongliGameStepType.end ? 'visible' : 'invisible')}>
        <div>
          <div>
            <div>
              <div className='row'>
                <F25 />
                <OutlineText />
              </div>
              <div className='row justify-between'>
                <div className='c1'>
                  <去污 />
                  <點 />
                  <我們來 />
                </div>
                <的 />
              </div>
              <蒸 />
            </div>
          </div>
        </div>
      </div>
      <Touch />
    </>
  );
});
export default End;
