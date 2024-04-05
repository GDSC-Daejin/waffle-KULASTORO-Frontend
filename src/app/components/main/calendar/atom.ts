import { atom } from 'recoil';

export const yearAtom = atom<number>({
  key: 'year',
  default: Number(new Date().getFullYear()),
});

export const monthAtom = atom<number>({
  key: 'month',
  default: new Date().getMonth(),
});

export const dayAtom = atom<number | null>({
  key: 'day',
  default: null,
});
