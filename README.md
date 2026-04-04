# 💰 Finance Dashboard

A modern, responsive, and professional Finance Dashboard UI built with React, JavaScript, Tailwind CSS, and Recharts. This dashboard demonstrates best practices in React development, state management, responsive design, and UI/UX patterns.

## ✨ Features

### 1. **Dashboard Overview**
- Summary cards displaying:
  - Total Balance
  - Total Income
  - Total Expenses
  - Savings Rate
- Real-time percentage change indicators
- Clean card-based layout with icons
- Visual hierarchy and professional styling

###  DashboardOverview.jsx** 📈
**Purpose**: Main dashboard view with summary and charts

**Layout Structure**:
```
┌─────────────────────────────────────────┐
│  Summary Cards (4 columns on desktop)   │
│  - Balance, Income, Expenses, Savings   │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│  Charts (2 columns on desktop)          │
│  - Expense Breakdown | Income vs Exp    │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│  Admin Only Section (if user.role=admin)│
└─────────────────────────────────────────┘
```


### 2. **Data Visualization**
- **Expense Breakdown**: Interactive donut chart showing expense distribution by category
- **Income vs Expenses**: Bar chart comparing monthly income and expenses
- Built with Recharts for responsive, performance-optimized charts
- Custom tooltips and legends for better UX

### 3. **Transactions Module**
- Complete transaction list with:
  - Date, Amount, Category, Type (Income/Expense)
  - Status indicator (Completed, Pending, Failed)
  - Category icons for visual identification
- Pagination system (10 items per page)
- Type and status badges with color coding
- Fully responsive table on all devices

### 4. **Advanced Filtering & Search**
- **Multi-level Filtering**:
  - Filter by transaction type (Income/Expense)
  - Filter by category (Salary, Rent, Groceries, etc.)
  - Date range filtering (From/To)
  - Search by category name
- Real-time filter updates
- Clear filters button
- Visual filter state

### 5. **Role-Based Access Control**
- Two user roles implemented:
  - **Admin**: Full access to all features, settings, and analytics, add new Transaction or delete/edit previous data
  - **User**: Limited access to personal data only
- Dynamic UI rendering based on user role
- Admin can switch between views
- Settings panel accessible only to admins

### 6. **State Management**
- React Context API for global state:
  - User data and authentication
  - All transactions
  - Analytics data
  - Filter state
  - UI preferences (dark mode, sidebar state)
- Custom `useFinance()` hook for easy access
- Proper separation of concerns
- Scalable state architecture


### 8. **Responsive Design**
- **Mobile** (320px+): Collapsible sidebar, stacked layout
- **Tablet** (768px+): Optimized grid layout
- **Desktop** (1024px+): Full multi-column layout
- Flexbox and CSS Grid for modern layouts
- Touch-friendly buttons and interactions
- Mobile-first design approach

