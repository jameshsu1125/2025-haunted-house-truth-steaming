import { IReactProps } from '@/settings/type';
import useTween, { Bezier } from 'lesca-use-tween';
import { memo, useContext, useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { ChiayiContext } from '../../config';
import { VIRUS_GROWING_SPEED, VIRUS_SIZE_RATIO } from '../config';

import v0 from './img/v0.png';
import v1 from './img/v1.png';
import v2 from './img/v2.png';

const scale = VIRUS_SIZE_RATIO;

type TTweenerProviderProps = IReactProps & {
  clicked: boolean;
  setClicked: (event: React.PointerEvent<HTMLDivElement>) => void;
  setHide: React.Dispatch<React.SetStateAction<boolean>>;
  hide: boolean;
};

type TGerm = {
  onAssetsLoaded?: () => void;
  scale?: number;
  noise?: { x: number; y: number };
  index: number;
  containerWidth: number;
  style: React.CSSProperties;
  onSuck: (event: React.PointerEvent<HTMLDivElement>) => void;
};

const TweenerProvider = memo(
  ({ children, clicked, setClicked, setHide, hide }: TTweenerProviderProps) => {
    const [style, setStyle] = useTween({ opacity: 1, scale: 0, rotate: 0 });
    const [, setState] = useContext(ChiayiContext);

    useEffect(() => {
      setStyle(
        { opacity: 1, scale: 1, rotate: Math.random() * 45 },
        {
          duration: VIRUS_GROWING_SPEED,
          easing: Bezier.linear,
          onEnd: () => {
            setStyle({ opacity: 0, scale: 1.2 }, { duration: 300, onEnd: () => setHide(true) });
          },
        },
      );
    }, []);

    useEffect(() => {
      if (clicked) {
        setStyle(
          { opacity: 0 },
          {
            delay: 0,
            duration: 1,
            easing: Bezier.inQuart,
            onEnd: () => setHide(true),
          },
        );
        setState((S) => ({ ...S, bacteriaCount: S.bacteriaCount + 1 }));
      }
    }, [clicked]);

    return (
      <div
        className={twMerge('h-full w-full', hide && 'invisible', clicked && 'pointer-events-none')}
        style={style}
        onPointerDown={setClicked}
      >
        {children}
      </div>
    );
  },
);

const Germ = memo(({ onAssetsLoaded, index, containerWidth, style, onSuck }: TGerm) => {
  const ref = useRef<HTMLDivElement>(null);
  const nodeRef = useRef<HTMLDivElement>(null);
  const [domReady, setRomReady] = useState(false);
  const src = [v0, v1, v2][index - 1];

  const [clicked, setClicked] = useState(false);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const image = new Image();
    image.onload = () => {
      const { width, height } = image;
      const percent = width / 1280;
      const currentWidth = containerWidth * percent;
      const currentHeight = height * (currentWidth / width);
      ref.current!.style.width = `${currentWidth * scale}px`;
      ref.current!.style.height = `${currentHeight * scale}px`;
      ref.current!.setAttribute('data-percent', `${percent}`);
      setRomReady(true);
    };
    image.src = src;
  }, []);

  useEffect(() => {
    if (domReady) {
      nodeRef.current!.style.backgroundImage = `url(${src})`;
      nodeRef.current!.style.backgroundRepeat = 'no-repeat';
      nodeRef.current!.style.backgroundSize = 'contain';
      nodeRef.current!.style.backgroundPosition = 'center';
      onAssetsLoaded?.();
    }
  }, [domReady]);

  const onClick = (event: React.PointerEvent<HTMLDivElement>) => {
    setClicked(true);
    onSuck(event);
  };

  return (
    <div ref={ref} className='germ' style={style}>
      {!hide && (
        <TweenerProvider clicked={clicked} setClicked={onClick} setHide={setHide} hide={hide}>
          <div ref={nodeRef} className='h-full w-full' />
        </TweenerProvider>
      )}
    </div>
  );
});
export default Germ;
