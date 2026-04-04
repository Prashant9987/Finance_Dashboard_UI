// Format currency
export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

// Format date
export function formatDate(dateString) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
}

// Format percentage
export function formatPercentage(value) {
  return `${(value * 100).toFixed(1)}%`;
}

// Get status badge color
export function getStatusColor(status) {
  const colors = {
    completed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    failed: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  };
  return colors[status] || colors.pending;
}

// Get type badge color
export function getTypeColor(type) {
  return type === 'income'
    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
}

// Get category icon
export function getCategoryIcon(category) {
  const icons = {
    Salary: '💼',
    Freelance: '💻',
    Groceries: '🛒',
    Rent: '🏠',
    Utilities: '⚡',
    Dining: '🍽️',
    Transport: '🚗',
    Entertainment: '🎬',
    Shopping: '🛍️',
    Others: '📝',
  };
  return icons[category] || '📌';
}

// Calculate percentage change
export function calculatePercentageChange(current, previous) {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
}

// Truncate text
export function truncateText(text, length = 50) {
  return text.length > length ? `${text.substring(0, length)}...` : text;
}

// Get color for chart
export const CHART_COLORS = [
  '#3b82f6', 
  '#8b5cf6',
  '#ec4899',
  '#f59e0b', 
  '#10b981', 
  '#06b6d4', 
  '#6366f1', 
  '#ef4444', 
];

export function getChartColor(index) {
  return CHART_COLORS[index % CHART_COLORS.length];
}
