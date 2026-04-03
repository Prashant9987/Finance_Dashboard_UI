import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

export function SummaryCard({
  title,
  amount,
  icon: Icon,
  percentageChange,
  isPositive,
  subtext,
}) {
  return (
    <div className="card p-6 flex flex-col h-full">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">
            {title}
          </p>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            {formatCurrency(amount)}
          </h3>
        </div>
        <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900">
          <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        </div>
      </div>

      {percentageChange !== undefined && (
        <div className="flex items-center gap-2">
          <div
            className={`flex items-center gap-1 text-sm font-semibold ${
              isPositive
                ? 'text-green-600 dark:text-green-400'
                : 'text-red-600 dark:text-red-400'
            }`}
          >
            {isPositive ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            {Math.abs(percentageChange).toFixed(1)}%
          </div>
          <span className="text-gray-500 dark:text-gray-400 text-sm">
            vs last month
          </span>
        </div>
      )}

      {subtext && (
        <p className="text-gray-500 dark:text-gray-400 text-xs mt-2">
          {subtext}
        </p>
      )}
    </div>
  );
}
