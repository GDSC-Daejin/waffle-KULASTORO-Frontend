'use client';

import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

interface userData {
  userid: string;
  password: string;
  nickname: string;
}

const SignUp = () => {
  const {
    handleSubmit,
    getValues,
    register,
    formState: { errors },
  } = useForm<userData>();

  const mutation = useMutation({
    mutationFn: (newData: userData) => {
      return fetch(`https://api.hsmarco.kr/v3api-docs/auth/join`, {
        method: 'POST',
        body: JSON.stringify(newData),
      });
    },
    onSuccess: () => {
      console.log('냠');
    },
  });

  const onSubmitForm = () => {
    mutation.mutate({
      userid: getValues('userid'),
      password: getValues('password'),
      nickname: getValues('nickname'),
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <div>아이디</div>
        <input
          {...register('userid', {
            required: {
              message: '아이디를 입력해주세요.',
              value: true,
            },
            pattern: {
              message: '영문과 숫자를 이용한 아이디를 사용해주세요.',
              value: /^[a-zA-Z0-9]+$/,
            },
            maxLength: {
              message: '20자 이하의 아이디를 사용해주세요.',
              value: 20,
            },
            minLength: {
              message: '4자 이상의 아이디를 사용해주세요.',
              value: 4,
            },
          })}
          type="text"
        />
        <div>{errors.userid?.message}</div>
        <div>비밀번호</div>
        <input
          {...register('password', {
            required: {
              message: '비밀번호를 입려해주세요.',
              value: true,
            },
            pattern: {
              message: '대소문자, 숫자, 특수문자를 사용할 수 있습니다.',
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()-_=+])/,
            },
            maxLength: {
              message: '16자 이하의 아이디를 사용해주세요.',
              value: 16,
            },
            minLength: {
              message: '8자 이상의 아이디를 사용해주세요.',
              value: 8,
            },
          })}
          type="password"
        />
        <div>{errors.password?.message}</div>
        <div>닉네임</div>
        <input
          {...register('nickname', {
            required: {
              message: '사용하실 닉네임을 입력해주세요.',
              value: true,
            },
          })}
          type="text"
        />
        <div>{errors.nickname?.message}</div>
        <button>회원가입</button>
      </form>
    </>
  );
};

export default SignUp;
