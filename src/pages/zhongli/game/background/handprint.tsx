import { fadeOutSound, playSound } from '@/components/sounds';
import useTween from 'lesca-use-tween';
import { memo, useEffect } from 'react';
import './index.less';

const Print = memo(
  ({ active, index, onEnd }: { active: boolean; index: number; onEnd: () => void }) => {
    const [style, setStyle] = useTween({ opacity: 0, scale: 0.9 });
    useEffect(() => {
      if (active) {
        setStyle(
          { opacity: 1, scale: 1 },
          {
            duration: 100,
            delay: 3000 + index * 1000,
            onStart: () => {
              if (index === 0) playSound('ghost2');
            },
            onEnd: () => {
              setTimeout(() => {
                setStyle(
                  { opacity: 0 },
                  {
                    duration: 5000,
                    onEnd: () => {
                      fadeOutSound('ghost2');
                    },
                  },
                );
              }, 5000);
              if (index === 1) {
                onEnd();
              }
            },
          },
        );
      }
    }, [active]);
    return <div style={style} />;
  },
);

const Handprint = memo(({ active, onEnd }: { active: boolean; onEnd: () => void }) => {
  return (
    <div className='handprint'>
      <div>
        <div>
          <div>
            {[...new Array(2).keys()].map((index) => (
              <Print key={`hand-${index}`} active={active} index={index} onEnd={onEnd} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});
export default Handprint;
