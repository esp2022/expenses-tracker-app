import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

export default function DashboardLayout({ children }) {
    return (
      <div className="container">
        <Header
          companyName="WiseWallet"
          aboutApp="Expense Tracker"
          userName="Admin"
        />
        {children}
      </div>
    );
}