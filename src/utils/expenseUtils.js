/**
 * Utility functions for Money Tracker (Income & Expense)
 */

// Format numbers into Indian Rupee currency format (e.g. ₹12,450 or ₹500.50)
export const formatCurrency = (amount) => {
  const num = Number(amount);
  if (isNaN(num)) return '₹0';
  
  // Format with commas, handling integers vs decimals cleanly
  const isInteger = Number.isInteger(num);
  const formatted = new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: isInteger ? 0 : 2,
    minimumFractionDigits: isInteger ? 0 : 2,
  }).format(Math.abs(num));
  
  return `₹${formatted}`;
};

// Format with sign prefix for display (e.g. +₹5,000 or -₹1,200)
export const formatSignedCurrency = (amount, type) => {
  const formatted = formatCurrency(amount);
  if (type === 'income') return `+${formatted}`;
  if (type === 'expense') return `-${formatted}`;
  return formatted;
};

// Format date string (YYYY-MM-DD) into readable formats like "20 August 2026"
export const formatDate = (dateStr, format = 'full') => {
  if (!dateStr) return '';
  const [year, month, day] = dateStr.split('-').map(Number);
  const date = new Date(year, month - 1, day);

  if (isNaN(date.getTime())) return dateStr;

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const shortMonths = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const shortDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const mName = months[month - 1];
  const sMonth = shortMonths[month - 1];
  const dayName = days[date.getDay()];
  const sDayName = shortDays[date.getDay()];

  switch (format) {
    case 'full': // "20 August 2026"
      return `${day} ${mName} ${year}`;
    case 'medium': // "20 Aug 2026"
      return `${day} ${sMonth} ${year}`;
    case 'short': // "20 Aug"
      return `${day} ${sMonth}`;
    case 'dayMonth': // "20 August"
      return `${day} ${mName}`;
    case 'monthYear': // "August 2026"
      return `${mName} ${year}`;
    case 'dayWithWeekday': // "Thu, 20 August 2026"
      return `${sDayName}, ${day} ${mName} ${year}`;
    case 'calendarHeader': // "August 2026"
      return `${mName} ${year}`;
    default:
      return `${day} ${mName} ${year}`;
  }
};

// Get standard YYYY-MM-DD from Date object
export const toDateString = (date = new Date()) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

// ============================================================
// Type-aware filtering helpers
// ============================================================

// Filter transactions by exact YYYY-MM-DD
export const getExpensesByDate = (expenses, dateStr) => {
  if (!Array.isArray(expenses) || !dateStr) return [];
  return expenses.filter(exp => exp.date === dateStr);
};

// Filter transactions by exact date AND type
export const getTransactionsByDateAndType = (expenses, dateStr, type) => {
  if (!Array.isArray(expenses) || !dateStr) return [];
  return expenses.filter(exp => exp.date === dateStr && (exp.type || 'expense') === type);
};

// Filter transactions by year and month (1-indexed month: 1 = Jan, 8 = Aug)
export const getExpensesByMonth = (expenses, year, month) => {
  if (!Array.isArray(expenses)) return [];
  const yStr = String(year);
  const mStr = String(month).padStart(2, '0');
  const prefix = `${yStr}-${mStr}`;
  return expenses.filter(exp => exp.date && exp.date.startsWith(prefix));
};

// Filter by month AND type
export const getTransactionsByMonthAndType = (expenses, year, month, type) => {
  return getExpensesByMonth(expenses, year, month).filter(exp => (exp.type || 'expense') === type);
};

// Shorthand: get only income for a month
export const getIncomeByMonth = (expenses, year, month) => {
  return getTransactionsByMonthAndType(expenses, year, month, 'income');
};

// Shorthand: get only expenses for a month
export const getExpensesByMonthOnly = (expenses, year, month) => {
  return getTransactionsByMonthAndType(expenses, year, month, 'expense');
};

// ============================================================
// Totals
// ============================================================

// Calculate total for a specific date (all types)
export const getDailyTotal = (expenses, dateStr) => {
  const dayExpenses = getExpensesByDate(expenses, dateStr);
  return dayExpenses.reduce((sum, exp) => sum + (Number(exp.amount) || 0), 0);
};

