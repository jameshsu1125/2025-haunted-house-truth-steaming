import { createContext, Dispatch, SetStateAction } from 'react';

export enum TaipeiStepType {
  unset,
  loaded,
}
export type TTaipeiState = { step: TaipeiStepType };
export type TTaipeiContext = [TTaipeiState, Dispatch<SetStateAction<TTaipeiState>>];

export const TaipeiState: TTaipeiState = { step: TaipeiStepType.unset };
export const TaipeiContext = createContext<TTaipeiContext>([TaipeiState, () => {}]);
