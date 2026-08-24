import React, { useState } from 'react';
import { Layout } from './components/Layout/Layout';
import { BottomNavigation } from './components/BottomNavigation';
import { Home } from './pages/Home';
import { CalendarPage } from './pages/CalendarPage';
import { ExpensesPage } from './pages/ExpensesPage';
import { ExpenseForm } from './components/ExpenseForm';
import { ExpenseDetails } from './components/ExpenseDetails';
import { ConfirmDialog } from './components/ConfirmDialog';
import { useExpenses } from './hooks/useExpenses';
import { toDateString } from './utils/expenseUtils';

export default function App() {
  // Transaction data hook backed by localStorage
  const { expenses, addExpense, updateExpense, deleteExpense } = useExpenses();

  // Navigation tab state: 'home' | 'calendar' | 'expenses'
  const [activeTab, setActiveTab] = useState('home');

  // Active month & year for Home and Calendar navigation
  // Default to August 2026 or current date
  const [currentDate] = useState(() => new Date());
  const [selectedYear, setSelectedYear] = useState(() => {
    // If today is in 2026 use current, else 2026
    return currentDate.getFullYear() === 2026 ? 2026 : 2026;
  });
  const [selectedMonth, setSelectedMonth] = useState(() => {
    // 1-12 indexed, default August (8) or current month
    return 8;
  });

  // Selected date for Calendar view (YYYY-MM-DD)
  const [selectedCalendarDate, setSelectedCalendarDate] = useState('2026-08-20');

  // Modal & Sheet states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [activeExpense, setActiveExpense] = useState(null);
  const [expensePendingDelete, setExpensePendingDelete] = useState(null);

  // Month navigation handlers
  const handlePrevMonth = () => {
    if (selectedMonth === 1) {
      setSelectedMonth(12);
      setSelectedYear(prev => prev - 1);
    } else {
      setSelectedMonth(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (selectedMonth === 12) {
      setSelectedMonth(1);
      setSelectedYear(prev => prev + 1);
    } else {
      setSelectedMonth(prev => prev + 1);
    }
  };

  const handleResetMonth = () => {
    setSelectedYear(2026);
    setSelectedMonth(8);
    setSelectedCalendarDate('2026-08-20');
  };

  // Transaction selection -> open details modal
  const handleSelectExpense = (expense) => {
    setActiveExpense(expense);
    setIsDetailsOpen(true);
  };

  // Edit transaction flow
  const handleOpenEdit = (expense) => {
    setActiveExpense(expense);
    setIsDetailsOpen(false);
    setIsEditModalOpen(true);
  };

  // Submit new transaction (income or expense)
  const handleSaveNewExpense = (transactionData) => {
    const created = addExpense(transactionData);
    if (created && created.date) {
      // If added for a specific month, switch calendar/home view to that month so user sees it immediately
      const [y, m] = created.date.split('-').map(Number);
      if (y && m) {
        setSelectedYear(y);
        setSelectedMonth(m);
        setSelectedCalendarDate(created.date);
      }
    }
    setIsAddModalOpen(false);
  };

  // Submit edited transaction
  const handleSaveEditedExpense = (transactionData) => {
    if (activeExpense) {
      updateExpense(activeExpense.id, transactionData);
      setIsEditModalOpen(false);
      setActiveExpense(null);
    }
  };

  // Delete initiation
  const handleRequestDelete = (expense) => {
    setExpensePendingDelete(expense);
    setIsDetailsOpen(false);
    setIsEditModalOpen(false);
    setIsConfirmDeleteOpen(true);
  };

  // Delete confirmation
  const handleConfirmDelete = () => {
    if (expensePendingDelete) {
      deleteExpense(expensePendingDelete.id);
      setExpensePendingDelete(null);
      setActiveExpense(null);
    }
    setIsConfirmDeleteOpen(false);
  };

  const handleCancelDelete = () => {
    setExpensePendingDelete(null);
    setIsConfirmDeleteOpen(false);
  };

  // Determine type label for delete confirmation
  const pendingDeleteType = expensePendingDelete
    ? ((expensePendingDelete.type || 'expense') === 'income' ? 'income' : 'expense')
    : 'transaction';

  return (
    <Layout>
      {/* Active Page View */}
      {activeTab === 'home' && (
        <Home
          expenses={expenses}
          currentYear={selectedYear}
          currentMonth={selectedMonth}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
          onResetMonth={handleResetMonth}
          onSelectExpense={handleSelectExpense}
          onOpenAddModal={() => setIsAddModalOpen(true)}
        />
      )}

      {activeTab === 'calendar' && (
        <CalendarPage
          expenses={expenses}
          calendarYear={selectedYear}
          calendarMonth={selectedMonth}
          selectedDate={selectedCalendarDate}
          onSelectDate={(dateStr) => {
            setSelectedCalendarDate(dateStr);
            const [y, m] = dateStr.split('-').map(Number);
            if (y && m && (y !== selectedYear || m !== selectedMonth)) {
              setSelectedYear(y);
              setSelectedMonth(m);
            }
          }}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
          onSelectExpense={handleSelectExpense}
        />
      )}

      {activeTab === 'expenses' && (
        <ExpensesPage
          expenses={expenses}
          onSelectExpense={handleSelectExpense}
          onOpenAddModal={() => setIsAddModalOpen(true)}
        />
      )}

      {/* Bottom Fixed Navigation Bar */}
      <BottomNavigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onOpenAddModal={() => setIsAddModalOpen(true)}
      />

      {/* Add Transaction Sheet */}
      <ExpenseForm
        isOpen={isAddModalOpen}
        mode="add"
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleSaveNewExpense}
      />

      {/* Edit Transaction Sheet */}
      <ExpenseForm
        isOpen={isEditModalOpen}
        mode="edit"
        initialExpense={activeExpense}
        onClose={() => {
          setIsEditModalOpen(false);
          setActiveExpense(null);
        }}
        onSubmit={handleSaveEditedExpense}
        onDelete={handleRequestDelete}
      />

      {/* Focused Transaction Details View */}
      <ExpenseDetails
        expense={activeExpense}
        isOpen={isDetailsOpen}
        onClose={() => {
          setIsDetailsOpen(false);
          setActiveExpense(null);
        }}
        onEdit={handleOpenEdit}
        onDelete={handleRequestDelete}
      />

      {/* Deletion Confirmation Modal */}
      <ConfirmDialog
        isOpen={isConfirmDeleteOpen}
        title={`Delete ${pendingDeleteType}?`}
        message={`Are you sure you want to delete "${expensePendingDelete?.description || 'this transaction'}"? This action cannot be undone.`}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </Layout>
  );
}
