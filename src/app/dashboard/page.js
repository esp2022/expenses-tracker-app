"use client";
// Import necessary dependencies
import Link from "next/link";
import styles from "./dashboard.module.css";
import NewExpense from "../../components/NewExpense/NewExpense";
import { useState } from "react";
import Expenses from "../../components/Expenses/Expenses";
import ExpenseChart from "../../components/ExpenseChart/ExpenseChart";

// Define Dashboard component
export default function Dashboard() {
  // Define state variables
  const currentMonth = new Date().toLocaleString("default", { month: "long" });
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
      title: "Birthday Dress",
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
      title: "Flight to Hawaii",
      category: "Flight",
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

  // Define expense editing function
  const handleEdit = (id, editedPrice) => {
    setExpenses((prevExpenses) =>
      prevExpenses.map((expense) =>
        expense.id === id ? { ...expense, amount: editedPrice } : expense
      )
    );
    setExpensesTotal(
      (prevExpensesTotal) => prevExpensesTotal - parseFloat(expenses.find((expense) => expense.id === id).amount)
    );
    setExpensesTotal(
      (prevExpensesTotal) => prevExpensesTotal + parseFloat(editedPrice)
    );
  };

  // Define expense deletion function
  const handleDelete = (id) => {
    console.log("Deleting item with id:", id);
    const expenseToDelete = expenses.find((expense) => expense.id === id);
    setExpensesTotal(
      (prevExpensesTotal) => prevExpensesTotal - parseFloat(expenseToDelete.amount)
    );
    setExpenses((prevExpenses) =>
      prevExpenses.filter((item) => item.id !== id)
    );
  };

  // Define functions to handle opening and closing modals
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

  // Return JSX
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        Dashboard for {currentMonth}, {currentYear}
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
      <Expenses items={expenses} onEdit={handleEdit} onDelete={handleDelete} /> {/* Pass the handleEdit function to Expenses component */}
    </div>
  );
}