import { createContext, Dispatch, SetStateAction } from 'react';

export enum ChooseStepType {
  unset,
  fadeOut,
  fadeIn,
}
export type TChooseState = { step: ChooseStepType; index: number; lastIndex: number };
export type TChooseContext = [TChooseState, Dispatch<SetStateAction<TChooseState>>];

export const ChooseState: TChooseState = { step: ChooseStepType.unset, index: 0, lastIndex: 0 };
export const ChooseContext = createContext<TChooseContext>([ChooseState, () => {}]);
