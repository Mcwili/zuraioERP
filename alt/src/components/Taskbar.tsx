import { useState } from "react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { 
  Home, 
  Settings, 
  Bot, 
  MessageSquare, 
  Users, 
  Power,
  Menu,
  Grid3X3
} from "lucide-react";
import logoImage from "figma:asset/c671b64124f09b996725617e2eaf6a33d08bebb7.png";
import { useExtendedTranslations } from "../utils/i18n";

interface TaskbarWindow {
  id: string;
  title: string;
  icon?: React.ComponentType<any>;
  isMinimized: boolean;
  isActive: boolean;
}

interface TaskbarProps {
  windows: TaskbarWindow[];
  onWindowClick: (id: string) => void;
  onNewWindow: (type: string) => void;
  onLogout: () => void;
  user: { username: string; role: string };
}

export function Taskbar({ windows, onWindowClick, onNewWindow, onLogout, user }: TaskbarProps) {
  const t = useExtendedTranslations();
  const [startMenuOpen, setStartMenuOpen] = useState(false);

  const applications = [
    { id: 'modules', label: t.taskbar.agentManagement, icon: Bot, description: t.taskbar.agentManagement },
    { id: 'settings', label: t.taskbar.options, icon: Settings, description: t.taskbar.systemSettings }
  ];

  const handleAppClick = (appId: string) => {
    onNewWindow(appId);
    setStartMenuOpen(false);
  };

  const currentTime = new Date().toLocaleTimeString('de-DE', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  return (
    <div 
      className="fixed bottom-2 left-1/2 transform -translate-x-1/2 h-14 px-4 flex items-center gap-2 z-50 rounded-xl transition-all duration-300"
      style={{
        background: 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), 0 4px 16px rgba(0, 120, 212, 0.05)',
        minWidth: '600px',
        maxWidth: '90vw'
      }}
    >
      {/* Start Menu */}
      <Popover open={startMenuOpen} onOpenChange={setStartMenuOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            className="h-10 w-10 p-0 rounded-lg text-white transition-all duration-200"
            style={{
              backgroundColor: 'var(--start-button)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--start-button-hover)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--start-button)';
            }}
          >
            <Grid3X3 className="h-5 w-5" />
          </Button>
        </PopoverTrigger>
        <PopoverContent 
          className="w-80 p-0 mb-4 border-0" 
          side="top" 
          align="start"
          sideOffset={16}
        >
          <div 
            className="rounded-xl overflow-hidden"
            style={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 16px 64px rgba(0, 0, 0, 0.15)'
            }}
          >
            {/* User Info */}
            <div className="p-6 border-b border-white/20">
              <div className="flex items-center gap-4">
                <div 
                  className="h-12 w-12 rounded-full flex items-center justify-center text-white"
                  style={{
                    background: 'linear-gradient(135deg, #5ebc67 0%, #7ed87e 100%)'
                  }}
                >
                  <div className="text-lg font-bold">.RMB</div>
                </div>
                <div>
                  <div className="font-semibold text-lg text-foreground">AI Hub</div>
                  <div className="text-sm text-muted-foreground">
                    {user.username} • {user.role}
                  </div>
                </div>
              </div>
            </div>

            {/* Applications */}
            <div className="p-4">
              <div className="text-sm font-medium px-2 py-2 text-muted-foreground">
                {t.taskbar.applications}
              </div>
              <div className="flex gap-3">
                {applications.map((app) => (
                  <Button
                    key={app.id}
                    variant="ghost"
                    className="flex-1 h-auto p-4 rounded-xl justify-start hover:bg-blue-50 hover:text-primary transition-all duration-200"
                    onClick={() => handleAppClick(app.id)}
                  >
                    <div className="flex flex-col items-center gap-2 w-full">
                      <div 
                        className="h-10 w-10 rounded-lg flex items-center justify-center"
                        style={{
                          background: 'linear-gradient(135deg, rgba(0, 120, 212, 0.1) 0%, rgba(0, 188, 242, 0.1) 100%)',
                          border: '1px solid rgba(0, 120, 212, 0.2)'
                        }}
                      >
                        <app.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-medium">{app.label}</div>
                        <div className="text-xs text-muted-foreground">
                          {app.description}
                        </div>
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>

            {/* System Actions */}
            <div className="border-t border-white/20 p-4">
              <Button
                variant="ghost"
                className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200"
                onClick={onLogout}
              >
                <Power className="h-4 w-4 mr-3" />
                {t.taskbar.logout}
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {/* Separator */}
      <div className="w-px h-8 bg-gradient-to-b from-transparent via-border to-transparent mx-1" />

      {/* Window Buttons */}
      <div className="flex items-center gap-1">
        {windows.map((window) => (
          <Button
            key={window.id}
            variant="ghost"
            className={`h-10 px-3 rounded-lg transition-all duration-200 max-w-[180px] text-muted-foreground hover:text-foreground ${
              window.isActive 
                ? 'bg-blue-100 text-primary shadow-sm' 
                : ''
            } ${window.isMinimized ? 'opacity-60' : ''}`}
            style={!window.isActive ? { backgroundColor: 'transparent' } : {}}
            onMouseEnter={(e) => {
              if (!window.isActive) {
                e.currentTarget.style.backgroundColor = '#F5F6F7';
              }
            }}
            onMouseLeave={(e) => {
              if (!window.isActive) {
                e.currentTarget.style.backgroundColor = 'transparent';
              }
            }}
            onClick={() => onWindowClick(window.id)}
          >
            <div className="flex items-center gap-2 truncate">
              {window.icon && <window.icon className="h-4 w-4 flex-shrink-0" />}
              <span className="text-sm truncate font-medium">{window.title}</span>
            </div>
          </Button>
        ))}
      </div>

      {/* System Tray */}
      <div className="ml-auto flex items-center gap-2">
        <div 
          className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-lg cursor-pointer transition-all duration-200"
          style={{ backgroundColor: 'transparent' }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F5F6F7'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          {currentTime}
        </div>
      </div>
    </div>
  );
}