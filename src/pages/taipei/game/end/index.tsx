import { memo, useContext, useEffect } from 'react';
import './index.less';
import SteamText from '@/components/steamText';
import { TaipeiGameContext, TaipeiGameStepType } from '../config';
import { twMerge } from 'tailwind-merge';
import useTween from 'lesca-use-tween';

const F25 = memo(() => {
  const [style, setStyle] = useTween({ opacity: 0, x: 100 });
  const [{ step }] = useContext(TaipeiGameContext);
  useEffect(() => {
    if (step === TaipeiGameStepType.end) {
      setStyle({ opacity: 1, x: 0 }, 800);
    }
  }, [step]);

  return <div className='t0' style={style} />;
});

const OutlineText = memo(() => {
  const [style, setStyle] = useTween({ opacity: 0, scale: 1.2 });
  const [{ step }] = useContext(TaipeiGameContext);
  useEffect(() => {
    if (step === TaipeiGameStepType.end) {
      setStyle({ opacity: 1, scale: 1 }, { duration: 800, delay: 300 });
    }
  }, [step]);

  return <div className='t1' style={style} />;
});

const 去污 = memo(() => {
  const [style, setStyle] = useTween({ opacity: 0, y: 50 });
  const [{ step }] = useContext(TaipeiGameContext);
  useEffect(() => {
    if (step === TaipeiGameStepType.end) {
      setStyle({ opacity: 1, y: 0 }, { duration: 800, delay: 800 });
    }
  }, [step]);

  return <div className='t2' style={style} />;
});

const 點 = memo(() => {
  const [style, setStyle] = useTween({ opacity: 0 });
  const [{ step }] = useContext(TaipeiGameContext);
  useEffect(() => {
    if (step === TaipeiGameStepType.end) {
      setStyle({ opacity: 1 }, { duration: 800, delay: 1200 });
    }
  }, [step]);

  return <div className='t3' style={style} />;
});

const 我們來 = memo(() => {
  const [style, setStyle] = useTween({ opacity: 0, y: 50 });
  const [{ step }] = useContext(TaipeiGameContext);
  useEffect(() => {
    if (step === TaipeiGameStepType.end) {
      setStyle({ opacity: 1, y: 0 }, { duration: 800, delay: 1200 });
    }
  }, [step]);

  return <div className='t4' style={style} />;
});

const 蒸 = memo(() => {
  const [style, setStyle] = useTween({ opacity: 0 });
  const [{ step }] = useContext(TaipeiGameContext);
  useEffect(() => {
    if (step === TaipeiGameStepType.end) {
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
  const [{ step }] = useContext(TaipeiGameContext);
  useEffect(() => {
    if (step === TaipeiGameStepType.end) {
      setStyle({ opacity: 1 }, { duration: 800, delay: 2500 });
    }
  }, [step]);

  return <div className='t5' style={style} />;
});

const End = memo(() => {
  const [{ step }] = useContext(TaipeiGameContext);
  return (
    <div className={twMerge('End', step === TaipeiGameStepType.end ? 'visible' : 'invisible')}>
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
  );
});
export default End;
