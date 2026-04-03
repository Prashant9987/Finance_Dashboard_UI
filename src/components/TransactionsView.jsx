import React, { useState, useEffect } from 'react';
import { useFinance } from '../context/FinanceContext';
import { FilterPanel } from './FilterPanel';
import { TransactionTable } from './TransactionTable';
import { AddTransactionModal } from './AddTransactionModal';
import { Loader, Plus } from 'lucide-react';

export function TransactionsView() {
  const {
    getFilteredTransactions,
    searchTransactions,
    loading,
    error,
    fetchTransactions,
    user,
  } = useFinance();

  const [searchQuery, setSearchQuery] = useState('');
  const [displayedTransactions, setDisplayedTransactions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  // Fetch transactions on component mount
  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  // Update displayed transactions when filters or search changes
  useEffect(() => {
    if (searchQuery) {
      setDisplayedTransactions(searchTransactions(searchQuery));
    } else {
      setDisplayedTransactions(getFilteredTransactions());
    }
  }, [searchQuery, getFilteredTransactions, searchTransactions]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleOpenAddModal = () => {
    setSelectedTransaction(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTransaction(null);
  };

  return (
    <div className="space-y-6">
      {/* Header with Add Button */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Transactions</h1>
        {user.role === 'admin' && (
          <button
            onClick={handleOpenAddModal}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Transaction
          </button>
        )}
      </div>

      {/* User View Mode Notice */}
      {user.role === 'user' && (
        <div className="card p-4 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <p className="text-sm text-blue-700 dark:text-blue-400">
            👁️ You are in <strong>View Mode</strong>. Only Admins can add or edit transactions.
          </p>
        </div>
      )}

      {/* Filter Panel */}
      <FilterPanel onSearch={handleSearch} />

      {/* Error State */}
      {error && (
        <div className="card p-4 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
          <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="card p-12 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <Loader className="w-8 h-8 text-blue-600 dark:text-blue-400 animate-spin" />
            <p className="text-gray-600 dark:text-gray-400">Loading transactions...</p>
          </div>
        </div>
      ) : (
        <>
          {/* Transactions Summary */}
          <div className="card p-4 bg-gray-50 dark:bg-gray-700">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Total Transactions: <span className="text-blue-600 dark:text-blue-400">{displayedTransactions.length}</span>
            </p>
          </div>

          {/* Transactions Table */}
          <TransactionTable
            transactions={displayedTransactions}
            onEdit={handleOpenEditModal}
          />
        </>
      )}

      {/* Add/Edit Transaction Modal */}
      <AddTransactionModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        transaction={selectedTransaction}
      />
    </div>
  );
}
