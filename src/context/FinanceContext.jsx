import React, { createContext, useContext, useState, useCallback } from 'react';

// Create the Finance Context
const FinanceContext = createContext();

// Sample mock data
const MOCK_TRANSACTIONS = [
  { id: 1, date: '2024-01-15', amount: 2500, category: 'Salary', status: 'completed', type: 'income' },
  { id: 2, date: '2024-01-14', amount: 450, category: 'Groceries', status: 'completed', type: 'expense' },
  { id: 3, date: '2024-01-13', amount: 1200, category: 'Rent', status: 'completed', type: 'expense' },
  { id: 4, date: '2024-01-12', amount: 80, category: 'Utilities', status: 'completed', type: 'expense' },
  { id: 5, date: '2024-01-11', amount: 150, category: 'Dining', status: 'completed', type: 'expense' },
  { id: 6, date: '2024-01-10', amount: 5000, category: 'Freelance', status: 'completed', type: 'income' },
  { id: 7, date: '2024-01-09', amount: 200, category: 'Entertainment', status: 'pending', type: 'expense' },
  { id: 8, date: '2024-01-08', amount: 300, category: 'Transport', status: 'completed', type: 'expense' },
  { id: 9, date: '2024-01-07', amount: 2500, category: 'Salary', status: 'completed', type: 'income' },
  { id: 10, date: '2024-01-06', amount: 500, category: 'Shopping', status: 'completed', type: 'expense' },
];

const MOCK_ANALYTICS = {
  totalBalance: 28750,
  totalIncome: 10000,
  totalExpenses: 3880,
  savingsRate: 61.2,
  incomeVsExpenses: [
    { month: 'Jan', income: 10000, expenses: 3880 },
    { month: 'Feb', income: 8500, expenses: 3200 },
    { month: 'Mar', income: 12000, expenses: 4100 },
    { month: 'Apr', income: 9500, expenses: 3800 },
  ],
  expenseByCategory: [
    { name: 'Rent', value: 1200, percentage: 30.9 },
    { name: 'Groceries', value: 450, percentage: 11.6 },
    { name: 'Utilities', value: 80, percentage: 2.1 },
    { name: 'Dining', value: 150, percentage: 3.9 },
    { name: 'Transport', value: 300, percentage: 7.7 },
    { name: 'Entertainment', value: 200, percentage: 5.2 },
    { name: 'Shopping', value: 500, percentage: 12.9 },
    { name: 'Others', value: 1000, percentage: 25.8 },
  ],
};

// Provider Component
export function FinanceProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'admin', // 'admin' or 'user'
    avatar: '👤',
  });

  const [transactions, setTransactions] = useState(MOCK_TRANSACTIONS);
  const [analytics] = useState(MOCK_ANALYTICS);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Filters state
  const [filters, setFilters] = useState({
    dateRange: { from: null, to: null },
    category: null,
    type: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Simulate API call for transactions
  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      setTransactions(MOCK_TRANSACTIONS);
    } catch (err) {
      setError('Failed to fetch transactions');
    } finally {
      setLoading(false);
    }
  }, []);

  // Simulate API call for analytics
  const fetchAnalytics = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 300));
      return analytics;
    } catch (err) {
      setError('Failed to fetch analytics');
    } finally {
      setLoading(false);
    }
  }, [analytics]);

  // Filter transactions based on criteria
  const getFilteredTransactions = useCallback(() => {
    let filtered = [...transactions];

    if (filters.type) {
      filtered = filtered.filter((t) => t.type === filters.type);
    }

    if (filters.category) {
      filtered = filtered.filter((t) => t.category === filters.category);
    }

    if (filters.dateRange.from || filters.dateRange.to) {
      filtered = filtered.filter((t) => {
        const transactionDate = new Date(t.date);
        const fromDate = filters.dateRange.from ? new Date(filters.dateRange.from) : null;
        const toDate = filters.dateRange.to ? new Date(filters.dateRange.to) : null;

        if (fromDate && transactionDate < fromDate) return false;
        if (toDate && transactionDate > toDate) return false;
        return true;
      });
    }

    return filtered;
  }, [transactions, filters]);

  // Search transactions
  const searchTransactions = useCallback((query) => {
    const filtered = getFilteredTransactions();
    return filtered.filter(
      (t) =>
        t.category.toLowerCase().includes(query.toLowerCase()) ||
        t.type.toLowerCase().includes(query.toLowerCase())
    );
  }, [getFilteredTransactions]);

  // Toggle dark mode
  const toggleDarkMode = useCallback(() => {
    setIsDarkMode((prev) => !prev);
  }, []);

  // Switch user role
  const switchRole = useCallback((role) => {
    setUser((prev) => ({ ...prev, role }));
  }, []);

  // Update filters
  const updateFilters = useCallback((newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  }, []);

  // Add new transaction (Admin only)
  const addTransaction = useCallback((transactionData) => {
    const newTransaction = {
      id: Math.max(...transactions.map((t) => t.id), 0) + 1,
      ...transactionData,
      status: 'completed',
    };
    setTransactions((prev) => [newTransaction, ...prev]);
    return newTransaction;
  }, [transactions]);

  // Edit transaction (Admin only)
  const editTransaction = useCallback((id, transactionData) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...transactionData } : t))
    );
  }, []);

  // Delete transaction (Admin only)
  const deleteTransaction = useCallback((id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Login function (no real authentication, just for visualization)
  const login = useCallback((email, password, role = 'admin') => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        setIsAuthenticated(true);
        setUser({
          id: '1',
          name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
          email,
          role,
          avatar: '👤',
        });
        resolve(true);
      }, 500);
    });
  }, []);

  // Logout function
  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setUser({
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'admin',
      avatar: '👤',
    });
    setFilters({
      dateRange: { from: null, to: null },
      category: null,
      type: null,
    });
  }, []);

  const value = {
    isAuthenticated,
    login,
    logout,
    user,
    switchRole,
    transactions,
    addTransaction,
    editTransaction,
    deleteTransaction,
    getFilteredTransactions,
    searchTransactions,
    analytics,
    isDarkMode,
    toggleDarkMode,
    isSidebarOpen,
    setIsSidebarOpen,
    filters,
    updateFilters,
    loading,
    error,
    fetchTransactions,
    fetchAnalytics,
  };

  return (
    <FinanceContext.Provider value={value}>
      {children}
    </FinanceContext.Provider>
  );
}

// Custom hook to use the Finance Context
export function useFinance() {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error('useFinance must be used within FinanceProvider');
  }
  return context;
}
