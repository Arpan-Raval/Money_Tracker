import React from 'react';
import { Receipt, Plus } from 'lucide-react';

export const EmptyState = ({ onAddExpense, title = "No transactions yet", subtitle = "Start tracking by adding your first transaction." }) => {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">
        <Receipt size={26} strokeWidth={1.6} />
      </div>
      <h3 className="empty-state-title">{title}</h3>
      <p className="empty-state-text">{subtitle}</p>
      {onAddExpense && (
        <button
          type="button"
          className="empty-state-btn"
          onClick={onAddExpense}
        >
          <Plus size={16} />
          <span>Add Transaction</span>
        </button>
      )}
    </div>
  );
};
