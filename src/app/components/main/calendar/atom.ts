import { atom } from 'recoil';

export const yearAtom = atom<number>({
  key: 'year',
  default: Number(new Date().getFullYear()),
});

export const monthAtom = atom<number>({
  key: 'month',
  default: new Date().getMonth(),
});

export const diaryYearAtom = atom<number | null>({
  key: 'diaryYear',
  default: null,
});

export const diaryMonthAtom = atom<number | null>({
  key: 'diaryMonth',
  default: null,
});

export const diaryDayAtom = atom<number | null>({
  key: 'diaryDay',
  default: null,
});
