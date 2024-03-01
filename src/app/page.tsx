import Image from "next/image";
import styles from "./page.module.css";
import Main from "./components/main/Main";

export default function Home() {
  // 렌더링이 될 때 만약 로그인이 되어있다면 routing for main  

  return (
    <main>
      <Main />
    </main>
  );
}
