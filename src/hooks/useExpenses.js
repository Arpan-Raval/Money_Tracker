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
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error loading expenses from localStorage:', e);
    }
    // Return empty array if nothing is saved
    return [];
  });

  // Sync to localStorage whenever expenses change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
    } catch (e) {
      console.error('Error saving expenses to localStorage:', e);
    }
  }, [expenses]);

  // Add a new expense
  const addExpense = useCallback((expenseData) => {
    const newExpense = {
      id: generateId(),
      amount: Number(expenseData.amount),
      description: expenseData.description.trim(),
      date: expenseData.date,
      createdAt: Date.now()
    };

    setExpenses(prev => [newExpense, ...prev]);
    return newExpense;
  }, []);

  // Update existing expense
  const updateExpense = useCallback((id, updatedData) => {
    setExpenses(prev => prev.map(item => {
      if (item.id === id) {
        return {
          ...item,
          amount: Number(updatedData.amount !== undefined ? updatedData.amount : item.amount),
          description: (updatedData.description !== undefined ? updatedData.description : item.description).trim(),
          date: updatedData.date !== undefined ? updatedData.date : item.date,
          updatedAt: Date.now()
        };
      }
      return item;
    }));
  }, []);

  // Delete an expense
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
