'use client';

import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { diaryDayAtom, diaryMonthAtom, diaryYearAtom } from '../calendar/atom';
import { useEffect, useState } from 'react';

interface diaryData {
  title: string;
  context: string;
  diarydate?: string;
  emotion?: null;
}

const Container = styled.div`
  margin-top: 20px;
  background-color: white;
  width: 500px;
  height: 600px;
`;

const DateContainer = styled.div`
  font-size: 14px;
  margin-bottom: 15px;
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 300px;
  margin: 15px 0;
`;

const TextContainer = styled.div`
  margin-bottom: 10px;
`;

const ErrorText = styled.div`
  position: absolute;
  font-size: 12px;
  color: red;
  margin-top: -15px;
`;

const TextArea = styled.textarea`
  width: 300px;
  heigth: 500px;
`;

const Input = styled.input`
  width: 250px;
  height: 35px;
`;

const Button = styled.button`
  border-style: solid;
  border-width: 1px;
  border-color: rgb(130, 130, 130);
  border-radius: 3px;
  width: 300px;
  height: 35px;
  padding: 5px 10px;
  margin: 5px 0;
  background-color: white;
  cursor: pointer;
  &:hover {
    background-color: lightgray;
  }
`;

const DiaryForm = () => {
  const diaryYear = useRecoilValue(diaryYearAtom);
  const diaryMonth = useRecoilValue(diaryMonthAtom);
  const diaryDay = useRecoilValue(diaryDayAtom);

  const {
    handleSubmit,
    getValues,
    register,
    formState: { errors },
  } = useForm<diaryData>();

  const mutation = useMutation({
    mutationFn: (newData: diaryData) => {
      return fetch(`http://api.hsmarco.kr/v3/api-docs/diary/create`, {
        method: 'POST',
        body: JSON.stringify(newData),
      });
    },
  });

  const onSubmitForm = () => {
    mutation.mutate({
      title: getValues('title'),
      context: getValues('context'),
      emotion: null,
      diarydate:
        diaryYear && diaryMonth && diaryDay
          ? diaryYear +
            '-' +
            (String(diaryMonth).length == 1 ? '0' + diaryMonth : diaryMonth) +
            '-' +
            diaryDay +
            'T00:00:00Z'
          : '1900-01-01T00:00:00Z',
    });

    console.log({
      title: getValues('title'),
      context: getValues('context'),
      emotion: null,
      diarydate:
        diaryYear && diaryMonth && diaryDay
          ? diaryYear +
            '-' +
            (String(diaryMonth).length == 1 ? '0' + diaryMonth : diaryMonth) +
            '-' +
            diaryDay +
            'T00:00:00Z'
          : '1900-01-01T00:00:00Z',
    });
  };

  return (
    <>
      {diaryDay ? (
        <div>
          <Container>
            <DateContainer>
              {diaryYear + '년 ' + diaryMonth + '월 ' + diaryDay + '일'}
            </DateContainer>
            <form onSubmit={handleSubmit(onSubmitForm)}>
              <InputContainer>
                <div>제목</div>
                <Input
                  {...register('title', {
                    required: {
                      message: '제목을 입력해주세요.',
                      value: true,
                    },
                  })}
                />
              </InputContainer>
              <ErrorText>{errors.title?.message}</ErrorText>
              <TextContainer>내용</TextContainer>
              <InputContainer>
                <TextArea
                  rows={10}
                  {...register('context', {
                    required: {
                      message: '내용을 입력해주세요.',
                      value: true,
                    },
                  })}
                />
              </InputContainer>
              <ErrorText>{errors.context?.message}</ErrorText>
              <Button>등록</Button>
            </form>
          </Container>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default DiaryForm;
