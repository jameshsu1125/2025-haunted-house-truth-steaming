import { createContext, Dispatch, SetStateAction } from 'react';

export enum TaipeiGameStepType {
  unset,
}
export type TTaipeiGameState = { step: TaipeiGameStepType };
export type TTaipeiGameContext = [TTaipeiGameState, Dispatch<SetStateAction<TTaipeiGameState>>];

export const TaipeiGameState = { step: TaipeiGameStepType.unset };
export const TaipeiGameContext = createContext<TTaipeiGameContext>([TaipeiGameState, () => {}]);
