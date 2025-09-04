import { fadeOutSound, playSound } from '@/components/sounds';
import useTween from 'lesca-use-tween';
import { memo, useEffect } from 'react';
import './index.less';

const Print = memo(({ active, index }: { active: boolean; index: number }) => {
  const [style, setStyle] = useTween({ opacity: 0, scale: 0.9 });
  useEffect(() => {
    if (active) {
      setStyle(
        { opacity: 1, scale: 1 },
        {
          duration: 100,
          delay: 3000 + index * 1000,
          onStart: () => {
            if (index === 0) playSound('ghost');
          },
          onEnd: () => {
            setTimeout(() => {
              setStyle(
                { opacity: 0 },
                {
                  duration: 5000,
                  onEnd: () => {
                    fadeOutSound('ghost');
                  },
                },
              );
            }, 5000);
          },
        },
      );
    }
  }, [active]);
  return <div style={style} />;
});

const Handprint = memo(({ active }: { active: boolean }) => {
  return (
    <div className='handprint'>
      <div>
        <div>
          <div>
            {[...new Array(2).keys()].map((index) => (
              <Print key={`hand-${index}`} active={active} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});
export default Handprint;
