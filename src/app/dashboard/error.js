'use client';
import Link from "next/link";
import styles from "./error.module.css";

function Error({ statusCode }) {
  return (
    <div className={styles.errorContainer}>
      <h1 className={styles.errorTitle}>
        {statusCode
          ? `An error ${statusCode} occurred on server`
          : "An error occurred on client"}
      </h1>
      <p className={styles.errorMessage}>
        We're sorry, something went wrong. Please try again later or return to
        the homepage.
      </p>
      <Link href="/">
        <a className={styles.errorLink}>Go back to homepage</a>
      </Link>
    </div>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
