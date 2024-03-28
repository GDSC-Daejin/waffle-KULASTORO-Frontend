'use client';

import { useForm } from 'react-hook-form';

interface userData {
  userId: string;
  userPwd: string;
}

const SignUp = () => {
  const {
    handleSubmit,
    getValues,
    register,
    formState: { errors },
  } = useForm<userData>();

  const onSubmitForm = () => {
    const data = {
      userId: getValues('userId'),
      userPwd: getValues('userPwd'),
    };
    console.log(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmitForm)}>
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
          type="text"
        />
        <div>{errors.userId?.message}</div>
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
        <div>{errors.userPwd?.message}</div>
        <button>회원가입</button>
      </form>
    </>
  );
};

export default SignUp;
