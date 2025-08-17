import { memo, useContext, useEffect, useId } from 'react';
import './index.less';
import { HomeContext, HomePageType, HomeStepType } from '../../config';
import useTween from 'lesca-use-tween';
import Click from 'lesca-click';
import { ChooseContext } from '../config';

const Button = memo(() => {
  const id = useId();
  const [{ index }] = useContext(ChooseContext);
  const [{ step, page }] = useContext(HomeContext);
  const [style, setStyle] = useTween({ opacity: 0, scale: 2 });

  useEffect(() => {
    if (step >= HomeStepType.fadeIn && page === HomePageType.choose) {
      setStyle({ opacity: 1, scale: 1 }, { duration: 500, delay: 1500 });
    }
  }, [page, step]);

  useEffect(() => {
    Click.add(`#${id}`, () => {
      console.log(index);
    });
  }, [index]);

  return (
    <div className='Button'>
      <div id={id} className='button' style={style}>
        <div>
          <div />
        </div>
      </div>
    </div>
  );
});
export default Button;
