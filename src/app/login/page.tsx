'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

interface userData {
  userId: string;
  userPwd: string;
}

const SignIn = () => {
  const {
    handleSubmit,
    getValues,
    register,
    formState: { errors },
  } = useForm<userData>();

  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (userData: userData) => {
      return fetch(`/api/hello`, {
        method: 'POST',
        body: JSON.stringify(userData),
      });
    },
    onSuccess: () => {
      router.push('/diary');
    },
  });

  const handleLogin = async (ele: userData) => {
    mutation.mutate({
      userId: ele.userId,
      userPwd: ele.userPwd,
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleLogin)}>
        <div>아이디</div>
        <input
          {...register('userId', {
            required: {
              message: '아이디를 입력해주세요.',
              value: true,
            },
            pattern: {
              message: '정확한 아이디를 입력해주세요.',
              value: /[A-Za-z0-9!@#$%^&*-_+]/,
            },
          })}
        />
        <div>비밀번호</div>
        <input
          {...register('userPwd', {
            required: {
              message: '비밀번호를 입려해주세요.',
              value: true,
            },
            pattern: /[A-Za-z0-9!@#$%^&*-_+]/,
          })}
          type="password"
        />
        <br />
        <button>로그인</button>
      </form>
      <div onClick={() => router.push('/join')}>회원가입</div>
    </>
  );
};

export default SignIn;
