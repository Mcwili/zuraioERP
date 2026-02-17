import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Switch } from "./ui/switch";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { 
  Bot, 
  FileText, 
  Search, 
  Calendar, 
  Mail, 
  Database, 
  Settings, 
  Shield,
  TrendingUp,
  MessageSquare
} from "lucide-react";
import { useLanguage } from "../utils/LanguageContext";

interface Module {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  enabled: boolean;
  access: 'admin' | 'user' | 'premium';
  status: 'active' | 'inactive' | 'error';
  usage: number; // percentage
}

interface ModuleManagerProps {
  userRole: 'admin' | 'user';
}

export function ModuleManager({ userRole }: ModuleManagerProps) {
  const { t } = useLanguage();
  
  const getModuleInfo = (moduleId: string) => {
    const moduleKey = moduleId.replace(/-/g, '') as 'chatAgent' | 'documentAnalyzer' | 'webSearch' | 'calendarAssistant' | 'emailProcessor' | 'dataAnalyst' | 'securityMonitor' | 'databaseConnector';
    return {
      name: t.moduleManager.modules[moduleKey]?.name || '',
      description: t.moduleManager.modules[moduleKey]?.description || ''
    };
  };

  const [modules, setModules] = useState<Module[]>([
    {
      id: "chat-agent",
      name: "Chat Agent",
      description: "Allgemeiner Konversations-Agent für Benutzeranfragen",
      icon: <MessageSquare className="h-5 w-5" />,
      enabled: true,
      access: "user",
      status: "active",
      usage: 85
    },
    {
      id: "document-analyzer",
      name: "Dokumenten-Analyzer",
      description: "Analysiert und extrahiert Informationen aus Dokumenten",
      icon: <FileText className="h-5 w-5" />,
      enabled: true,
      access: "user",
      status: "active",
      usage: 42
    },
    {
      id: "web-search",
      name: "Web-Suche Agent",
      description: "Durchsucht das Internet nach aktuellen Informationen",
      icon: <Search className="h-5 w-5" />,
      enabled: false,
      access: "premium",
      status: "inactive",
      usage: 0
    },
    {
      id: "calendar-assistant",
      name: "Kalender-Assistent",
      description: "Verwaltet Termine und Zeitplanungen",
      icon: <Calendar className="h-5 w-5" />,
      enabled: true,
      access: "user",
      status: "active",
      usage: 23
    },
    {
      id: "email-processor",
      name: "E-Mail Prozessor",
      description: "Verarbeitet und kategorisiert E-Mails automatisch",
      icon: <Mail className="h-5 w-5" />,
      enabled: false,
      access: "premium",
      status: "inactive",
      usage: 0
    },
    {
      id: "data-analyst",
      name: "Daten-Analyst",
      description: "Analysiert Datensets und erstellt Berichte",
      icon: <TrendingUp className="h-5 w-5" />,
      enabled: true,
      access: "admin",
      status: "active",
      usage: 67
    },
    {
      id: "security-monitor",
      name: "Sicherheits-Monitor",
      description: "Überwacht System-Sicherheit und potenzielle Bedrohungen",
      icon: <Shield className="h-5 w-5" />,
      enabled: true,
      access: "admin",
      status: "active",
      usage: 12
    },
    {
      id: "database-connector",
      name: "Datenbank-Connector",
      description: "Verbindet und interagiert mit externen Datenbanken",
      icon: <Database className="h-5 w-5" />,
      enabled: false,
      access: "admin",
      status: "error",
      usage: 0
    }
  ]);

  const toggleModule = (moduleId: string) => {
    setModules(prev => prev.map(module => 
      module.id === moduleId 
        ? { 
            ...module, 
            enabled: !module.enabled,
            status: !module.enabled ? 'active' : 'inactive'
          }
        : module
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'inactive': return 'secondary';
      case 'error': return 'destructive';
      default: return 'secondary';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return t.moduleManager.status.active;
      case 'inactive': return t.moduleManager.status.inactive;
      case 'error': return t.moduleManager.status.error;
      default: return t.moduleManager.status.unknown;
    }
  };

  const hasAccess = (module: Module) => {
    if (module.access === 'user') return true;
    if (module.access === 'premium') return userRole === 'admin'; // Admin has premium access
    if (module.access === 'admin') return userRole === 'admin';
    return false;
  };

  const accessibleModules = modules.filter(hasAccess);
  const activeModules = accessibleModules.filter(m => m.enabled).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            {t.moduleManager.title}
          </h2>
          <p className="text-muted-foreground">
            {t.moduleManager.subtitle}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-sm font-medium">
              {activeModules} {t.moduleManager.activeOf} {accessibleModules.length} {t.moduleManager.status.active.toLowerCase()}
            </div>
            <div className="text-xs text-muted-foreground">
              {t.moduleManager.userRole} {userRole === 'admin' ? t.moduleManager.administrator : t.moduleManager.user}
            </div>
          </div>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            {t.moduleManager.configure}
          </Button>
        </div>
      </div>

      {/* Module Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {accessibleModules.map((module) => {
          const moduleInfo = getModuleInfo(module.id);
          return (
          <Card key={module.id} className="relative">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {module.icon}
                  <CardTitle className="text-base">{moduleInfo.name}</CardTitle>
                </div>
                <Switch
                  checked={module.enabled}
                  onCheckedChange={() => toggleModule(module.id)}
                  disabled={module.status === 'error'}
                />
              </div>
              <CardDescription className="text-sm">
                {moduleInfo.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <Badge variant={getStatusColor(module.status)}>
                  {getStatusText(module.status)}
                </Badge>
                <Badge variant="outline">
                  {module.access === 'admin' ? t.moduleManager.access.admin : 
                   module.access === 'premium' ? t.moduleManager.access.premium : t.moduleManager.access.standard}
                </Badge>
              </div>
              
              {module.enabled && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{t.moduleManager.usage}</span>
                    <span>{module.usage}%</span>
                  </div>
                  <Progress value={module.usage} className="h-2" />
                </div>
              )}
            </CardContent>

            {!hasAccess(module) && (
              <div className="absolute inset-0 bg-background/80 backdrop-blur-sm rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Shield className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm font-medium">{t.moduleManager.accessDenied}</p>
                  <p className="text-xs text-muted-foreground">
                    {module.access === 'admin' ? t.moduleManager.adminRequired : t.moduleManager.premiumRequired}
                  </p>
                </div>
              </div>
            )}
          </Card>
          );
        })}
      </div>

      {/* Module nicht verfügbar */}
      {modules.filter(m => !hasAccess(m)).length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">{t.moduleManager.unavailableModules}</CardTitle>
            <CardDescription>
              {t.moduleManager.unavailableSubtitle}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {modules.filter(m => !hasAccess(m)).map((module) => {
                const moduleInfo = getModuleInfo(module.id);
                return (
                <div key={module.id} className="flex items-center gap-2 p-2 bg-muted rounded-md">
                  {module.icon}
                  <span className="text-sm">{moduleInfo.name}</span>
                  <Badge variant="outline" className="ml-auto">
                    {module.access === 'admin' ? t.moduleManager.access.admin : t.moduleManager.access.premium}
                  </Badge>
                </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}