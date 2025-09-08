import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";

import { loginUser } from "@/services/auth";
import styles from "../styles/login.module.css";
import union from "../assets/Union.svg";
import Image from "next/image";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      const result = await loginUser(data.username, data.password);

      localStorage.setItem("token", result.token);

      const decoded = jwtDecode(result.token);
      localStorage.setItem("user", decoded.username);

      alert("ورود با موفقیت انجام شد!");
      router.push("/dashboard");
    } catch (error) {
      console.error("Error:", error);
      alert("خطا در ورود. دوباره تلاش کنید.");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/dashboard");
    }
  }, [router]);

  return (
    <>
      <header className={styles.header}>
        <h1>بوت کمپ بوتواستارت</h1>
      </header>

      <div className={styles.formContainer}>
        <div className={styles.head}>
          <Image src={union} alt="Botostart Logo" />
          <h3>فرم ورود</h3>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputsContainer}>
            <input
              type="text"
              placeholder="نام کاربری"
              {...register("username", { required: "نام کاربری الزامی است" })}
            />
            {errors.username && (
              <span className={styles.error}>{errors.username.message}</span>
            )}

            <input
              type="password"
              placeholder="رمز عبور"
              {...register("password", {
                required: "رمز عبور الزامی است",
                minLength: {
                  value: 6,
                  message: "رمز باید حداقل ۶ کاراکتر باشد",
                },
              })}
            />
            {errors.password && (
              <span className={styles.error}>{errors.password.message}</span>
            )}
          </div>

          <button type="submit">ورود</button>
        </form>
        <span className={styles.link}>
          <Link href="/signup">ایجاد حساب کاربری!</Link>
        </span>
      </div>
    </>
  );
}

export default Login;
