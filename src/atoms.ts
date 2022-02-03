/* eslint-disable import/prefer-default-export */
import { atom } from 'recoil';

export const isLoadingState = atom({
  key: 'isLoadingState',
  default: false,
});
