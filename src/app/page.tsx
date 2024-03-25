'use client';

import Image from 'next/image';
import styles from './page.module.css';
import { useRouter } from 'next/navigation';

export default function Home() {
  // 렌더링이 될 때 만약 로그인이 되어있다면 routing for main
  const router = useRouter();

  return (
    <main>
      <button onClick={() => router.push('/join')}>시작하기</button>
    </main>
  );
}
