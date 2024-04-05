'use client';

import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { dayAtom, monthAtom, yearAtom } from '../calendar/atom';

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
  const yearA = useRecoilValue(yearAtom);
  const monthA = useRecoilValue(monthAtom);
  const dayA = useRecoilValue(dayAtom);

  const year = yearA;
  const month = monthA + 1;
  const day = dayA;

  const {
    handleSubmit,
    getValues,
    register,
    formState: { errors },
  } = useForm<diaryData>();

  const mutation = useMutation({
    mutationFn: (newData: diaryData) => {
      return fetch(``, {
        method: 'POST',
        body: JSON.stringify(newData),
      });
    },
  });

  const onSubmitForm = () => {
    mutation.mutate({
      title: getValues('title'),
      context: getValues('context'),
      diarydate: day ? new Date(year, month, day) : new Date(),
    });
  };

  return (
    <>
      {day ? (
        <div>
          <Container>
            <div>{year + '년 ' + month + '월 ' + day + '일'}</div>
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
