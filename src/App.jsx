import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { LoginView } from './components/LoginView';
import { DashboardOverview } from './components/DashboardOverview';
import { TransactionsView } from './components/TransactionsView';
import { AnalyticsView } from './components/AnalyticsView';
import { SettingsView } from './components/SettingsView';
import { useFinance } from './context/FinanceContext';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { user, isAuthenticated } = useFinance();

  // Render the appropriate view based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'transactions':
        return <TransactionsView />;
      case 'analytics':
        return <AnalyticsView />;
      case 'settings':
        return user.role === 'admin' ? <SettingsView /> : <DashboardOverview />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <>
      {!isAuthenticated ? (
        <LoginView />
      ) : (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
          {/* Sidebar */}
          <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Navbar */}
            <Navbar />

            {/* Main Content */}
            <main className="flex-1 overflow-auto pt-4 md:pt-0">
              <div className="p-4 md:p-8">
                {renderContent()}
              </div>
            </main>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
