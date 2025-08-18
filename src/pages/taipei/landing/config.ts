import { createContext, Dispatch, SetStateAction } from 'react';

export enum TaipeiLandingStepType {
  unset,
  entry,
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
