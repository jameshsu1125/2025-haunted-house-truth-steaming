import { Dispatch, ReactNode } from 'react';

export enum ActionType {
  Page = 'page',
  LoadingProcess = 'loadingProcess',
  Location = 'location',
  SmokeEffect = 'smokeEffect',
  Fail = 'fail',
}

export enum LoadingProcessType {
  Ball = 'balls',
  Bars = 'bars',
  Bubbles = 'bubbles',
  Cubes = 'cubes',
  Cylon = 'cylon',
  Spin = 'spin',
  SpinningBubbles = 'spinningBubbles',
  Spokes = 'spokes',
}

export enum TransitionType {
  Unset = 0,
  FadeIn = 1,
  FadeOut = 2,
  DidFadeIn = 3,
  DidFadeOut = 4,
  Loop = 5,
  Stop = 6,
}

export enum TLocationType {
  taipei = 'taipei',
  zhongli = 'zhongli',
  chiayi = 'chiayi',
}

export type TLoadingProcessState = {
  enabled?: boolean;
  type?: LoadingProcessType;
  body?: '';
};

export type TFailState = {
  enabled?: boolean;
  index?: number;
  active?: boolean;
};

export interface IState {
  page?: string;
  loadingProcess?: TLoadingProcessState;
  location?: TLocationType;
  smokeEffect?: boolean;
  fail?: TFailState;
}

export interface IAction {
  state: IState | TLoadingProcessState | TLocationType | string | boolean | TFailState;
  type: ActionType;
}

export type TContext = [IState, Dispatch<IAction>];

export interface IReactProps {
  readonly children?: ReactNode;
}
