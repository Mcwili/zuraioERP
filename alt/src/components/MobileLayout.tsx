import { useState, useRef } from "react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTitle, SheetDescription } from "./ui/sheet";
import { ChatInterface } from "./ChatInterface";
import { ChatHistory, ChatHistoryRef } from "./ChatHistory";
import { AgentSettings } from "./AgentSettings";
import { AccountSettings } from "./AccountSettings";
import { useLanguage } from "../contexts/LanguageContext";
import { 
  Settings, 
  User,
  X
} from "lucide-react";
import rmbLogo from "figma:asset/c671b64124f09b996725617e2eaf6a33d08bebb7.png";
import aiHubLogo from "figma:asset/e3e2cb48bfe86efa12aba4f25d5e37f6ced6a4e7.png";

interface MobileLayoutProps {
  user: { username: string };
  onLogout: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export function MobileLayout({ user, onLogout, isDarkMode, onToggleDarkMode }: MobileLayoutProps) {
  const { t } = useLanguage();
  const chatHistoryRef = useRef<ChatHistoryRef>(null);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);

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

  const handleChatSelect = (chatId: string) => {
    setSelectedChatId(chatId);
    setIsChatOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--background)' }}>
      {/* Mobile Header */}
      <header 
        className="w-full h-14 px-4 flex items-center justify-between border-b shrink-0"
        style={{
          backgroundColor: 'var(--header-background)',
          borderBottomColor: 'var(--header-border)',
          boxShadow: 'var(--shadow-header)'
        }}
      >
        <div className="flex items-center gap-3">
          <img 
            src={aiHubLogo} 
            alt="AI-Hub Logo" 
            className="h-6 w-auto object-contain"
          />
          <span className="font-medium">AI-Hub</span>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Settings Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsSettingsOpen(true)}
            className="h-8 w-8 p-0"
            title={t.header.options}
          >
            <Settings className="h-4 w-4" />
          </Button>

          {/* Account Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsAccountOpen(true)}
            className="h-8 w-8 p-0"
            title={t.account.title}
          >
            <User className="h-4 w-4" />
          </Button>
          
          {/* Company Logo */}
          <img 
            src={rmbLogo} 
            alt="RMB Group Logo" 
            className="h-8 w-auto object-contain ml-2"
            style={{
              filter: 'drop-shadow(0 2px 8px rgba(0, 120, 212, 0.1))'
            }}
          />
        </div>
      </header>

      {/* Main Content - ChatHistory */}
      <main className="flex-1 overflow-hidden">
        <ChatHistory
          ref={chatHistoryRef}
          open={true}
          onOpenChange={() => {}}
          onChatSelect={handleChatSelect}
          isPinned={true}
        />
      </main>

      {/* Chat Interface Sheet */}
      <Sheet open={isChatOpen} onOpenChange={setIsChatOpen}>
        <SheetContent 
          side="bottom" 
          className="h-[100dvh] p-0 w-full"
          style={{
            backgroundColor: 'var(--background)'
          }}
        >
          <SheetTitle className="sr-only">{t.header.chat}</SheetTitle>
          <SheetDescription className="sr-only">
            {t.mobileLayout.chatDescription}
          </SheetDescription>
          <div className="h-full flex flex-col">
            {/* Chat Header */}
            <div 
              className="h-14 px-4 flex items-center justify-between border-b shrink-0"
              style={{
                backgroundColor: 'var(--header-background)',
                borderBottomColor: 'var(--header-border)',
                boxShadow: 'var(--shadow-header)'
              }}
            >
              <h2 className="font-medium">{t.header.chat}</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsChatOpen(false)}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Chat Content */}
            <div className="flex-1 overflow-hidden">
              <ChatInterface activeModules={activeAgents} profileImage={profileImage} />
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Settings Sheet */}
      <Sheet open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <SheetContent 
          side="right" 
          className="w-full sm:max-w-md p-0"
          style={{
            backgroundColor: 'var(--background)'
          }}
        >
          <SheetTitle className="sr-only">{t.header.options}</SheetTitle>
          <SheetDescription className="sr-only">
            {t.mobileLayout.optionsDescription}
          </SheetDescription>
          <div className="h-full flex flex-col">
            {/* Settings Header */}
            <div 
              className="h-14 px-4 flex items-center justify-between border-b shrink-0"
              style={{
                backgroundColor: 'var(--header-background)',
                borderBottomColor: 'var(--header-border)',
                boxShadow: 'var(--shadow-header)'
              }}
            >
              <h2 className="font-medium">{t.header.options}</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSettingsOpen(false)}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Settings Content */}
            <div className="flex-1 overflow-auto">
              <AgentSettings 
                user={user} 
                isDarkMode={isDarkMode} 
                onToggleDarkMode={onToggleDarkMode} 
                onAgentsChange={setActiveAgents} 
              />
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Account Sheet */}
      <Sheet open={isAccountOpen} onOpenChange={setIsAccountOpen}>
        <SheetContent 
          side="right" 
          className="w-full sm:max-w-md p-0"
          style={{
            backgroundColor: 'var(--background)'
          }}
        >
          <SheetTitle className="sr-only">{t.account.title}</SheetTitle>
          <SheetDescription className="sr-only">
            {t.mobileLayout.accountDescription}
          </SheetDescription>
          <div className="h-full flex flex-col">
            {/* Account Header */}
            <div 
              className="h-14 px-4 flex items-center justify-between border-b shrink-0"
              style={{
                backgroundColor: 'var(--header-background)',
                borderBottomColor: 'var(--header-border)',
                boxShadow: 'var(--shadow-header)'
              }}
            >
              <h2 className="font-medium">{t.account.title}</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsAccountOpen(false)}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Account Content */}
            <div className="flex-1 overflow-auto">
              <AccountSettings 
                user={user} 
                isDarkMode={isDarkMode} 
                onToggleDarkMode={onToggleDarkMode} 
                onLogout={onLogout} 
                profileImage={profileImage} 
                onProfileImageChange={handleProfileImageChange} 
              />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}