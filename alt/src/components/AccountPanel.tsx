import { useState, useRef } from "react";
import { Globe, Palette, LogOut, ChevronDown, Check, UserCircle, ChevronRight } from "lucide-react";
import { useLanguage, type Language } from "../utils/i18n";
import { useClickOutside } from "../hooks/useClickOutside";

interface AccountPanelProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onLogout: () => void;
  zIndex?: number;
}

export function AccountPanel({ isOpen, onClose, isDarkMode, onToggleDarkMode, onLogout, zIndex = 10 }: AccountPanelProps) {
  const { language, setLanguage, t } = useLanguage();
  const [languageExpanded, setLanguageExpanded] = useState(false);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [designExpanded, setDesignExpanded] = useState(false);
  const [logoutExpanded, setLogoutExpanded] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // Close panel when clicking outside
  useClickOutside(panelRef, () => {
    if (isOpen) {
      onClose();
    }
  }, isOpen);

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'pt-br', label: 'Português (Brasil)', flag: '🇧🇷' }
  ];

  return (
    <div 
      ref={panelRef}
      className="flex flex-col transition-all duration-300 ease-in-out overflow-hidden border-l absolute top-0 right-0 bottom-0"
      style={{ 
        width: isOpen ? 'min(400px, 100vw)' : '0px',
        borderColor: isOpen ? '#e1dfdd' : 'transparent',
        backgroundColor: '#FFFFFF',
        zIndex: zIndex
      }}
    >
      {isOpen && (
        <div className="flex-1 flex flex-col h-full">
          {/* Header */}
          <div 
            className="h-14 flex items-center justify-between px-4"
            style={{ 
              borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
              backgroundColor: '#DE851D'
            }}
          >
            <div className="flex items-center gap-3">
              <UserCircle className="h-5 w-5 flex-shrink-0" style={{ color: '#000000' }} />
              <h2 className="font-medium" style={{ color: '#000000' }}>
                {t.accountPanel.title}
              </h2>
            </div>
            
            {/* Close Button */}
            <button
              onClick={onClose}
              className="flex items-center justify-center w-8 h-8 rounded-lg transition-colors"
              style={{
                backgroundColor: 'transparent',
                color: '#000000'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <ChevronRight className="h-5 w-5" style={{ color: '#000000' }} />
            </button>
          </div>

          {/* Panel Content - Scrollable */}
          <div 
            className="flex-1 overflow-auto px-2 py-2"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#e1dfdd transparent'
            }}
          >
            <style>
              {`
                .flex-1.overflow-auto.px-2::-webkit-scrollbar {
                  width: 8px;
                }
                .flex-1.overflow-auto.px-2::-webkit-scrollbar-track {
                  background: transparent;
                }
                .flex-1.overflow-auto.px-2::-webkit-scrollbar-thumb {
                  background-color: #e1dfdd;
                  border-radius: 4px;
                }
                .flex-1.overflow-auto.px-2::-webkit-scrollbar-thumb:hover {
                  background-color: #e1dfdd;
                }
              `}
            </style>

            <div className="space-y-0">
              {/* Sprache */}
              <div>
                <button
                  onClick={() => setLanguageExpanded(!languageExpanded)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm rounded-lg transition-colors"
                  style={{
                    backgroundColor: 'transparent',
                    color: '#000000'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#E9C796';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <Globe className="h-4 w-4 flex-shrink-0" style={{ color: '#000000' }} />
                  <span className="flex-1 text-left" style={{ color: '#000000' }}>{t.accountPanel.language}</span>
                  <ChevronDown 
                    className="h-4 w-4 flex-shrink-0 transition-transform" 
                    style={{ 
                      color: '#000000',
                      transform: languageExpanded ? 'rotate(180deg)' : 'rotate(0deg)'
                    }} 
                  />
                </button>
                
                {languageExpanded && (
                  <div className="ml-8 mt-2 space-y-2">
                    {/* Sprache Label */}
                    <div className="px-4 text-xs" style={{ color: '#000000' }}>
                      {t.accountPanel.language}
                    </div>
                    
                    {/* Language Dropdown Button */}
                    <div className="relative">
                      <button
                        onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
                        className="w-full flex items-center justify-between px-4 py-2.5 text-xs rounded-lg transition-colors"
                        style={{
                          backgroundColor: '#E9C796',
                          color: '#000000'
                        }}
                      >
                        <span style={{ color: '#000000' }}>
                          {languages.find(l => l.code === language)?.flag} {languages.find(l => l.code === language)?.label}
                        </span>
                        <ChevronDown 
                          className="h-4 w-4 flex-shrink-0 transition-transform" 
                          style={{ 
                            color: '#000000',
                            transform: languageDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)'
                          }} 
                        />
                      </button>
                      
                      {/* Language Dropdown Menu */}
                      {languageDropdownOpen && (
                        <div 
                          className="absolute top-full left-0 right-0 mt-1 rounded-lg overflow-hidden shadow-lg z-20"
                          style={{
                            backgroundColor: '#FFFFFF',
                            border: '1px solid #e1dfdd'
                          }}
                        >
                          {languages.map((lang) => (
                            <button
                              key={lang.code}
                              onClick={() => {
                                setLanguage(lang.code);
                                setLanguageDropdownOpen(false);
                              }}
                              className="w-full flex items-center justify-between px-4 py-2.5 text-xs transition-colors"
                              style={{
                                backgroundColor: language === lang.code ? '#E9C796' : 'transparent',
                                color: '#000000'
                              }}
                              onMouseEnter={(e) => {
                                if (language !== lang.code) {
                                  e.currentTarget.style.backgroundColor = '#E9C796';
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (language !== lang.code) {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              <span style={{ color: '#000000' }}>
                                {lang.flag} {lang.label}
                              </span>
                              {language === lang.code && (
                                <Check className="h-4 w-4" style={{ color: '#000000' }} />
                              )}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Design */}
              <div>
                <button
                  onClick={() => setDesignExpanded(!designExpanded)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm rounded-lg transition-colors"
                  style={{
                    backgroundColor: 'transparent',
                    color: '#000000'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#E9C796';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <Palette className="h-4 w-4 flex-shrink-0" style={{ color: '#000000' }} />
                  <span className="flex-1 text-left" style={{ color: '#000000' }}>{t.accountPanel.design}</span>
                  <ChevronDown 
                    className="h-4 w-4 flex-shrink-0 transition-transform" 
                    style={{ 
                      color: '#000000',
                      transform: designExpanded ? 'rotate(180deg)' : 'rotate(0deg)'
                    }} 
                  />
                </button>
                
                {designExpanded && (
                  <div className="ml-8 mt-2 space-y-2">
                    {/* Dunkles Design */}
                    <div className="px-4 py-3">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="text-xs" style={{ color: '#000000' }}>
                            {t.accountPanel.darkModeTitle}
                          </div>
                          <div className="text-[10px] mt-1" style={{ color: '#666666' }}>
                            {t.accountPanel.darkModeDescription}
                          </div>
                        </div>
                        
                        {/* Toggle Switch */}
                        <button
                          onClick={onToggleDarkMode}
                          className="flex-shrink-0 relative rounded-full transition-all duration-300"
                          style={{
                            width: '32px',
                            height: '18px',
                            backgroundColor: isDarkMode ? '#DE851D' : '#e1dfdd',
                            border: 'none'
                          }}
                        >
                          <div
                            className="absolute rounded-full transition-all duration-300 shadow-sm"
                            style={{
                              width: '16px',
                              height: '16px',
                              backgroundColor: '#FFFFFF',
                              top: '1px',
                              left: isDarkMode ? 'calc(100% - 17px)' : '1px'
                            }}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Sitzung beenden */}
              <div>
                <button
                  onClick={() => setLogoutExpanded(!logoutExpanded)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm rounded-lg transition-colors"
                  style={{
                    backgroundColor: 'transparent',
                    color: '#000000'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#E9C796';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <LogOut className="h-4 w-4 flex-shrink-0" style={{ color: '#000000' }} />
                  <span className="flex-1 text-left" style={{ color: '#000000' }}>{t.accountPanel.logout}</span>
                  <ChevronDown 
                    className="h-4 w-4 flex-shrink-0 transition-transform" 
                    style={{ 
                      color: '#000000',
                      transform: logoutExpanded ? 'rotate(180deg)' : 'rotate(0deg)'
                    }} 
                  />
                </button>
                
                {logoutExpanded && (
                  <div className="ml-8 mt-2 space-y-2">
                    <div className="px-4 py-3">
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-xs" style={{ color: '#666666' }}>
                          {t.accountPanel.logoutDescription}
                        </span>
                        
                        {/* Abmelden Button */}
                        <button
                          onClick={onLogout}
                          className="flex items-center gap-1.5 px-3 py-1 text-xs rounded-lg transition-colors flex-shrink-0"
                          style={{
                            backgroundColor: 'transparent',
                            border: '1px solid #e1dfdd',
                            color: '#000000'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#E9C796';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                          }}
                        >
                          <LogOut className="h-3 w-3" style={{ color: '#000000' }} />
                          <span style={{ color: '#000000' }}>{t.accountPanel.logoutButton}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}