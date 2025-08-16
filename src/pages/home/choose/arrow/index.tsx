import { memo, useContext } from 'react';
import { ChooseContext, ChooseStepType } from '../config';
import './index.less';

const Arrow = memo(() => {
  const [{ step }, setState] = useContext(ChooseContext);
  return (
    <div className='Arrow'>
      <div className='cistern'>
        <div
          onClick={() => {
            if (step === ChooseStepType.unset) {
              setState((S) => ({
                ...S,
                step: ChooseStepType.fadeOut,
                lastIndex: S.index,
                index: (S.index + 2) % 3,
              }));
            }
          }}
        >
          <div />
        </div>
        <div
          onClick={() => {
            if (step === ChooseStepType.unset) {
              setState((S) => ({
                ...S,
                step: ChooseStepType.fadeOut,
                lastIndex: S.index,
                index: (S.index + 1) % 3,
              }));
            }
          }}
        >
          <div />
        </div>
      </div>
    </div>
  );
});
export default Arrow;
