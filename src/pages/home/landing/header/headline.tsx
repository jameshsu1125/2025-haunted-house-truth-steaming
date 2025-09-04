import useTween, { Bezier } from 'lesca-use-tween';
import { Application, Assets, Container, DisplacementFilter, Sprite } from 'pixi.js';
import { memo, useContext, useEffect, useRef } from 'react';
import { HomeContext, HomeStepType } from '../../config';
import displacement from './img/displacement_map_repeat.jpg';
import Image from './img/headline-animate.png';

const Headline = memo(() => {
  const ref = useRef<HTMLDivElement>(null);
  const [{ step }, setState] = useContext(HomeContext);

  const [style, setStyle] = useTween({ opacity: 0, y: 0, scale: 1.2 });

  useEffect(() => {
    const app = new Application();

    const resize = () => {
      app.stage.children.forEach((child) => {
        if (child instanceof Container && ref.current) {
          child.scale.set((0.55 / 259) * ref.current.clientWidth);
          app.canvas.width = ref.current.clientWidth || 259;
          app.canvas.height = (ref.current.clientHeight || 172) + 200;
          app.renderer.resize(app.canvas.width, app.canvas.height);
        }
      });
    };

    const createHuntedText = async () => {
      if (ref.current && ref.current.clientWidth > 0 && ref.current.clientHeight > 0) {
        await Assets.load([Image, displacement]);

        await app.init({
          width: ref.current.clientWidth || 259,
          height: (ref.current.clientHeight || 172) + 200,
          backgroundAlpha: 0,
        });
        app.stage.eventMode = 'static';
        app.stage.width = ref.current.clientWidth || 259;
        app.stage.height = (ref.current.clientHeight || 172) + 200;
        ref.current.appendChild(app.canvas);

        const container = new Container();
        container.scale.set((0.55 / 259) * ref.current.clientWidth);
        app.stage.addChild(container);

        const text = Sprite.from(Image);
        container.addChild(text);
        text.x = 100;
        text.y = 100;

        const displacementSprite = Sprite.from(displacement);
        displacementSprite.texture.source.addressMode = 'repeat';

        const displacementFilter = new DisplacementFilter({
          sprite: displacementSprite,
          scale: { x: 30, y: 10 },
        });

        displacementFilter.padding = 10;
        displacementSprite.position = text.position;
        app.stage.addChild(displacementSprite);
        text.filters = [displacementFilter];
        app.ticker.add(() => {
          displacementSprite.x++;
          if (displacementSprite.x > displacementSprite.width) {
            displacementSprite.x = 0;
          }
        });

        setState((S) => ({ ...S, steamImageLoaded: true }));

        resize();
        window.addEventListener('resize', resize);
      } else {
        requestAnimationFrame(() => {
          createHuntedText();
        });
      }
    };

    requestAnimationFrame(() => {
      createHuntedText();
    });

    return () => {
      window.removeEventListener('resize', resize);
      app.destroy();
    };
  }, []);

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
          <div ref={ref} className='haunted-text'></div>
        </div>
      </div>
    </div>
  );
});
export default Headline;