### 9. **UI/UX Design**
- **Clean Aesthetic**: Minimal, professional design
- **Tailwind CSS**: Utility-first CSS framework
- **Color Scheme**:
  - Primary: Blue (#3b82f6)
  - Secondary: Purple (#8b5cf6)
  - Dark: Gray (#1f2937)
  - Accent colors: Green (success), Red (danger), Amber (warning)
- **Components**:
  - Sidebar navigation with collapsible menu
  - Top navbar with user info, notifications, theme toggle
  - Consistent spacing and typography
  - Hover effects and transitions

### 10. **Code Quality**
- Reusable, composable components
- Clear folder structure:
  - `/components` - React components
  - `/context` - Context API and state management
  - `/utils` - Helper functions and formatters
- Meaningful comments and documentation
- Human-readable, idiomatic code
- No overly AI-generated patterns

## 📂 Project Structure

```
finance_dashboard/
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx              # Navigation sidebar
│   │   ├── Navbar.jsx               # Top navigation bar
│   │   ├── SummaryCard.jsx           # Summary statistic cards
│   │   ├── ExpenseChart.jsx          # Donut chart component
│   │   ├── IncomeExpenseChart.jsx    # Bar chart component
│   │   ├── TransactionTable.jsx      # Transaction list with pagination
│   │   ├── FilterPanel.jsx           # Advanced filtering UI
│   │   ├── DashboardOverview.jsx     # Main dashboard view
│   │   ├── TransactionsView.jsx      # Transactions page
│   │   ├── AnalyticsView.jsx         # Analytics page
│   │   └── SettingsView.jsx          # Settings page (admin only)
│   ├── context/
│   │   └── FinanceContext.jsx        # Global state management
│   ├── utils/
│   │   └── formatters.js             # Utility functions
│   ├── App.jsx                       # Main app component
│   ├── main.jsx                      # Entry point
│   └── index.css                     # Global styles
├── index.html                        # HTML template
├── package.json                      # Dependencies
├── vite.config.js                    # Vite configuration
├── tailwind.config.js                # Tailwind configuration
├── postcss.config.js                 # PostCSS configuration
└── README.md                         # This file
```

## 🚀 Getting Started



### Installation

```bash
# Navigate to the project directory
cd finance_dashboard

# Install dependencies
npm install

# Start the development server
npm run dev

# Build for production
npm run build


```

The dashboard will open in your browser at `http://localhost:3000`

## 📦 Dependencies

### Core
- **React** (18.2.0) - UI library
- **React DOM** (18.2.0) - React rendering

### Charting & Visualization
- **Recharts** (2.10.0) - Responsive charts and graphs

### Icons
- **Lucide React** (0.263.1) - Modern icon library

### Styling
- **Tailwind CSS** (3.3.0) - Utility-first CSS
- **PostCSS** (8.4.0) - CSS processing
- **Autoprefixer** (10.4.0) - Browser prefixes

### Build Tools
- **Vite** (4.4.0) - Fast build tool
- **@vitejs/plugin-react** (4.0.0) - React plugin for Vite

## 💡 How It Works

### Context API Flow
```
App.jsx
  ├── FinanceProvider (Global State)
  │   ├── Sidebar
  │   ├── Navbar
  │   └── Pages (Dashboard/Transactions/Analytics)
  │       └── useFinance() hook
```

### Component Hierarchy
```
App
├── Sidebar (Navigation)
├── Navbar (Header with theme toggle)
└── Main Content
    ├── DashboardOverview
    │   ├── SummaryCard (x4)
    │   ├── ExpenseChart
    │   └── IncomeExpenseChart
    ├── TransactionsView
    │   ├── FilterPanel
    │   └── TransactionTable
    ├── AnalyticsView
    │   ├── IncomeExpenseChart
    │   └── ExpenseChart
    └── SettingsView (Admin only)
```

### State Management
The `FinanceContext` manages:
- **User**: Current user data, role, preferences
- **Transactions**: All transaction records
- **Analytics**: Summary statistics and chart data
- **Filters**: Active filters and search queries
- **UI**: Dark mode, sidebar state
- **Loading/Error**: Async state management

### Mock Data Structure
```javascript
Transactions: [
  {
    id: 1,
    date: '2024-01-15',
    amount: 2500,
    category: 'Salary',
    status: 'completed',
    type: 'income'
  },
  // ...
]

Analytics: {
  totalBalance: 28750,
  totalIncome: 10000,
  totalExpenses: 3880,
  incomeVsExpenses: [...],
  expenseByCategory: [...]
}
```



## 📱 Responsive Breakpoints

- **Mobile**: < 768px (Sidebar collapses, stacked layout)
- **Tablet**: 768px - 1024px (2-column grid for cards)
- **Desktop**: > 1024px (4-column grid, full sidebar)



## 📊 Mock Data Features

The dashboard includes:
- **10 pre-loaded transactions** with various categories and statuses
- **4 months of income vs expense data** for trend analysis
- **8 expense categories** with realistic distribution
- **Multiple transaction types**: Income and Expense
- **Realistic statuses**: Completed, Pending, Failed

## 🚦 Loading & Error Handling

- Loading spinners during async operations
- Error messages with context
- Graceful fallbacks
- User-friendly error display




## 📝 Key Files Explained

### `FinanceContext.jsx`
- Global state management using React Context
- Mock data initialization
- Custom `useFinance()` hook
- Filter and search logic
- Simulated async API calls

### `SummaryCard.jsx`
- Reusable card component
- Shows key metrics with percentage changes
- Visual styling with icons and colors

### `TransactionTable.jsx`
- Displays transactions in paginated table
- Status and type badges
- Category icons
- Pagination controls

### `FilterPanel.jsx`
- Multi-input filtering UI
- Search functionality
- Date range picker
- Clear filters action

### `Navbar.jsx`
- User greeting and date display
- Dark mode toggle
- Notification bell
- Settings access

### `Sidebar.jsx`
- Navigation menu
- Collapsible on mobile
- User profile section
- Role switcher (admin only)

## 🎓 Learning Outcomes

By studying this dashboard, you'll learn:
- React fundamentals and hooks
- Context API for state management
- Tailwind CSS for styling
- Responsive design patterns
- Chart integration with Recharts
- Pagination and filtering
- Role-based access control
- Dark mode implementation
- Project organization
- Component composition

---

**Built using React + Tailwind CSS + Recharts**

