'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

interface userData {
  userid: string;
  password: string;
  nickname: string;
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
  margin: 20px 0;
`;

const Input = styled.input`
  width: 180px;
  height: 35px;
`;

const ErrorText = styled.div`
  position: absolute;
  font-size: 12px;
  color: red;
  margin-top: -20px;
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

const SignUp = () => {
  const {
    handleSubmit,
    getValues,
    register,
    formState: { errors },
  } = useForm<userData>();

  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (newData: userData) => {
      return fetch(`http://api.hsmarco.kr/v3/api-docs/auth/join`, {
        method: 'POST',
        body: JSON.stringify(newData),
      });
    },
    onSuccess: () => {
      router.push('login');
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
      <Container>
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <InputContainer>
            <div>아이디</div>
            <Input
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
          </InputContainer>
          <ErrorText>{errors.userid?.message}</ErrorText>
          <InputContainer>
            <div>비밀번호</div>
            <Input
              {...register('password', {
                required: {
                  message: '비밀번호를 입려해주세요.',
                  value: true,
                },
                pattern: {
                  message: '대소문자, 숫자, 특수문자를 사용할 수 있습니다.',
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()-_=+])/,
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
          </InputContainer>
          <ErrorText>{errors.password?.message}</ErrorText>
          <InputContainer>
            <div>닉네임</div>
            <Input
              {...register('nickname', {
                required: {
                  message: '사용하실 닉네임을 입력해주세요.',
                  value: true,
                },
              })}
              type="text"
            />
          </InputContainer>
          <ErrorText>{errors.nickname?.message}</ErrorText>
          <Button>회원가입</Button>
        </form>
      </Container>
    </>
  );
};

export default SignUp;
