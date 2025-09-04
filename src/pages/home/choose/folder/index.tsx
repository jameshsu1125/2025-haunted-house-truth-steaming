import CoverNode from '@/components/coverNode';
import useTween, { Bezier } from 'lesca-use-tween';
import { memo, useContext, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
import { HomeContext, HomePageType, HomeStepType } from '../../config';
import './index.less';
import { ChooseContext, ChooseStepType } from '../config';
import { playSound, stopAllSounds } from '@/components/sounds';

const Seal = memo(({ active }: { active: boolean }) => {
  const [style, setStyle] = useTween({ opacity: 0, scale: 2 });

  useEffect(() => {
    if (active) {
      setStyle(
        { opacity: 0, scale: 2 },
        {
          duration: 1,
          onEnd: () => {
            setStyle({ opacity: 1, scale: 1 }, { delay: 1000, duration: 500 });
          },
        },
      );
    } else setStyle({ opacity: 0, scale: 1 }, 200);
  }, [active]);

  return <div style={style} />;
});

const Slider = memo(({ index }: { index: number }) => {
  const [{ index: chooseIndex, step, lastIndex }, setState] = useContext(ChooseContext);
  const [style, setStyle] = useTween({ opacity: 0, y: -80, x: -20, rotate: 0 });

  useEffect(() => {
    if (step === ChooseStepType.unset && index === chooseIndex) {
      setStyle({ opacity: 1, y: 0, x: 0 }, { delay: 200, duration: 600 });
    }

    if (step === ChooseStepType.fadeIn && index === chooseIndex) {
      setStyle(
        { opacity: 0, y: -80, x: -20, rotate: 0 },
        {
          duration: 1,
          onEnd: () => {
            setStyle(
              { opacity: 1, y: 0, x: 0 },
              {
                duration: 600,
                onEnd: () => {
                  setState((S) => ({ ...S, step: ChooseStepType.unset }));
                },
              },
            );
          },
        },
      );
    }

    if (step === ChooseStepType.fadeOut && index === lastIndex) {
      setStyle(
        { opacity: 0, rotate: -24, y: 500 },
        {
          duration: 800,
          easing: Bezier.inQuart,
          onEnd: () => {
            setState((S) => ({ ...S, step: ChooseStepType.fadeIn }));
          },
        },
      );
    }
  }, [chooseIndex, step]);

  return (
    <div key={`file-${index}`} className={twMerge('file', `file-${index}`)} style={style}>
      <div>
        <div>
          <Seal active={index === chooseIndex} />
        </div>
      </div>
    </div>
  );
});

const Folder = memo(() => {
  const [{ step, page }] = useContext(HomeContext);
  const [style, setStyle] = useTween({ opacity: 0, scale: 1.2 });

  useEffect(() => {
    if (step >= HomeStepType.FadeIn && page === HomePageType.Choose) {
      setStyle({ opacity: 1, scale: 1 });
      stopAllSounds(['introBGM']);
      playSound('introBGM');
    }
  }, [page, step]);

  return (
    <div className='Folder' style={style}>
      <CoverNode>
        <div className='bg-cover'>
          {[...new Array(3).keys()].map((index) => (
            <Slider index={index} key={`file-${index}`} />
          ))}
        </div>
      </CoverNode>
    </div>
  );
});

export default Folder;
