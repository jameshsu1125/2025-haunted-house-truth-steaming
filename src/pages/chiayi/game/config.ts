import { createContext, Dispatch, SetStateAction } from 'react';

export enum ChiayiGameStepType {
  unset,
  dialog,
  bacteria,
  bacteriaFadeOut,
  result,
  resultFadeOut,
  clear,
  end,
  fadeOut,
}
export type TChiayiGameState = { step: ChiayiGameStepType };
export type TChiayiGameContext = [TChiayiGameState, Dispatch<SetStateAction<TChiayiGameState>>];

export const ChiayiGameState = { step: ChiayiGameStepType.unset };
export const ChiayiGameContext = createContext<TChiayiGameContext>([ChiayiGameState, () => {}]);

export const VIRUS_SHOW_TIME = {
  min: 500,
  max: 800,
};

export const RESULT_WAIT_DURATION = 8000;

export const VIRUS_SIZE_RATIO = 2;
export const VIRUS_GROWING_SPEED = 2000;
export const VIRUS_DESTROYING_SPEED = 2000;
export const VIRUS_BEEN_SUCKED_SPEED = 3000;
