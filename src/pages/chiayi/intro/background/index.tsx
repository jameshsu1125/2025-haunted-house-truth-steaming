import { memo, useContext, useEffect, useRef, useState } from 'react';
import './index.less';
import useTween, { Bezier } from 'lesca-use-tween';
import { ChiayiContext, ChiayiPageType } from '../../config';
import { ChiayiIntroContext, ChiayiIntroStepType } from '../config';

const DarkScreen = memo(() => {
  const [{ page }] = useContext(ChiayiContext);
  const [{ step }] = useContext(ChiayiIntroContext);
  const [style, setStyle] = useTween({ opacity: 1 });

  useEffect(() => {
    if (page === ChiayiPageType.intro) {
      if (step === ChiayiIntroStepType.unset) {
        setStyle({ opacity: 0 }, { duration: 1000, easing: Bezier.outQuart });
      } else if (step === ChiayiIntroStepType.entry) {
        setStyle({ opacity: 0.5 }, { duration: 800, easing: Bezier.inOutQuart });
      }
    }
  }, [page, step]);

  return <div className='darkScreen' style={style} />;
});

const Cat = memo(({ active }: { active: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useTween({ scale: 0.16, y: 1173, x: 0 });

  useEffect(() => {
    if (active) {
      setStyle(
        { scale: 0.5, y: -260 },
        {
          duration: 300,
          delay: 2400,
          easing: Bezier.easeIn,
          onEnd: () => {
            setStyle(
              { scale: 1, y: 0 },
              {
                onStart: () => {
                  ref.current!.style.zIndex = '1';
                },
                duration: 300,
                easing: Bezier.easeOut,
                onEnd: () => {
                  ref.current?.classList.add('animate-bigger-shock');
                  setStyle(
                    { scale: 0.99 },
                    {
                      duration: 300,
                      onEnd: () => {
                        ref.current!.style.visibility = 'hidden';
                      },
                    },
                  );
                },
              },
            );
          },
        },
      );
    }
  }, [active]);
  return <div ref={ref} style={style} className='cat' />;
});

const Background = memo(() => {
  const [{ page }, setState] = useContext(ChiayiContext);
  const [{ step }] = useContext(ChiayiIntroContext);
  const [style, setStyle] = useTween({ opacity: 0, scale: 1, y: 0, x: 0 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (page === ChiayiPageType.intro) {
      if (step === ChiayiIntroStepType.unset) {
        setStyle(
          { scale: 1.22, opacity: 1 },
          {
            duration: 3000,
            easing: Bezier.inQuart,
            onStart: () => {
              setActive(true);
            },
          },
        );
      } else if (step === ChiayiIntroStepType.entry) {
        setStyle(
          { scale: 1.5, opacity: 0, y: 100 },
          {
            duration: 800,
            easing: Bezier.inOutQuart,
            onEnd: () => setState((S) => ({ ...S, page: ChiayiPageType.game })),
          },
        );
      }
    }
  }, [page, step]);

  return (
    <div className='Background' style={style}>
      <DarkScreen />
      <Cat active={active} />
      <div className='well' />
    </div>
  );
});
export default Background;
