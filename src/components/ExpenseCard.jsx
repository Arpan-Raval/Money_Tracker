import React from 'react';
import { formatCurrency, formatDate } from '../utils/expenseUtils';
import { ChevronRight } from 'lucide-react';

export const ExpenseCard = ({ expense, onClick }) => {
  if (!expense) return null;

  return (
    <div
      className="expense-card"
      onClick={() => onClick && onClick(expense)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick && onClick(expense);
        }
      }}
      aria-label={`${expense.description}, ${formatCurrency(expense.amount)}, on ${formatDate(expense.date, 'full')}`}
    >
      <div className="expense-card-left">
        <span className="expense-card-title">{expense.description}</span>
        <span className="expense-card-date">{formatDate(expense.date, 'full')}</span>
      </div>

      <div className="expense-card-right">
        <span className="expense-card-amount">{formatCurrency(expense.amount)}</span>
        <span className="expense-card-arrow">
          <ChevronRight size={16} />
        </span>
      </div>
    </div>
  );
};
