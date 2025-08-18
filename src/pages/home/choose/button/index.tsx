import { memo, useContext, useEffect, useId, useState } from 'react';
import './index.less';
import { HomeContext, HomePageType, HomeStepType } from '../../config';
import useTween from 'lesca-use-tween';
import Click from 'lesca-click';
import { ChooseContext } from '../config';
import { twMerge } from 'tailwind-merge';
import { PAGE } from '@/settings/config';
import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';

const Button = memo(() => {
  const [, setContext] = useContext(Context);
  const id = useId();
  const [{ index }] = useContext(ChooseContext);
  const [{ step, page }] = useContext(HomeContext);
  const [style, setStyle] = useTween({ opacity: 0, scale: 2 });

  const [status, setStatus] = useState(false);

  useEffect(() => {
    if (step >= HomeStepType.fadeIn && page === HomePageType.choose) {
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
