import { createContext, Dispatch, SetStateAction } from 'react';

export enum HomeStepType {
  unset = 0,
  fadeIn = 1,
  loop = 2,
}
export type THomeState = { step: HomeStepType; locationIndex: number };
export type THomeContext = [THomeState, Dispatch<SetStateAction<THomeState>>];

export const HomeState: THomeState = {
  step: HomeStepType.unset,
  locationIndex: Math.floor(Math.random() * 3),
};
export const HomeContext = createContext<THomeContext>([HomeState, () => {}]);
