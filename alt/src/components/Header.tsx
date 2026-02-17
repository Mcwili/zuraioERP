import { useState } from "react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { useLanguage } from "../contexts/LanguageContext";
import { 
  Bot, 
  Settings, 
  User, 
  LogOut,
  MessageSquare,
  ChevronDown,
  Building2,
  UserCog,
  Database,
  Shield,
  Key
} from "lucide-react";
import rmbLogo from "figma:asset/c671b64124f09b996725617e2eaf6a33d08bebb7.png";
import neucoLogo from "figma:asset/64c4840bb2c629b9d1466d208fd9354f2e124f32.png";
import polleyLogo from "figma:asset/97d630f148c92ced3e6901967a95cff119436573.png";
import mcwiliLogo from "figma:asset/d1fe9656ab53b2ca3370c6a6178345e254f75075.png";
import profileImage from "figma:asset/3635dfba639d979655a21387007dfb20f2b597e5.png";

interface HeaderProps {
  user: { username: string; company?: 'rmb' | 'neuco' };
  onNavigate: (page: string) => void;
  onLogout: () => void;
  currentPage: string;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  profileImage?: string | null;
}

export function Header({ user, onNavigate, onLogout, currentPage, isDarkMode, onToggleDarkMode, profileImage: customProfileImage }: HeaderProps) {
  const { t } = useLanguage();

  // Use company-specific logo
  const currentLogo = user.company === 'neuco'
    ? { src: neucoLogo, alt: 'neuco Logo', name: 'neuco' }
    : { src: rmbLogo, alt: '.RMB Group Logo', name: '.RMB Group' };
  
  const navigationItems = [];

  // Get user initials for avatar
  const getUserInitials = (username: string) => {
    return username.slice(0, 2).toUpperCase();
  };

  return (
    <header 
      className="w-full h-16 bg-white border-b px-6 flex items-center justify-between"
      style={{
        backgroundColor: 'var(--color-header-background)',
        borderBottomColor: 'var(--color-header-border)',
        boxShadow: 'var(--shadow-header)'
      }}
    >
      {/* Left Side - AI HUB + Navigation */}
      <div className="flex items-center gap-8">
        {/* AI HUB Title */}
        <h1 className="text-xl flex items-center gap-3">
          <span className="font-semibold text-foreground">AI-Hub</span>
          <span style={{ color: 'var(--color-gray-medium)' }}>|</span>
          <span className="font-light" style={{ color: 'var(--color-gray-medium)' }}>{t.header.tagline}</span>
        </h1>
        
        {/* Navigation Items */}
        <nav className="flex items-center gap-4">
          {navigationItems.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              className={`h-9 px-4 text-sm font-medium transition-colors ${
                currentPage === item.id
                  ? 'text-primary bg-blue-50 hover:bg-blue-100'
                  : 'hover:text-gray-900'
              }`}
              style={currentPage !== item.id ? { color: 'var(--color-gray-dark)', backgroundColor: 'transparent' } : {}}
              onMouseEnter={(e) => {
                if (currentPage !== item.id) {
                  e.currentTarget.style.backgroundColor = 'var(--color-gray-light)';
                }
              }}
              onMouseLeave={(e) => {
                if (currentPage !== item.id) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
              onClick={() => onNavigate(item.id)}
            >
              <item.icon className="h-4 w-4 mr-2" />
              {item.label}
            </Button>
          ))}
        </nav>
      </div>

      {/* Right Side - Admin Menus (if admin) & Logo */}
      <div className="flex items-center gap-4">
        {/* Regular User Menu - Only shown for non-admin users OR normal tenant users */}
        {(user.role !== 'admin' || (user.role === 'admin' && !user.isTenantAdmin)) && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className="h-10 w-10 p-0 rounded-full transition-colors"
                style={{ backgroundColor: 'transparent' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-gray-light)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <Avatar className="h-8 w-8" style={{ boxShadow: '0 2px 8px rgba(0, 120, 212, 0.2)' }}>
                  {customProfileImage && <AvatarImage src={customProfileImage} alt={user.username} />}
                  {!customProfileImage && <AvatarImage src={profileImage} alt={user.username} />}
                  <AvatarFallback
                    style={{
                      background: 'linear-gradient(135deg, #5ebc67 0%, #7ed87e 100%)',
                      color: 'white'
                    }}
                  >
                    {getUserInitials(user.username)}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="px-3 py-2 text-sm">
                <div className="font-medium text-foreground">{user.username}</div>
                <div className="capitalize text-muted-foreground">{user.role}</div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onNavigate('account')}>
                <User className="h-4 w-4 mr-2" />
                {t.admin.profile.account || 'Profil'}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onNavigate('settings')}>
                <Settings className="h-4 w-4 mr-2" />
                {user.role === 'admin' ? t.header.options : t.settings}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={onLogout}
                className="text-red-600 focus:text-red-600"
              >
                <LogOut className="h-4 w-4 mr-2" />
                {t.header.logout}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        {/* Tenant Admin Profile Menu - Only shown when in tenant-admin mode */}
        {user.isTenantAdmin && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className="h-10 px-3 py-2 rounded-full transition-colors flex items-center gap-2"
                style={{ backgroundColor: 'transparent' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-gray-light)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <img 
                  src={profileImage}
                  alt={user.username}
                  className="h-8 w-8 rounded-full object-cover"
                  style={{
                    boxShadow: '0 2px 8px rgba(0, 120, 212, 0.2)'
                  }}
                />
                <span className="text-sm font-medium text-foreground">{t.admin.profile.title}</span>
                <ChevronDown className="h-3 w-3 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="px-3 py-2 text-sm">
                <div className="font-medium text-foreground">{user.username}</div>
                <div className="text-muted-foreground">{t.header.tenantAdministrator}</div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onNavigate('account')}>
                <User className="h-4 w-4 mr-2" />
                {t.admin.profile.account}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={onLogout}
                className="text-red-600 focus:text-red-600"
              >
                <LogOut className="h-4 w-4 mr-2" />
                {t.admin.profile.logout}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        
        {/* Tenant Logo */}
        <div className="h-10 flex items-center">
          <img 
            src={currentLogo.src} 
            alt={currentLogo.alt} 
            className={`w-auto object-contain ${
              user.company === 'neuco' ? 'h-4' : 'h-8'
            }`}
            style={{
              filter: 'drop-shadow(0 2px 8px rgba(0, 120, 212, 0.1))',
              opacity: user.company === 'neuco' ? 0.65 : 1
            }}
          />
        </div>
      </div>
    </header>
  );
}