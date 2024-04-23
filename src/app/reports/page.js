'use client';
import React, { useState } from "react";
import { saveAs } from "file-saver";
import styles from "./reports.module.css";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { useRouter } from "next/navigation";

const Reports = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
  };

  const downloadCSV = () => {
    // Generate CSV data
    const csvData =
      "data:text/csv;charset=utf-8,Category,Amount\nGroceries,200\nUtilities,150\nRent,800\n";
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, `expenses-${year}-${month}.csv`);
  };

  const downloadPDF = () => {
    // Generate PDF data
    const doc = new jsPDF();
    autoTable(doc, {
      head: [["Category", "Amount"]],
      body: [
        ["Groceries", "200"],
        ["Utilities", "150"],
        ["Rent", "800"],
      ],
      theme: "grid",
      styles: { fillColor: [67, 160, 71] }, 
    });
    doc.save(`expenses-${year}-${month}.pdf`);
  };

  const router =   useRouter();

  const dashboard = () => {
    router.push("/dashboard");
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Expense Reports</h1>
      <div className={styles.form}>
        <label htmlFor="year">Year:</label>
        <input
          type="number"
          id="year"
          value={year}
          onChange={handleYearChange}
          className={styles.input}
        />
        <label htmlFor="month">Month:</label>
        <input
          type="number"
          id="month"
          value={month}
          onChange={handleMonthChange}
          className={styles.input}
        />
        <button onClick={downloadCSV} className={styles.button}>
          Download CSV
        </button>
        <button onClick={downloadPDF} className={styles.button}>
          Download PDF
        </button>
        <button onClick={dashboard} className={styles.button}>
          Dashboard
        </button>
      </div>
    </div>
  );
};

export default Reports;
