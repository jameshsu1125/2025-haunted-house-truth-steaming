import Click from 'lesca-click';
import useTween, { Bezier } from 'lesca-use-tween';
import { memo, useContext, useEffect, useId, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { TaipeiContext, TaipeiPageType } from '../../config';
import { TaipeiGameContext, TaipeiGameStepType } from '../config';
import './index.less';

const Text = memo(({ index }: { index: number }) => {
  const [{ page }] = useContext(TaipeiContext);
  const [style, setStyle] = useTween({
    opacity: 0,
    y: index === 0 ? 0 : 50,
    scale: index !== 0 ? 1 : 2,
  });
  useEffect(() => {
    if (page !== TaipeiPageType.game) return;
    setStyle(
      { opacity: 1, y: 0, scale: 1 },
      { duration: index === 0 ? 300 : 500, delay: 800 + (index === 0 ? 0 : 300) + index * 100 },
    );
  }, [page]);
  return <div className={`text-${index}`} style={style} />;
});

const Image = memo(() => {
  const [{ page }] = useContext(TaipeiContext);
  const [style, setStyle] = useTween({ opacity: 0, scale: 0, rotate: 90 });
  useEffect(() => {
    if (page !== TaipeiPageType.game) return;
    setStyle({ opacity: 1, scale: 1, rotate: 0 }, { duration: 500, delay: 1800 });
  }, [page]);
  return <div className='image' style={style} />;
});

const Button = memo(({ setFadeOut }: { setFadeOut: (fadeOut: boolean) => void }) => {
  const [{ page }] = useContext(TaipeiContext);
  const id = useId();
  const [style, setStyle] = useTween({ opacity: 0, scale: 2 });

  const [active, setActive] = useState(false);
  useEffect(() => {
    if (page !== TaipeiPageType.game) return;
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

const F25 = memo(() => {
  const [{ page }] = useContext(TaipeiContext);
  const [style, setStyle] = useTween({ opacity: 0, x: 50 });
  useEffect(() => {
    if (page !== TaipeiPageType.game) return;
    setStyle({ opacity: 1, x: 0 }, { duration: 500, delay: 2800, easing: Bezier.outBack });
  }, [page]);

  return <div className='f25' style={style} />;
});

const Dialog = memo(() => {
  const [style, setStyle] = useTween({ opacity: 0, scale: 0.2 });
  const [{ step }, setState] = useContext(TaipeiGameContext);
  const [{ page }] = useContext(TaipeiContext);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (page === TaipeiPageType.game && step === TaipeiGameStepType.unset)
      setStyle({ opacity: 1, scale: 1 }, { duration: 500 });
  }, [step, page]);

  useEffect(() => {
    if (fadeOut) {
      setStyle(
        { opacity: 0 },
        {
          duration: 500,
          onEnd: () => setState((S) => ({ ...S, step: TaipeiGameStepType.start })),
        },
      );
    }
  }, [fadeOut]);

  return (
    <div
      className={twMerge(
        'Dialog',
        page === TaipeiPageType.game && step === TaipeiGameStepType.unset ? 'visible' : 'invisible',
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
              <F25 />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
export default Dialog;
