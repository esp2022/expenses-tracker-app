"use client";
import Link from "next/link";
import styles from "./Login.module.css";
import Image from "next/image";
import axios from 'axios';
import React, {useState} from 'react';
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const [email, setEmail]=useState('');
  const [password,setPassword]=useState('');

  const onClickHomeHandler = () => {
    router.push("/");
  };

  /* if email id is submitted as Eeshwar.Potluri@uga.edu go to admin  otherwise always  go to dashboard  */

  async function onSubmitHandler(event) {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3003/routes/api/users', { Email: email, Password: password });
      alert('Login successful');
      navigate('/Dashboard'); // Navigate to the homepage or wherever appropriate after login
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed: ' + (error.response.data.msg || 'Server error'));
    }
  }

  return (
    <div className={styles.container}>
      <form action="/login" method="post" className={styles.form} onSubmit={onSubmitHandler}>
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
          onChange={(e) => {setEmail(e.target.value)}}
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
          onChange={(e) => {setPassword(e.target.value)}}
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

      <a href="/register">Make new account</a>
    </div>
  );
}
