import { createContext, Dispatch, SetStateAction } from 'react';

export enum ResultStepType {
  unset,
  loaded,
  formFadeOut,
  entry,
}
export type TResultState = { step: ResultStepType; name: string };
export type TResultContext = [TResultState, Dispatch<SetStateAction<TResultState>>];

export const ResultState: TResultState = { step: ResultStepType.unset, name: '輸入你的暱稱' };
export const ResultContext = createContext<TResultContext>([ResultState, () => {}]);
