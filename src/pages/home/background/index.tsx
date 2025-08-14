import { IReactProps } from '@/settings/type';
import { CoverSize } from 'lesca-number';
import useTween from 'lesca-use-tween';
import { memo, useContext, useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { HomeContext, HomeStepType } from '../config';
import './index.less';

const CoverNode = ({ children, index }: IReactProps & { index: number }) => {
  const [state] = useContext(HomeContext);

  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0, top: 0, left: 0 });
  useEffect(() => {
    const resize = () => {
      if (ref.current) {
        setSize(
          CoverSize(
            { width: 1280, height: 1920 },
            { width: ref.current.clientWidth, height: ref.current.clientHeight },
          ),
        );
      }
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);
  return (
    <div
      ref={ref}
      className={twMerge(
        'absolute top-0 left-0 h-full w-full',
        state.locationIndex === index ? 'visible' : 'invisible',
      )}
    >
      <div
        className='absolute'
        style={{
          width: `${size.width}px`,
          height: `${size.height}px`,
          top: `${size.top}px`,
          left: `${size.left}px`,
        }}
      >
        {children}
      </div>
    </div>
  );
};

const Background = memo(() => {
  const [state] = useContext(HomeContext);
  const [style, setStyle] = useTween({ opacity: 0 });
  const { step } = state;

  useEffect(() => {
    if (step === HomeStepType.fadeIn) {
      setStyle({ opacity: 1 }, { duration: 2000 });
    }
  }, [step]);

  return (
    <div className='Background h-full w-full' style={style}>
      {[...new Array(3).keys()].map((index) => {
        return (
          <CoverNode key={`bg-${index}`} index={index}>
            <div className={`bg-${index}`}></div>
          </CoverNode>
        );
      })}
    </div>
  );
});

export default Background;
