import React from 'react';
import {
  BarChart3,
  Wallet,
  Settings,
  LogOut,
  Menu,
  X,
  Home,
} from 'lucide-react';
import { useFinance } from '../context/FinanceContext';

export function Sidebar({ activeTab, onTabChange }) {
  const { isSidebarOpen, setIsSidebarOpen, user, switchRole, logout } = useFinance();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'transactions', label: 'Transactions', icon: Wallet },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    ...(user.role === 'admin'
      ? [{ id: 'settings', label: 'Settings', icon: Settings }]
      : []),
  ];

  return (
    <>
      {/* Hamburger Menu for Mobile */}
      <div className="md:hidden fixed top-0 left-0 z-40">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-4 text-gray-700 dark:text-gray-300"
        >
          {isSidebarOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Overlay for Mobile */}
      {isSidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:relative z-40 w-64 h-screen bg-gradient-to-b from-gray-900 to-gray-800 dark:from-gray-950 dark:to-gray-900 text-white transition-all duration-300 flex flex-col ${
          isSidebarOpen ? 'left-0' : '-left-64'
        } md:left-0`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-600">
              <Wallet className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold">FinDash</h1>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  onTabChange(item.id);
                  setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* User Info & Actions */}
        <div className="border-t border-gray-700 p-4 space-y-4">
          {/* User Profile */}
          <div className="bg-gray-700 rounded-lg p-3">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-lg">
                {user.avatar}
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold">{user.name}</p>
                <p className="text-xs text-gray-400">
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </p>
              </div>
            </div>
          </div>

          {/* Role Switch (Admin only) */}
          {user.role === 'admin' && (
            <button
              onClick={() =>
                switchRole(user.role === 'admin' ? 'user' : 'admin')
              }
              className="w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white text-sm font-medium rounded-lg transition-colors"
            >
              Switch to {user.role === 'admin' ? 'User' : 'Admin'} View
            </button>
          )}

          {/* Logout */}
          <button
            onClick={logout}
            className="w-full flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white hover:bg-red-700/30 rounded-lg transition-colors text-sm font-medium"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
