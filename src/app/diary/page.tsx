'use client';

import styled from 'styled-components';
import { RecoilRoot } from 'recoil';
import Calendar from '../components/main/calendar/Calendar';
import DiaryForm from '../components/main/diaryForm/DiaryForm';

const Container = styled.div`
  display: flex;
`;

const Main = () => {
  return (
    <>
      <RecoilRoot>
        <Container>
          <Calendar />
          <DiaryForm />
        </Container>
      </RecoilRoot>
    </>
  );
};

export default Main;
