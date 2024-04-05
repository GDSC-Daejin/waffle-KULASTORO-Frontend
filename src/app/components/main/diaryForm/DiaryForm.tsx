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
  diarydate?: Date;
}

const Container = styled.div`
  background-color: white;
  width: 500px;
  height: 600px;
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
      return fetch(`https://api.hsmarco.kr/v3/api-docs/diary/create`, {
        method: 'POST',
        body: JSON.stringify(newData),
      });
    },
  });

  const onSubmitForm = () => {
    mutation.mutate({
      title: getValues('title'),
      context: getValues('context'),
      diarydate:
        diaryYear && diaryMonth && diaryDay
          ? new Date(diaryYear, diaryMonth, diaryDay)
          : new Date(),
    });
  };

  return (
    <>
      {diaryDay ? (
        <div>
          <Container>
            <div>
              {diaryYear + '년 ' + diaryMonth + '월 ' + diaryDay + '일'}
            </div>
            <form onSubmit={handleSubmit(onSubmitForm)}>
              <div>제목</div>
              <input
                {...register('title', {
                  required: {
                    message: '제목을 입력해주세요.',
                    value: true,
                  },
                })}
              />
              <div>{errors.title?.message}</div>
              <div>내용</div>
              <textarea
                {...register('context', {
                  required: {
                    message: '내용을 입력해주세요.',
                    value: true,
                  },
                })}
              />
              <div>{errors.context?.message}</div>
              <button>등록</button>
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
