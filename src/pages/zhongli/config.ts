import { createContext, Dispatch, SetStateAction } from 'react';

export enum ZhongliPageType {
  landing,
  intro,
  game,
}

export enum ZhongliStepType {
  unset,
  loaded,
  ready,
}
export type TZhongliState = { step: ZhongliStepType; page: ZhongliPageType; videoLoaded: boolean };
export type TZhongliContext = [TZhongliState, Dispatch<SetStateAction<TZhongliState>>];

export const ZhongliState = {
  step: ZhongliStepType.unset,
  page: ZhongliPageType.landing,
  videoLoaded: false,
};
export const ZhongliContext = createContext<TZhongliContext>([ZhongliState, () => {}]);
