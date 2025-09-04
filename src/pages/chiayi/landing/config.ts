import { createContext, Dispatch, SetStateAction } from 'react';

export enum TaipeiLandingStepType {
  unset,
  entry,
  fadeOut,
}
export type TTaipeiLandingState = { step: TaipeiLandingStepType };
export type TTaipeiLandingContext = [
  TTaipeiLandingState,
  Dispatch<SetStateAction<TTaipeiLandingState>>,
];

export const TaipeiLandingState: TTaipeiLandingState = {
  step: TaipeiLandingStepType.unset,
};
export const TaipeiLandingContext = createContext<TTaipeiLandingContext>([
  TaipeiLandingState,
  () => {},
]);

export const TaipeiLandingEntryTime = 6000;
