import { playSound } from '@/components/sounds';
import { PAGE } from '@/settings/config';
import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import Click from 'lesca-click';
import useTween from 'lesca-use-tween';
import { memo, useContext, useEffect, useId, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { HomeContext, HomePageType, HomeState, HomeStepType } from '../../config';
import { ChooseContext, ChooseState } from '../config';
import './index.less';
import Gtag from 'lesca-gtag';

const Button = memo(() => {
  const [, setContext] = useContext(Context);
  const id = useId();
  const [{ index }, setChooseState] = useContext(ChooseContext);
  const [{ step, page }, setHomeState] = useContext(HomeContext);
  const [style, setStyle] = useTween({ opacity: 0, scale: 2 });

  const [status, setStatus] = useState(false);

  useEffect(() => {
    if (step >= HomeStepType.FadeIn && page === HomePageType.Choose) {
      setStyle(
        { opacity: 1, scale: 1 },
        {
          duration: 500,
          delay: 1500,
          onEnd: () => {
            setStatus(true);
          },
        },
      );
    }
  }, [page, step]);

  useEffect(() => {
    Click.add(`#${id}`, () => {
      const page = [PAGE.taipei, PAGE.zhongli, PAGE.chiayi][Math.max(Math.min(index, 2), 0)];
      setContext({ type: ActionType.Page, state: page });
      setContext({ type: ActionType.Location, state: page });

      setChooseState(ChooseState);
      setHomeState({ ...HomeState, page: HomePageType.Choose });

      playSound('click');

      Gtag.event('Choose', page);
    });
  }, [index]);

  return (
    <div className='Button'>
      <div id={id} className={twMerge('button', status && 'cursor-pointer')} style={style}>
        <div>
          <div />
        </div>
      </div>
    </div>
  );
});
export default Button;
