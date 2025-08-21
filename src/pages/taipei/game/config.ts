import { createContext, Dispatch, SetStateAction } from 'react';

export enum TaipeiGameStepType {
  unset,
  start,
  dirt,
  dirt2Clear,
  clear,
  end,
  fadeOut,
  fail,
}

export type TTaipeiGameState = { step: TaipeiGameStepType; isError: boolean; clearTimes: number };
export type TTaipeiGameContext = [TTaipeiGameState, Dispatch<SetStateAction<TTaipeiGameState>>];

export const TaipeiGameState: TTaipeiGameState = {
  step: TaipeiGameStepType.end,
  isError: false,
  clearTimes: 0,
};
export const TaipeiGameContext = createContext<TTaipeiGameContext>([TaipeiGameState, () => {}]);

export const GAME_TIME = 60 * 1000;
export const ERROR_TIME = 500;
export const GHOST_TIME = 500;

export const VACUUM_OFFSET = 100;
export const VACUUM_DURATION = 800;
export const VACUUM_WAIT = 3000;
