import { useRecoilState } from 'recoil';
import { monthAtom, yearAtom } from '../atom';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin: 0 20px;
  font-size: 18px;
`;

const CalendarMonth = () => {
  const [year, setYear] = useRecoilState(yearAtom);
  const [month, setMonth] = useRecoilState(monthAtom);

  return (
    <>
      <Container>
        {year} {month + 1}
      </Container>
    </>
  );
};

export default CalendarMonth;
