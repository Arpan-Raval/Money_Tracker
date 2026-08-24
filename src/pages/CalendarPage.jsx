import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { Calendar } from '../components/Calendar';

export const CalendarPage = ({
  expenses,
  calendarYear,
  calendarMonth,
  selectedDate,
  onSelectDate,
  onPrevMonth,
  onNextMonth,
  onSelectExpense
}) => {
  return (
    <div>
      <PageHeader
        title="Calendar"
        subtitle="Track your money flow by day."
      />

      <Calendar
        year={calendarYear}
        month={calendarMonth}
        selectedDate={selectedDate}
        onSelectDate={onSelectDate}
        onPrevMonth={onPrevMonth}
        onNextMonth={onNextMonth}
        expenses={expenses}
        onSelectExpense={onSelectExpense}
      />
    </div>
  );
};
