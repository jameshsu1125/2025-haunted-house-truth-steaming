import { createContext, Dispatch, SetStateAction } from 'react';

export enum ZhongliIntroStepType {
  unset,
  fadeOut,
  door,
  entry,
}
export type TZhongliIntroState = { step: ZhongliIntroStepType };
export type TZhongliIntroContext = [
  TZhongliIntroState,
  Dispatch<SetStateAction<TZhongliIntroState>>,
];

export const ZhongliIntroState: TZhongliIntroState = { step: ZhongliIntroStepType.unset };
export const ZhongliIntroContext = createContext<TZhongliIntroContext>([
  ZhongliIntroState,
  () => {},
]);
