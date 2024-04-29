import React, { useState } from 'react';
import Card from '../UI/Card';
import './ExpenseForm.css';
import axios from 'axios';

/**
 * React component for a form to create a new expense.
 * 
 * @param {Object} props - The component props.
 * @param {Function} props.onSaveExpenseData - Callback function to save expense data.
 * @returns {JSX.Element} The rendered ExpenseForm component.
 */
const ExpenseForm = (props) => {

  const todaysDate = new Date().toISOString().split('T')[0];
  const [enteredTitle, setEnteredTitle] = useState('');
  const [enteredAmount, setEnteredAmount] = useState('');
  const [enteredImg, setEnteredImg] = useState('/Other.png');
  const [enteredDate, setEnteredDate] = useState(todaysDate);
  const [enteredCategory, setEnteredCategory] = useState('Other');
  const [id, setId] = useState('');

  /**
   * Handles the change event of the title input.
   * 
   * @param {React.ChangeEvent<HTMLInputElement>} event - The event object.
   */
  const titleChangeHandler = (event) => {
    setEnteredTitle(event.target.value);
  };

  /**
   * Handles the change event of the amount input.
   * 
   * @param {React.ChangeEvent<HTMLInputElement>} event - The event object.
   */
  const amountChangeHandler = (event) => {
    setEnteredAmount(event.target.value);
  };

  /**
   * Handles the change event of the img input.
   * 
   * @param {React.ChangeEvent<HTMLInputElement>} event - The event object.
   */
  const imgChangeHandler = (event) => {
    setEnteredImg(event.target.value);
  };

  /**
   * Handles the change event of the date input.
   * 
   * @param {React.ChangeEvent<HTMLInputElement>} event - The event object.
   * @returns {void}
   * 
   */
  const dateChangeHandler = (event) => {
    setEnteredDate(event.target.value);
  };

  /**
   * Handles the change event of the category input.
   * 
   * @param {React.ChangeEvent<HTMLInputElement>} event - The event object.
   * @returns {void}
   * 
   */
  const categoryChangeHandler = (event) => {
    setEnteredCategory(event.target.value);
    setEnteredImg('/' + event.target.value + '.png');
  }

  /**
   * Handles the form submission.
   * 
   * @param {React.FormEvent<HTMLFormElement>} event - The event object.
   */
  async function submitHandler (event) {
    event.preventDefault();
    if (!enteredTitle || !enteredAmount || !enteredCategory || !enteredDate) {
      alert('Please fill in all fields');
      return;
    }
    try {
      setId(Math.random());
      console.log("made it to z");
      console.log({Id: id, Img: enteredImg, Title: enteredTitle, Category: enteredCategory, Amount: enteredAmount, Date: enteredDate});
      const response = await axios.post('http://localhost:8085/api/expenses/add', {Id: id, Img: enteredImg, Title: enteredTitle, Category: enteredCategory, Amount: enteredAmount, Date: enteredDate});
      console.log('Added Successfully', response.data);
      alert('Expense Added Successfully');
    } catch (error) {
      console.error('Failed to create account:', error);
      alert('Failed to create account');
    }

    const expenseData = {
      id: id,
      title: enteredTitle,
      amount: enteredAmount,
      img: enteredImg,
      date: enteredDate,
      category: enteredCategory
    };

    

    props.onSaveExpenseData(expenseData);
    console.log("expenseData:");
    console.log(expenseData);

    setEnteredTitle('');
    setEnteredAmount('');
    setEnteredImg('/Other.png');
    setEnteredDate(todaysDate);
    setEnteredCategory('Other');
  };

  return (
    <Card>
      <form onSubmit={submitHandler}>
        <div className="new-expense__controls">
          <div className="new_expense__control_label_input">
            <label>Title</label>
            <input
              type="text"
              value={enteredTitle}
              onChange={titleChangeHandler}
            />
          </div>
          <div className="new_expense__control_label_input">
            <label>Amount</label>
            <input
              type="number"
              min="0.01"
              step="0.01"
              value={enteredAmount}
              onChange={amountChangeHandler}
            />
          </div>
          <div className="new_expense__control_label_input">
            <label>Category</label>
            <select value={enteredCategory} onChange={categoryChangeHandler} className='new_expense__select'>
              <option value="Other">Other</option>
              <option value="Food">Food</option>  
              <option value="Clothing">Clothing</option>
              <option value="Car">Car</option>
              <option value="Flight">Flight</option>
              <option value="Movies">Movies</option>
            </select>
          </div>
          <div className="new_expense__control_label_input">
            <label>Image</label>
            <input value={enteredImg} onChange={imgChangeHandler} disabled={true} />
          </div>
          <div className="new_expense__control_label_input">
            <label>Date</label>
            <input
              type="date"
              min="2020-01-01"
              max={todaysDate}
              value={enteredDate}
              onChange={dateChangeHandler}
            />
          </div>
          <div className="new-expense__actions">
            <button type="submit">Add Expense</button>
          </div>
        </div>
      </form>
    </Card>
  );
};

export default ExpenseForm;

