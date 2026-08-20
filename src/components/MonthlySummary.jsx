import React from 'react';
import { formatCurrency, formatDate } from '../utils/expenseUtils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const MonthlySummary = ({
  currentYear,
  currentMonth,
  totalSpent,
  expensesCount,
  onPrevMonth,
  onNextMonth,
  onResetToCurrentMonth
}) => {
  // Format current year & month e.g. "August 2026"
  const monthDateStr = `${currentYear}-${String(currentMonth).padStart(2, '0')}-01`;
  const monthTitle = formatDate(monthDateStr, 'monthYear');

  return (
    <section aria-label="Monthly Spending Summary">
      {/* Main Monthly Summary Card */}
      <div className="monthly-summary-card">
        <div className="monthly-summary-header">
          <button
            type="button"
            className="month-nav-btn"
            onClick={onPrevMonth}
            aria-label="Previous month"
          >
            <ChevronLeft size={18} />
          </button>

          <span
            className="month-selector-title"
            onClick={onResetToCurrentMonth}
            style={{ cursor: 'pointer' }}
            title="Click to reset to current date"
          >
            {monthTitle}
          </span>

          <button
            type="button"
            className="month-nav-btn"
            onClick={onNextMonth}
            aria-label="Next month"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        <div className="summary-label">Total spent</div>
        <div className="summary-amount">{formatCurrency(totalSpent)}</div>
      </div>

      {/* Expenses this month card */}
      <div className="stat-card">
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span className="stat-number">{expensesCount}</span>
          <span className="stat-label">
            {expensesCount === 1 ? 'Expense this month' : 'Expenses this month'}
          </span>
        </div>
      </div>
    </section>
  );
};
