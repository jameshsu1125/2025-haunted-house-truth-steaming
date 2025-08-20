import { memo, useContext } from 'react';
import { TaipeiGameContext, TaipeiGameStepType } from '../config';
import './index.less';

const Dirt = memo(() => {
  const [{ step }, setState] = useContext(TaipeiGameContext);
  const onPointerDown = () => {
    if (step === TaipeiGameStepType.start) {
      setState((S) => ({ ...S, step: TaipeiGameStepType.dirt }));
    }
  };

  return (
    <div className='Dirt'>
      <div onPointerDown={onPointerDown}>
        <div />
      </div>
    </div>
  );
});
export default Dirt;
