'use client';

import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

interface userData {
  userId: string;
  userPwd: string;
}

const SignIn = () => {
  const { handleSubmit, getValues, register } = useForm();

  const mutation = useMutation({
    mutationFn: (userData: userData) => {
      return fetch(`/api/hello`, {
        method: 'POST',
        body: JSON.stringify(userData),
      });
    },
    onSuccess: () => {},
  });

  return (
    <>
      <form>
        <div>아이디</div>
        <input />
        <div>비밀번호</div>
        <input />
      </form>
      <div>회원가입</div>
    </>
  );
};

export default SignIn;
