"use client";
import Link from "next/link";
import styles from "./dashboard.module.css";
import NewExpense from "@/components/NewExpense/NewExpense";
import { useState } from "react";
import Expenses from "@/components/Expenses/Expenses";
import ExpenseChart from "@/components/ExpenseChart/ExpenseChart";

export default function Dashboard() {
  const currentMonth = new Date().getMonth();
  const currentMonthAsString = new Date().toLocaleString("default", {
    month: "long",
  });
  const currentYear = new Date().getFullYear();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [budget, setBudget] = useState(5000.00);
  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false);
  const [isExpenseChartModalOpen, setIsExpenseChartModalOpen] = useState(false);
  const [expensesTotal, setExpensesTotal] = useState(2782.94);
  const [expenses, setExpenses] = useState([
    {
      id: "e1",
      img: "/Food.png",
      title: "Dinner",
      category: "Food",
      amount: 67.12,
      date: "2024-03-02",
    },
    {
      id: "e2",
      img: "/Clothing.png",
      title: "Birthday Shopping",
      category: "Clothing",
      amount: 546.87,
      date: "2024-04-03",
    },
    {
      id: "e3",
      img: "/Car.png",
      title: "Car Annual Maintenance",
      category: "Car",
      amount: 128.95,
      date: "2024-04-04",
    },
    {
      id: "e4",
      img: "/Flight.png",
      title: "Flight",
      category: "Transportation",
      amount: 2000,
      date: "2024-04-05",
    },
    {
      id: "e5",
      img: "/Movies.png",
      title: "Movie Tickets",
      category: "Movies",
      amount: 40,
      date: "2024-04-06",
    }
  ]);
  const addExpenseHandler = (expenseData) => {
    setExpenses((prevExpenses) => [...prevExpenses, expenseData]);
    setExpensesTotal(
      (prevExpensesTotal) =>
        parseFloat(prevExpensesTotal) + parseFloat(expenseData.amount)
    );
  };
  const handleOpenAddExpenseModal = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseAddExpenseModal = () => {
    setIsAddModalOpen(false);
  };

  const handleOpenBudgetModal = () => {
    setIsBudgetModalOpen(true);
  };

  const handleCloseBudgetModal = () => {
    setIsBudgetModalOpen(false);
  };

  const handleOpenExpenseChartModal = () => {
    setIsExpenseChartModalOpen(true);
  };

  const handleCloseExpenseChartModal = () => {
    setIsExpenseChartModalOpen(false);
  };

  const handleEdit = (id) => {
    console.log("Editing item with id:", id);
  };

  const handleDelete = (id) => {
    console.log("Deleting item with id:", id);
    const expenseToDelete = expenses.find((expense) => expense.id === id);
    //console.log(expenseToDelete);

    setExpensesTotal(
      (prevExpensesTotal) =>
        prevExpensesTotal - parseFloat(expenseToDelete.amount)
    );
    setExpenses((prevExpenses) =>
      prevExpenses.filter((item) => item.id !== id)
    );

  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        Dashboard for {currentMonthAsString}, {currentYear}
      </h2>
      <div className={styles.summary}>
        <div className={styles.card}>
          <h2>Total Expenses</h2>
          <p>${expensesTotal.toFixed(2)}</p>
        </div>
        <div className={styles.card}>
          <h2>Total Budget</h2>
          <p>${budget.toFixed(2)}</p>
        </div>
        <div className={styles.card}>
          <h2>Balance</h2>
          <p>${(budget - expensesTotal).toFixed(2)}</p>
        </div>
      </div>
      <div className={styles.links}>
        <button className={styles.button} onClick={handleOpenBudgetModal}>
          Set Budget{" "}
        </button>
        {isBudgetModalOpen && (
          <div className={styles.modal}>
            <label className={styles.label}>Set new Budget: $</label>
            <input
              className={styles.input}
              type="number"
              value={budget}
              onChange={(e) => setBudget(parseFloat(e.target.value))}
            />
            <button onClick={handleCloseBudgetModal}>Close</button>
          </div>
        )}
        <button className={styles.button} onClick={handleOpenAddExpenseModal}>
          Add expense{" "}
        </button>
        {isAddModalOpen && (
          <div className={styles.modal}>
            <NewExpense onAddExpense={addExpenseHandler} />
            <button onClick={handleCloseAddExpenseModal}>Close</button>
          </div>
        )}
     

        <button className={styles.button} onClick={handleOpenExpenseChartModal}>
          Expenses Charts{" "}
        </button>
        {isExpenseChartModalOpen && (
          <div className={styles.modal}>
            <ExpenseChart data={expenses} />
            <button onClick={handleCloseExpenseChartModal}>Close</button>
          </div>
        )}
        
      </div>
      <Expenses items={expenses} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}
