import { memo, useContext, useEffect, useState } from 'react';
import './index.less';
import { TaipeiGameContext, TaipeiGameStepType } from '../config';
import useTween from 'lesca-use-tween';
import { twMerge } from 'tailwind-merge';

// let css = ``;
// [...new Array(100).keys()].forEach((e) => {
//   const v = Math.random();
//   css += `${e}% {
//     opacity: ${v}
//     }
// `;
// });
// console.log(css);

const Error = memo(() => {
  const [style, setStyle] = useTween({ opacity: 0 });
  const [{ isError, step }] = useContext(TaipeiGameContext);
  const [blank, setBlank] = useState(false);

  useEffect(() => {
    if (step !== TaipeiGameStepType.start) return;
    if (isError) {
      setStyle(
        { opacity: 1 },
        {
          duration: 100,
          onEnd: () => {
            setBlank(true);
          },
        },
      );
    }
  }, [step, isError]);

  return <div className={twMerge('Error', blank && 'animate-blank-1s')} style={style} />;
});
export default Error;
