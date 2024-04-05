'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

interface userData {
  userId: string;
  userPwd: string;
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 250px;
  margin: 15px 0;
`;

const Input = styled.input`
  width: 180px;
  height: 35px;
`;

const Button = styled.button`
  border-style: solid;
  border-width: 1px;
  border-color: rgb(130, 130, 130);
  border-radius: 3px;
  width: 250px;
  height: 35px;
  padding: 5px 10px;
  margin: 5px 0;
  background-color: white;
  cursor: pointer;
  &:hover {
    background-color: lightgray;
  }
`;

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
      <Container>
        <div>
          <form onSubmit={handleSubmit(handleLogin)}>
            <InputContainer>
              <div>아이디</div>
              <Input
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
            </InputContainer>
            <InputContainer>
              <div>비밀번호</div>
              <Input
                {...register('userPwd', {
                  required: {
                    message: '비밀번호를 입려해주세요.',
                    value: true,
                  },
                  pattern: /[A-Za-z0-9!@#$%^&*-_+]/,
                })}
                type="password"
              />
            </InputContainer>
            <Button>로그인</Button>
          </form>
          <Button onClick={() => router.push('/join')}>회원가입</Button>
        </div>
      </Container>
    </>
  );
};

export default SignIn;
