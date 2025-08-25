import ScratchCard from 'lesca-react-scratch-card';
import { memo, useContext, useEffect, useMemo, useRef, useState } from 'react';
import Cover from './img/card-cover.jpg';
import './index.less';
import { ZhongliGameContext, ZhongliGameStepType } from '../config';
import useTween from 'lesca-use-tween';

const Vacuum = memo(({ position }: { position: { x: number; y: number } }) => {
  const [{ step }] = useContext(ZhongliGameContext);
  const [style, setStyle] = useTween({ opacity: 1 });

  const itemRef = useRef<HTMLDivElement>(null);
  const { x, y } = useMemo(() => {
    return {
      x: position.x - (itemRef.current?.offsetWidth || 0) / 2,
      y: position.y - (itemRef.current?.offsetWidth || 0) / 2,
    };
  }, [position]);

  useEffect(() => {
    if (step === ZhongliGameStepType.dialog) {
      setStyle({ opacity: 0 }, { duration: 300 });
    }
  }, [step]);

  return (
    <div>
      <div className='vacuum'>
        <div>
          <div>
            <div>
              <div
                ref={itemRef}
                className='item'
                style={{ transform: `translate(${x}px, ${y}px)`, ...style }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

const Background = memo(() => {
  const [{ step }, setState] = useContext(ZhongliGameContext);
  const cardNode = useRef<HTMLDivElement>(null);
  const [shouldAppend, setShouldAppend] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const append = () => {
      if (cardNode.current && cardNode.current.offsetWidth && cardNode.current.offsetHeight) {
        setShouldAppend(true);
      } else requestAnimationFrame(append);
    };
    append();
  }, []);

  useEffect(() => {
    if (shouldAppend) {
      if (cardNode.current) {
        const getCanvas = () => {
          const [canvas] = cardNode.current!.getElementsByTagName('canvas');
          if (canvas) {
            canvas.addEventListener('pointermove', (e) => {
              if (step === ZhongliGameStepType.unset) {
                const x = e.clientX - canvas.getBoundingClientRect().left;
                const y = e.clientY - canvas.getBoundingClientRect().top;
                setPosition({ x, y });
              }
            });
          } else requestAnimationFrame(getCanvas);
        };
        getCanvas();
      }
    }
  }, [shouldAppend]);

  return (
    <div className='Background'>
      <div className='image' />
      <div className='card'>
        <div ref={cardNode}>
          <div>
            {step === ZhongliGameStepType.unset && shouldAppend && (
              <ScratchCard
                cover={Cover}
                width={cardNode.current?.offsetWidth}
                height={cardNode.current?.offsetHeight}
                percent={60}
                onComplete={() => {
                  setState((S) => ({ ...S, step: ZhongliGameStepType.dialog }));
                }}
                brushSize={{ width: 150, height: 150 }}
              >
                <div className='content' />
              </ScratchCard>
            )}
          </div>
        </div>
      </div>
      <Vacuum position={position} />
      <div className='mask' />
      <div className='light' />
    </div>
  );
});
export default Background;
