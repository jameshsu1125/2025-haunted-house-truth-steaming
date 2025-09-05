import { createContext, Dispatch, SetStateAction } from 'react';

export enum HomeStepType {
  Unset,
  Loaded,
  Reminder,
  FadeIn,
  Loop,
  FadeOut,
}

export enum HomePageType {
  Landing = 'landing',
  Choose = 'choose',
}

export type THomeState = {
  page: HomePageType;
  step: HomeStepType;
  videoLoadedIndex: number;
  steamImageLoaded: boolean;
  smokeImageLoaded: boolean;
  locationIndex: number;
};

export type THomeContext = [THomeState, Dispatch<SetStateAction<THomeState>>];

export const HomeState: THomeState = {
  page: HomePageType.Landing,
  step: HomeStepType.Unset,
  locationIndex: Math.floor(Math.random() * 3),
  steamImageLoaded: true,
  smokeImageLoaded: true,
  videoLoadedIndex: 0,
};

export const HomeContext = createContext<THomeContext>([HomeState, () => {}]);
