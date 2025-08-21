import { createContext, Dispatch, SetStateAction } from 'react';

export enum ResultStepType {
  unset,
  loaded,
}
export type TResultState = { step: ResultStepType };
export type TResultContext = [TResultState, Dispatch<SetStateAction<TResultState>>];

export const ResultState: TResultState = { step: ResultStepType.unset };
export const ResultContext = createContext<TResultContext>([ResultState, () => {}]);
