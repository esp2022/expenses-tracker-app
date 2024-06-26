"use client";
import Link from "next/link";
import styles from "./register.module.css";
import Image from "next/image";
import axios from 'axios';
import React, {useState} from 'react';
import userContext from "../../../../context/userContext";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();

  const [username, setUsername]=useState('');
  const [email, setEmail]=useState('');
  const [password, setPassword]=useState('');
  const [confirmPassword, setConfirmPassword]=useState('');

  const onClickHomeHandler = () => {
    router.push("/");
  };

  async function onSubmitHandler(event) {
      event.preventDefault(); // Prevents the default form submission behavior
    
      if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
      }
    
      try {
        console.log({Username: username, Email: email, Password: password, ConfirmPassword: confirmPassword});
        const response = await axios.post('http://localhost:8085/api/users/register', {Username: username, Email: email, Password: password, ConfirmPassword: confirmPassword});
        console.log('Login Successful:', response.data)
        alert('Account created successfully');
      } catch (error) {
        console.error('Failed to create account:', error);
        alert('Failed to create account');
      }
    };

  return (
    <div className={styles.container}>
      <form action="/register" method="post" className={styles.form} onSubmit={onSubmitHandler}>
        <Image
          onClick={onClickHomeHandler}
          className={styles.logo}
          src="/wise-wallet-logo.png"
          alt="logo"
          width={100}
          height={100}
        />
        <h1 className={styles.title}>Create Your Account</h1>
        <label htmlFor="name" className={styles.label}>
          Full Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className={styles.input}
          onChange={(e) => {setUsername(e.target.value)}}
        />

        <label htmlFor="email" className={styles.label}>
          Email Address
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

        <label htmlFor="confirm-password" className={styles.label}>
          Confirm Password
        </label>
        <input
          type="password"
          id="confirm-password"
          name="confirm-password"
          required
          className={styles.input}
          onChange={(e) => {setConfirmPassword(e.target.value)}}
        />

        <button type="submit" className={styles.button}>
          Register
        </button>
        <p className={styles.text}>
          Already have an account?{" "}
          <Link href="/login" className={styles.link}>
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
}


