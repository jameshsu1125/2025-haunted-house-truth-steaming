import { createContext, Dispatch, SetStateAction } from 'react';

export enum TaipeiGameStepType {
  unset,
  start,
  dirt,
  clear,
  end,
}

export type TTaipeiGameState = { step: TaipeiGameStepType; isError: boolean };
export type TTaipeiGameContext = [TTaipeiGameState, Dispatch<SetStateAction<TTaipeiGameState>>];

export const TaipeiGameState: TTaipeiGameState = { step: TaipeiGameStepType.unset, isError: false };
export const TaipeiGameContext = createContext<TTaipeiGameContext>([TaipeiGameState, () => {}]);

export const ERROR_TIME = 5000;
export const GAME_TIME = 60 * 1000;
