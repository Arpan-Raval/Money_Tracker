import React from 'react';
import { formatCurrency, formatDate } from '../utils/expenseUtils';
import { ChevronLeft, ChevronRight, TrendingUp, TrendingDown } from 'lucide-react';

export const MonthlySummary = ({
  currentYear,
  currentMonth,
  totalSpent,
  monthlyIncome,
  monthlyExpense,
  expensesCount,
  incomeCount,
  expenseOnlyCount,
  onPrevMonth,
  onNextMonth,
  onResetToCurrentMonth
}) => {
  // Format current year & month e.g. "August 2026"
  const monthDateStr = `${currentYear}-${String(currentMonth).padStart(2, '0')}-01`;
  const monthTitle = formatDate(monthDateStr, 'monthYear');

  const balance = (monthlyIncome || 0) - (monthlyExpense || 0);
  const isPositive = balance >= 0;

  return (
    <section aria-label="Monthly Financial Summary">
      {/* Main Monthly Summary Card — Balance */}
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

        <div className="summary-label">Balance</div>
        <div
          className="summary-amount"
          style={{ color: isPositive ? 'var(--income-primary)' : 'var(--expense-text)' }}
        >
          {isPositive ? '+' : '-'}{formatCurrency(Math.abs(balance))}
        </div>
      </div>

      {/* Income & Expense stat cards side by side */}
      <div className="summary-stats-row">
        <div className="summary-stat-mini">
          <span className="stat-mini-label">
            <TrendingUp size={12} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
            Income
          </span>
          <span className="stat-mini-amount amount-income">
            +{formatCurrency(monthlyIncome || 0)}
          </span>
          <span className="stat-mini-count">
            {incomeCount || 0} {(incomeCount || 0) === 1 ? 'entry' : 'entries'}
          </span>
        </div>

        <div className="summary-stat-mini">
          <span className="stat-mini-label">
            <TrendingDown size={12} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
            Expenses
          </span>
          <span className="stat-mini-amount" style={{ color: 'var(--text-primary)' }}>
            -{formatCurrency(monthlyExpense || 0)}
          </span>
          <span className="stat-mini-count">
            {expenseOnlyCount || 0} {(expenseOnlyCount || 0) === 1 ? 'entry' : 'entries'}
          </span>
        </div>
      </div>
    </section>
  );
};
