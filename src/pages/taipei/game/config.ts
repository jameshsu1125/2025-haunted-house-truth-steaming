import { createContext, Dispatch, SetStateAction } from 'react';

export enum TaipeiGameStepType {
  unset,
  start,
  dirt,
  clear,
  end,
  fail,
}

export type TTaipeiGameState = { step: TaipeiGameStepType; isError: boolean };
export type TTaipeiGameContext = [TTaipeiGameState, Dispatch<SetStateAction<TTaipeiGameState>>];

export const TaipeiGameState: TTaipeiGameState = { step: TaipeiGameStepType.unset, isError: false };
export const TaipeiGameContext = createContext<TTaipeiGameContext>([TaipeiGameState, () => {}]);

export const GAME_TIME = 60 * 1000;
export const ERROR_TIME = 500;
export const GHOST_TIME = 500;
