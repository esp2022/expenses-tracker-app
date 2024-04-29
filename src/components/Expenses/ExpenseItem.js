"use client";
import React, { useState } from "react";
import Card from "../UI/Card";
import "./ExpenseItem.css";
import Image from "next/image";

const ExpenseItem = ({ id, img, category, title, date, amount, onEdit, onDelete }) => {
  const localDate = new Date(date + "T00:00");
  const [editedAmount, setEditedAmount] = useState(amount); // State to track edited amount
  const [isEditing, setIsEditing] = useState(false); // State to track editing mode

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // Call the onEdit function with the edited amount
    onEdit(id, parseFloat(editedAmount));
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset the edited amount and exit editing mode
    setEditedAmount(amount);
    setIsEditing(false);
  };

  return (
    <Card className="expense-item">
      <Image
        src={img}
        className="expense-img"
        width={100}
        height={100}
        alt={title}
      />
      <div className="expense-item__description">
        <h3 className="expense-item__title">
          {localDate.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </h3>
        <h3 className="expense-item__category">{category}</h3>
        <h3 className="expense-item__title">{title}</h3>
      </div>
      {isEditing ? (
        <div className="expense-item__edit">
          <input
            type="number"
            value={editedAmount}
            onChange={(e) => setEditedAmount(e.target.value)}
          />
          <div>
            <button className="save-btn" onClick={handleSave}>Save</button>
            <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      ) : (
        <div className="expense-item__price">${amount}</div>
      )}
      <button className="edit-btn" onClick={handleEdit}>Edit</button>
      <button className="delete-btn" onClick={() => onDelete(id)}>Delete</button>
    </Card>
  );
};

export default ExpenseItem;