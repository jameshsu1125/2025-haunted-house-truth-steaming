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

export type SoundKeyType =
  | 'chooseBGM'
  | 'taipeiBGM'
  | 'flap'
  | 'click'
  | 'hint'
  | 'footstep'
  | 'door'
  | 'ghost'
  | 'dish'
  | 'cleaner'
  | 'laugh'
  | 'light'
  | 'fail'
  | 'pass'
  | 'win';

export const SOUNDS_CONFIG: Record<SoundKeyType, { src: string; loop: boolean; volume: number }> = {
  chooseBGM: { src: chooseBGM_URL, loop: true, volume: 0.3 },
  taipeiBGM: { src: taipeiBGM_URL, loop: true, volume: 0.3 },
  flap: { src: flapURL, loop: false, volume: 1 },
  click: { src: clickURL, loop: false, volume: 1 },
  hint: { src: hintURL, loop: false, volume: 1 },
  footstep: { src: footstepURL, loop: false, volume: 1 },
  door: { src: doorURL, loop: false, volume: 1 },
  ghost: { src: ghostURL, loop: false, volume: 1 },
  dish: { src: dishURL, loop: false, volume: 1 },
  cleaner: { src: cleanerURL, loop: false, volume: 1 },
  laugh: { src: laughURL, loop: false, volume: 1 },
  light: { src: lightURL, loop: true, volume: 1 },
  fail: { src: FailURL, loop: true, volume: 1 },
  pass: { src: passURL, loop: true, volume: 0.3 },
  win: { src: winURL, loop: false, volume: 1 },
};
