'use client';
import React from "react";
import styles from "./Header.module.css";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

/**
 * Renders the header component with the company name and user name.
 *
 * @param {object} props - The props object containing the company name and user name.
 * @param {string} props.companyName - The name of the company.
 * @param {string} props.userName - The name of the user.
 * @return {JSX.Element} The rendered header component.
 */

const Header = ({ companyName, aboutApp, userName }) => {
  

  return (
    <header className={styles.header}>
      <div className={styles.header_container}>
        <div className={styles.brand_container}>
          <Link href="/">
            <Image
              src="/wise-wallet-logo.png"
              alt="Company Logo"
              className={styles.company_logo}
              width={30}
              height={30}
            />
          </Link>
          <h1 className={styles.brand}>{companyName}</h1>
          <p className={styles.sub_title}>{aboutApp}</p>
        </div>
        <div className={styles.user_container}>
          <Image
            src="/user-icon.png"
            alt="User Profile"
            className={styles.profile}
            width={50}
            height={50}
          />
          <p className={styles.user}> {userName}</p>
          <Link href="/"> 
          <button className={styles.logout_button}  >
          
            Logout
          </button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
