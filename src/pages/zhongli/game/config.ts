import { createContext, Dispatch, SetStateAction } from 'react';

export enum ZhongliGameStepType {
  unset,
  dialog,
  underBed,
  dirt,
  clear,
  fadeOut,
  fail,
}

export type TZhongliGameState = { step: ZhongliGameStepType; isError: boolean; clearTimes: number };
export type TZhongliGameContext = [TZhongliGameState, Dispatch<SetStateAction<TZhongliGameState>>];

export const ZhongliGameState: TZhongliGameState = {
  step: ZhongliGameStepType.dialog,
  isError: false,
  clearTimes: 0,
};
export const ZhongliGameContext = createContext<TZhongliGameContext>([ZhongliGameState, () => {}]);
