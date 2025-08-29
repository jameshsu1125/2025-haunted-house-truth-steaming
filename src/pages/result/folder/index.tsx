import CoverNode from '@/components/coverNode';
import { memo, useContext, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import './index.less';
import { Context } from '@/settings/constant';
import { ResultContext, ResultStepType } from '../config';
import useTween from 'lesca-use-tween';
import { IReactProps } from '@/settings/type';

const Stamp = memo(() => {
  const [{ step }] = useContext(ResultContext);
  const [style, setStyle] = useTween({ opacity: 0, scale: 3 });
  const [shake, setShake] = useState(false);

  useEffect(() => {
    if (step === ResultStepType.entry) {
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

const Photo = memo(({ children }: IReactProps) => {
  const [{ location }] = useContext(Context);
  const [{ step }] = useContext(ResultContext);
  const [style, setStyle] = useTween({ opacity: 0, y: -50, x: 20 });

  useEffect(() => {
    if (step === ResultStepType.entry) {
      setStyle({ opacity: 1, y: 0, x: 0 }, { duration: 500 });
    }
  }, [step]);

  return (
    <div className={twMerge('file', `file-${location || 'taipei'}`)} style={style}>
      <div>
        <div>{children}</div>
      </div>
    </div>
  );
});

const Folder = memo(() => {
  const [{ step, name }] = useContext(ResultContext);

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
          <div className='name'>{name}</div>
          <Photo>
            <Stamp />
          </Photo>
        </div>
      </CoverNode>
    </div>
  );
});

export default Folder;
