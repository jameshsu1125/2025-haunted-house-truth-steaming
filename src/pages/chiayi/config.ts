import { createContext, Dispatch, SetStateAction } from 'react';

export enum ChiayiPageType {
  landing,
  intro,
  game,
  result,
}

export enum ChiayiStepType {
  unset,
  loaded,
}
export type TChiayiState = { step: ChiayiStepType; page: ChiayiPageType };
export type TChiayiContext = [TChiayiState, Dispatch<SetStateAction<TChiayiState>>];

export const ChiayiState: TChiayiState = {
  step: ChiayiStepType.unset,
  page: ChiayiPageType.intro,
};
export const ChiayiContext = createContext<TChiayiContext>([ChiayiState, () => {}]);
