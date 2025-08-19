import { createContext, Dispatch, SetStateAction } from 'react';

export enum TaipeiPageType {
  landing,
  intro,
  game,
  result,
}

export enum TaipeiStepType {
  unset,
  loaded,
}
export type TTaipeiState = { step: TaipeiStepType; page: TaipeiPageType };
export type TTaipeiContext = [TTaipeiState, Dispatch<SetStateAction<TTaipeiState>>];

export const TaipeiState: TTaipeiState = {
  step: TaipeiStepType.unset,
  page: TaipeiPageType.intro,
};
export const TaipeiContext = createContext<TTaipeiContext>([TaipeiState, () => {}]);
