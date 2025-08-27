import { createContext, Dispatch, SetStateAction } from 'react';

export enum ChiayiIntroStepType {
  unset,
  entry,
}
export type TChiayiIntroContextState = { step: ChiayiIntroStepType };
export type TChiayiIntroContext = [
  TChiayiIntroContextState,
  Dispatch<SetStateAction<TChiayiIntroContextState>>,
];

export const ChiayiIntroState = {
  step: ChiayiIntroStepType.unset,
};
export const ChiayiIntroContext = createContext<TChiayiIntroContext>([ChiayiIntroState, () => {}]);
