import Click from 'lesca-click';
import useTween from 'lesca-use-tween';
import { memo, useContext, useEffect, useId } from 'react';
import { ResultContext, ResultStepType } from '../config';

const Input = memo(({ active }: { active: boolean }) => {
  const [, setState] = useContext(ResultContext);
  const [style, setStyle] = useTween({ opacity: 0, y: 50 });

  useEffect(() => {
    if (active) {
      setStyle({ opacity: 1, y: 0 }, { duration: 500 });
    }
  }, [active]);

  return (
    <div className='input' style={style}>
      <input
        placeholder='輸入你的暱稱'
        type='text'
        name='nickName'
        onChange={(e) => {
          setState((S) => ({
            ...S,
            name: e.target.value === '' ? '輸入你的暱稱' : e.target.value,
          }));
        }}
      />
    </div>
  );
});

const Button = memo(({ active }: { active: boolean }) => {
  const id = useId();
  const [style, setStyle] = useTween({ opacity: 0, y: 50 });
  const [, setState] = useContext(ResultContext);

  useEffect(() => {
    if (active) {
      setStyle(
        { opacity: 1, y: 0 },
        {
          duration: 500,
          delay: 200,
          onEnd: () => {
            Click.add(`#${id}`, () => {
              setState((S) => ({ ...S, step: ResultStepType.formFadeOut }));
            });
          },
        },
      );
    }
  }, [active]);

  return <div id={id} className='button' style={style} />;
});

const DarkScreen = memo(({ active }: { active: boolean }) => {
  const [style, setStyle] = useTween({ opacity: 0 });

  useEffect(() => {
    if (active) setStyle({ opacity: 0.4 }, { duration: 500 });
  }, [active]);

  return <div className='absolute top-0 h-full w-full bg-black' style={style} />;
});

const Forms = memo(() => {
  const [{ step }, setState] = useContext(ResultContext);
  const [style, setStyle] = useTween({ opacity: 1 });

  useEffect(() => {
    if (step === ResultStepType.formFadeOut) {
      setStyle(
        { opacity: 0 },
        {
          duration: 500,
          onEnd: () => setState((S) => ({ ...S, step: ResultStepType.entry })),
        },
      );
    }
  }, [step]);

  return (
    <div className='forms' style={style}>
      <DarkScreen active={step === ResultStepType.loaded} />
      <div className='modal'>
        <Input active={step === ResultStepType.loaded} />
        <Button active={step === ResultStepType.loaded} />
      </div>
    </div>
  );
});
export default Forms;
