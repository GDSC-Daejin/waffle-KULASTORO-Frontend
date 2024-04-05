'use client';

import styled from 'styled-components';
import CalendarTop from './calendarTop/CalendarTop';
import { useRecoilState } from 'recoil';
import {
  diaryDayAtom,
  diaryMonthAtom,
  diaryYearAtom,
  monthAtom,
  yearAtom,
} from './atom';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

const Container = styled.div`
  width: 270px;
  height: 600px;
`;

const TableContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Th = styled.th`
  width: 25px;
  height: 25px;
`;

const Td = styled.td`
  width: 25px;
  height: 25px;
  text-align: center;
  cursor: pointer;
`;

const Calendar = () => {
  const [year, setYear] = useRecoilState(yearAtom);
  const [month, setMonth] = useRecoilState(monthAtom);

  const [diaryYear, setDiaryYear] = useRecoilState(diaryYearAtom);
  const [diaryMonth, setDiaryMonth] = useRecoilState(diaryMonthAtom);
  const [diaryDay, setDiaryDay] = useRecoilState(diaryDayAtom);

  const [dateArray, setDateArray] = useState<Array<number>>([]);

  useEffect(() => {
    for (let i = 1; month === new Date(year, month, i).getMonth(); i++) {
      if (i === 1) {
        switch (new Date(year, month, 1).getDay()) {
          case 0:
            setDateArray([]);
            break;
          case 1:
            setDateArray([0]);
            break;
          case 2:
            setDateArray([0, 0]);
            break;
          case 3:
            setDateArray([0, 0, 0]);
            break;
          case 4:
            setDateArray([0, 0, 0, 0]);
            break;
          case 5:
            setDateArray([0, 0, 0, 0, 0]);
            break;
          case 6:
            setDateArray([0, 0, 0, 0, 0, 0]);
            break;
        }
      }
      setDateArray((dateArray) => [...dateArray, i]);
    }
  }, [month, year]);

  const handleSetDate = (day: number) => {
    setDiaryYear(year);
    setDiaryMonth(month + 1);
    setDiaryDay(day);
  };

  const { data, refetch } = useQuery({
    queryKey: ['diaryData'],
    queryFn: async () => {
      return await (
        await fetch(`http://api.hsmarco.kr/v3/api_docs/diary/list`)
      ).json();
    },
  });

  console.log(diaryDay ? new Date(year, month, diaryDay) : 0);

  return (
    <>
      <Container>
        <CalendarTop />
        <TableContainer>
          <table>
            <thead>
              <tr>
                <Th>일</Th>
                <Th>월</Th>
                <Th>화</Th>
                <Th>수</Th>
                <Th>목</Th>
                <Th>금</Th>
                <Th>토</Th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {dateArray?.slice(0, 7).map((day, index) => (
                  <Td key={index} onClick={() => handleSetDate(day)}>
                    {day === 0 ? <></> : <>{day}</>}
                  </Td>
                ))}
              </tr>
              <tr>
                {dateArray?.slice(7, 14).map((day, index) => (
                  <Td key={index} onClick={() => handleSetDate(day)}>
                    {day}
                  </Td>
                ))}
              </tr>
              <tr>
                {dateArray?.slice(14, 21).map((day, index) => (
                  <Td key={index} onClick={() => handleSetDate(day)}>
                    {day}
                  </Td>
                ))}
              </tr>
              <tr>
                {dateArray?.slice(21, 28).map((day, index) => (
                  <Td key={index} onClick={() => handleSetDate(day)}>
                    {day}
                  </Td>
                ))}
              </tr>
              <tr>
                {dateArray?.slice(28, 35).map((day, index) => (
                  <Td key={index} onClick={() => handleSetDate(day)}>
                    {day}
                  </Td>
                ))}
              </tr>
              <tr>
                {dateArray?.slice(35, 42).map((day, index) => (
                  <Td key={index} onClick={() => handleSetDate(day)}>
                    {day}
                  </Td>
                ))}
              </tr>
            </tbody>
          </table>
        </TableContainer>
      </Container>
    </>
  );
};

export default Calendar;
