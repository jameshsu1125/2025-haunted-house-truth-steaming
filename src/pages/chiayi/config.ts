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
export type TChiayiState = { step: ChiayiStepType; page: ChiayiPageType; bacteriaCount: number };
export type TChiayiContext = [TChiayiState, Dispatch<SetStateAction<TChiayiState>>];

export const ChiayiState: TChiayiState = {
  step: ChiayiStepType.unset,
  page: ChiayiPageType.landing,
  bacteriaCount: 0,
};
export const ChiayiContext = createContext<TChiayiContext>([ChiayiState, () => {}]);
