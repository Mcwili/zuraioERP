import { useState, useCallback } from "react";
import { DesktopWindow } from "./DesktopWindow";
import { Taskbar } from "./Taskbar";
import { Dashboard } from "./Dashboard";
import { OrchestratorPanel } from "./OrchestratorPanel";
import { ModuleManager } from "./ModuleManager";
import { ChatInterface } from "./ChatInterface";
import { UserSettings } from "./UserSettings";
import { 
  Home, 
  Settings, 
  Bot, 
  MessageSquare, 
  Users
} from "lucide-react";

interface WindowState {
  id: string;
  type: string;
  title: string;
  icon?: React.ComponentType<any>;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

interface WindowsDesktopProps {
  user: { username: string; role: 'admin' | 'user' };
  onLogout: () => void;
}

export function WindowsDesktop({ user, onLogout }: WindowsDesktopProps) {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [nextZIndex, setNextZIndex] = useState(100);

  // Mock data for active modules
  const activeModules = [
    'chat-agent',
    'document-analyzer',
    'calendar-assistant'
  ];

  const applicationConfig = {
    dashboard: { 
      title: 'Dashboard', 
      icon: Home, 
      size: { width: 1000, height: 700 } 
    },
    orchestrator: { 
      title: 'Orchestrator', 
      icon: Settings, 
      size: { width: 900, height: 650 } 
    },
    modules: { 
      title: 'Agents', 
      icon: Bot, 
      size: { width: 800, height: 600 } 
    },
    chat: { 
      title: 'Chat', 
      icon: MessageSquare, 
      size: { width: 700, height: 550 } 
    },
    settings: { 
      title: 'Optionen', 
      icon: Settings, 
      size: { width: 600, height: 500 } 
    }
  };

  const createWindow = useCallback((type: string) => {
    const config = applicationConfig[type as keyof typeof applicationConfig];
    if (!config) return;

    // Special handling for chat - allow multiple instances
    if (type === 'chat') {
      const chatCount = windows.filter(w => w.type === 'chat').length + 1;
      const newWindow: WindowState = {
        id: `${type}-${Date.now()}`,
        type,
        title: `${config.title} ${chatCount}`,
        icon: config.icon,
        isMinimized: false,
        isMaximized: false,
        zIndex: nextZIndex,
        position: { 
          x: 50 + (windows.length * 30), 
          y: 50 + (windows.length * 30) 
        },
        size: config.size
      };

      setWindows(prev => [...prev, newWindow]);
      setActiveWindowId(newWindow.id);
      setNextZIndex(prev => prev + 1);
      return;
    }

    // Check if window already exists and is not closed (for non-chat windows)
    const existingWindow = windows.find(w => w.type === type);
    if (existingWindow) {
      // Focus existing window and restore if minimized
      setActiveWindowId(existingWindow.id);
      setWindows(prev => 
        prev.map(w => 
          w.id === existingWindow.id 
            ? { ...w, zIndex: nextZIndex, isMinimized: false }
            : w
        )
      );
      setNextZIndex(prev => prev + 1);
      return;
    }

    const newWindow: WindowState = {
      id: `${type}-${Date.now()}`,
      type,
      title: config.title,
      icon: config.icon,
      isMinimized: false,
      isMaximized: false,
      zIndex: nextZIndex,
      position: { 
        x: 50 + (windows.length * 30), 
        y: 50 + (windows.length * 30) 
      },
      size: config.size
    };

    setWindows(prev => [...prev, newWindow]);
    setActiveWindowId(newWindow.id);
    setNextZIndex(prev => prev + 1);
  }, [windows, nextZIndex]);

  const handleWindowFocus = useCallback((id: string) => {
    setActiveWindowId(id);
    setWindows(prev => 
      prev.map(w => 
        w.id === id 
          ? { ...w, zIndex: nextZIndex, isMinimized: false }
          : w
      )
    );
    setNextZIndex(prev => prev + 1);
  }, [nextZIndex]);

  const handleWindowMinimize = useCallback((id: string) => {
    setWindows(prev => 
      prev.map(w => 
        w.id === id 
          ? { ...w, isMinimized: true }
          : w
      )
    );
    
    // Set focus to next visible window
    const visibleWindows = windows.filter(w => w.id !== id && !w.isMinimized);
    if (visibleWindows.length > 0) {
      const topWindow = visibleWindows.reduce((prev, current) => 
        prev.zIndex > current.zIndex ? prev : current
      );
      setActiveWindowId(topWindow.id);
    } else {
      setActiveWindowId(null);
    }
  }, [windows]);

  const handleWindowMaximize = useCallback((id: string) => {
    setWindows(prev => 
      prev.map(w => 
        w.id === id 
          ? { ...w, isMaximized: !w.isMaximized }
          : w
      )
    );
  }, []);

  const handleWindowClose = useCallback((id: string) => {
    setWindows(prev => prev.filter(w => w.id !== id));
    
    // Set focus to next visible window
    const remainingWindows = windows.filter(w => w.id !== id && !w.isMinimized);
    if (remainingWindows.length > 0) {
      const topWindow = remainingWindows.reduce((prev, current) => 
        prev.zIndex > current.zIndex ? prev : current
      );
      setActiveWindowId(topWindow.id);
    } else {
      setActiveWindowId(null);
    }
  }, [windows]);

  const renderWindowContent = (window: WindowState) => {
    const contentStyle = {
      height: '100%',
      overflow: 'auto' as const,
      padding: '1.5rem'
    };

    switch (window.type) {
      case 'dashboard':
        return (
          <div style={contentStyle}>
            <Dashboard user={user} activeModules={activeModules} />
          </div>
        );
      case 'orchestrator':
        return (
          <div style={contentStyle}>
            <OrchestratorPanel />
          </div>
        );
      case 'modules':
        return (
          <div style={contentStyle}>
            <ModuleManager userRole={user.role} />
          </div>
        );
      case 'chat':
        return (
          <div style={contentStyle}>
            <ChatInterface activeModules={activeModules} />
          </div>
        );
      case 'settings':
        return (
          <div style={contentStyle}>
            <UserSettings user={user} onLogout={onLogout} />
          </div>
        );
      default:
        return <div style={contentStyle}>Unknown window type</div>;
    }
  };

  return (
    <div className="h-screen relative overflow-hidden" 
         style={{ 
           background: 'linear-gradient(135deg, #f0f8ff 0%, #e6f3ff 25%, #f5f9ff 50%, #fafcff 75%, #ffffff 100%)',
         }}>
      {/* Mica Background Effect */}
      <div 
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(0, 120, 212, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(0, 188, 242, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(64, 224, 208, 0.05) 0%, transparent 50%)
          `,
        }}
      />

      {/* Desktop Background Pattern */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23e6f3ff" fill-opacity="0.3"%3E%3Ccircle cx="30" cy="30" r="1.5"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        }}
      />

      {/* Windows */}
      {windows.map((window) => (
        <DesktopWindow
          key={window.id}
          id={window.id}
          title={window.title}
          icon={window.icon}
          initialPosition={window.position}
          initialSize={window.size}
          isMinimized={window.isMinimized}
          isMaximized={window.isMaximized}
          onMinimize={handleWindowMinimize}
          onMaximize={handleWindowMaximize}
          onClose={handleWindowClose}
          onFocus={handleWindowFocus}
          zIndex={window.zIndex}
          isActive={window.id === activeWindowId}
        >
          {renderWindowContent(window)}
        </DesktopWindow>
      ))}

      {/* Taskbar */}
      <Taskbar
        windows={windows.map(w => ({
          id: w.id,
          title: w.title,
          icon: w.icon,
          isMinimized: w.isMinimized,
          isActive: w.id === activeWindowId
        }))}
        onWindowClick={handleWindowFocus}
        onNewWindow={createWindow}
        onLogout={onLogout}
        user={user}
      />
    </div>
  );
}