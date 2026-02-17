import { useState } from "react";
import { TenantSidebar } from "./TenantSidebar";
import { TenantAdminPanel } from "./TenantAdminPanel";
import { TenantDashboard } from "./TenantDashboard";
import { TenantSettings } from "./TenantSettings";
import { UserManagement } from "./UserManagement";
import { ModelManagement } from "./ModelManagement";
import { ModuleOverview } from "./ModuleOverview";
import { DataManagement } from "./DataManagement";
import { PromptsFrameworks } from "./PromptsFrameworks";
import { ActivityLog } from "./ActivityLog";
import { SystemMonitoring } from "./SystemMonitoring";
import { AlertsManagement } from "./AlertsManagement";
import { SupportDocumentation } from "./SupportDocumentation";
import { ThinkTank } from "./ThinkTank";
import { AccountPanel } from "./AccountPanel";
import { KeyboardShortcutsDialog } from "./KeyboardShortcutsDialog";
import { AnalyticsDashboard } from "./AnalyticsDashboard";
import { useKeyboardShortcuts } from "../hooks/useKeyboardShortcuts";
import { Button } from "./ui/button";
import { 
  LogOut, 
  Moon, 
  Sun, 
  Menu, 
  X, 
  Settings as SettingsIcon, 
  Check, 
  Brain,
  MessageSquare,
  UserCircle,
  User,
  ChevronDown,
  LayoutDashboard,
  Settings,
  Users,
  Database,
  Activity,
  HelpCircle,
  Building2
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useLanguage, type Language } from "../utils/i18n";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import rmbLogo from "figma:asset/c671b64124f09b996725617e2eaf6a33d08bebb7.png";
import neucoLogo from "figma:asset/64c4840bb2c629b9d1466d208fd9354f2e124f32.png";
import zuraioLogo from "figma:asset/e2bbc50662620d1183da907644b459be0f7e4b76.png";
import zuraioFullLogo from "figma:asset/97f5ccd6f973d4ad0fd7c9f2c67d1f22d875e854.png";
import zuraioHeaderLogo from "figma:asset/741f650b8163dde49c931de3852efff8d3773bdb.png";
import zuraioNewLogo from "figma:asset/519e0aeb2ce0beb67b1d2065fa05ce7bf66401b8.png";

