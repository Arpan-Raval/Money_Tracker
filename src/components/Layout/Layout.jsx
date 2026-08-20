import React from 'react';

export const Layout = ({ children }) => {
  return (
    <div className="app-shell">
      <main className="app-content">
        {children}
      </main>
    </div>
  );
};
