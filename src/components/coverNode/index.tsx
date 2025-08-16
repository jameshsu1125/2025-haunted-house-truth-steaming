import { IReactProps } from '@/settings/type';
import { CoverSize } from 'lesca-number';
import { memo, useEffect, useRef, useState } from 'react';

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
    <div ref={ref} className='absolute top-0 left-0 h-full w-full overflow-hidden'>
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

export default memo(CoverNode);
