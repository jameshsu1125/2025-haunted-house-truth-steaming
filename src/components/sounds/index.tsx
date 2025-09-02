import { Howl } from 'howler';
import { SoundKeyType, SOUNDS_CONFIG } from './config';

const tracker: Record<SoundKeyType, { track: Howl; loaded: boolean; playing: boolean }> =
  {} as Record<SoundKeyType, { track: Howl; loaded: boolean; playing: boolean }>;

const props = {
  onload: () => {},
};

const checkAllSoundsLoaded = () => {
  const howManySoundsLoaded = Object.values(tracker).filter((data) => data.loaded);
  const howManySoundsShouldLoaded = Object.keys(SOUNDS_CONFIG).length;
  if (howManySoundsLoaded.length === howManySoundsShouldLoaded) {
    props.onload();
  }
};

const install = (onLoaded: () => void) => {
  props.onload = onLoaded;
  Object.entries(SOUNDS_CONFIG).forEach(([key, config]) => {
    tracker[key as SoundKeyType] = { track: {} as Howl, loaded: false, playing: false };
    tracker[key as SoundKeyType].track = new Howl({
      src: [config.src],
      loop: config.loop,
      volume: config.volume,
      preload: true,
      autoplay: false,
      onend: () => {
        if (config.loop) return;
        tracker[key as SoundKeyType].playing = false;
      },
      onload: () => {
        tracker[key as SoundKeyType].loaded = true;
        checkAllSoundsLoaded();
      },
    });
  });
};

const stopAllSounds = () => {
  Object.values(tracker).forEach((data) => {
    if (data.playing) {
      data.track.stop();
      data.playing = false;
    }
  });
};

const playSound = (key: SoundKeyType) => {
  if (!tracker[key]?.playing) {
    tracker[key].playing = true;
    tracker[key]?.track.seek(0);
    tracker[key]?.track.play();
  }
};

const fadeOutSound = (key: SoundKeyType) => {
  tracker[key]?.track.fade(tracker[key]?.track.volume(), 0, 1000);
  tracker[key].playing = false;
};

const Sounds = { install };

export default Sounds;
export { fadeOutSound, playSound, stopAllSounds };
