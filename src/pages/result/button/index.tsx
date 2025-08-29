import { ActionType, IReactProps } from '@/settings/type';
import Click from 'lesca-click';
import useTween from 'lesca-use-tween';
import { memo, useContext, useEffect, useId, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { ResultContext, ResultStepType } from '../config';
import './index.less';
import { Context } from '@/settings/constant';
import { PAGE } from '@/settings/config';
import { HomePageType } from '@/pages/home/config';

let index = 0;

const TweenProvider = ({ children, className }: IReactProps & { className: string }) => {
  const [, setContext] = useContext(Context);
  const id = useId();
  const [{ step }] = useContext(ResultContext);
  const [style, setStyle] = useTween({ opacity: 0, y: 50 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (step === ResultStepType.entry) {
      setStyle(
        { opacity: 1, y: 0 },
        { duration: 500, delay: 1500 + 100 * index++, onEnd: () => setActive(true) },
      );
    }
  }, [step]);

  useEffect(() => {
    if (active) {
      Click.add(`#${id}`, () => {
        if (className === 'share') {
          console.log('share button clicked');
        } else if (className === 'again') {
          setContext({
            type: ActionType.Redirect,
            state: { enabled: true, category: HomePageType.choose },
          });
          setContext({ type: ActionType.Page, state: PAGE.home });
        }
      });
    }
  }, [active]);

  return (
    <div id={id} style={style} className={twMerge(className, active && 'cursor-pointer')}>
      {children}
    </div>
  );
};

const Button = memo(() => {
  useEffect(() => {}, []);
  return (
    <div className='Button'>
      <TweenProvider className='share' />
      <TweenProvider className='again' />
    </div>
  );
});
export default Button;
