<div align="center">
  
# 💰 Expense Tracker 2.0

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite" />
  <img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" alt="JavaScript" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
</p>

### A Next-Generation Personal Finance Manager

Expense Tracker 2.0 is a powerful, modern, and privacy-first web application designed to give you complete control over your personal finances. Built entirely on the frontend with React and Vite, it stores all your financial data securely in your browser—meaning no accounts, no subscriptions, and absolute privacy.

</div>

---

## 🌟 Why Expense Tracker 2.0?

Managing money shouldn't be complicated. This application strips away the unnecessary clutter of traditional banking apps to provide a clean, focused, and intuitive experience. Whether you want to log your daily coffee, track your monthly salary, or review your spending habits over the year, Expense Tracker 2.0 makes it effortless.

### Core Philosophy
- **Speed First:** Instant loading and saving. No waiting for backend API calls.
- **Privacy by Default:** Your data never leaves your device. It relies strictly on `localStorage`.
- **Beautiful UX:** Smooth micro-animations, logical flows, and mobile-first responsive design.

---

## 📸 Sneak Peek

*(Add your screenshots here by replacing the placeholder links)*

| Home Dashboard | Calendar View | Add Transaction |
| :---: | :---: | :---: |
| <img src="https://via.placeholder.com/250x450?text=Dashboard" alt="Home Dashboard" /> | <img src="https://via.placeholder.com/250x450?text=Calendar" alt="Calendar View" /> | <img src="https://via.placeholder.com/250x450?text=Form" alt="Add Transaction" /> |

---

## 🚀 Key Features

### 1. 📊 Smart Dashboard
- Instant summary of your **Net Balance, Total Income, and Total Expenses**.
- Navigate effortlessly through different months and years.
- Quick summary of recent transactions at a glance.

### 2. 📅 Interactive Calendar View
- Visual representation of your financial activity.
- Click on any specific day to see exactly what you earned or spent.
- Seamlessly transition between months to review historical data.

### 3. 💸 Effortless Transaction Management
- **Add/Edit/Delete** both incomes and expenses via a sleek, sliding bottom-sheet interface.
- Real-time validation for amounts and descriptions.
- Quick-toggle between Income (Trending Up) and Expense (Trending Down).

### 4. 🗂️ Comprehensive Expense List
- View all your transactions in a dedicated, scrollable list.
- Click any transaction to view full details in a focused modal.
- Built-in safe-delete with confirmation prompts to prevent accidental data loss.

---

## 🏗️ Technical Architecture

This app uses a component-driven architecture for high maintainability:

```text
src/
├── components/          # Reusable UI building blocks
│   ├── Layout/          # Main wrapper and structural styles
│   ├── BottomNavigation # Fixed mobile-friendly navbar
│   ├── ExpenseForm      # Smart form for adding/editing data
│   └── ConfirmDialog    # Reusable confirmation modal
├── pages/               # Main application views
│   ├── Home             # Dashboard logic
│   ├── CalendarPage     # Calendar rendering and interaction
│   └── ExpensesPage     # Transaction list view
├── hooks/               # Custom React hooks
│   └── useExpenses      # LocalStorage CRUD operations & state management
└── utils/               # Helper functions (date formatting, etc.)
```

### State Management
Instead of complex Redux setups, this app leverages a custom hook `useExpenses`. It serves as a localized, reactive database manager that reads and writes directly to `window.localStorage` while instantly updating the React UI state.

---

## 💻 Getting Started Locally

Want to run it yourself or contribute? It takes less than 2 minutes to get started.

### Prerequisites
- [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Clone the repo:**
   ```bash
   git clone https://github.com/yourusername/Expense_Tracker2.0.git
   cd Expense_Tracker2.0
   ```

2. **Install all dependencies:**
   ```bash
   npm install
   ```

3. **Spin up the Vite dev server:**
   ```bash
   npm run dev
   ```
   
4. **View the app:**
   Open `http://localhost:5173` in your browser.

---

## 🛠️ Available Scripts

- `npm run dev` - Starts the ultra-fast Vite development server.
- `npm run build` - Bundles the application into static files for production deployment.
- `npm run preview` - Boots up a local static web server to preview your production build.
- `npm run lint` - Runs the Oxlint linter to ensure code quality.

---

## 🤝 Contributing

We love contributions! If you have ideas for new features (like categories, charts, or export to CSV), feel free to fork the repository and submit a pull request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

<div align="center">
  Made with ❤️ using React & Vite.
</div>