// Calculate total for a specific date filtered by type
export const getDailyTotalByType = (expenses, dateStr, type) => {
  const items = getTransactionsByDateAndType(expenses, dateStr, type);
  return items.reduce((sum, exp) => sum + (Number(exp.amount) || 0), 0);
};

// Calculate total for a specific month (all types combined — legacy compat)
export const getMonthlyTotal = (expenses, year, month) => {
  const monthExpenses = getExpensesByMonth(expenses, year, month);
  return monthExpenses.reduce((sum, exp) => sum + (Number(exp.amount) || 0), 0);
};

// Monthly income total
export const getMonthlyIncome = (expenses, year, month) => {
  const items = getIncomeByMonth(expenses, year, month);
  return items.reduce((sum, exp) => sum + (Number(exp.amount) || 0), 0);
};

// Monthly expense total
export const getMonthlyExpenseOnly = (expenses, year, month) => {
  const items = getExpensesByMonthOnly(expenses, year, month);
  return items.reduce((sum, exp) => sum + (Number(exp.amount) || 0), 0);
};

// Monthly balance (income - expenses)
export const getMonthlyBalance = (expenses, year, month) => {
  return getMonthlyIncome(expenses, year, month) - getMonthlyExpenseOnly(expenses, year, month);
};

// Count transactions in a specific month
export const getMonthlyExpensesCount = (expenses, year, month) => {
  return getExpensesByMonth(expenses, year, month).length;
};

// Sort transactions by newest date first, then by id
export const sortExpensesNewestFirst = (expenses) => {
  if (!Array.isArray(expenses)) return [];
  return [...expenses].sort((a, b) => {
    if (a.date !== b.date) {
      return b.date.localeCompare(a.date);
    }
    return (b.createdAt || 0) - (a.createdAt || 0);
  });
};

// Generate unique ID
export const generateId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return 'txn_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
};

// Generate full calendar grid data for a given month and year
export const generateCalendarMonth = (year, month, expenses = []) => {
  // month is 1-indexed (1 = Jan, 12 = Dec)
  const firstDayOfMonth = new Date(year, month - 1, 1);
  const startingDayOfWeek = firstDayOfMonth.getDay(); // 0 = Sun, 1 = Mon ...
  const daysInMonth = new Date(year, month, 0).getDate();
  const daysInPrevMonth = new Date(year, month - 1, 0).getDate();

  const days = [];

  const buildDayData = (dayNum, dateStr, isCurrentMonth, extra = {}) => {
    const total = getDailyTotal(expenses, dateStr);
    const dayExpenses = getExpensesByDate(expenses, dateStr);
    const incomeTotal = getDailyTotalByType(expenses, dateStr, 'income');
    const expenseTotal = getDailyTotalByType(expenses, dateStr, 'expense');
    const hasIncome = incomeTotal > 0;
    const hasExpense = expenseTotal > 0;

    return {
      day: dayNum,
      dateStr,
      isCurrentMonth,
      hasExpenses: dayExpenses.length > 0,
      hasIncome,
      hasExpense,
      total,
      incomeTotal,
      expenseTotal,
      expenseCount: dayExpenses.length,
      ...extra
    };
  };

  // Previous month trailing days
  for (let i = startingDayOfWeek - 1; i >= 0; i--) {
    const dayNum = daysInPrevMonth - i;
    const prevMonth = month === 1 ? 12 : month - 1;
    const prevYear = month === 1 ? year - 1 : year;
    const dateStr = `${prevYear}-${String(prevMonth).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
    days.push(buildDayData(dayNum, dateStr, false, { isPrevMonth: true }));
  }

  // Current month days
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    days.push(buildDayData(d, dateStr, true));
  }

  // Next month leading days to complete the grid (up to multiple of 7)
  const remainingCells = (7 - (days.length % 7)) % 7;
  for (let d = 1; d <= remainingCells; d++) {
    const nextMonth = month === 12 ? 1 : month + 1;
    const nextYear = month === 12 ? year + 1 : year;
    const dateStr = `${nextYear}-${String(nextMonth).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    days.push(buildDayData(d, dateStr, false, { isNextMonth: true }));
  }

  return days;
};
