"use client";
import Link from "next/link";
import styles from "./Login.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const onClickHomeHandler = () => {
    router.push("/");
  };

  /* if email id is submitted as Eeshwar.Potluri@uga.edu go to admin  otherwise always  go to dashboard  */

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    if (email === "Eeshwar.Potluri@uga.edu") {
      router.push("/admin");
    } else {
      router.push("/dashboard");
    }
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={onSubmitHandler}>
        <Image
          onClick={onClickHomeHandler}
          className={styles.logo}
          src="/wise-wallet-logo.png"
          alt="logo"
          width={100}
          height={100}
        />
        <label htmlFor="email" className={styles.label}>
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className={styles.input}
        />

        <label htmlFor="password" className={styles.label}>
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          required
          className={styles.input}
        />

        <button type="submit" className={styles.button}>
          Login
        </button>
        <p className={styles.text}>
          Dont have an account?{" "}
          <Link href="/register" className={styles.link}>
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
}
