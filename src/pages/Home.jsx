import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { MonthlySummary } from '../components/MonthlySummary';
import { ExpenseCard } from '../components/ExpenseCard';
import { EmptyState } from '../components/EmptyState';
import {
  getMonthlyTotal,
  getMonthlyExpensesCount,
  getExpensesByMonth,
  sortExpensesNewestFirst
} from '../utils/expenseUtils';

export const Home = ({
  expenses,
  currentYear,
  currentMonth,
  onPrevMonth,
  onNextMonth,
  onResetMonth,
  onSelectExpense,
  onOpenAddModal
}) => {
  // Get expenses filtered by active month
  const monthExpenses = getExpensesByMonth(expenses, currentYear, currentMonth);
  const monthlyTotal = getMonthlyTotal(expenses, currentYear, currentMonth);
  const expensesCount = getMonthlyExpensesCount(expenses, currentYear, currentMonth);
  const sortedMonthExpenses = sortExpensesNewestFirst(monthExpenses);

  return (
    <div>
      <PageHeader
        title="Expense Tracker"
        subtitle="Keep track of where your money goes."
      />

      {/* Monthly Hero Summary Card & Count Card */}
      <MonthlySummary
        currentYear={currentYear}
        currentMonth={currentMonth}
        totalSpent={monthlyTotal}
        expensesCount={expensesCount}
        onPrevMonth={onPrevMonth}
        onNextMonth={onNextMonth}
        onResetToCurrentMonth={onResetMonth}
      />

      {/* Recent Expenses Header */}
      <div className="section-header">
        <h2 className="section-title">Recent Expenses</h2>
        {sortedMonthExpenses.length > 0 && (
          <span className="section-count">{sortedMonthExpenses.length} items</span>
        )}
      </div>

      {/* Expense List or Empty State */}
      {sortedMonthExpenses.length > 0 ? (
        <div className="expense-list">
          {sortedMonthExpenses.map((expense) => (
            <ExpenseCard
              key={expense.id}
              expense={expense}
              onClick={onSelectExpense}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No expenses for this month"
          subtitle="Record your spending to keep track of your budget."
          onAddExpense={onOpenAddModal}
        />
      )}
    </div>
  );
};
