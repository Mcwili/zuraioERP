import { useState, useRef, useCallback, forwardRef, useImperativeHandle } from 'react';
import { DraggableWindow } from './DraggableWindow';
import { ChatInterface } from './ChatInterface';
import { AgentSettings } from './AgentSettings';
import { AccountSettings } from './AccountSettings';
import { TenantManagement } from './TenantManagement';
import { Button } from './ui/button';
import { useLanguage } from '../contexts/LanguageContext';
import { MessageCircle, Mail, Shield, Globe, Building, User, Settings } from 'lucide-react';

export interface WindowInstance {
  id: string;
  type: 'chat' | 'settings' | 'account' | 'tenants';
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  activeAgents?: { id: string; name: string; privacy: string; icon: any }[]; // For chat windows
}

interface WindowManagerProps {
  user: { username: string; role: 'admin' | 'user'; tenant: string };
  onLogout: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  activeAgents: string[];
  onAgentsChange: (agents: string[]) => void;
  profileImage?: string | null;
  onProfileImageChange?: (image: string | null) => void;
  onChatWindowOpened?: (title: string, windowId: string) => void;
}

export interface WindowManagerRef {
  openWindow: (type: 'chat' | 'settings' | 'account' | 'tenants') => void;
}

export const WindowManager = forwardRef<WindowManagerRef, WindowManagerProps>(
  ({ user, onLogout, isDarkMode, onToggleDarkMode, activeAgents, onAgentsChange, profileImage, onProfileImageChange, onChatWindowOpened }, ref) => {
    const { t } = useLanguage();
    const [windows, setWindows] = useState<WindowInstance[]>([]);
    const [highestZIndex, setHighestZIndex] = useState(1000);
    const nextWindowId = useRef(1);

    // Get viewport center for initial window positioning
    const getViewportCenter = useCallback(() => {
      // Fallback dimensions for SSR or when window is not available
      const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
      const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
      const headerHeight = 64; // Header height
      
      // Calculate 80% of viewport size
      const windowWidth = Math.round(viewportWidth * 0.8);
      const windowHeight = Math.round((viewportHeight - headerHeight) * 0.8);
      
      // Ensure we have valid numbers
      const width = viewportWidth || 1200;
      const height = viewportHeight || 800;
      
      return {
        x: Math.max(0, (width - windowWidth) / 2), // Center horizontally
        y: Math.max(headerHeight, (height - headerHeight - windowHeight) / 2 + headerHeight), // Center vertically
        width: windowWidth,
        height: windowHeight
      };
    }, []);

    const bringToFront = useCallback((windowId: string) => {
      const newZIndex = highestZIndex + 1;
      setHighestZIndex(newZIndex);
      
      setWindows(prev => prev.map(w => 
        w.id === windowId ? { ...w, zIndex: newZIndex, isMinimized: false } : w
      ));
    }, [highestZIndex]);

    const openWindow = useCallback((type: 'chat' | 'settings' | 'account' | 'tenants') => {
      // Check if settings, account, or tenants window already exists (only one allowed)
      if (type === 'settings' || type === 'account' || type === 'tenants') {
        const existingWindow = windows.find(w => w.type === type);
        if (existingWindow) {
          // Focus existing window
          bringToFront(existingWindow.id);
          return;
        }
      }

      const center = getViewportCenter();
      const newZIndex = highestZIndex + 1;
      setHighestZIndex(newZIndex);

      // Ensure all position values are valid numbers
      const offsetX = Math.max(0, windows.length * 30);
      const offsetY = Math.max(0, windows.length * 30);
      const finalX = isNaN(center.x + offsetX) ? 100 : center.x + offsetX;
      const finalY = isNaN(center.y + offsetY) ? 150 : center.y + offsetY;

      // Define currently active agents (for chat windows) - get from activeAgents prop
      const chatActiveAgents = type === 'chat' ? 
        activeAgents.map(agentId => {
          const agentMap = {
            "email-agent": { id: "email-agent", name: "Email-Agent", privacy: "private", icon: Mail },
            "normen-agent": { id: "normen-agent", name: "Normen-Agent", privacy: "public", icon: Shield },
            "internet-agent": { id: "internet-agent", name: "Internet-Agent", privacy: "public", icon: Globe },
            "jelmoli-agent": { id: "jelmoli-agent", name: "Jelmoli-Agent", privacy: "public", icon: Building }
          };
          return agentMap[agentId];
        }).filter(Boolean) : undefined;

      // Get window title based on type
      let windowTitle: string;
      switch (type) {
        case 'chat':
          windowTitle = `${t.chat.title} ${nextWindowId.current}`;
          break;
        case 'settings':
          windowTitle = t.header.options;
          break;
        case 'account':
          windowTitle = t.account.title;
          break;
        case 'tenants':
          windowTitle = 'Tenant Management';
          break;
        default:
          windowTitle = 'Unknown';
      }

      const newWindow: WindowInstance = {
        id: `${type}-${nextWindowId.current++}`,
        type,
        title: windowTitle,
        x: finalX,
        y: finalY,
        width: center.width, // Use dynamic 80% width for all window types
        height: center.height, // Use dynamic 80% height for all window types
        isMinimized: false,
        isMaximized: false,
        zIndex: newZIndex,
        activeAgents: chatActiveAgents
      };

      setWindows(prev => [...prev, newWindow]);

      // Notify parent if a chat window was opened
      if (type === 'chat' && onChatWindowOpened) {
        onChatWindowOpened(windowTitle, newWindow.id);
      }
    }, [windows, highestZIndex, getViewportCenter, bringToFront, activeAgents, onChatWindowOpened]);

    const closeWindow = useCallback((windowId: string) => {
      setWindows(prev => prev.filter(w => w.id !== windowId));
    }, []);

    const minimizeWindow = useCallback((windowId: string) => {
      setWindows(prev => prev.map(w => 
        w.id === windowId ? { ...w, isMinimized: true } : w
      ));
    }, []);

    const maximizeWindow = useCallback((windowId: string) => {
      setWindows(prev => prev.map(w => 
        w.id === windowId ? { 
          ...w, 
          isMaximized: !w.isMaximized,
          isMinimized: false 
        } : w
      ));
    }, []);

    const updateWindowPosition = useCallback((windowId: string, x: number, y: number) => {
      // Validate position values
      const validX = isNaN(x) ? 100 : Math.max(-500, Math.min(2000, x));
      const validY = isNaN(y) ? 150 : Math.max(10, Math.min(1000, y));
      
      setWindows(prev => prev.map(w => 
        w.id === windowId ? { ...w, x: validX, y: validY } : w
      ));
    }, []);

    const updateWindowSize = useCallback((windowId: string, width: number, height: number) => {
      // Validate size values with smaller defaults
      const validWidth = isNaN(width) ? 480 : Math.max(250, Math.min(1600, width));
      const validHeight = isNaN(height) ? 350 : Math.max(180, Math.min(1200, height));
      
      setWindows(prev => prev.map(w => 
        w.id === windowId ? { ...w, width: validWidth, height: validHeight } : w
      ));
    }, []);

    // Expose methods to parent via ref
    useImperativeHandle(ref, () => ({
      openWindow
    }), [openWindow]);

    const renderWindowContent = (window: WindowInstance) => {
      switch (window.type) {
        case 'chat':
          return <ChatInterface activeModules={window.activeAgents?.map(agent => agent.id) || []} profileImage={profileImage} />;
        case 'settings':
          return <AgentSettings user={user} isDarkMode={isDarkMode} onToggleDarkMode={onToggleDarkMode} onAgentsChange={onAgentsChange} />;
        case 'account':
          return <AccountSettings user={user} isDarkMode={isDarkMode} onToggleDarkMode={onToggleDarkMode} onLogout={onLogout} profileImage={profileImage} onProfileImageChange={onProfileImageChange} />;
        case 'tenants':
          return <TenantManagement user={user} />;
        default:
          return <div>Unknown window type</div>;
      }
    };

    return (
      <div className="relative w-full h-full">
        {/* Desktop Background */}
        <div 
          className="absolute inset-0"
          style={{ 
            background: 'var(--background)',
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(0, 120, 212, 0.02) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, rgba(0, 188, 242, 0.01) 0%, transparent 50%)
            `
          }}
        />

        {/* Minimized Window Icons - Final Windows 11 Design */}
        <div className="fixed bottom-4 left-4 flex gap-3 flex-wrap max-w-[400px] z-[1000]">
          {windows
            .filter(w => w.isMinimized)
            .map((window) => {
              // Count how many chat windows are minimized and get the index of current chat window
              const minimizedChatWindows = windows.filter(w => w.type === 'chat' && w.isMinimized);
              const chatIndex = window.type === 'chat' ? minimizedChatWindows.findIndex(w => w.id === window.id) : -1;
              
              return (
                <div key={window.id} className="relative group">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-14 w-14 rounded-2xl transition-all duration-300 ease-out hover:scale-110 hover:-translate-y-2 active:scale-95"
                    style={{
                      background: 'var(--color-acrylic-background)',
                      border: '1px solid var(--color-glass-border)',
                      backdropFilter: 'blur(20px)',
                      boxShadow: 'var(--shadow-window), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                    }}
                    onClick={() => bringToFront(window.id)}
                    title={`${window.title} - ${t.window.clickToRestore}`}
                  >
                    <div className="relative flex items-center justify-center">
                      {window.type === 'chat' ? (
                        <MessageCircle 
                          className="h-8 w-8 transition-all duration-200 group-hover:scale-110" 
                          style={{ color: 'var(--color-primary)' }}
                        />
                      ) : window.type === 'account' ? (
                        <User 
                          className="h-8 w-8 transition-all duration-200 group-hover:scale-110" 
                          style={{ color: 'var(--color-primary)' }}
                        />
                      ) : window.type === 'tenants' ? (
                        <Building 
                          className="h-8 w-8 transition-all duration-200 group-hover:scale-110" 
                          style={{ color: 'var(--color-primary)' }}
                        />
                      ) : (
                        <Settings 
                          className="h-8 w-8 transition-all duration-200 group-hover:scale-110" 
                          style={{ color: 'var(--color-primary)' }}
                        />
                      )}
                      
                      {/* Badge for multiple chat windows */}
                      {window.type === 'chat' && chatIndex > 0 && (
                        <div 
                          className="absolute -top-1 -right-1 w-5 h-5 text-xs rounded-full flex items-center justify-center font-medium shadow-lg transition-transform duration-200 group-hover:scale-110"
                          style={{
                            backgroundColor: 'var(--color-destructive)',
                            color: 'var(--color-destructive-foreground)'
                          }}
                        >
                          {chatIndex + 1}
                        </div>
                      )}
                      
                      {/* Subtle glow effect on hover */}
                      <div 
                        className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        style={{ backgroundColor: 'var(--color-primary)', opacity: '0.05' }}
                      />
                    </div>
                  </Button>
                  
                  {/* Hover Name Display */}
                  <div 
                    className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap"
                    style={{
                      background: 'var(--color-acrylic-background)',
                      border: '1px solid var(--color-glass-border)',
                      backdropFilter: 'blur(20px)',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                      color: 'var(--color-foreground)'
                    }}
                  >
                    <div className="text-sm font-medium">{window.title}</div>
                    {/* Small arrow pointing down */}
                    <div 
                      className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent"
                      style={{ borderTopColor: 'var(--color-glass-border)' }}
                    />
                  </div>
                </div>
              );
            })
          }
        </div>

        {/* Windows */}
        {windows.map(window => (
          <DraggableWindow
            key={window.id}
            window={window}
            onClose={() => closeWindow(window.id)}
            onMinimize={() => minimizeWindow(window.id)}
            onMaximize={() => maximizeWindow(window.id)}
            onFocus={() => bringToFront(window.id)}
            onMove={(x, y) => updateWindowPosition(window.id, x, y)}
            onResize={(width, height) => updateWindowSize(window.id, width, height)}
          >
            {renderWindowContent(window)}
          </DraggableWindow>
        ))}
      </div>
    );
  }
);

// Export the window manager controls for external use
export const useWindowControls = (windowManagerRef: React.RefObject<any>) => {
  const openChatWindow = useCallback(() => {
    const chatButton = document.getElementById('open-chat-window') as HTMLButtonElement;
    if (chatButton) chatButton.click();
  }, []);

  const openSettingsWindow = useCallback(() => {
    const settingsButton = document.getElementById('open-settings-window') as HTMLButtonElement;
    if (settingsButton) settingsButton.click();
  }, []);

  return { openChatWindow, openSettingsWindow };
};