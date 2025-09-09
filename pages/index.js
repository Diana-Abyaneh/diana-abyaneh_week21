import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "../styles/Home.module.css";

function HomePage() {
  const router = useRouter();
  const btnHandler = (event) => {
    if (event.target.innerText == "ثبت نام") router.push("/signup");
    else router.push("/login");
  };

  return (
    <div className={styles.container}>
      <h1>پروژه انبارداری بوت کمپ</h1>
      <div className={styles.btnContainer}>
        <button onClick={(e) => btnHandler(e)}>ثبت نام</button>
        <button onClick={(e) => btnHandler(e)}>ورود</button>
      </div>
    </div>
  );
}

export default HomePage;
