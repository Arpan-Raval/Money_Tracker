import React from 'react';
import { Home, Calendar as CalendarIcon, Receipt, Plus } from 'lucide-react';

export const BottomNavigation = ({ activeTab, onTabChange, onOpenAddModal }) => {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'calendar', label: 'Calendar', icon: CalendarIcon },
    { id: 'expenses', label: 'Transactions', icon: Receipt },
  ];

  const activeIndex = tabs.findIndex(tab => tab.id === activeTab);

  return (
    <nav className="bottom-nav-container" aria-label="Bottom Navigation">
      <div className="bottom-nav-bar">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              className={`nav-item ${isActive ? 'active' : ''}`}
              onClick={() => onTabChange(tab.id)}
              aria-label={tab.label}
              aria-current={isActive ? 'page' : undefined}
            >
              <div className="nav-item-icon">
                <Icon size={20} strokeWidth={isActive ? 2.3 : 1.8} />
              </div>
              <span className="nav-item-label">{tab.label}</span>
            </button>
          );
        })}

        {/* Floating Add Transaction Action Button */}
        <button
          type="button"
          className="nav-add-btn"
          onClick={onOpenAddModal}
          aria-label="Add new transaction"
        >
          <Plus size={24} strokeWidth={2.4} />
        </button>
      </div>

      {/* Subtle Pagination / Screen Indicator Dots */}
      <div className="pagination-dots" aria-hidden="true">
        {tabs.map((tab, idx) => (
          <div
            key={tab.id}
            className={`pagination-dot ${activeIndex === idx ? 'active' : ''}`}
            onClick={() => onTabChange(tab.id)}
          />
        ))}
      </div>
    </nav>
  );
};
