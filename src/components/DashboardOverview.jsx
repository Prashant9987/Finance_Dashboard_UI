import React from 'react';
import { Wallet, TrendingUp, TrendingDown, PiggyBank } from 'lucide-react';
import { useFinance } from '../context/FinanceContext';
import { SummaryCard } from './SummaryCard';
import { ExpenseChart } from './ExpenseChart';
import { IncomeExpenseChart } from './IncomeExpenseChart';
import { calculatePercentageChange } from '../utils/formatters';

export function DashboardOverview() {
  const { analytics, user } = useFinance();

  // Calculate percentage changes (mock data)
  const balanceChange = calculatePercentageChange(28750, 27500);
  const incomeChange = calculatePercentageChange(10000, 9500);
  const expensesChange = calculatePercentageChange(3880, 3650);
  const savingsChange = calculatePercentageChange(61.2, 57.8);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard
          title="Total Balance"
          amount={analytics.totalBalance}
          icon={Wallet}
          percentageChange={balanceChange}
          isPositive={balanceChange > 0}
          subtext="Your total funds"
        />
        <SummaryCard
          title="Total Income"
          amount={analytics.totalIncome}
          icon={TrendingUp}
          percentageChange={incomeChange}
          isPositive={incomeChange > 0}
          subtext="This month"
        />
        <SummaryCard
          title="Total Expenses"
          amount={analytics.totalExpenses}
          icon={TrendingDown}
          percentageChange={expensesChange}
          isPositive={expensesChange < 0}
          subtext="This month"
        />
        <SummaryCard
          title="Savings Rate"
          amount={
            (analytics.totalIncome - analytics.totalExpenses) /
            analytics.totalIncome
          }
          icon={PiggyBank}
          percentageChange={savingsChange}
          isPositive={savingsChange > 0}
          subtext="% of income saved"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ExpenseChart data={analytics.expenseByCategory} />
        <IncomeExpenseChart data={analytics.incomeVsExpenses} />
      </div>

      {/* Admin Only Section */}
      {user.role === 'admin' && (
        <div className="card p-6 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <h3 className="text-lg font-bold text-blue-900 dark:text-blue-300 mb-2">
            Admin Dashboard
          </h3>
          <p className="text-sm text-blue-700 dark:text-blue-400">
            You have full access to all analytics and can view company-wide data.
            Use the settings panel to configure dashboard preferences.
          </p>
        </div>
      )}
    </div>
  );
}
