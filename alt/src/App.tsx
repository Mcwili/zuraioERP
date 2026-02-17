import { useState, useEffect } from "react";
import { LoginDialog } from "./components/LoginDialog";
import { TenantAdminLayout } from "./components/TenantAdminLayout";
import { LanguageProvider } from "./contexts/LanguageContext";
import { Toaster } from "./components/ui/sonner";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { PerformanceMonitor } from "./components/PerformanceMonitor";
import { ProductTour, useTour, type TourStep } from "./components/ProductTour";
import { useKeyboardShortcuts } from "./hooks/useKeyboardShortcuts";

interface User {
  username: string;
  layoutType: 'desktop' | 'mobile';
  company: 'rmb' | 'neuco';
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    // Check localStorage first, then system preference
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) {
      return JSON.parse(saved);
    }
    // Fallback to system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [showPerformanceMonitor, setShowPerformanceMonitor] = useState(false);

  // Product Tour Steps
  const tourSteps: TourStep[] = [
    {
      id: 'welcome',
      target: 'body',
      title: 'Welcome to AI Hub',
      description: 'Let\'s take a quick tour of the main features',
      position: 'bottom'
    },
    {
      id: 'sidebar',
      target: '[data-tour="sidebar"]',
      title: 'Navigation Sidebar',
      description: 'Access different admin sections from here',
      position: 'right'
    },
    {
      id: 'user-management',
      target: '[data-tour="user-management"]',
      title: 'User Management',
      description: 'Manage users, roles, and departments',
      position: 'bottom'
    },
    {
      id: 'keyboard-shortcuts',
      target: '[data-tour="keyboard-shortcuts"]',
      title: 'Keyboard Shortcuts',
      description: 'Press Shift + ? to view all available shortcuts',
      position: 'left'
    }
  ];

  // Apply dark mode to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // Save to localStorage
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const handleLogin = (userData: User) => {
    setUser(userData);
    // Save layout preference to localStorage
    localStorage.setItem('preferredLayout', userData.layoutType);
  };

  const handleLogout = () => {
    setUser(null);
    // Clear layout preference on logout
    localStorage.removeItem('preferredLayout');
  };

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <ErrorBoundary>
      <LanguageProvider>
        {!user ? (
          <LoginDialog onLogin={handleLogin} />
        ) : (
          <>
            <TenantAdminLayout 
              user={user} 
              onLogout={handleLogout}
              isDarkMode={isDarkMode}
              onToggleDarkMode={toggleDarkMode}
            />
            <ProductTour
              steps={tourSteps}
              tourId="ai-hub-main-tour"
              isDarkMode={isDarkMode}
            />
          </>
        )}
        <Toaster />
        <PerformanceMonitor showMetrics={showPerformanceMonitor} isDarkMode={isDarkMode} />
      </LanguageProvider>
    </ErrorBoundary>
  );
}