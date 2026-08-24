import { useState, useEffect, useCallback } from 'react';
import { generateId } from '../utils/expenseUtils';

const STORAGE_KEY = 'expense_tracker_2_data';

export const useExpenses = () => {
  const [expenses, setExpenses] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          // Auto-migrate: any item without a `type` field defaults to 'expense'
          return parsed.map(item => ({
            ...item,
            type: item.type || 'expense'
          }));
        }
      }
    } catch (e) {
      console.error('Error loading transactions from localStorage:', e);
    }
    // Return empty array if nothing is saved
    return [];
  });

  // Sync to localStorage whenever expenses change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
    } catch (e) {
      console.error('Error saving transactions to localStorage:', e);
    }
  }, [expenses]);

  // Add a new transaction (income or expense)
  const addExpense = useCallback((transactionData) => {
    const newTransaction = {
      id: generateId(),
      type: transactionData.type || 'expense',
      amount: Number(transactionData.amount),
      description: transactionData.description.trim(),
      date: transactionData.date,
      createdAt: Date.now()
    };

    setExpenses(prev => [newTransaction, ...prev]);
    return newTransaction;
  }, []);

  // Update existing transaction
  const updateExpense = useCallback((id, updatedData) => {
    setExpenses(prev => prev.map(item => {
      if (item.id === id) {
        return {
          ...item,
          type: updatedData.type !== undefined ? updatedData.type : item.type,
          amount: Number(updatedData.amount !== undefined ? updatedData.amount : item.amount),
          description: (updatedData.description !== undefined ? updatedData.description : item.description).trim(),
          date: updatedData.date !== undefined ? updatedData.date : item.date,
          updatedAt: Date.now()
        };
      }
      return item;
    }));
  }, []);

  // Delete a transaction
  const deleteExpense = useCallback((id) => {
    setExpenses(prev => prev.filter(item => item.id !== id));
  }, []);



  return {
    expenses,
    addExpense,
    updateExpense,
    deleteExpense,

  };
};
