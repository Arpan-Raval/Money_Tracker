import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { MonthlySummary } from '../components/MonthlySummary';
import { ExpenseCard } from '../components/ExpenseCard';
import { EmptyState } from '../components/EmptyState';
import {
  getMonthlyIncome,
  getMonthlyExpenseOnly,
  getMonthlyExpensesCount,
  getExpensesByMonth,
  getIncomeByMonth,
  getExpensesByMonthOnly,
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
  // Get all transactions filtered by active month
  const monthTransactions = getExpensesByMonth(expenses, currentYear, currentMonth);
  const monthlyIncome = getMonthlyIncome(expenses, currentYear, currentMonth);
  const monthlyExpense = getMonthlyExpenseOnly(expenses, currentYear, currentMonth);
  const totalCount = getMonthlyExpensesCount(expenses, currentYear, currentMonth);
  const incomeCount = getIncomeByMonth(expenses, currentYear, currentMonth).length;
  const expenseOnlyCount = getExpensesByMonthOnly(expenses, currentYear, currentMonth).length;
  const sortedTransactions = sortExpensesNewestFirst(monthTransactions);

  return (
    <div>
      <PageHeader
        title="Money Tracker"
        subtitle="Track where your money comes and goes."
      />

      {/* Monthly Hero Summary Card */}
      <MonthlySummary
        currentYear={currentYear}
        currentMonth={currentMonth}
        totalSpent={monthlyExpense}
        monthlyIncome={monthlyIncome}
        monthlyExpense={monthlyExpense}
        expensesCount={totalCount}
        incomeCount={incomeCount}
        expenseOnlyCount={expenseOnlyCount}
        onPrevMonth={onPrevMonth}
        onNextMonth={onNextMonth}
        onResetToCurrentMonth={onResetMonth}
      />

      {/* Recent Transactions Header */}
      <div className="section-header">
        <h2 className="section-title">Recent Transactions</h2>
        {sortedTransactions.length > 0 && (
          <span className="section-count">{sortedTransactions.length} items</span>
        )}
      </div>

      {/* Transaction List or Empty State */}
      {sortedTransactions.length > 0 ? (
        <div className="expense-list">
          {sortedTransactions.map((transaction) => (
            <ExpenseCard
              key={transaction.id}
              expense={transaction}
              onClick={onSelectExpense}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No transactions for this month"
          subtitle="Add income or expenses to start tracking your money."
          onAddExpense={onOpenAddModal}
        />
      )}
    </div>
  );
};
