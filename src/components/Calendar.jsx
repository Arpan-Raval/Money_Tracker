import React from 'react';
import {
  generateCalendarMonth,
  formatCurrency,
  formatDate,
  getDailyTotal,
  getDailyTotalByType,
  getExpensesByDate
} from '../utils/expenseUtils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ExpenseCard } from './ExpenseCard';

export const Calendar = ({
  year,
  month,
  selectedDate,
  onSelectDate,
  onPrevMonth,
  onNextMonth,
  expenses,
  onSelectExpense
}) => {
  const monthDateStr = `${year}-${String(month).padStart(2, '0')}-01`;
  const monthTitle = formatDate(monthDateStr, 'calendarHeader');

  // Days grid
  const days = generateCalendarMonth(year, month, expenses);
  const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  // Selected date statistics & expenses
  const selectedDayExpenses = getExpensesByDate(expenses, selectedDate);
  const selectedDayIncome = getDailyTotalByType(expenses, selectedDate, 'income');
  const selectedDayExpense = getDailyTotalByType(expenses, selectedDate, 'expense');
  const selectedDayBalance = selectedDayIncome - selectedDayExpense;

  return (
    <div>
      {/* Calendar Card */}
      <div className="calendar-card">
        {/* Month Navigator Header */}
        <div className="calendar-header">
          <button
            type="button"
            className="month-nav-btn"
            onClick={onPrevMonth}
            aria-label="Previous month"
          >
            <ChevronLeft size={18} />
          </button>

          <span className="calendar-title">{monthTitle}</span>

          <button
            type="button"
            className="month-nav-btn"
            onClick={onNextMonth}
            aria-label="Next month"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Weekday labels */}
        <div className="calendar-weekdays">
          {weekdays.map((wd) => (
            <div key={wd} className="calendar-weekday">
              {wd}
            </div>
          ))}
        </div>

        {/* Calendar Day Grid */}
        <div className="calendar-days-grid" role="grid">
          {days.map((item, index) => {
            const isSelected = item.dateStr === selectedDate;
            const cellClass = [
              'calendar-day-cell',
              !item.isCurrentMonth ? 'other-month' : '',
              isSelected ? 'selected' : '',
            ].filter(Boolean).join(' ');

            return (
              <button
                key={`${item.dateStr}-${index}`}
                type="button"
                className={cellClass}
                onClick={() => onSelectDate(item.dateStr)}
                aria-label={`${formatDate(item.dateStr, 'full')}, ${item.hasExpenses ? formatCurrency(item.total) : 'no transactions'}`}
              >
                <span className="calendar-day-number">{item.day}</span>
                {/* Dual indicators: green for income, blue for expense */}
                {(item.hasIncome || item.hasExpense) && (
                  <div className="calendar-day-indicators">
                    {item.hasIncome && <span className="calendar-dot-income" />}
                    {item.hasExpense && <span className="calendar-dot-expense" />}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Date Summary */}
      <div className="day-summary-card">
        <div>
          <div className="day-summary-title">{formatDate(selectedDate, 'dayMonth')}</div>
          <div className="day-summary-subtitle">
            {selectedDayIncome > 0 && selectedDayExpense > 0
              ? `+${formatCurrency(selectedDayIncome)} income · -${formatCurrency(selectedDayExpense)} spent`
              : selectedDayIncome > 0
                ? `+${formatCurrency(selectedDayIncome)} income`
                : selectedDayExpense > 0
                  ? `-${formatCurrency(selectedDayExpense)} spent`
                  : 'No transactions'
            }
          </div>
        </div>
        <div
          className="day-summary-amount"
          style={{
            color: selectedDayBalance > 0
              ? 'var(--income-primary)'
              : selectedDayBalance < 0
                ? 'var(--text-primary)'
                : 'var(--text-muted)'
          }}
        >
          {selectedDayExpenses.length > 0
            ? (selectedDayBalance >= 0 ? '+' : '-') + formatCurrency(Math.abs(selectedDayBalance))
            : formatCurrency(0)
          }
        </div>
      </div>

      {/* List of transactions for selected day */}
      <div className="expense-list">
        {selectedDayExpenses.length > 0 ? (
          selectedDayExpenses.map((expense) => (
            <ExpenseCard
              key={expense.id}
              expense={expense}
              onClick={onSelectExpense}
            />
          ))
        ) : (
          <div style={{ textAlign: 'center', padding: '32px 16px', color: 'var(--text-secondary)', fontSize: '14px' }}>
            No transactions for this day.
          </div>
        )}
      </div>
    </div>
  );
};
