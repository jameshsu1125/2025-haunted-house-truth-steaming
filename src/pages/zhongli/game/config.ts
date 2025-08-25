import { createContext, Dispatch, SetStateAction } from 'react';

export enum ZhongliGameStepType {
  unset,
  dialog,
  underBed,
  dirt,
  dirt2Clear,
  clear,
  fadeOut,
  fail,
}

export type TZhongliGameState = { step: ZhongliGameStepType; isError: boolean; clearTimes: number };
export type TZhongliGameContext = [TZhongliGameState, Dispatch<SetStateAction<TZhongliGameState>>];

export const ZhongliGameState: TZhongliGameState = {
  step: ZhongliGameStepType.clear,
  isError: false,
  clearTimes: 0,
};
export const ZhongliGameContext = createContext<TZhongliGameContext>([ZhongliGameState, () => {}]);

export const VACUUM_OFFSET = 100;
export const VACUUM_DURATION = 800;
export const VACUUM_WAIT = 1000;
