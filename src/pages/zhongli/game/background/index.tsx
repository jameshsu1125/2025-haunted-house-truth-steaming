import ScratchCard from 'lesca-react-scratch-card';
import useTween from 'lesca-use-tween';
import { memo, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { ZhongliContext, ZhongliPageType } from '../../config';
import { ZhongliGameContext, ZhongliGameStepType } from '../config';
import Footprint from './footprint';
import Cover from './img/card-cover.jpg';
import './index.less';
import Picture from './picture';

const Vacuum = memo(
  ({
    position,
    dotA,
    dotB,
    cardNode,
    lineA,
    lineB,
  }: {
    position: { x: number; y: number };
    dotA: React.RefObject<HTMLDivElement | null>;
    dotB: React.RefObject<HTMLDivElement | null>;
    cardNode: React.RefObject<HTMLDivElement | null>;
    lineA: React.RefObject<HTMLDivElement | null>;
    lineB: React.RefObject<HTMLDivElement | null>;
  }) => {
    const [{ page }] = useContext(ZhongliContext);
    const [{ step }] = useContext(ZhongliGameContext);
    const [style, setStyle] = useTween({ opacity: 1 });

    const itemRef = useRef<HTMLDivElement>(null);
    const { x, y } = useMemo(() => {
      const x = position.x - (itemRef.current?.offsetWidth || 0) / 2;
      const y = position.y - (itemRef.current?.offsetWidth || 0) / 2;

      if (
        itemRef.current &&
        cardNode.current &&
        dotA.current &&
        dotB.current &&
        lineA.current &&
        lineB.current
      ) {
        const { left, top } = cardNode.current.getBoundingClientRect();
        const { top: dotATop } = dotA.current.getBoundingClientRect();
        const { left: dotBLeft, top: dotBTop } = dotB.current.getBoundingClientRect();
        const { left: lineALeft } = lineA.current.getBoundingClientRect();
        const { left: lineBLeft } = lineB.current.getBoundingClientRect();
        const offset = Math.abs(dotATop - top);
        const minY = Math.max(offset, y);
        const leftSpace = Math.min(lineALeft - left - itemRef.current.clientWidth, x);
        const rightSpace = Math.max(lineBLeft - left, x);
        const minSpace = dotBLeft - left - itemRef.current.clientWidth / 2;
        const gy = Math.abs(dotBTop - top);
        const currentX = y > gy ? x : x < minSpace ? leftSpace : rightSpace;

        return { x: currentX, y: minY };
      }
      return { x, y };
    }, [position]);

    useEffect(() => {
      if (page === ZhongliPageType.game && step === ZhongliGameStepType.dialog) {
        setStyle({ opacity: 0 }, { duration: 300 });
      }
    }, [step, page]);

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
  },
);

const Background = memo(() => {
  const dotNode_A = useRef<HTMLDivElement>(null);
  const dotNode_B = useRef<HTMLDivElement>(null);
  const lineNode_A = useRef<HTMLDivElement>(null);
  const lineNode_B = useRef<HTMLDivElement>(null);
  const cardNode = useRef<HTMLDivElement>(null);

  const [{ step }, setState] = useContext(ZhongliGameContext);
  const [shouldAppend, setShouldAppend] = useState(false);
  const [position, setPosition] = useState({ x: 300, y: window.innerHeight });

  const [active, setActive] = useState(false);
  const eventRef = useRef({ enabled: false, active: false });

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
            canvas.addEventListener('pointerdown', () => {
              eventRef.current.enabled = true;
            });

            canvas.addEventListener('pointermove', (e) => {
              if (step === ZhongliGameStepType.unset) {
                const x = e.clientX - canvas.getBoundingClientRect().left;
                const y = e.clientY - canvas.getBoundingClientRect().top;
                setPosition({ x, y });

                if (eventRef.current.enabled && x > 350 && !eventRef.current.active) {
                  eventRef.current.active = true;
                  setActive(true);
                }
              }
            });

            canvas.addEventListener('pointerup', () => {
              eventRef.current.enabled = false;
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
      <div
        className={twMerge('clear', step >= ZhongliGameStepType.clear && 'animate-fade-in-1s')}
      />
      {step === ZhongliGameStepType.unset && (
        <div className='card'>
          <div ref={cardNode}>
            <div>
              {shouldAppend && (
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
      )}
      {step <= ZhongliGameStepType.dialog && <Footprint active={active} />}
      {step === ZhongliGameStepType.unset && (
        <Vacuum
          position={position}
          dotA={dotNode_A}
          dotB={dotNode_B}
          cardNode={cardNode}
          lineA={lineNode_A}
          lineB={lineNode_B}
        />
      )}
      {step <= ZhongliGameStepType.dialog && <div className='mask' />}
      {step <= ZhongliGameStepType.dialog && <Picture />}
      {step <= ZhongliGameStepType.dialog && <div className='light' />}
      <div ref={dotNode_A} className='dot-a' />
      <div ref={dotNode_B} className='dot-b' />
      <div ref={lineNode_A} className='line-a' />
      <div ref={lineNode_B} className='line-b' />
    </div>
  );
});
export default Background;
