import { Howl } from 'howler';
import { SoundKeyType, SOUNDS_CONFIG } from './config';

type SoundsProps = {
  onload?: () => void;
};

export default class Sounds {
  private onload?: () => void;
  public tracks: Record<SoundKeyType, { track: Howl; loaded: boolean }> = {} as Record<
    SoundKeyType,
    { track: Howl; loaded: boolean }
  >;

  constructor({ onload }: SoundsProps) {
    this.onload = onload;
    this.load();
  }

  onSoundLoaded(key: SoundKeyType) {
    this.tracks[key].loaded = true;
    this.checkAllSoundsLoaded();
  }

  checkAllSoundsLoaded() {
    const howManySoundsLoaded = Object.values(this.tracks).filter((data) => data.loaded);
    const howManySoundsShouldLoaded = Object.keys(SOUNDS_CONFIG).length;
    if (howManySoundsLoaded.length === howManySoundsShouldLoaded) {
      this.onload?.();
    }
  }

  load() {
    Object.entries(SOUNDS_CONFIG).forEach(([key, config]) => {
      const sound = new Howl({
        src: [config.src],
        loop: config.loop,
        volume: config.volume,
        onload: () => this.onSoundLoaded(key as SoundKeyType),
      });
      this.tracks[key as SoundKeyType] = { track: sound, loaded: false };
    });
  }
}
