import React from 'react';
import Card from '../UI/Card'
import ExpenseItem from './ExpenseItem';
import './Expenses.css';

const Expenses = ({items, onEdit, onDelete}) => {
  
  return (
    <div className="expenses">
      {items.map(item => (
        <Card key={item.id}>
          <ExpenseItem
            id={item.id}
            key={item.id}
            img={item.img}
            category={item.category}
            title={item.title}
            date={item.date}
            amount={item.amount}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </Card>
      ))}
    </div>
  );
}


export default Expenses;
