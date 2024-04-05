'use client';

import Image from 'next/image';
import styles from './page.module.css';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;

const Button = styled.button`
  border-style: solid;
  border-width: 1px;
  border-color: rgb(130, 130, 130);
  border-radius: 3px;
  width: 120px;
  height: 40px;
  padding: 5px 10px;
  background-color: white;
  cursor: pointer;
  &:hover {
    background-color: lightgray;
  }
`;

interface url {
  url: string;
}

export default function Home() {
  // 렌더링이 될 때 만약 로그인이 되어있다면 routing for main
  const { data, refetch } = useQuery<string>({
    queryKey: ['login'],
    queryFn: async () => {
      return await (await fetch(`http://api.hsmarco.kr/v3/view/login`)).json();
    },
  });

  const router = useRouter();

  return (
    <main>
      <Container>
        <Button
          onClick={() => {
            router.push(data ? data : 'login');
          }}
        >
          시작하기
        </Button>
      </Container>
    </main>
  );
}
