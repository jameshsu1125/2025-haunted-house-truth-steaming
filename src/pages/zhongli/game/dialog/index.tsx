import Click from 'lesca-click';
import useTween, { Bezier } from 'lesca-use-tween';
import { memo, useContext, useEffect, useId, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { ZhongliContext, ZhongliPageType } from '../../config';
import { ZhongliGameContext, ZhongliGameStepType } from '../config';
import './index.less';
import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';

const Text = memo(({ index }: { index: number }) => {
  const [{ page }] = useContext(ZhongliContext);
  const [style, setStyle] = useTween({
    opacity: 0,
    y: index === 0 ? 0 : 50,
    scale: index !== 0 ? 1 : 2,
  });
  useEffect(() => {
    if (page !== ZhongliPageType.game) return;
    setStyle(
      { opacity: 1, y: 0, scale: 1 },
      { duration: index === 0 ? 300 : 500, delay: 800 + (index === 0 ? 0 : 300) + index * 100 },
    );
  }, [page]);
  return <div className={`text-${index}`} style={style} />;
});

const Image = memo(() => {
  const [{ page }] = useContext(ZhongliContext);
  const [style, setStyle] = useTween({ opacity: 0, scale: 0, rotate: 90 });
  useEffect(() => {
    if (page !== ZhongliPageType.game) return;
    setStyle({ opacity: 1, scale: 1, rotate: 0 }, { duration: 500, delay: 1800 });
  }, [page]);
  return <div className='image' style={style} />;
});

const Button = memo(({ setFadeOut }: { setFadeOut: (fadeOut: boolean) => void }) => {
  const [{ page }] = useContext(ZhongliContext);
  const id = useId();
  const [style, setStyle] = useTween({ opacity: 0, scale: 2 });

  const [active, setActive] = useState(false);
  useEffect(() => {
    if (page !== ZhongliPageType.game) return;
    setStyle(
      { opacity: 1, scale: 1 },
      {
        duration: 500,
        delay: 2200,
        onEnd: () => {
          setActive(true);
          Click.add(`#${id}`, () => {
            Click.remove(`#${id}`);
            setActive(false);
            setFadeOut(true);
          });
        },
      },
    );
  }, [page]);

  return (
    <div
      id={id}
      className={twMerge('button', active && 'pointer-events-auto cursor-pointer')}
      style={style}
    >
      <div />
    </div>
  );
});

export const F25 = memo(() => {
  const [{ page }] = useContext(ZhongliContext);
  const [style, setStyle] = useTween({ opacity: 0, x: 50 });
  useEffect(() => {
    if (page !== ZhongliPageType.game) return;
    setStyle({ opacity: 1, x: 0 }, { duration: 500, delay: 2800, easing: Bezier.outBack });
  }, [page]);

  return <div className='f25' style={style} />;
});

const Dialog = memo(() => {
  const [, setContext] = useContext(Context);
  const [style, setStyle] = useTween({ opacity: 0, scale: 0.2 });
  const [{ step }, setState] = useContext(ZhongliGameContext);
  const [{ page }] = useContext(ZhongliContext);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (page === ZhongliPageType.game && step === ZhongliGameStepType.dialog) {
      setStyle({ opacity: 1, scale: 1 }, { duration: 500 });
      setContext({ type: ActionType.Fail, state: { enabled: false } });
    }
  }, [step, page]);

  useEffect(() => {
    if (fadeOut) {
      setStyle(
        { opacity: 0 },
        {
          duration: 500,
          onEnd: () => {
            setState((S) => ({ ...S, step: ZhongliGameStepType.underBed }));
          },
        },
      );
    }
  }, [fadeOut]);

  return (
    <div
      className={twMerge(
        'Dialog',
        page === ZhongliPageType.game && step === ZhongliGameStepType.dialog
          ? 'visible'
          : 'invisible',
      )}
    >
      <div className='dialog' style={style}>
        <div>
          <div>
            <div className='ctx'>
              {[...new Array(5).keys()].map((index) => (
                <Text index={index} key={`text-${index}`} />
              ))}
              <Image />
              <Button setFadeOut={setFadeOut} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
export default Dialog;
