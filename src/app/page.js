import Image from "next/image";
import Link from "next/link";
import styles from "./home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Image src="/wise-wallet-logo.png" alt="logo" width={100} height={100} />
        <h1 className={styles.title}>Welcome to WiseWallet!</h1>
        <p className={styles.description}>
          Manage your expenses efficiently and effectively.
        </p>
        <br/>
        <Image src="/landing.gif" unoptimized={true} alt="logo" width={256} height={256} />

        <div className={styles.grid}>
          <Link href="/login" className={styles.card}>
            <h2>Login &rarr;</h2>
            <p>Access your account to manage your expenses.</p>
          </Link>
          <Link href="/register" className={styles.card}>
            <h2>Register &rarr;</h2>
            <p>Create a new account to start tracking your expenses.</p>
          </Link>
          <div className={styles.card}>
            <h2>Guest &rarr;</h2>
            <p>Look Below for Sample of Application.</p>
          </div>
          <div>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
            <h3>
            <img src = "/unauthView.png" width="1000px" height="1000px"> 
            </img>
            </h3>
          </div>
        </div>
      </main>
    </div>
  );
}
