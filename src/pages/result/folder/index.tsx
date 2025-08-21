import CoverNode from '@/components/coverNode';
import { memo, useContext, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import './index.less';
import { Context } from '@/settings/constant';
import { ResultContext, ResultStepType } from '../config';
import useTween from 'lesca-use-tween';

const Stamp = memo(() => {
  const [{ step }] = useContext(ResultContext);
  const [style, setStyle] = useTween({ opacity: 0, scale: 3 });
  const [shake, setShake] = useState(false);

  useEffect(() => {
    if (step === ResultStepType.loaded) {
      setStyle(
        { opacity: 1, scale: 1 },
        {
          duration: 200,
          delay: 500,
          onEnd: () => {
            setShake(true);
          },
        },
      );
    }
  }, [step]);
  return <div style={style} className={twMerge(shake && 'animate-shock')} />;
});

const Folder = memo(() => {
  const [{ location }] = useContext(Context);
  const [{ step }] = useContext(ResultContext);

  const [style, setStyle] = useTween({ opacity: 0 });

  useEffect(() => {
    if (step === ResultStepType.loaded) {
      setStyle({ opacity: 1 });
    }
  }, [step]);

  return (
    <div className='Folder' style={style}>
      <CoverNode>
        <div className='bg-cover'>
          <div className={twMerge('file', `file-${location || 'taipei'}`)}>
            <div>
              <div>
                <Stamp />
              </div>
            </div>
          </div>
        </div>
      </CoverNode>
    </div>
  );
});

export default Folder;
