import { createContext, Dispatch, SetStateAction } from 'react';

export enum HomeStepType {
  unset = 0,
  loaded = 1,
  fadeIn = 2,
  loop = 3,
}
export type THomeState = {
  step: HomeStepType;
  locationIndex: number;
  steamImageLoaded: boolean;
  smokeImageLoaded: boolean;
  videoLoadedIndex: number;
};
export type THomeContext = [THomeState, Dispatch<SetStateAction<THomeState>>];

export const HomeState: THomeState = {
  step: HomeStepType.unset,
  locationIndex: Math.floor(Math.random() * 3),
  steamImageLoaded: false,
  smokeImageLoaded: true,
  videoLoadedIndex: 0,
};
export const HomeContext = createContext<THomeContext>([HomeState, () => {}]);
