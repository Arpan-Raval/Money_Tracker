import React, { useState, useEffect } from 'react';
import { toDateString } from '../utils/expenseUtils';
import { X, Check, Trash2, AlertCircle } from 'lucide-react';

export const ExpenseForm = ({
  isOpen,
  mode = 'add', // 'add' or 'edit'
  initialExpense = null,
  onClose,
  onSubmit,
  onDelete
}) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(toDateString(new Date()));
  const [errors, setErrors] = useState({});

  // Reset or populate fields when modal opens or initialExpense changes
  useEffect(() => {
    if (isOpen) {
      if (mode === 'edit' && initialExpense) {
        setAmount(String(initialExpense.amount || ''));
        setDescription(initialExpense.description || '');
        setDate(initialExpense.date || toDateString(new Date()));
      } else {
        setAmount('');
        setDescription('');
        setDate(toDateString(new Date()));
      }
      setErrors({});
    }
  }, [isOpen, mode, initialExpense]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};

    const numAmount = Number(amount);
    if (!amount || isNaN(numAmount) || numAmount <= 0) {
      newErrors.amount = 'Please enter a valid amount greater than 0';
    }

    if (!description || !description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!date) {
      newErrors.date = 'Please select a date';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      amount: Number(amount),
      description: description.trim(),
      date
    });

    onClose();
  };

  const isEdit = mode === 'edit';
  const title = isEdit ? 'Edit Expense' : 'Add Expense';
  const subtitle = isEdit ? 'Update your expense details.' : 'Record a new expense.';
  const submitLabel = isEdit ? 'Update Expense' : 'Save Expense';

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="bottom-sheet" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="sheet-header">
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
              {title}
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '2px' }}>
              {subtitle}
            </p>
          </div>

          <button
            type="button"
            className="sheet-close-btn"
            onClick={onClose}
            aria-label="Close form"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate>
          {/* Amount Field */}
          <div className="form-group">
            <label htmlFor="expense-amount" className="form-label">
              Amount
            </label>
            <div className="form-input-wrapper">
              <span className="currency-prefix">₹</span>
              <input
                id="expense-amount"
                type="number"
                step="any"
                min="1"
                className={`form-input with-prefix ${errors.amount ? 'error' : ''}`}
                placeholder="0.00"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                  if (errors.amount) setErrors(prev => ({ ...prev, amount: null }));
                }}
                autoFocus={!isEdit}
              />
            </div>
            {errors.amount && (
              <div className="form-error">
                <AlertCircle size={14} />
                <span>{errors.amount}</span>
              </div>
            )}
          </div>

          {/* Description Field */}
          <div className="form-group">
            <label htmlFor="expense-description" className="form-label">
              Description
            </label>
            <input
              id="expense-description"
              type="text"
              className={`form-input ${errors.description ? 'error' : ''}`}
              placeholder="e.g. Dinner, Groceries, Flight"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                if (errors.description) setErrors(prev => ({ ...prev, description: null }));
              }}
              maxLength={60}
            />
            {errors.description && (
              <div className="form-error">
                <AlertCircle size={14} />
                <span>{errors.description}</span>
              </div>
            )}
          </div>

          {/* Date Field */}
          <div className="form-group">
            <label htmlFor="expense-date" className="form-label">
              Date
            </label>
            <input
              id="expense-date"
              type="date"
              className={`form-input ${errors.date ? 'error' : ''}`}
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                if (errors.date) setErrors(prev => ({ ...prev, date: null }));
              }}
            />
            {errors.date && (
              <div className="form-error">
                <AlertCircle size={14} />
                <span>{errors.date}</span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '28px' }}>
            <button
              type="submit"
              className="btn-primary"
            >
              <Check size={18} />
              <span>{submitLabel}</span>
            </button>

            {isEdit && onDelete && (
              <button
                type="button"
                className="btn-danger"
                onClick={() => {
                  onDelete(initialExpense);
                }}
              >
                <Trash2 size={18} />
                <span>Delete Expense</span>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
