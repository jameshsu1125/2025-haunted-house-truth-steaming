import { HomePageType } from '@/pages/home/config';
import { TaipeiPageType } from '@/pages/taipei/config';
import { ZhongliPageType } from '@/pages/zhongli/config';
import { Dispatch, ReactNode } from 'react';

export enum ActionType {
  Page = 'page',
  LoadingProcess = 'loadingProcess',
  Location = 'location',
  SmokeEffect = 'smokeEffect',
  Fail = 'fail',
  Redirect = 'redirect',
  Sounds = 'sounds',
  Solve = 'solve',
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

export type TRedirectState = {
  enabled?: boolean;
  page?: string;
  category?: HomePageType | TaipeiPageType | ZhongliPageType;
};

export type TSoundState = {
  enabled?: boolean;
};

export type TSolveState = {
  [TLocationType.taipei]?: boolean;
  [TLocationType.zhongli]?: boolean;
  [TLocationType.chiayi]?: boolean;
};

export interface IState {
  page?: string;
  loadingProcess?: TLoadingProcessState;
  location?: TLocationType;
  smokeEffect?: boolean;
  fail?: TFailState;
  redirect?: TRedirectState;
  sounds?: TSoundState;
  solve?: TSolveState;
}

export interface IAction {
  state:
    | IState
    | TLoadingProcessState
    | TLocationType
    | string
    | boolean
    | TFailState
    | TRedirectState
    | TSoundState
    | TSolveState;
  type: ActionType;
}

export type TContext = [IState, Dispatch<IAction>];

export interface IReactProps {
  readonly children?: ReactNode;
}
