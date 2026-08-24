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
  const [filterType, setFilterType] = useState('all'); // 'all' | 'income' | 'expense'

  // Sort and filter transactions
  const filteredExpenses = useMemo(() => {
    let items = expenses;

    // Filter by type
    if (filterType !== 'all') {
      items = items.filter(exp => (exp.type || 'expense') === filterType);
    }

    const sorted = sortExpensesNewestFirst(items);
    if (!searchQuery.trim()) return sorted;

    const q = searchQuery.toLowerCase().trim();
    return sorted.filter(exp =>
      exp.description.toLowerCase().includes(q) ||
      exp.date.includes(q) ||
      String(exp.amount).includes(q)
    );
  }, [expenses, searchQuery, filterType]);

  // Compute totals for display
  const incomeTotal = useMemo(() => {
    return filteredExpenses
      .filter(exp => (exp.type || 'expense') === 'income')
      .reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
  }, [filteredExpenses]);

  const expenseTotal = useMemo(() => {
    return filteredExpenses
      .filter(exp => (exp.type || 'expense') === 'expense')
      .reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
  }, [filteredExpenses]);

  const netTotal = incomeTotal - expenseTotal;

  return (
    <div>
      <PageHeader
        title="All Transactions"
        subtitle="Review your income and expenses."
      />

      {/* Filter Tabs */}
      <div className="filter-tabs">
        <button
          type="button"
          className={`filter-tab ${filterType === 'all' ? 'active' : ''}`}
          onClick={() => setFilterType('all')}
        >
          All
        </button>
        <button
          type="button"
          className={`filter-tab ${filterType === 'income' ? 'active-income' : ''}`}
          onClick={() => setFilterType('income')}
        >
          Income
        </button>
        <button
          type="button"
          className={`filter-tab ${filterType === 'expense' ? 'active' : ''}`}
          onClick={() => setFilterType('expense')}
        >
          Expenses
        </button>
      </div>

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
            {filteredExpenses.length} {filteredExpenses.length === 1 ? 'transaction' : 'transactions'}
            {searchQuery && ' found'}
          </span>
          <span style={{
            fontSize: '13px',
            fontWeight: 600,
            color: filterType === 'income'
              ? 'var(--income-primary)'
              : filterType === 'expense'
                ? 'var(--text-secondary)'
                : netTotal >= 0
                  ? 'var(--income-primary)'
                  : 'var(--text-secondary)'
          }}>
            {filterType === 'income'
              ? `+${formatCurrency(incomeTotal)}`
              : filterType === 'expense'
                ? `-${formatCurrency(expenseTotal)}`
                : `Net: ${netTotal >= 0 ? '+' : '-'}${formatCurrency(Math.abs(netTotal))}`
            }
          </span>
        </div>
      )}

      {/* Transaction List */}
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
          title={searchQuery ? "No matching transactions" : filterType !== 'all' ? `No ${filterType} transactions` : "No transactions yet"}
          subtitle={searchQuery ? "Try searching for a different keyword or date." : "Start tracking by adding your first transaction."}
          onAddExpense={onOpenAddModal}
        />
      )}
    </div>
  );
};
