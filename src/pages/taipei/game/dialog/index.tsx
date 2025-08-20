import useTween, { Bezier } from 'lesca-use-tween';
import { memo, useContext, useEffect, useId, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { TaipeiGameContext, TaipeiGameStepType } from '../config';
import './index.less';
import Click from 'lesca-click';

const Text = memo(({ index }: { index: number }) => {
  const [style, setStyle] = useTween({
    opacity: 0,
    y: index === 0 ? 0 : 50,
    scale: index !== 0 ? 1 : 2,
  });
  useEffect(() => {
    setStyle(
      { opacity: 1, y: 0, scale: 1 },
      { duration: index === 0 ? 300 : 500, delay: 800 + (index === 0 ? 0 : 300) + index * 100 },
    );
  }, []);
  return <div className={`text-${index}`} style={style} />;
});

const Image = memo(() => {
  const [style, setStyle] = useTween({ opacity: 0, scale: 0, rotate: 60 });
  useEffect(() => {
    setStyle(
      { opacity: 1, scale: 1, rotate: 0 },
      { duration: 500, delay: 1800, easing: Bezier.outBack },
    );
  }, []);
  return <div className='image' style={style} />;
});

const Button = memo(({ setFadeOut }: { setFadeOut: (fadeOut: boolean) => void }) => {
  const id = useId();
  const [style, setStyle] = useTween({ opacity: 0, scale: 2 });

  const [active, setActive] = useState(false);
  useEffect(() => {
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
  }, []);

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

const Dialog = memo(() => {
  const [style, setStyle] = useTween({ opacity: 0 });
  const [{ step }, setState] = useContext(TaipeiGameContext);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (step === TaipeiGameStepType.unset) setStyle({ opacity: 1 }, 800);
  }, [step]);

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
    <div className={twMerge('Dialog', step === TaipeiGameStepType.unset ? 'visible' : 'invisible')}>
      <div className='dialog' style={style}>
        <div>
          <div>
            <div className='ctx'>
              {[...new Array(5).keys()].map((index) => (
                <Text index={index} key={`text-${index}`} />
              ))}
              <Image />
              <Button setFadeOut={setFadeOut} />
              <div className='f25' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
export default Dialog;
