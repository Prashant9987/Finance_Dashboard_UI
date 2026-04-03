import React, { useEffect } from 'react';
import { useFinance } from '../context/FinanceContext';
import { IncomeExpenseChart } from './IncomeExpenseChart';
import { ExpenseChart } from './ExpenseChart';
import { Loader } from 'lucide-react';

export function AnalyticsView() {
  const { analytics, loading, error, fetchAnalytics, user } = useFinance();

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  if (loading) {
    return (
      <div className="card p-12 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader className="w-8 h-8 text-blue-600 dark:text-blue-400 animate-spin" />
          <p className="text-gray-600 dark:text-gray-400">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card p-6 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
        <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Analytics Header */}
      <div className="card p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Financial Analytics
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {user.role === 'admin'
            ? 'Comprehensive overview of all financial metrics and trends.'
            : 'Your personal financial overview and spending patterns.'}
        </p>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <IncomeExpenseChart data={analytics.incomeVsExpenses} />
        <ExpenseChart data={analytics.expenseByCategory} />
      </div>

      {/* Analytics Summary */}
      <div className="card p-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
          Summary Statistics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              label: 'Avg. Monthly Income',
              value: `$${(
                analytics.incomeVsExpenses.reduce((sum, m) => sum + m.income, 0) /
                analytics.incomeVsExpenses.length
              ).toFixed(2)}`,
            },
            {
              label: 'Avg. Monthly Expenses',
              value: `$${(
                analytics.incomeVsExpenses.reduce((sum, m) => sum + m.expenses, 0) /
                analytics.incomeVsExpenses.length
              ).toFixed(2)}`,
            },
            {
              label: 'Largest Expense',
              value: `$${Math.max(...analytics.expenseByCategory.map((c) => c.value)).toFixed(2)}`,
            },
            {
              label: 'Category Count',
              value: analytics.expenseByCategory.length,
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700"
            >
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                {stat.label}
              </p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
