import { memo, useEffect, useRef } from 'react';
import './index.less';
import { Application, Assets, Container, DisplacementFilter, Sprite } from 'pixi.js';
import displacement from './img/displacement_map_repeat.jpg';
import Image from './img/headline-animate.png';

const SteamText = memo(
  ({
    onAssetsLoaded,
    scale = 1,
    noise = { x: 30, y: 10 },
  }: {
    onAssetsLoaded?: () => void;
    scale?: number;
    noise?: { x: number; y: number };
  }) => {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
      const app = new Application();

      const resize = () => {
        app.stage.children.forEach((child) => {
          if (child instanceof Container && ref.current) {
            child.scale.set((0.55 / 259) * ref.current.clientWidth);
            app.canvas.width = (ref.current.clientWidth || 388) + 200;
            app.canvas.height = (ref.current.clientHeight || 394) + 200;
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
            scale: noise,
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

          onAssetsLoaded?.();

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
    return <div ref={ref} className='SteamText' style={{ transform: `scale(${scale})` }} />;
  },
);
export default SteamText;
