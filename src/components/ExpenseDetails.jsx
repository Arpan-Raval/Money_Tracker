import React from 'react';
import { formatCurrency, formatDate } from '../utils/expenseUtils';
import { X, Edit3, Trash2, Calendar, FileText, TrendingUp, TrendingDown } from 'lucide-react';

export const ExpenseDetails = ({
  expense,
  isOpen,
  onClose,
  onEdit,
  onDelete
}) => {
  if (!isOpen || !expense) return null;

  const isIncome = (expense.type || 'expense') === 'income';
  const typeLabel = isIncome ? 'Income' : 'Expense';
  const amountClass = isIncome ? 'amount-income' : '';

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="bottom-sheet" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="sheet-header">
          <div>
            <span className={`type-badge ${isIncome ? 'income' : 'expense'}`}>
              {isIncome ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
              {typeLabel}
            </span>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)', marginTop: '6px' }}>
              {expense.description}
            </h2>
          </div>

          <button
            type="button"
            className="sheet-close-btn"
            onClick={onClose}
            aria-label="Close details"
          >
            <X size={20} />
          </button>
        </div>

        {/* Large Amount Display */}
        <div style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-card)',
          borderRadius: 'var(--radius-card)',
          padding: '24px 20px',
          textAlign: 'center',
          marginBottom: '20px'
        }}>
          <span style={{ fontSize: '13px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Amount
          </span>
          <div className={amountClass} style={{
            fontSize: '38px',
            fontWeight: 700,
            color: isIncome ? undefined : 'var(--text-primary)',
            letterSpacing: '-0.03em',
            marginTop: '4px'
          }}>
            {isIncome ? '+' : '-'}{formatCurrency(expense.amount)}
          </div>
        </div>

        {/* Details Card */}
        <div style={{
          backgroundColor: 'var(--bg-card-subtle)',
          border: '1px solid var(--border-card)',
          borderRadius: 'var(--radius-card)',
          padding: '16px 20px',
          marginBottom: '28px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Calendar size={18} color="var(--text-muted)" />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Date</span>
              <span style={{ fontSize: '15px', fontWeight: 500, color: 'var(--text-primary)' }}>
                {formatDate(expense.date, 'dayWithWeekday')}
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <FileText size={18} color="var(--text-muted)" />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Description</span>
              <span style={{ fontSize: '15px', fontWeight: 500, color: 'var(--text-primary)' }}>
                {expense.description}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button
            type="button"
            className="btn-primary"
            onClick={() => {
              onClose();
              onEdit(expense);
            }}
          >
            <Edit3 size={18} />
            <span>Edit {typeLabel}</span>
          </button>

          <button
            type="button"
            className="btn-danger"
            onClick={() => {
              onDelete(expense);
            }}
          >
            <Trash2 size={18} />
            <span>Delete {typeLabel}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
