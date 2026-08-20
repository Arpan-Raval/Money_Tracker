import React from 'react';

export const PageHeader = ({ title, subtitle, rightElement }) => {
  return (
    <header className="page-header">
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <h1 className="page-title">{title}</h1>
          {subtitle && <p className="page-subtitle">{subtitle}</p>}
        </div>
        {rightElement && <div>{rightElement}</div>}
      </div>
    </header>
  );
};
