import SteamText from '@/components/steamText';
import useTween, { Bezier } from 'lesca-use-tween';
import { memo, useContext, useEffect, useRef } from 'react';
import { HomeContext, HomeStepType } from '../../config';

const Headline = memo(() => {
  const ref = useRef<HTMLDivElement>(null);
  const [{ step }] = useContext(HomeContext);

  const [style, setStyle] = useTween({ opacity: 0, y: 0, scale: 1.2 });

  useEffect(() => {
    if (step === HomeStepType.FadeIn) {
      setStyle(
        { opacity: 1, y: 0, scale: 1 },
        { duration: 2000, delay: 500, easing: Bezier.inOutCubic },
      );
    } else if (step === HomeStepType.FadeOut) {
      setStyle({ opacity: 0, scale: 1.2 }, { duration: 500, easing: Bezier.outQuart });
    }
  }, [step]);

  return (
    <div className='headline' style={style}>
      <div>
        <div>
          <div ref={ref} className='haunted-text'>
            <SteamText scale={0.9} />
          </div>
        </div>
      </div>
    </div>
  );
});
export default Headline;
