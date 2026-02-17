import { useRef, useState, useEffect } from "react";
import { Header } from "./Header";
import { WindowManager, WindowManagerRef } from "./WindowManager";
import { ChatHistory, ChatHistoryRef } from "./ChatHistory";
import { Button } from "./ui/button";
import { Brain } from "lucide-react";


interface DesktopLayoutProps {
  user: { username: string };
  onLogout: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export function DesktopLayout({ user, onLogout, isDarkMode, onToggleDarkMode }: DesktopLayoutProps) {
  const windowManagerRef = useRef<WindowManagerRef>(null);
  const chatHistoryRef = useRef<ChatHistoryRef>(null);
  
  // Chat History state
  const [historyOpen, setHistoryOpen] = useState(false);
  const [historyPinned, setHistoryPinned] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('chatHistoryPinned') === 'true';
    }
    return false;
  });

  // Save pinned state to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('chatHistoryPinned', String(historyPinned));
    }
  }, [historyPinned]);

  // Keep history open if pinned
  useEffect(() => {
    if (historyPinned) {
      setHistoryOpen(true);
    }
  }, [historyPinned]);
  
  // Load active agents from localStorage
  const [activeAgents, setActiveAgents] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('activeAgents');
      if (saved) {
        const agentStates = JSON.parse(saved);
        return Object.keys(agentStates).filter(id => agentStates[id]);
      }
    }
    // Default: all agents active except Jelmoli
    return ["email-agent", "normen-agent", "internet-agent"];
  });

  // Load profile image from localStorage
  const [profileImage, setProfileImage] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(`profileImage_${user.username}`);
      if (saved) {
        return saved;
      }
      // Default for Aila Kimura
      if (user.username === "Aila Kimura") {
        return "https://media.licdn.com/dms/image/v2/C4D03AQEfiV5ul-CgkQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1517043762470?e=1740009600&v=beta&t=fynMkNivEtJl8_oC-n8uNiL4jhQDj5hfF1qMJQe_JqE";
      }
    }
    return null;
  });

  // Update profile image and save to localStorage
  const handleProfileImageChange = (newImage: string | null) => {
    setProfileImage(newImage);
    if (typeof window !== 'undefined') {
      if (newImage) {
        localStorage.setItem(`profileImage_${user.username}`, newImage);
      } else {
        localStorage.removeItem(`profileImage_${user.username}`);
      }
    }
  };

  const handleNavigate = (page: string) => {
    if (!windowManagerRef.current) return;
    
    switch (page) {
      case 'chat':
        windowManagerRef.current.openWindow('chat');
        break;
      case 'settings':
        windowManagerRef.current.openWindow('settings');
        break;
      case 'account':
        windowManagerRef.current.openWindow('account');
        break;
      default:
        break;
    }
  };

  const toggleHistoryPin = () => {
    setHistoryPinned(!historyPinned);
  };

  const handleHistoryChange = (open: boolean) => {
    if (!historyPinned) {
      setHistoryOpen(open);
    }
  };

  const handleChatSelect = (chatId: string) => {
    // Open the chat window when a conversation is selected
    if (windowManagerRef.current) {
      windowManagerRef.current.openWindow('chat');
    }
    // Close history if not pinned
    if (!historyPinned) {
      setHistoryOpen(false);
    }
  };

  // Callback when a new chat window is opened
  const handleChatWindowOpened = (title: string, windowId: string) => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.addChatFromWindow(title, windowId);
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--background)' }}>
      {/* Header */}
      <Header 
        user={user}
        onNavigate={handleNavigate}
        onLogout={onLogout}
        currentPage="" // No active page in desktop mode
        isDarkMode={isDarkMode}
        onToggleDarkMode={onToggleDarkMode}
        profileImage={profileImage}
      />
      
      {/* Desktop Area */}
      <div className="flex-1 relative overflow-hidden">
        {/* Chat History Toggle Button - Only show when closed */}
        {!historyOpen && (
          <div className="absolute left-4 top-4 z-30">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setHistoryOpen(true)}
              className="h-8 w-8 p-0 bg-white/95 backdrop-blur-sm shadow-md transition-all"
              style={{ borderColor: '#E1E3E6' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F5F6F7'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.95)'}
              title="Chat-Verlauf"
            >
              <Brain className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Chat History Panel */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="relative w-full h-full pointer-events-auto">
            <ChatHistory 
              ref={chatHistoryRef}
              open={historyOpen} 
              onOpenChange={handleHistoryChange}
              isPinned={historyPinned}
              onTogglePin={toggleHistoryPin}
              onChatSelect={handleChatSelect}
            />
          </div>
        </div>
        
        {/* WindowManager with click handler to close unpinned history */}
        <div 
          className="absolute inset-0"
          onClick={() => {
            if (historyOpen && !historyPinned) {
              setHistoryOpen(false);
            }
          }}
        >
          <WindowManager 
            ref={windowManagerRef}
            user={user} 
            onLogout={onLogout} 
            isDarkMode={isDarkMode}
            onToggleDarkMode={onToggleDarkMode}
            activeAgents={activeAgents}
            onAgentsChange={setActiveAgents}
            profileImage={profileImage}
            onProfileImageChange={handleProfileImageChange}
            onChatWindowOpened={handleChatWindowOpened}
          />
        </div>
      </div>
    </div>
  );
}