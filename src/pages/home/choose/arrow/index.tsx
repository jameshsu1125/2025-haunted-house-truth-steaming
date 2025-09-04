import { memo, useContext, useEffect, useId } from 'react';
import { ChooseContext, ChooseStepType } from '../config';
import './index.less';
import Click from 'lesca-click';
import { playSound } from '@/components/sounds';
import Gtag from 'lesca-gtag';

const Arrow = memo(() => {
  const leftArrowId = useId();
  const rightArrowId = useId();

  const [{ step }, setState] = useContext(ChooseContext);

  useEffect(() => {
    Click.add(`#${leftArrowId}`, () => {
      if (step === ChooseStepType.unset) {
        setState((S) => ({
          ...S,
          step: ChooseStepType.fadeOut,
          lastIndex: S.index,
          index: (S.index + 2) % 3,
        }));
        playSound('flap');
        Gtag.event('Choose', 'previous');
      }
    });
    Click.add(`#${rightArrowId}`, () => {
      if (step === ChooseStepType.unset) {
        setState((S) => ({
          ...S,
          step: ChooseStepType.fadeOut,
          lastIndex: S.index,
          index: (S.index + 1) % 3,
        }));
        playSound('flap');
        Gtag.event('Choose', 'next');
      }
    });
  }, [step]);

  return (
    <div className='Arrow'>
      <div className='cistern'>
        <div id={leftArrowId} className='[&_*]:pointer-events-none'>
          <div />
        </div>
        <div id={rightArrowId} className='[&_*]:pointer-events-none'>
          <div />
        </div>
      </div>
    </div>
  );
});
export default Arrow;
