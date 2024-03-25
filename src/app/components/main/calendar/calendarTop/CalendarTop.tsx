'use Client';
import styled from 'styled-components';
import CalendarMonth from './CalendarMonth';
import CalendarButton from './CalendarButton';
import { useRecoilState } from 'recoil';
import { monthAtom, yearAtom } from '../atom';

const Container = styled.div`
  display: flex;
`;

const CalendarTop = () => {
  const [year, setYear] = useRecoilState(yearAtom);
  const [month, setMonth] = useRecoilState(monthAtom);

  const prevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear((prevNumber) => prevNumber - 1);
    } else {
      setMonth((prevNumber) => prevNumber - 1);
    }
  };

  const nextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear((prevNumber) => prevNumber + 1);
    } else if (month < 11) {
      setMonth((prevNumber) => prevNumber + 1);
    }
  };

  return (
    <>
      <Container>
        <CalendarButton onClickEvent={prevMonth} buttonType="Prev" />
        <CalendarMonth />
        <CalendarButton onClickEvent={nextMonth} buttonType="Next" />
      </Container>
    </>
  );
};

export default CalendarTop;
