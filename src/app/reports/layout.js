import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import styles from "./layout.module.css";


export default function DashboardLayout({ children }) {
    return (
      <div className={styles.container}>
        <Header
          companyName="WiseWallet"
          aboutApp="Expense Tracker"
          userName="Eeshwar"
        />
        {children}
        <Footer />
      </div>
    );
}