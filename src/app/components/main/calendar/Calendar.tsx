'use client';

import styled from 'styled-components';
import CalendarTop from './calendarTop/CalendarTop';
import { useRecoilState } from 'recoil';
import { monthAtom, yearAtom } from './atom';
import { useEffect, useState } from 'react';

const Container = styled.div`
  background-color: lightgrey;
  width: 340px;
  height: 600px;
`;

const Calendar = () => {
  const [year, setYear] = useRecoilState(yearAtom);
  const [month, setMonth] = useRecoilState(monthAtom);
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

  return (
    <>
      <Container>
        <CalendarTop />
        <table>
          <thead>
            <tr>
              <th>일</th>
              <th>월</th>
              <th>화</th>
              <th>수</th>
              <th>목</th>
              <th>금</th>
              <th>토</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {dateArray?.slice(0, 7).map((day, index) => (
                <>
                  <td key={index}>{day === 0 ? <></> : <>{day}</>}</td>
                </>
              ))}
            </tr>
            <tr>
              {dateArray?.slice(7, 14).map((day, index) => (
                <>
                  <td key={index}>{day}</td>
                </>
              ))}
            </tr>
            <tr>
              {dateArray?.slice(14, 21).map((day, index) => (
                <>
                  <td key={index}>{day}</td>
                </>
              ))}
            </tr>
            <tr>
              {dateArray?.slice(21, 28).map((day, index) => (
                <>
                  <td key={index}>{day}</td>
                </>
              ))}
            </tr>
            <tr>
              {dateArray?.slice(28, 35).map((day, index) => (
                <>
                  <td key={index}>{day}</td>
                </>
              ))}
            </tr>
            <tr>
              {dateArray?.slice(35, 42).map((day, index) => (
                <>
                  <td key={index}>{day}</td>
                </>
              ))}
            </tr>
          </tbody>
        </table>
      </Container>
    </>
  );
};

export default Calendar;
