import { useState } from "react";
import { Header } from "./Header";
import { ModuleManager } from "./ModuleManager";
import { UserSettings } from "./UserSettings";
import { ChatInterface } from "./ChatInterface";

interface AppLayoutProps {
  user: { username: string; role: 'admin' | 'user' };
  onLogout: () => void;
}

export function AppLayout({ user, onLogout }: AppLayoutProps) {
  const [currentPage, setCurrentPage] = useState('chat');

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'chat':
        return (
          <div className="p-6">
            <ChatInterface activeModules={['chat-agent', 'document-analyzer']} />
          </div>
        );
      case 'agents':
        return (
          <div className="p-6">
            <ModuleManager userRole={user.role} />
          </div>
        );
      case 'settings':
        return (
          <div className="p-6">
            <UserSettings user={user} onLogout={onLogout} />
          </div>
        );
      default:
        return (
          <div className="p-6">
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold mb-2" style={{ color: '#4A4D50' }}>
                Willkommen im AI Hub
              </h2>
              <p style={{ color: '#4A4D50', opacity: 0.7 }}>
                Wählen Sie eine Option aus der Navigation.
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
      <Header 
        user={user}
        onNavigate={handleNavigate}
        onLogout={onLogout}
        currentPage={currentPage}
      />
      
      <main className="flex-1">
        <div className="max-w-7xl mx-auto py-6">
          <div 
            className="bg-white rounded-xl shadow-sm border mx-6"
            style={{
              backgroundColor: 'var(--color-card)',
              borderColor: 'var(--color-border)'
            }}
          >
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
}