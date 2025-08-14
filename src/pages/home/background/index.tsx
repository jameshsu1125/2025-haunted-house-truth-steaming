import { memo, useEffect, useRef, useState } from 'react';
import './index.less';
import { IReactProps } from '@/settings/type';
import { CoverSize } from 'lesca-number';

const CoverNode = ({ children }: IReactProps) => {
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
    <div ref={ref} className='absolute top-0 left-0 h-full w-full'>
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
  useEffect(() => {}, []);
  return (
    <div className='Background h-full w-full'>
      {[...new Array(3).keys()].map((index) => {
        return (
          <CoverNode key={`bg-${index}`}>
            <div className={`bg-${index}`}></div>
          </CoverNode>
        );
      })}
    </div>
  );
});

export default Background;
