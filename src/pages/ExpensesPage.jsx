import React, { useState, useMemo } from 'react';
import { PageHeader } from '../components/PageHeader';
import { ExpenseCard } from '../components/ExpenseCard';
import { EmptyState } from '../components/EmptyState';
import { sortExpensesNewestFirst, formatCurrency } from '../utils/expenseUtils';
import { Search, X } from 'lucide-react';

export const ExpensesPage = ({
  expenses,
  onSelectExpense,
  onOpenAddModal
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Sort and filter expenses
  const filteredExpenses = useMemo(() => {
    const sorted = sortExpensesNewestFirst(expenses);
    if (!searchQuery.trim()) return sorted;

    const q = searchQuery.toLowerCase().trim();
    return sorted.filter(exp =>
      exp.description.toLowerCase().includes(q) ||
      exp.date.includes(q) ||
      String(exp.amount).includes(q)
    );
  }, [expenses, searchQuery]);

  const totalSpentAll = useMemo(() => {
    return filteredExpenses.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
  }, [filteredExpenses]);

  return (
    <div>
      <PageHeader
        title="All Expenses"
        subtitle="Review everything you've spent."
      />

      {/* Search Input Box */}
      <div className="search-filter-box">
        <Search size={18} color="var(--text-muted)" />
        <input
          type="text"
          className="search-filter-input"
          placeholder="Search by description or date..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              display: 'flex',
              padding: '2px'
            }}
            aria-label="Clear search"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Stats summary banner */}
      {expenses.length > 0 && (
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '14px',
          padding: '0 2px'
        }}>
          <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 500 }}>
            {filteredExpenses.length} {filteredExpenses.length === 1 ? 'expense' : 'expenses'}
            {searchQuery && ' found'}
          </span>
          <span style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 600 }}>
            Total: {formatCurrency(totalSpentAll)}
          </span>
        </div>
      )}

      {/* Expense List */}
      {filteredExpenses.length > 0 ? (
        <div className="expense-list">
          {filteredExpenses.map((expense) => (
            <ExpenseCard
              key={expense.id}
              expense={expense}
              onClick={onSelectExpense}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title={searchQuery ? "No matching expenses" : "No expenses yet"}
          subtitle={searchQuery ? "Try searching for a different keyword or date." : "Start tracking your spending by adding your first expense."}
          onAddExpense={onOpenAddModal}
        />
      )}
    </div>
  );
};
