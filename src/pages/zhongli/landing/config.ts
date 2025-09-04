import { createContext, Dispatch, SetStateAction } from 'react';

export enum ZhongliLandingStepType {
  unset,
  entry,
  fadeOut,
}
export type TZhongliLandingState = { step: ZhongliLandingStepType };
export type TZhongliLandingContext = [
  TZhongliLandingState,
  Dispatch<SetStateAction<TZhongliLandingState>>,
];

export const ZhongliLandingState = {
  step: ZhongliLandingStepType.unset,
};
export const ZhongliLandingContext = createContext<TZhongliLandingContext>([
  ZhongliLandingState,
  () => {},
]);

export const ZhongliLandingEntryTime = 6000;
