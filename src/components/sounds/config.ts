import cleanerURL from './mp3/cleaner.mp3';
import clickURL from './mp3/click.mp3';
import dishURL from './mp3/dish.mp3';
import doorURL from './mp3/door.mp3';
import FailURL from './mp3/fail.mp3';
import flapURL from './mp3/flap.mp3';
import footstepURL from './mp3/footsteps.mp3';
import gamingBGM_URL from './mp3/gaming-bgm.mp3';
import ghostURL from './mp3/ghost.mp3';
import hintURL from './mp3/hint.mp3';
import introBGM_URL from './mp3/intro-bgm.mp3';
import laughURL from './mp3/laugh.mp3';
import lightURL from './mp3/light.mp3';
import passURL from './mp3/pass.mp3';
import winURL from './mp3/win.mp3';
import catURL from './mp3/cat.mp3';
import dropURL from './mp3/drop.mp3';

export type SoundKeyType =
  | 'introBGM'
  | 'gamingBGM'
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
  | 'win'
  | 'cat'
  | 'drop';

export const SOUNDS_CONFIG: Record<SoundKeyType, { src: string; loop: boolean; volume: number }> = {
  introBGM: { src: introBGM_URL, loop: true, volume: 0.3 },
  gamingBGM: { src: gamingBGM_URL, loop: true, volume: 0.3 },
  flap: { src: flapURL, loop: false, volume: 1 },
  click: { src: clickURL, loop: false, volume: 1 },
  hint: { src: hintURL, loop: false, volume: 1 },
  footstep: { src: footstepURL, loop: true, volume: 1 },
  door: { src: doorURL, loop: false, volume: 1 },
  ghost: { src: ghostURL, loop: false, volume: 1 },
  dish: { src: dishURL, loop: false, volume: 1 },
  cleaner: { src: cleanerURL, loop: true, volume: 1 },
  laugh: { src: laughURL, loop: false, volume: 1 },
  light: { src: lightURL, loop: true, volume: 1 },
  fail: { src: FailURL, loop: true, volume: 1 },
  pass: { src: passURL, loop: true, volume: 0.3 },
  win: { src: winURL, loop: false, volume: 1 },
  cat: { src: catURL, loop: false, volume: 1 },
  drop: { src: dropURL, loop: false, volume: 1 },
};
