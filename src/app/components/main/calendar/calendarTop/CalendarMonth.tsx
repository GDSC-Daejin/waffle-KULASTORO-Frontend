import { useRecoilState } from 'recoil';
import { monthAtom, yearAtom } from '../atom';
import { useEffect, useState } from 'react';

const CalendarMonth = () => {
  const [year, setYear] = useRecoilState(yearAtom);
  const [month, setMonth] = useRecoilState(monthAtom);

  return (
    <>
      <div>
        {year} {month + 1}
      </div>
    </>
  );
};

export default CalendarMonth;
