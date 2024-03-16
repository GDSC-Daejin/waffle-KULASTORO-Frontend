"use client"

import { RecoilRoot } from 'recoil';
import Calendar from './calendar/Calendar';

const Main = () => {
  return (
    <>
    <RecoilRoot>
      <Calendar />
    </RecoilRoot>
    </>
  );
};

export default Main;
