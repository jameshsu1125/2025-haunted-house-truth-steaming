import { memo, useEffect } from 'react';
import './index.less';
import useTween from 'lesca-use-tween';

const Ink = memo(({ style, index }: { style: React.CSSProperties; index: number }) => {
  const [tweenStyle, setStyle] = useTween({ opacity: 0 });

  useEffect(() => {
    setStyle({ opacity: 1 }, { delay: 100 * index });
  }, []);

  return <div className='ink' style={{ ...style, ...tweenStyle }} />;
});

const Fail = memo(() => {
  useEffect(() => {}, []);
  return (
    <div className='Fail'>
      <div>
        {[...new Array(10).keys()].map((index) => {
          const rotate = Math.floor(Math.random() * 360);
          const x = -100 + Math.floor(Math.random() * 200);
          const y = -100 + Math.floor(Math.random() * 200);
          const scale = 0.8 + Math.random() * 0.2;
          return (
            <Ink
              key={`ink-${index}`}
              index={index}
              style={{
                transform: `translate(${x}px, ${y}px) scale(${scale}) rotate(${rotate}deg)`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
});
export default Fail;
