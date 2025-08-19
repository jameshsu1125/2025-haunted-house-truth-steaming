import { createContext, Dispatch, SetStateAction } from 'react';

export enum TaipeiIntroStepType {
  unset,
  entry,
}
export type TTaipeiIntroState = { step: TaipeiIntroStepType };
export type TTaipeiIntroContext = [TTaipeiIntroState, Dispatch<SetStateAction<TTaipeiIntroState>>];

export const TaipeiIntroState: TTaipeiIntroState = { step: TaipeiIntroStepType.unset };
export const TaipeiIntroContext = createContext<TTaipeiIntroContext>([TaipeiIntroState, () => {}]);
