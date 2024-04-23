import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      Your Journey to Financial Freedom Starts Here | WiseWallet ©{" "}
      {new Date().getFullYear()} | All Rights Reserved
    </footer>
  );
};

export default Footer;
