"use client";
import React, { useState } from "react";
import Card from "../UI/Card";
import "./ExpenseItem.css";
import Image from "next/image";

const ExpenseItem = ({id, img, category, title, date, amount, onEdit, onDelete}) => {
  const localDate = new Date(date + "T00:00");

   
    

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
      <div className="expense-item__price">${amount}</div>

      <button className="edit-btn"  onClick={() =>  onEdit(id)}>
        Edit
      </button>

      <button className="delete-btn"  onClick={() =>  onDelete(id)}>
        Delete
      </button>
    </Card>
  );
};

export default ExpenseItem;
