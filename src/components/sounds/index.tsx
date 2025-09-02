import { Howl } from 'howler';
import chooseBGM_URL from './mp3/choose-bgm.mp3';
import cleanerURL from './mp3/cleaner.mp3';
import clickURL from './mp3/click.mp3';
import dishURL from './mp3/dish.mp3';
import doorURL from './mp3/door.mp3';
import FailURL from './mp3/fail.mp3';
import flapURL from './mp3/flap.mp3';
import footstepURL from './mp3/footsteps.mp3';
import ghostURL from './mp3/ghost.mp3';
import hintURL from './mp3/hint.mp3';
import laughURL from './mp3/laugh.mp3';
import lightURL from './mp3/light.mp3';
import taipeiBGM_URL from './mp3/taipei-bgm.mp3';
import passURL from './mp3/pass.mp3';
import winURL from './mp3/win.mp3';

type SoundsProps = {
  onload?: () => void;
};

export default class Sounds {
  private sounds: { [k: string]: string } = {
    chooseBGM: chooseBGM_URL,
    taipeiBGM: taipeiBGM_URL,
    flap: flapURL,
    click: clickURL,
    hint: hintURL,
    footstep: footstepURL,
    door: doorURL,
    ghost: ghostURL,
    dish: dishURL,
    cleaner: cleanerURL,
    laugh: laughURL,
    light: lightURL,
    fail: FailURL,
    pass: passURL,
    win: winURL,
  };

  private onload?: () => void;
  public tracks: { [k: string]: { track: Howl; loaded: boolean } } = {};

  constructor({ onload }: SoundsProps) {
    this.onload = onload;
    this.load();
  }

  onSoundLoaded(key: string) {
    this.tracks[key].loaded = true;
    this.checkAllSoundsLoaded();
  }

  checkAllSoundsLoaded() {
    const howManySoundsLoaded = Object.values(this.tracks).filter((data) => data.loaded);
    const howManySoundsShouldLoaded = Object.keys(this.sounds).length;
    if (howManySoundsLoaded.length === howManySoundsShouldLoaded) {
      this.onload?.();
    }
  }

  load() {
    Object.entries(this.sounds).forEach(([key, src]) => {
      const sound = new Howl({ src: [src], onload: () => this.onSoundLoaded(key) });
      this.tracks[key] = { track: sound, loaded: false };
    });
  }
}
