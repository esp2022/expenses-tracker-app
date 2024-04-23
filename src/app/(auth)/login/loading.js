import styles from "./Loading.module.css";

export default function Loading() {
  return (
    <div className={styles.container}>
      <div className={styles.spinner}></div>
      <h1 className={styles.text}>Loading...</h1>
    </div>
  );
}