interface TenantAdminLayoutProps {
  user: { username: string; company: 'rmb' | 'neuco' };
  onLogout: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export function TenantAdminLayout({ user, onLogout, isDarkMode, onToggleDarkMode }: TenantAdminLayoutProps) {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [thinkTankOpen, setThinkTankOpen] = useState(false);
  const [tenantPanelOpen, setTenantPanelOpen] = useState(true);
  const [accountPanelOpen, setAccountPanelOpen] = useState(false);
  const [panelZIndex, setPanelZIndex] = useState<Record<string, number>>({});
  const [nextZIndex, setNextZIndex] = useState(10);
  
  // Central user data management
  type UserSource = "local" | "azure" | "google";
  type UserStatus = "active" | "inactive" | "locked";
  
  interface User {
    id: number;
    name: string;
    email: string;
    source: UserSource;
    role: string;
    status: UserStatus;
    lastLogin: string;
    syncedAt?: string;
    groups?: string[];
    isDuplicate?: boolean;
    departments?: string[];
  }
  
  const [allUsers, setAllUsers] = useState<User[]>([
    { 
      id: 1, 
      name: "Rolf Müller", 
      email: "rolf.mueller@rmbgroup.ch", 
      source: "azure",
      role: "User", 
      status: "active",
      lastLogin: "vor 2 Stunden",
      syncedAt: "29.10.2025, 14:30",
      groups: ["Sales"],
      departments: ["Vertrieb"]
    },
    { 
      id: 2, 
      name: "Marianne Locher", 
      email: "marianne.locher@rmbgroup.ch", 
      source: "azure",
      role: "User", 
      status: "active",
      lastLogin: "vor 3 Stunden",
      syncedAt: "29.10.2025, 14:30",
      groups: ["Sales"],
      departments: ["Vertrieb"]
    },
    { 
      id: 3, 
      name: "Gregor Keist", 
      email: "gregor.keist@rmbgroup.ch", 
      source: "azure",
      role: "User", 
      status: "active",
      lastLogin: "vor 1 Stunde",
      syncedAt: "29.10.2025, 14:30",
      groups: ["Sales"],
      departments: ["Vertrieb"]
    },
    { 
      id: 4, 
      name: "Daniel Hanselmann", 
      email: "daniel.hanselmann@rmbgroup.ch", 
      source: "azure",
      role: "User", 
      status: "active",
      lastLogin: "vor 5 Stunden",
      syncedAt: "29.10.2025, 14:30",
      groups: ["Sales"],
      departments: ["Vertrieb"]
    },
    { 
      id: 5, 
      name: "Roland Steiner", 
      email: "roland.steiner@rmbgroup.ch", 
      source: "azure",
      role: "Admin", 
      status: "active",
      lastLogin: "vor 1 Stunde",
      syncedAt: "29.10.2025, 14:30",
      groups: ["Administrators", "Products"],
      departments: ["Produkte"]
    },
    { 
      id: 6, 
      name: "Benjamin Koch", 
      email: "benjamin.koch@rmbgroup.ch", 
      source: "azure",
      role: "User", 
      status: "active",
      lastLogin: "vor 4 Stunden",
      syncedAt: "29.10.2025, 14:30",
      groups: ["Management"],
      departments: ["Management"]
    },
    { 
      id: 7, 
      name: "Pascal Koch", 
      email: "pascal.koch@rmbgroup.ch", 
      source: "azure",
      role: "Power User", 
      status: "active",
      lastLogin: "vor 2 Stunden",
      syncedAt: "29.10.2025, 14:30",
      groups: ["Management", "Purchasing", "Logistics", "Engineering"],
      departments: ["Management", "Einkauf", "Logistik", "Technik"]
    },
    { 
      id: 8, 
      name: "Andy Haas", 
      email: "andy.haas@rmbgroup.ch", 
      source: "azure",
      role: "User", 
      status: "active",
      lastLogin: "vor 6 Stunden",
      syncedAt: "29.10.2025, 14:30",
      groups: ["Management", "Sales", "Marketing"],
      departments: ["Management", "Vertrieb", "Marketing"]
    },
    { 
      id: 9, 
      name: "Marko Vukic", 
      email: "marko.vukic@rmbgroup.ch", 
      source: "azure",
      role: "User", 
      status: "active",
      lastLogin: "vor 1 Tag",
      syncedAt: "29.10.2025, 14:30",
      groups: ["Logistics"],
      departments: ["Logistik"]
    },
    { 
      id: 10, 
      name: "Micha Graf", 
      email: "micha.graf@rmbgroup.ch", 
      source: "azure",
      role: "User", 
      status: "active",
      lastLogin: "vor 8 Stunden",
      syncedAt: "29.10.2025, 14:30",
      groups: ["Planning"],
      departments: ["Planung"]
    },
    { 
      id: 11, 
      name: "Patrick Berther", 
      email: "patrick.berther@rmbgroup.ch", 
      source: "azure",
      role: "User", 
      status: "active",
      lastLogin: "vor 3 Stunden",
      syncedAt: "29.10.2025, 14:30",
      groups: ["Finance"],
      departments: ["Finanzen"]
    },
    { 
      id: 12, 
      name: "Samuel Mattmüller", 
      email: "samuel.mattmueller@rmbgroup.ch", 
      source: "azure",
      role: "User", 
      status: "active",
      lastLogin: "vor 5 Stunden",
      syncedAt: "29.10.2025, 14:30",
      groups: ["Sales"],
      departments: ["Vertrieb"]
    },
    { 
      id: 13, 
      name: "Martin Keist", 
      email: "martin.keist@rmbgroup.ch", 
      source: "azure",
      role: "Power User", 
      status: "active",
      lastLogin: "vor 2 Stunden",
      syncedAt: "29.10.2025, 14:30",
      groups: ["Sales"],
      departments: ["Vertrieb"]
    },
    { 
      id: 14, 
      name: "Silvio Müller", 
      email: "silvio.mueller@rmbgroup.ch", 
      source: "local",
      role: "User", 
      status: "active",
      lastLogin: "vor 3 Stunden",
      groups: [],
      departments: ["Technik"]
    },
    { 
      id: 15, 
      name: "Stefan Seiler", 
      email: "stefan.seiler@rmbgroup.ch", 
      source: "local",
      role: "User", 
      status: "active",
      lastLogin: "vor 1 Stunde",
      groups: [],
      departments: ["IT"]
    },
    { 
      id: 16, 
      name: "Fritz Baumann", 
      email: "fritz.baumann@rmbgroup.ch", 
      source: "local",
      role: "Power User", 
      status: "active",
      lastLogin: "vor 5 Stunden",
      groups: [],
      departments: ["Produktion"]
    },
    { 
      id: 17, 
      name: "Susanne Meier", 
      email: "susanne.meier@rmbgroup.ch", 
      source: "local",
      role: "User", 
      status: "active",
      lastLogin: "vor 2 Stunden",
      groups: [],
      departments: ["Produktion"]
    },
    { 
      id: 18, 
      name: "Stefanie Gruber", 
      email: "stefanie.gruber@rmbgroup.ch", 
      source: "local",
      role: "User", 
      status: "active",
      lastLogin: "vor 4 Stunden",
      groups: [],
      departments: ["Produktion"]
    },
    { 
      id: 19, 
      name: "Lara Huber", 
      email: "lara.huber@rmbgroup.ch", 
      source: "local",
      role: "Power User", 
      status: "active",
      lastLogin: "vor 1 Stunde",
      groups: [],
      departments: ["Digitalisierung"]
    },
    { 
      id: 20, 
      name: "Monika Frey", 
      email: "monika.frey@rmbgroup.ch", 
      source: "local",
      role: "User", 
      status: "active",
      lastLogin: "vor 6 Stunden",
      groups: [],
      departments: ["Projekte"]
    },
    { 
      id: 21, 
      name: "Ana Kuzic", 
      email: "ana.kuzic@rmbgroup.ch", 
      source: "local",
      role: "User", 
      status: "active",
      lastLogin: "vor 3 Stunden",
      groups: [],
      departments: ["Entwicklung"]
    },
    { 
      id: 22, 
      name: "Svenja Josip", 
      email: "svenja.josip@rmbgroup.ch", 
      source: "local",
      role: "Power User", 
      status: "active",
      lastLogin: "vor 2 Stunden",
      groups: [],
      departments: ["Produktion"]
    },
    { 
      id: 23, 
      name: "Ariton Vukic", 
      email: "ariton.vukic@rmbgroup.ch", 
      source: "local",
      role: "User", 
      status: "active",
      lastLogin: "vor 5 Stunden",
      groups: [],
      departments: ["Entwicklung"]
    },
    { 
      id: 24, 
      name: "Murat Oetzi", 
      email: "murat.oetzi@rmbgroup.ch", 
      source: "local",
      role: "User", 
      status: "active",
      lastLogin: "vor 4 Stunden",
      groups: [],
      departments: ["Marketing"]
    },
    { 
      id: 25, 
      name: "Ali Bonemi", 
      email: "Ali.bonemi@rmbgroup.ch", 
      source: "local",
      role: "Power User", 
      status: "active",
      lastLogin: "vor 1 Stunde",
      groups: [],
      departments: ["Marketing"]
    },
  ]);
  
  // Calculate user stats from allUsers
  const userStats = {
    total: allUsers.length,
    active: allUsers.filter(u => u.status === 'active').length,
    inactive: allUsers.filter(u => u.status === 'inactive').length,
    locked: allUsers.filter(u => u.status === 'locked').length,
  };
  
  // Central LLM model data management
  interface Model {
    id: string;
    name: string;
    provider: string;
    modelId: string;
    apiKey: string;
    endpoint?: string;
    status: 'active' | 'inactive' | 'error';
    lastTested?: string;
    addedDate: string;
    usedBy: string[];
  }
  
  const [allModels, setAllModels] = useState<Model[]>([
    {
      id: "1",
      name: "GPT-4 Turbo",
      provider: "OpenAI",
      modelId: "gpt-4-turbo-preview",
      apiKey: "sk-...xyz123",
      status: "active",
      lastTested: "2025-01-15 14:30",
      addedDate: "2024-12-01",
      usedBy: ["Email-Agent", "Orchestrator"]
    },
    {
      id: "2",
      name: "Claude 3 Opus",
      provider: "Anthropic",
      modelId: "claude-3-opus-20240229",
      apiKey: "sk-ant-...abc456",
      status: "active",
      lastTested: "2025-01-15 14:25",
      addedDate: "2024-12-05",
      usedBy: ["Normen-Agent", "Internet-Agent"]
    },
    {
      id: "3",
      name: "Gemini Pro",
      provider: "Google",
      modelId: "gemini-pro",
      apiKey: "AIza...def789",
      status: "active",
      lastTested: "2025-01-15 12:10",
      addedDate: "2024-12-10",
      usedBy: ["Jelmoli-Agent"]
    },
    {
      id: "4",
      name: "Azure GPT-4",
      provider: "Azure OpenAI",
      modelId: "gpt-4",
      apiKey: "***-...ghi012",
      endpoint: "https://myorg.openai.azure.com/",
      status: "inactive",
      lastTested: "2025-01-10 09:15",
      addedDate: "2024-11-20",
      usedBy: []
    },
  ]);
  
  // Calculate model stats from allModels
  const modelStats = {
    total: allModels.length,
    active: allModels.filter(m => m.status === 'active').length,
    inactive: allModels.filter(m => m.status === 'inactive').length,
    error: allModels.filter(m => m.status === 'error').length,
  };
  
  // Central Module/Agent data management
  interface Module {
    id: string;
    name: string;
    type: 'orchestrator' | 'agent';
    description: string;
    icon: string;
    status: 'active' | 'inactive' | 'error';
    enabled: boolean;
    apiEndpoint?: string;
    apiKey?: string;
    lastSync?: string;
    version?: string;
    category?: 'public' | 'private';
    llm1?: string;
    llm1Prompt?: string;
    llm2?: string;
    llm2Prompt?: string;
    storageUrl?: string;
    storageToken?: string;
    riskCategory?: 'niedrig' | 'mittel' | 'hoch';
    behaviorInfluence?: boolean;
    intentionalDeception?: boolean;
    intentionalManipulation?: boolean;
    decisionFreedomImpaired?: boolean;
    significantHarm?: boolean;
    annex1Fulfilled?: boolean;
    annex2Fulfilled?: boolean;
    annex3Fulfilled?: boolean;
    isProfiling?: boolean;
    humanInLoop?: boolean;
  }
  
  const [allModules, setAllModules] = useState<Module[]>([
    {
      id: "1",
      name: "Orchestrator",
      type: "orchestrator",
      description: "Zentrale Steuerungseinheit für alle AI-Agents und Workflows",
      icon: "🎯",
      status: "active",
      enabled: true,
      lastSync: "2025-01-15 14:30",
      version: "2.1.0",
      llm1: "1",
      llm1Prompt: "Du bist ein AI-Orchestrator, der verschiedene Agents koordiniert.",
      llm2: "2",
      llm2Prompt: "Analysiere die Anfrage und leite sie an den passenden Agent weiter."
    },
    {
      id: "2",
      name: "Jelmoli Agent",
      type: "agent",
      description: "Spezialisierter Agent für Jelmoli-spezifische Anfragen und Prozesse",
      icon: "🏢",
      status: "active",
      enabled: true,
      apiEndpoint: "https://api.aihub.internal/agents/jelmoli",
      apiKey: "agt-jel-...abc456",
      lastSync: "2025-01-15 14:25",
      version: "1.5.2",
      category: "public",
      storageUrl: "https://storage.aihub.internal/jelmoli",
      storageToken: "stg-jel-...xyz789",
      riskCategory: "niedrig",
      // Risk Assessment: B: X (nein), C: X (nein), D: X (nein), E: ja
      behaviorInfluence: false,
      intentionalDeception: false,
      intentionalManipulation: false,
      decisionFreedomImpaired: false,
      significantHarm: false,
      annex1Fulfilled: false,
      annex2Fulfilled: false,
      annex3Fulfilled: false,
      isProfiling: false,
      humanInLoop: true
    },
    {
      id: "3",
      name: "Email Agent",
      type: "agent",
      description: "Verarbeitet und generiert E-Mails mit AI-Unterstützung",
      icon: "📧",
      status: "active",
      enabled: true,
      apiEndpoint: "https://api.aihub.internal/agents/email",
      apiKey: "agt-eml-...def789",
      lastSync: "2025-01-15 14:20",
      version: "1.3.0",
      category: "private",
      storageUrl: "https://storage.aihub.internal/email",
      storageToken: "stg-eml-...abc123",
      riskCategory: "hoch",
      // Risk Assessment: A: X (nein), B: X (nein), C: X (nein), D: ja, E: ja
      behaviorInfluence: false,
      intentionalDeception: false,
      intentionalManipulation: false,
      decisionFreedomImpaired: false,
      significantHarm: false,
      annex1Fulfilled: false,
      annex2Fulfilled: false,
      annex3Fulfilled: false,
      isProfiling: true,
      humanInLoop: true
    },
    {
      id: "4",
      name: "Internet Agent",
      type: "agent",
      description: "Sucht und analysiert Informationen aus dem Internet",
      icon: "🌐",
      status: "active",
      enabled: true,
      apiEndpoint: "https://api.aihub.internal/agents/internet",
      apiKey: "agt-int-...ghi012",
      lastSync: "2025-01-15 14:15",
      version: "1.4.1",
      category: "public",
      riskCategory: "niedrig",
      // Risk Assessment: B: X (nein), C: X (nein), D: X (nein), E: ja
      behaviorInfluence: false,
      intentionalDeception: false,
      intentionalManipulation: false,
      decisionFreedomImpaired: false,
      significantHarm: false,
      annex1Fulfilled: false,
      annex2Fulfilled: false,
      annex3Fulfilled: false,
      isProfiling: false,
      humanInLoop: true
    },
    {
      id: "5",
      name: "Normen Agent",
      type: "agent",
      description: "Experte für Normen, Standards und Compliance-Anforderungen",
      icon: "📋",
      status: "inactive",
      enabled: false,
      apiEndpoint: "https://api.aihub.internal/agents/normen",
      apiKey: "agt-nrm-...jkl345",
      lastSync: "2025-01-10 09:30",
      version: "1.2.0",
      category: "public",
      storageUrl: "https://storage.aihub.internal/normen",
      storageToken: "stg-nrm-...def456",
      riskCategory: "niedrig",
      // Risk Assessment: B: X (nein), C: X (nein), D: X (nein), E: ja
      behaviorInfluence: false,
      intentionalDeception: false,
      intentionalManipulation: false,
      decisionFreedomImpaired: false,
      significantHarm: false,
      annex1Fulfilled: false,
      annex2Fulfilled: false,
      annex3Fulfilled: false,
      isProfiling: false,
      humanInLoop: true
    }
  ]);
  
  // Calculate agent stats from allModules (only agents, not orchestrator)
  const agents = allModules.filter(m => m.type === 'agent');
  const agentStats = {
    total: agents.length,
    active: agents.filter(a => a.status === 'active').length,
    inactive: agents.filter(a => a.status === 'inactive').length,
    error: agents.filter(a => a.status === 'error').length,
  };
  
  const { language, setLanguage, t } = useLanguage();
  
  // Keyboard Shortcuts State
  const [showShortcutsDialog, setShowShortcutsDialog] = useState(false);

  // Define keyboard shortcuts
  const shortcuts = useKeyboardShortcuts({
    shortcuts: [
      {
        key: '?',
        shiftKey: true,
        action: () => setShowShortcutsDialog(true),
        description: 'Show keyboard shortcuts',
        category: 'General'
      },
      {
        key: 'Escape',
        action: () => {
          if (tenantPanelOpen) setTenantPanelOpen(false);
          if (accountPanelOpen) setAccountPanelOpen(false);
          if (thinkTankOpen) setThinkTankOpen(false);
          if (showShortcutsDialog) setShowShortcutsDialog(false);
        },
        description: 'Close open panels',
        category: 'General'
      },
      {
        key: 't',
        ctrlKey: true,
        action: () => setTenantPanelOpen(!tenantPanelOpen),
        description: 'Toggle Tenant Admin Panel',
        category: 'Navigation'
      },
      {
        key: 'a',
        ctrlKey: true,
        action: () => setAccountPanelOpen(!accountPanelOpen),
        description: 'Toggle Account Panel',
        category: 'Navigation'
      },
      {
        key: 'b',
        ctrlKey: true,
        action: () => setThinkTankOpen(!thinkTankOpen),
        description: 'Toggle Think Tank',
        category: 'Navigation'
      },
      {
        key: 'd',
        ctrlKey: true,
        action: () => setCurrentPage('dashboard'),
        description: 'Go to Dashboard',
        category: 'Navigation'
      },
      {
        key: 'u',
        ctrlKey: true,
        action: () => setCurrentPage('user-management.users'),
        description: 'Go to User Management',
        category: 'Navigation'
      },
      {
        key: 'm',
        ctrlKey: true,
        action: () => setCurrentPage('modules.overview'),
        description: 'Go to Modules',
        category: 'Navigation'
      },
      {
        key: 'l',
        ctrlKey: true,
        action: () => onToggleDarkMode(),
        description: 'Toggle Dark Mode',
        category: 'Appearance'
      },
    ],
    enabled: true
  });

  const handlePanelOpen = (panelName: string) => {
    setPanelZIndex(prev => ({
      ...prev,
      [panelName]: nextZIndex
    }));
    setNextZIndex(prev => prev + 1);
  };

  const tenantName = user.company === 'rmb' ? 'RMB Group' : 'neuco';

  const languages: { code: Language; label: string }[] = [
    { code: 'en', label: 'English' },
    { code: 'de', label: 'Deutsch' },
    { code: 'fr', label: 'Français' },
    { code: 'pt-br', label: 'Português (Brasil)' }
  ];

  const handleNavigate = (section: string) => {
    setCurrentPage(section);
  };

  const renderContent = () => {
    if (currentPage === "dashboard") {
      return <TenantDashboard tenantName={tenantName} isDarkMode={isDarkMode} onSectionChange={handleNavigate} userStats={userStats} modelStats={modelStats} agentStats={agentStats} />;
    } else if (currentPage.startsWith("tenant-settings.")) {
      const section = currentPage.replace("tenant-settings.", "");
      return <TenantSettings section={section} isDarkMode={isDarkMode} onNavigate={handleNavigate} />;
    } else if (currentPage.startsWith("user-management.")) {
      const section = currentPage.split(".")[1];
      return <UserManagement section={section} isDarkMode={isDarkMode} onPanelOpen={handlePanelOpen} panelZIndex={panelZIndex} allUsers={allUsers} onUsersChange={setAllUsers} />;
    } else if (currentPage === "modules.models") {
      return <ModelManagement section="models" isDarkMode={isDarkMode} allModels={allModels} onModelsChange={setAllModels} />;
    } else if (currentPage === "modules.overview") {
      return <ModuleOverview section="overview" isDarkMode={isDarkMode} allModules={allModules} onModulesChange={setAllModules} />;
    } else if (currentPage.startsWith("support.")) {
      const section = currentPage.split(".")[1];
      return <SupportDocumentation section={section} isDarkMode={isDarkMode} />;
    } else if (currentPage.startsWith("modules.")) {
      return <ModulesPlaceholder />;
    } else if (currentPage.startsWith("data.")) {
      return <DataPlaceholder />;
    } else if (currentPage.startsWith("prompts.")) {
      const section = currentPage.split(".")[1];
      return <PromptsFrameworks section={section} isDarkMode={isDarkMode} />;
    } else if (currentPage === "analytics") {
      return <AnalyticsDashboard isDarkMode={isDarkMode} />;
    } else if (currentPage.startsWith("monitoring.")) {
      const section = currentPage.split(".")[1];
      return <MonitoringPlaceholder section={section} />;
    }
    return <TenantDashboard tenantName={tenantName} isDarkMode={isDarkMode} userStats={userStats} modelStats={modelStats} />;
  };

  return (
    <div className="h-screen flex flex-col" style={{ backgroundColor: isDarkMode ? '#1a1a1a' : '#f8f9fa' }}>
      {/* Tenant Admin Panel */}
      <TenantAdminPanel 
        isOpen={tenantPanelOpen} 
        onClose={() => setTenantPanelOpen(false)}
        currentPage={currentPage}
        onNavigate={(page) => {
          setCurrentPage(page);
          setMobileSidebarOpen(false);
        }}
        isDarkMode={isDarkMode}
      />

      {/* Think Tank Panel */}
      <ThinkTank isOpen={thinkTankOpen} onClose={() => setThinkTankOpen(false)} />

      {/* Header */}
      <header 
        className="h-16 flex items-center justify-between px-6 relative"
        style={{ 
          backgroundColor: 'var(--color-header-background)',
          borderBottom: '1px solid var(--color-header-border)',
          boxShadow: 'var(--shadow-header)'
        }}
      >
        {/* Left Side - Title & Navigation */}
        <div className="flex items-center gap-8">
          {/* zuraio Logo */}
          <div className="flex items-center gap-3">
            <img 
              src={zuraioNewLogo}
              alt="zuraio - own your data"
              className="h-8 w-auto object-contain"
              style={{
                maxHeight: '32px'
              }}
            />
          </div>
        </div>

        {/* Center Icons */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 p-0 rounded-md transition-colors"
            style={{
              backgroundColor: tenantPanelOpen ? '#E9C796' : 'transparent',
            }}
            onClick={() => setTenantPanelOpen(!tenantPanelOpen)}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#E9C796';
            }}
            onMouseLeave={(e) => {
              if (!tenantPanelOpen) {
                e.currentTarget.style.backgroundColor = 'transparent';
              } else {
                e.currentTarget.style.backgroundColor = '#E9C796';
              }
            }}
          >
            <Building2 className="h-4 w-4" style={{ color: 'var(--color-gray-dark)' }} />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 p-0 rounded-md transition-colors"
            style={{
              backgroundColor: accountPanelOpen ? '#E9C796' : 'transparent',
            }}
            onClick={() => {
              setAccountPanelOpen(!accountPanelOpen);
              if (!accountPanelOpen) {
                handlePanelOpen('account');
              }
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#E9C796';
            }}
            onMouseLeave={(e) => {
              if (!accountPanelOpen) {
                e.currentTarget.style.backgroundColor = 'transparent';
              } else {
                e.currentTarget.style.backgroundColor = '#E9C796';
              }
            }}
          >
            <UserCircle className="h-4 w-4" style={{ color: 'var(--color-gray-dark)' }} />
          </Button>
        </div>

        {/* Right Side - Tenant Logo */}
        <div className="flex items-center gap-4">
          <div className="h-10 flex items-center">
            <img 
              src={user.company === 'rmb' ? rmbLogo : neucoLogo} 
              alt={`${tenantName} Logo`}
              className="w-auto object-contain"
              style={{ 
                height: user.company === 'neuco' ? '16px' : '32px',
                filter: 'drop-shadow(0 2px 8px rgba(0, 120, 212, 0.1))',
                opacity: user.company === 'neuco' ? 0.65 : 1
              }}
            />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar - Mobile */}
        {mobileSidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-50">
            <div 
              className="absolute inset-0 bg-black/50" 
              onClick={() => setMobileSidebarOpen(false)}
            />
            <div 
              className="absolute left-0 top-0 bottom-0 w-[280px] shadow-xl"
              style={{ backgroundColor: isDarkMode ? '#2a2a2a' : 'white' }}
            >
              <TenantSidebar 
                currentPage={currentPage}
                onNavigate={(page) => {
                  setCurrentPage(page);
                  setMobileSidebarOpen(false);
                }}
                isDarkMode={isDarkMode}
              />
            </div>
          </div>
        )}

        {/* Main Content */}
        <main 
          className="flex-1 overflow-hidden flex flex-col transition-all duration-300 relative"
          style={{
            marginLeft: tenantPanelOpen ? '400px' : '0',
          }}
        >
          {renderContent()}
          
          {/* Account Panel */}
          <AccountPanel 
            isOpen={accountPanelOpen} 
            onClose={() => setAccountPanelOpen(false)}
            isDarkMode={isDarkMode}
            onToggleDarkMode={onToggleDarkMode}
            onLogout={onLogout}
            zIndex={panelZIndex['account'] || 10}
          />
        </main>
      </div>
      
      {/* Keyboard Shortcuts Dialog */}
      <KeyboardShortcutsDialog
        open={showShortcutsDialog}
        onOpenChange={setShowShortcutsDialog}
        shortcuts={shortcuts}
        isDarkMode={isDarkMode}
      />
    </div>
  );
}

// Placeholder components for sections not yet implemented
function ModulesPlaceholder() {
  return (
    <div className="flex-1 overflow-auto p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl mb-4" style={{ color: 'var(--color-gray-dark)' }}>Module & Features</h1>
        <p style={{ color: 'var(--foreground-muted)' }}>
          Dieser Bereich befindet sich in Entwicklung.
        </p>
      </div>
    </div>
  );
}

function DataPlaceholder() {
  return <DataManagement />;
}

function MonitoringPlaceholder({ section }: { section?: string }) {
  if (section === "activity") {
    return <ActivityLog />;
  } else if (section === "system") {
    return <SystemMonitoring />;
  } else if (section === "alerts") {
    return <AlertsManagement />;
  }
  
  return (
    <div className="flex-1 overflow-auto p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl mb-4" style={{ color: 'var(--color-gray-dark)' }}>Logging & Monitoring</h1>
        <p style={{ color: 'var(--foreground-muted)' }}>
          Bitte wählen Sie einen Menüpunkt aus der Sidebar.
        </p>
      </div>
    </div>
  );
}