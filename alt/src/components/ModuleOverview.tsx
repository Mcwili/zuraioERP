import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { Alert, AlertDescription } from "./ui/alert";
import { Textarea } from "./ui/textarea";
import { Switch } from "./ui/switch";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { 
  Plus, 
  Settings,
  CheckCircle2,
  XCircle,
  Loader2,
  Brain,
  Key,
  AlertTriangle,
  Zap,
  Mail,
  Globe,
  ShoppingBag,
  Network,
  Edit,
  Trash2,
  Activity,
  ChevronDown,
  ChevronRight,
  Save,
  X
} from "lucide-react";
import diagramImage from "figma:asset/5ff1abf4378f1ac86d442b047915f1be3f3ec7f4.png";
import { useLanguage } from "../contexts/LanguageContext";

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
  riskCategory?: 'niedrig' | 'hoch';
  llm1?: string;
  llm1Prompt?: string;
  llm2?: string;
  llm2Prompt?: string;
  storageUrl?: string;
  storageToken?: string;
  // Risk Assessment Fields
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

// Risk Assessment Calculation Function
const calculateRiskCategory = (module: Module): 'niedrig' | 'hoch' => {
  const A = module.behaviorInfluence || module.intentionalDeception || 
            module.intentionalManipulation || module.decisionFreedomImpaired;
  const B = module.significantHarm;
  const C1 = module.annex1Fulfilled;
  const C2 = module.annex2Fulfilled;
  const C3 = module.annex3Fulfilled;
  const P = module.isProfiling;
  const H = module.humanInLoop;

  // PROFILING - Always high risk, regardless of Human in the loop
  if (P) {
    return 'hoch';
  }

  // POTENZIELLER SCHADEN (B alone is high-risk)
  if (B) {
    return H ? 'niedrig' : 'hoch';
  }

  // PRODUKTSICHERHEIT
  if (C1 || C3 || (C1 && C2)) {
    return H ? 'niedrig' : 'hoch';
  }

  // VERHALTEN + SCHADEN
  if (A && B) {
    return H ? 'niedrig' : 'hoch';
  }

  // DEFAULT
  return 'niedrig';
};

interface ModuleOverviewProps {
  section?: string;
  isDarkMode?: boolean;
  allModules?: Module[];
  onModulesChange?: (modules: Module[]) => void;
}

interface LLMModel {
  id: string;
  name: string;
  provider: string;
}

// Available LLM Models from Model Management
const availableLLMs: LLMModel[] = [
  { id: "1", name: "GPT-4 Turbo", provider: "OpenAI" },
  { id: "2", name: "Claude 3 Opus", provider: "Anthropic" },
  { id: "3", name: "Gemini Pro", provider: "Google" },
  { id: "4", name: "Azure GPT-4", provider: "Azure OpenAI" },
];

const mockModules: Module[] = [
  {
    id: "1",
    name: "Orchestrator", // Will be translated via t.tenantAdmin.moduleOverviewFull.orchestratorTitle
    type: "orchestrator",
    description: "Zentrale Steuerungseinheit für alle AI-Agents und Workflows", // Will be translated via t.tenantAdmin.moduleOverviewFull.orchestratorDescription
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
    riskCategory: "niedrig",
    storageUrl: "https://storage.aihub.internal/jelmoli",
    storageToken: "stg-jel-...xyz789",
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
    name: "Email Agent", // Will be translated via t.tenantAdmin.moduleOverviewFull.agents.emailAgent
    type: "agent",
    description: "Verarbeitet und generiert E-Mails mit AI-Unterstützung", // Will be translated via t.tenantAdmin.moduleOverviewFull.agentDescriptions.emailAgent
    icon: "📧",
    status: "active",
    enabled: true,
    apiEndpoint: "https://api.aihub.internal/agents/email",
    apiKey: "agt-eml-...def789",
    lastSync: "2025-01-15 14:20",
    version: "1.3.0",
    category: "private",
    riskCategory: "hoch", // HIGH due to profiling
    storageUrl: "https://storage.aihub.internal/email",
    storageToken: "stg-eml-...abc123",
    // Risk Assessment: A: X (nein), B: X (nein), C: X (nein), D: ja, E: ja
    behaviorInfluence: false,
    intentionalDeception: false,
    intentionalManipulation: false,
    decisionFreedomImpaired: false,
    significantHarm: false,
    annex1Fulfilled: false,
    annex2Fulfilled: false,
    annex3Fulfilled: false,
    isProfiling: true, // Profiling always leads to HIGH risk
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
    riskCategory: "niedrig",
    storageUrl: "https://storage.aihub.internal/normen",
    storageToken: "stg-nrm-...def456",
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
];

export function ModuleOverview({ section = "overview", isDarkMode = false, allModules, onModulesChange }: ModuleOverviewProps) {
  const { t } = useLanguage();
  const [localModules, setLocalModules] = useState<Module[]>(mockModules);
  const modules = allModules || localModules;
  
  // Get translated name for module
  const getModuleName = (module: Module) => {
    if (module.type === 'orchestrator') {
      return t.tenantAdmin.moduleOverviewFull.orchestratorTitle;
    }
    // Agent names
    if (module.name === 'Email Agent') return t.tenantAdmin.moduleOverviewFull.agents.emailAgent;
    if (module.name === 'Internet Agent') return t.tenantAdmin.moduleOverviewFull.agents.internetAgent;
    if (module.name === 'Jelmoli Agent') return t.tenantAdmin.moduleOverviewFull.agents.jelmoliAgent;
    if (module.name === 'Normen Agent') return t.tenantAdmin.moduleOverviewFull.agents.normenAgent;
    return module.name;
  };
  
  // Get translated description for module
  const getModuleDescription = (module: Module) => {
    if (module.type === 'orchestrator') {
      return t.tenantAdmin.moduleOverviewFull.orchestratorDescription;
    }
    // Agent descriptions
    if (module.name === 'Email Agent') return t.tenantAdmin.moduleOverviewFull.agentDescriptions.emailAgent;
    if (module.name === 'Internet Agent') return t.tenantAdmin.moduleOverviewFull.agentDescriptions.internetAgent;
    if (module.name === 'Jelmoli Agent') return t.tenantAdmin.moduleOverviewFull.agentDescriptions.jelmoliAgent;
    if (module.name === 'Normen Agent') return t.tenantAdmin.moduleOverviewFull.agentDescriptions.normenAgent;
    return module.description;
  };
  const setModules = (newModules: Module[] | ((prev: Module[]) => Module[])) => {
    if (onModulesChange) {
      if (typeof newModules === 'function') {
        const updatedModules = newModules(modules);
        onModulesChange(updatedModules);
      } else {
        onModulesChange(newModules);
      }
    } else {
      setLocalModules(newModules);
    }
  };
  const [showAddSheet, setShowAddSheet] = useState(false);
  const [expandedModules, setExpandedModules] = useState<string[]>([]);
  const [testingConnection, setTestingConnection] = useState<string | null>(null);
  
  // Form state for new agent
  const [moduleName, setModuleName] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("🤖");
  const [apiEndpoint, setApiEndpoint] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [category, setCategory] = useState<'public' | 'private'>("public");
  const [riskCategory, setRiskCategory] = useState<'niedrig' | 'hoch'>("niedrig");
  const [version, setVersion] = useState("1.0.0");

  // Edit state for inline editing
  const [editingModules, setEditingModules] = useState<{[key: string]: Module}>({});
  
  // Delete confirmation state
  const [deleteAgentId, setDeleteAgentId] = useState<string | null>(null);
  
  // Status filter state
  const [statusFilter, setStatusFilter] = useState<string[]>([]);

  const handleToggleExpand = (moduleId: string) => {
    setExpandedModules(prev => 
      prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const handleToggleModule = (id: string) => {
    setModules(modules.map(m => 
      m.id === id 
        ? { 
            ...m, 
            enabled: !m.enabled,
            status: !m.enabled ? 'active' : 'inactive'
          }
        : m
    ));
  };

  const handleTestConnection = async (moduleId: string) => {
    setTestingConnection(moduleId);
    
    // Simulate API test
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setModules(modules.map(m => 
      m.id === moduleId 
        ? { 
            ...m, 
            status: Math.random() > 0.2 ? 'active' : 'error',
            lastSync: new Date().toLocaleString('de-DE', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit'
            })
          }
        : m
    ));
    
    setTestingConnection(null);
  };

  const handleStartEdit = (module: Module) => {
    setEditingModules(prev => ({
      ...prev,
      [module.id]: { ...module }
    }));
  };

  const handleSaveEdit = (moduleId: string) => {
    const editedModule = editingModules[moduleId];
    if (editedModule) {
      setModules(modules.map(m => m.id === moduleId ? editedModule : m));
      setEditingModules(prev => {
        const newState = { ...prev };
        delete newState[moduleId];
        return newState;
      });
    }
  };

  const handleCancelEdit = (moduleId: string) => {
    setEditingModules(prev => {
      const newState = { ...prev };
      delete newState[moduleId];
      return newState;
    });
  };

  const handleFieldChange = (moduleId: string, field: keyof Module, value: any) => {
    setEditingModules(prev => ({
      ...prev,
      [moduleId]: {
        ...prev[moduleId],
        [field]: value
      }
    }));
  };

  const handleAddAgent = () => {
    const newAgent: Module = {
      id: String(modules.length + 1),
      name: moduleName,
      type: "agent",
      description: description,
      icon: icon,
      status: "inactive",
      enabled: false,
      apiEndpoint: apiEndpoint,
      apiKey: apiKey,
      category: category,
      riskCategory: riskCategory,
      version: version
    };
    setModules([...modules, newAgent]);
    setShowAddSheet(false);
    
    // Reset form
    setModuleName("");
    setDescription("");
    setIcon("🤖");
    setApiEndpoint("");
    setApiKey("");
    setCategory("public");
    setRiskCategory("niedrig");
    setVersion("1.0.0");
  };

  const handleDeleteAgent = (id: string) => {
    setModules(modules.filter(m => m.id !== id));
    setDeleteAgentId(null);
  };
  
  const confirmDeleteAgent = () => {
    if (deleteAgentId) {
      handleDeleteAgent(deleteAgentId);
    }
  };

  const toggleStatusFilter = (status: string) => {
    setStatusFilter(prev => 
      prev.includes(status) 
        ? prev.filter(s => s !== status)
        : [...prev, status]
    );
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <Badge className="text-black" style={{ border: '1px solid #e1dfdd', backgroundColor: 'transparent' }}>
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Aktiv
          </Badge>
        );
      case 'inactive':
        return (
          <Badge variant="outline" className="text-gray-600">
            <Activity className="h-3 w-3 mr-1" />
            Inaktiv
          </Badge>
        );
      case 'error':
        return (
          <Badge className="bg-red-100 text-red-700 border-red-200">
            <XCircle className="h-3 w-3 mr-1" />
            Fehler
          </Badge>
        );
      default:
        return null;
    }
  };

  // Filter modules based on status filter
  const filteredModules = statusFilter.length === 0 
    ? modules 
    : modules.filter(m => statusFilter.includes(m.status));

  const orchestrator = modules.find(m => m.type === 'orchestrator');
  const agents = filteredModules.filter(m => m.type === 'agent').sort((a, b) => a.name.localeCompare(b.name));
  const activeModules = modules.filter(m => m.enabled).length;
  const errorModules = modules.filter(m => m.status === 'error').length;

  return (
    <div className="flex-1 flex flex-row overflow-hidden relative">
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
      {/* Modules Header */}
      <div 
        className="h-14 flex items-center justify-between px-4"
        style={{ 
          borderBottom: isDarkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.06)',
          backgroundColor: '#DE851D'
        }}
      >
        <div className="flex items-center gap-3">
          <Network className="h-5 w-5 flex-shrink-0" style={{ color: '#000000' }} />
          <h2 className="font-medium" style={{ color: '#000000' }}>
            {t.tenantAdmin.moduleOverviewFull.title}
          </h2>
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 hover:bg-transparent hover:border hover:border-black"
          onClick={() => setShowAddSheet(true)}
          style={{ 
            color: '#000000',
            backgroundColor: 'transparent',
            border: '1px solid transparent'
          }}
        >
          <Plus className="h-5 w-5" />
        </Button>
      </div>

      {/* Scrollable Content */}
      <div 
        className="flex-1 overflow-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: '#d1d5db transparent'
        }}
      >
        <div className="px-8 pt-8 pb-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Stats & Action Button */}
            <div className="flex items-start justify-between gap-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 flex-1">
                <Card className="shadow-sm" style={{ border: '1px solid #e1dfdd', backgroundColor: '#FFFFFF' }}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm" style={{ color: '#000000' }}>{t.tenantAdmin.moduleOverviewFull.statsModulesTotal}</p>
                        <p className="text-2xl mt-1" style={{ color: '#000000' }}>
                          {modules.length}
                        </p>
                      </div>
                      <Brain className="h-8 w-8" style={{ color: '#000000' }} />
                    </div>
                  </CardContent>
                </Card>

                <Card 
                  className="shadow-sm cursor-pointer transition-all" 
                  style={{ 
                    border: '1px solid #e1dfdd',
                    backgroundColor: statusFilter.includes('active') ? '#E9C796' : '#FFFFFF'
                  }}
                  onClick={() => toggleStatusFilter('active')}
                  onMouseEnter={(e) => {
                    if (!statusFilter.includes('active')) {
                      e.currentTarget.style.backgroundColor = '#E9C796';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!statusFilter.includes('active')) {
                      e.currentTarget.style.backgroundColor = '#FFFFFF';
                    }
                  }}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm" style={{ color: '#000000' }}>{t.tenantAdmin.moduleOverviewFull.statsActive}</p>
                        <p className="text-2xl mt-1" style={{ color: '#000000' }}>
                          {activeModules}
                        </p>
                      </div>
                      <CheckCircle2 className="h-8 w-8" style={{ color: '#000000' }} />
                    </div>
                  </CardContent>
                </Card>

                <Card 
                  className="shadow-sm cursor-pointer transition-all" 
                  style={{ 
                    border: '1px solid #e1dfdd',
                    backgroundColor: statusFilter.includes('inactive') ? '#E9C796' : '#FFFFFF'
                  }}
                  onClick={() => toggleStatusFilter('inactive')}
                  onMouseEnter={(e) => {
                    if (!statusFilter.includes('inactive')) {
                      e.currentTarget.style.backgroundColor = '#E9C796';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!statusFilter.includes('inactive')) {
                      e.currentTarget.style.backgroundColor = '#FFFFFF';
                    }
                  }}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm" style={{ color: '#000000' }}>{t.tenantAdmin.moduleOverviewFull.statsInactive}</p>
                        <p className="text-2xl mt-1" style={{ color: '#000000' }}>
                          {modules.filter(m => m.status === 'inactive').length}
                        </p>
                      </div>
                      <XCircle className="h-8 w-8" style={{ color: '#000000' }} />
                    </div>
                  </CardContent>
                </Card>

                <Card 
                  className="shadow-sm cursor-pointer transition-all" 
                  style={{ 
                    border: '1px solid #e1dfdd',
                    backgroundColor: statusFilter.includes('error') ? '#E9C796' : '#FFFFFF'
                  }}
                  onClick={() => toggleStatusFilter('error')}
                  onMouseEnter={(e) => {
                    if (!statusFilter.includes('error')) {
                      e.currentTarget.style.backgroundColor = '#E9C796';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!statusFilter.includes('error')) {
                      e.currentTarget.style.backgroundColor = '#FFFFFF';
                    }
                  }}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm" style={{ color: '#000000' }}>{t.tenantAdmin.moduleOverviewFull.statsError}</p>
                        <p className="text-2xl mt-1" style={{ color: '#000000' }}>
                          {errorModules}
                        </p>
                      </div>
                      <AlertTriangle className="h-8 w-8" style={{ color: '#000000' }} />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Orchestrator */}
            {orchestrator && (
              <Collapsible
                open={expandedModules.includes(orchestrator.id)}
                onOpenChange={() => handleToggleExpand(orchestrator.id)}
              >
                <Card className="shadow-sm" style={{ border: '2px solid #e1dfdd' }}>
                  <CardHeader className="!grid-rows-1 !auto-rows-auto flex items-center min-h-[100px] py-0">
                    <div className="flex items-center justify-between w-full my-auto">
                      <div className="flex items-center gap-4 flex-1">
                        <CollapsibleTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            {expandedModules.includes(orchestrator.id) ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ChevronRight className="h-4 w-4" />
                            )}
                          </Button>
                        </CollapsibleTrigger>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <CardTitle className="text-lg">{orchestrator.name}</CardTitle>
                            {getStatusBadge(orchestrator.status)}
                            <Badge 
                              variant="outline"
                              className="text-black"
                              style={{ border: '1px solid #e1dfdd', backgroundColor: 'transparent' }}
                            >
                              Core System
                            </Badge>
                          </div>
                          <CardDescription className="text-sm">
                            {orchestrator.description}
                          </CardDescription>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Label className="text-sm">Kill-Switch</Label>
                        <Switch 
                          checked={orchestrator.enabled}
                          onCheckedChange={() => handleToggleModule(orchestrator.id)}
                        />
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CollapsibleContent>
                    <CardContent className="pt-0">
                      <Separator className="mb-6" />
                      <div className="grid grid-cols-2 gap-6">
                        <div className="p-5 rounded-lg" style={{ backgroundColor: 'var(--color-gray-light)' }}>
                          <h4 className="font-medium mb-4" style={{ color: 'var(--color-gray-dark)' }}>
                            {t.tenantAdmin.moduleOverviewFull.orchestratorTitle} {t.tenantAdmin.moduleOverviewFull.agentConfiguration}
                          </h4>
                          
                          {!editingModules[orchestrator.id] ? (
                            <div className="space-y-4">
                              {/* Basic Info */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div>
                                  <Label className="text-xs" style={{ color: 'var(--foreground-muted)' }}>{t.tenantAdmin.moduleOverviewFull.version}</Label>
                                  <p className="text-sm mt-1">{orchestrator.version}</p>
                                </div>
                                <div>
                                  <Label className="text-xs" style={{ color: 'var(--foreground-muted)' }}>Status</Label>
                                  <div className="mt-1">{getStatusBadge(orchestrator.status)}</div>
                                </div>
                                <div>
                                  <Label className="text-xs" style={{ color: 'var(--foreground-muted)' }}>Beschreibung</Label>
                                  <p className="text-sm mt-1 line-clamp-2">{orchestrator.description}</p>
                                </div>
                              </div>

                              <Separator />
                              
                              {/* LLM Configuration */}
                              <div>
                                <h5 className="text-sm font-medium mb-3" style={{ color: 'var(--color-gray-dark)' }}>
                                  {t.tenantAdmin.moduleOverviewFull.llmConfiguration}
                                </h5>
                                
                                <div className="space-y-3">
                                  {/* LLM 1 */}
                                  <div className="p-3 rounded border" style={{ backgroundColor: 'white', borderColor: 'var(--color-gray-medium)' }}>
                                    <div className="flex items-center justify-between mb-2">
                                      <Label className="text-xs font-medium" style={{ color: 'var(--color-gray-dark)' }}>{t.tenantAdmin.moduleOverviewFull.llm1}</Label>
                                      <Badge variant="outline" className="text-xs">
                                        {availableLLMs.find(m => m.id === orchestrator.llm1)?.provider || "N/A"}
                                      </Badge>
                                    </div>
                                    <p className="text-sm mb-2">
                                      {availableLLMs.find(m => m.id === orchestrator.llm1)?.name || t.tenantAdmin.moduleOverviewFull.notConfigured}
                                    </p>
                                    <div className="mt-2 pt-2 border-t" style={{ borderColor: 'var(--color-gray-medium)' }}>
                                      <Label className="text-xs" style={{ color: 'var(--foreground-muted)' }}>{t.tenantAdmin.moduleOverviewFull.prompt}</Label>
                                      <p className="text-xs mt-1 line-clamp-2" style={{ color: 'var(--color-gray-dark)' }}>
                                        {orchestrator.llm1Prompt || t.tenantAdmin.moduleOverviewFull.notConfigured}
                                      </p>
                                    </div>
                                  </div>
                                  
                                  {/* LLM 2 */}
                                  <div className="p-3 rounded border" style={{ backgroundColor: 'white', borderColor: 'var(--color-gray-medium)' }}>
                                    <div className="flex items-center justify-between mb-2">
                                      <Label className="text-xs font-medium" style={{ color: 'var(--color-gray-dark)' }}>{t.tenantAdmin.moduleOverviewFull.llm2}</Label>
                                      <Badge variant="outline" className="text-xs">
                                        {availableLLMs.find(m => m.id === orchestrator.llm2)?.provider || "N/A"}
                                      </Badge>
                                    </div>
                                    <p className="text-sm mb-2">
                                      {availableLLMs.find(m => m.id === orchestrator.llm2)?.name || t.tenantAdmin.moduleOverviewFull.notConfigured}
                                    </p>
                                    <div className="mt-2 pt-2 border-t" style={{ borderColor: 'var(--color-gray-medium)' }}>
                                      <Label className="text-xs" style={{ color: 'var(--foreground-muted)' }}>{t.tenantAdmin.moduleOverviewFull.prompt}</Label>
                                      <p className="text-xs mt-1 line-clamp-2" style={{ color: 'var(--color-gray-dark)' }}>
                                        {orchestrator.llm2Prompt || t.tenantAdmin.moduleOverviewFull.notConfigured}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleStartEdit(orchestrator)}
                                className="text-black"
                                style={{ border: '1px solid #e1dfdd', backgroundColor: 'transparent' }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.backgroundColor = '#E9C796';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }}
                              >
                                <Edit className="h-3 w-3 mr-2" />
                                {t.tenantAdmin.moduleOverviewFull.edit}
                              </Button>
                            </div>
                          ) : (
                            <div className="space-y-4">
                              {/* Basic Info Edit */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                <div className="space-y-1.5">
                                  <Label htmlFor="orch-version" className="text-xs">{t.tenantAdmin.moduleOverviewFull.version}</Label>
                                  <Input
                                    id="orch-version"
                                    value={editingModules[orchestrator.id].version || ""}
                                    onChange={(e) => handleFieldChange(orchestrator.id, 'version', e.target.value)}
                                    className="h-9"
                                  />
                                </div>
                                <div className="space-y-1.5">
                                  <Label htmlFor="orch-icon" className="text-xs">{t.tenantAdmin.moduleOverviewFull.icon}</Label>
                                  <Input
                                    id="orch-icon"
                                    value={editingModules[orchestrator.id].icon}
                                    onChange={(e) => handleFieldChange(orchestrator.id, 'icon', e.target.value)}
                                    maxLength={2}
                                    className="h-9"
                                  />
                                </div>
                                <div className="space-y-1.5">
                                  <Label htmlFor="orch-desc" className="text-xs">Beschreibung</Label>
                                  <Input
                                    id="orch-desc"
                                    value={editingModules[orchestrator.id].description}
                                    onChange={(e) => handleFieldChange(orchestrator.id, 'description', e.target.value)}
                                    className="h-9"
                                  />
                                </div>
                              </div>

                              <Separator />
                              
                              {/* LLM Configuration Edit */}
                              <div>
                                <h5 className="text-sm font-medium mb-3" style={{ color: 'var(--color-gray-dark)' }}>
                                  {t.tenantAdmin.moduleOverviewFull.llmConfiguration}
                                </h5>
                                
                                <div className="grid grid-cols-2 gap-4">
                                  {/* LLM 1 Edit */}
                                  <div className="p-3 rounded border space-y-3" style={{ backgroundColor: 'white', borderColor: 'var(--color-gray-medium)' }}>
                                    <div>
                                      <Label htmlFor="orch-llm1" className="text-xs font-medium" style={{ color: 'var(--color-gray-dark)' }}>{t.tenantAdmin.moduleOverviewFull.llm1}</Label>
                                      <Select 
                                        value={editingModules[orchestrator.id].llm1 || ""} 
                                        onValueChange={(v) => handleFieldChange(orchestrator.id, 'llm1', v)}
                                      >
                                        <SelectTrigger id="orch-llm1" className="h-9 mt-1.5">
                                          <SelectValue placeholder={t.tenantAdmin.moduleOverviewFull.selectModel} />
                                        </SelectTrigger>
                                        <SelectContent>
                                          {availableLLMs.map(model => (
                                            <SelectItem key={model.id} value={model.id}>
                                              {model.name}
                                            </SelectItem>
                                          ))}
                                        </SelectContent>
                                      </Select>
                                    </div>
                                    
                                    <div>
                                      <Label htmlFor="orch-llm1-prompt" className="text-xs">{t.tenantAdmin.moduleOverviewFull.prompt}</Label>
                                      <Textarea
                                        id="orch-llm1-prompt"
                                        value={editingModules[orchestrator.id].llm1Prompt || ""}
                                        onChange={(e) => handleFieldChange(orchestrator.id, 'llm1Prompt', e.target.value)}
                                        rows={3}
                                        placeholder={t.tenantAdmin.placeholders.systemPrompt}
                                        className="mt-1.5 text-xs"
                                      />
                                    </div>
                                  </div>
                                  
                                  {/* LLM 2 Edit */}
                                  <div className="p-3 rounded border space-y-3" style={{ backgroundColor: 'white', borderColor: 'var(--color-gray-medium)' }}>
                                    <div>
                                      <Label htmlFor="orch-llm2" className="text-xs font-medium" style={{ color: 'var(--color-gray-dark)' }}>{t.tenantAdmin.moduleOverviewFull.llm2}</Label>
                                      <Select 
                                        value={editingModules[orchestrator.id].llm2 || ""} 
                                        onValueChange={(v) => handleFieldChange(orchestrator.id, 'llm2', v)}
                                      >
                                        <SelectTrigger id="orch-llm2" className="h-9 mt-1.5">
                                          <SelectValue placeholder={t.tenantAdmin.moduleOverviewFull.selectModel} />
                                        </SelectTrigger>
                                        <SelectContent>
                                          {availableLLMs.map(model => (
                                            <SelectItem key={model.id} value={model.id}>
                                              {model.name}
                                            </SelectItem>
                                          ))}
                                        </SelectContent>
                                      </Select>
                                    </div>
                                    
                                    <div>
                                      <Label htmlFor="orch-llm2-prompt" className="text-xs">{t.tenantAdmin.moduleOverviewFull.prompt}</Label>
                                      <Textarea
                                        id="orch-llm2-prompt"
                                        value={editingModules[orchestrator.id].llm2Prompt || ""}
                                        onChange={(e) => handleFieldChange(orchestrator.id, 'llm2Prompt', e.target.value)}
                                        rows={3}
                                        placeholder={t.tenantAdmin.placeholders.systemPrompt}
                                        className="mt-1.5 text-xs"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  onClick={() => handleSaveEdit(orchestrator.id)}
                                  style={{
                                    border: '1px solid #e1dfdd',
                                    color: '#000000',
                                    backgroundColor: 'transparent'
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = '#E9C796';
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                  }}
                                >
                                  {t.tenantAdmin.moduleOverviewFull.save}
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleCancelEdit(orchestrator.id)}
                                  style={{
                                    border: '1px solid #e1dfdd',
                                    color: '#000000',
                                    backgroundColor: 'transparent'
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = '#E9C796';
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                  }}
                                >
                                  {t.tenantAdmin.moduleOverviewFull.cancel}
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                        
                        <div className="p-4 rounded-lg border-2" style={{ backgroundColor: 'white', borderColor: 'var(--color-gray-medium)' }}>
                          <img 
                            src={diagramImage} 
                            alt="Orchestrator Flussdiagramm" 
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </CollapsibleContent>
                </Card>
              </Collapsible>
            )}

            {/* Agents - Full Width */}
            <div className="space-y-4">
              <h2 className="text-lg mt-4" style={{ color: 'var(--color-gray-dark)' }}>
                {t.tenantAdmin.moduleOverviewFull.agentsTitle}
              </h2>
              
              {agents.map((agent) => (
                <Collapsible
                  key={agent.id}
                  open={expandedModules.includes(agent.id)}
                  onOpenChange={() => handleToggleExpand(agent.id)}
                >
                  <Card>
                    <CardHeader className="!grid-rows-1 !auto-rows-auto flex items-center min-h-[80px] py-0">
                      <div className="flex items-center justify-between w-full my-auto">
                        <div className="flex items-center gap-4 flex-1">
                          <CollapsibleTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              {expandedModules.includes(agent.id) ? (
                                <ChevronDown className="h-4 w-4" />
                              ) : (
                                <ChevronRight className="h-4 w-4" />
                              )}
                            </Button>
                          </CollapsibleTrigger>
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <CardTitle className="text-base">{agent.name}</CardTitle>
                            </div>
                            <CardDescription className="text-sm">
                              {agent.description}
                            </CardDescription>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          {getStatusBadge(agent.status)}
                          <Label className="text-sm">Kill-Switch</Label>
                          <Switch 
                            checked={agent.enabled}
                            onCheckedChange={() => handleToggleModule(agent.id)}
                          />
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CollapsibleContent>
                      <CardContent className="pt-0">
                        <Separator className="mb-6" />
                        <div className="p-6 rounded-lg" style={{ backgroundColor: 'var(--color-gray-light)' }}>
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="font-medium" style={{ color: 'var(--color-gray-dark)' }}>
                              {t.tenantAdmin.moduleOverviewFull.agentConfiguration}
                            </h4>
                            {!editingModules[agent.id] && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-black hover:bg-[#E9C796]"
                                style={{ borderColor: '#e1dfdd' }}
                                onClick={() => handleTestConnection(agent.id)}
                                disabled={testingConnection === agent.id}
                              >
                                {testingConnection === agent.id ? (
                                  <>
                                    <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                                    {t.tenantAdmin.moduleOverviewFull.testing}
                                  </>
                                ) : (
                                  <>
                                    <Zap className="h-3 w-3 mr-1" />
                                    {t.tenantAdmin.moduleOverviewFull.testConnection}
                                  </>
                                )}
                              </Button>
                            )}
                          </div>
                          
                          {!editingModules[agent.id] ? (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label className="text-xs" style={{ color: 'var(--foreground-muted)' }}>{t.tenantAdmin.moduleOverviewFull.apiEndpoint}</Label>
                                  <code className="block text-xs mt-1 p-2 rounded" style={{ backgroundColor: 'white' }}>
                                    {agent.apiEndpoint}
                                  </code>
                                </div>
                                <div>
                                  <Label className="text-xs" style={{ color: 'var(--foreground-muted)' }}>{t.tenantAdmin.moduleOverviewFull.apiKey}</Label>
                                  <code className="block text-xs mt-1 p-2 rounded font-mono" style={{ backgroundColor: 'white' }}>
                                    {agent.apiKey}
                                  </code>
                                </div>
                              </div>
                              
                              {/* Storage fields only for Email, Jelmoli and Normen Agent */}
                              {(agent.name === 'Email Agent' || agent.name === 'Jelmoli Agent' || agent.name === 'Normen Agent') && (
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label className="text-xs" style={{ color: 'var(--foreground-muted)' }}>{t.tenantAdmin.moduleOverviewFull.storageAccessUrl}</Label>
                                    <code className="block text-xs mt-1 p-2 rounded" style={{ backgroundColor: 'white' }}>
                                      {agent.storageUrl || t.tenantAdmin.moduleOverviewFull.notConfigured}
                                    </code>
                                  </div>
                                  <div>
                                    <Label className="text-xs" style={{ color: 'var(--foreground-muted)' }}>{t.tenantAdmin.moduleOverviewFull.storageToken}</Label>
                                    <code className="block text-xs mt-1 p-2 rounded font-mono" style={{ backgroundColor: 'white' }}>
                                      {agent.storageToken || t.tenantAdmin.moduleOverviewFull.notConfigured}
                                    </code>
                                  </div>
                                </div>
                              )}
                              
                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div>
                                  <Label className="text-xs" style={{ color: 'var(--foreground-muted)' }}>Version</Label>
                                  <p className="text-sm mt-1">{agent.version}</p>
                                </div>
                                <div>
                                  <Label className="text-xs" style={{ color: 'var(--foreground-muted)' }}>{t.tenantAdmin.moduleOverviewFull.category}</Label>
                                  <p className="text-sm mt-1">{agent.category === 'private' ? t.tenantAdmin.moduleOverviewFull.private : t.tenantAdmin.moduleOverviewFull.public}</p>
                                </div>
                                <div>
                                  <Label className="text-xs" style={{ color: 'var(--foreground-muted)' }}>{t.tenantAdmin.moduleOverviewFull.riskCategory}</Label>
                                  <div className="mt-1">
                                    {calculateRiskCategory(agent) === 'hoch' ? (
                                      <Badge 
                                        variant="outline"
                                        style={{
                                          borderColor: '#e1dfdd',
                                          backgroundColor: '#E9C796',
                                          color: '#000000'
                                        }}
                                      >
                                        {t.tenantAdmin.moduleOverviewFull.high}
                                      </Badge>
                                    ) : (
                                      <p className="text-sm">{t.tenantAdmin.moduleOverviewFull.low}</p>
                                    )}
                                  </div>
                                </div>
                              </div>
                              
                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div>
                                  <Label className="text-xs" style={{ color: 'var(--foreground-muted)' }}>Status</Label>
                                  <div className="mt-1">{getStatusBadge(agent.status)}</div>
                                </div>
                              </div>
                              
                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleStartEdit(agent)}
                                  className="text-black"
                                  style={{ border: '1px solid #e1dfdd', backgroundColor: 'transparent' }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = '#E9C796';
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                  }}
                                >
                                  <Edit className="h-3 w-3 mr-2" />
                                  {t.tenantAdmin.moduleOverviewFull.edit}
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-black hover:bg-[#E9C796]"
                                  style={{ borderColor: '#e1dfdd' }}
                                  onClick={() => setDeleteAgentId(agent.id)}
                                >
                                  <Trash2 className="h-3 w-3 mr-2" />
                                  {t.tenantAdmin.moduleOverviewFull.delete}
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor={`agent-name-${agent.id}`}>Agent Name</Label>
                                <Input
                                  id={`agent-name-${agent.id}`}
                                  value={editingModules[agent.id].name}
                                  onChange={(e) => handleFieldChange(agent.id, 'name', e.target.value)}
                                />
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor={`agent-desc-${agent.id}`}>Beschreibung</Label>
                                <Textarea
                                  id={`agent-desc-${agent.id}`}
                                  value={editingModules[agent.id].description}
                                  onChange={(e) => handleFieldChange(agent.id, 'description', e.target.value)}
                                  rows={2}
                                />
                              </div>
                              
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor={`agent-endpoint-${agent.id}`}>{t.tenantAdmin.moduleOverviewFull.apiEndpoint}</Label>
                                  <Input
                                    id={`agent-endpoint-${agent.id}`}
                                    value={editingModules[agent.id].apiEndpoint || ""}
                                    onChange={(e) => handleFieldChange(agent.id, 'apiEndpoint', e.target.value)}
                                    className="font-mono text-sm"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor={`agent-key-${agent.id}`}>{t.tenantAdmin.moduleOverviewFull.apiKey}</Label>
                                  <Input
                                    id={`agent-key-${agent.id}`}
                                    type="password"
                                    value={editingModules[agent.id].apiKey || ""}
                                    onChange={(e) => handleFieldChange(agent.id, 'apiKey', e.target.value)}
                                    className="font-mono text-sm"
                                  />
                                </div>
                              </div>
                              
                              {/* Storage fields only for Email, Jelmoli and Normen Agent */}
                              {(agent.name === 'Email Agent' || agent.name === 'Jelmoli Agent' || agent.name === 'Normen Agent') && (
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label htmlFor={`agent-storage-url-${agent.id}`}>{t.tenantAdmin.moduleOverviewFull.storageAccessUrl}</Label>
                                    <Input
                                      id={`agent-storage-url-${agent.id}`}
                                      value={editingModules[agent.id].storageUrl || ""}
                                      onChange={(e) => handleFieldChange(agent.id, 'storageUrl', e.target.value)}
                                      className="font-mono text-sm"
                                      placeholder={t.tenantAdmin.placeholders.storageUrl}
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor={`agent-storage-token-${agent.id}`}>{t.tenantAdmin.moduleOverviewFull.storageToken}</Label>
                                    <Input
                                      id={`agent-storage-token-${agent.id}`}
                                      type="password"
                                      value={editingModules[agent.id].storageToken || ""}
                                      onChange={(e) => handleFieldChange(agent.id, 'storageToken', e.target.value)}
                                      className="font-mono text-sm"
                                      placeholder={t.tenantAdmin.placeholders.storageToken}
                                    />
                                  </div>
                                </div>
                              )}
                              
                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor={`agent-version-${agent.id}`}>{t.tenantAdmin.moduleOverviewFull.version}</Label>
                                  <Input
                                    id={`agent-version-${agent.id}`}
                                    value={editingModules[agent.id].version || ""}
                                    onChange={(e) => handleFieldChange(agent.id, 'version', e.target.value)}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor={`agent-category-${agent.id}`}>{t.tenantAdmin.moduleOverviewFull.category}</Label>
                                  <Select 
                                    value={editingModules[agent.id].category} 
                                    onValueChange={(v) => handleFieldChange(agent.id, 'category', v)}
                                  >
                                    <SelectTrigger id={`agent-category-${agent.id}`}>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="public">{t.tenantAdmin.moduleOverviewFull.public}</SelectItem>
                                      <SelectItem value="private">{t.tenantAdmin.moduleOverviewFull.private}</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                              
                              {/* Risk Assessment Section */}
                              <div className="space-y-4 p-4 rounded-lg" style={{ backgroundColor: '#f9f9f9', border: '1px solid #e1dfdd' }}>
                                <div className="flex items-center justify-between">
                                  <Label className="font-medium">{t.tenantAdmin.moduleOverviewFull.riskCategory}</Label>
                                  <Badge 
                                    variant="outline"
                                    style={{
                                      borderColor: '#e1dfdd',
                                      color: '#000000',
                                      backgroundColor: calculateRiskCategory(editingModules[agent.id]) === 'hoch' ? '#E9C796' : 'transparent'
                                    }}
                                  >
                                    {calculateRiskCategory(editingModules[agent.id]) === 'hoch' ? t.tenantAdmin.moduleOverviewFull.high : t.tenantAdmin.moduleOverviewFull.low}
                                  </Badge>
                                </div>
                                
                                {/* A. Verhaltensbeeinflussung */}
                                <div className="space-y-2">
                                  <Label className="text-sm font-medium">A. Verhaltensbeeinflussung</Label>
                                  <div className="space-y-2 pl-4">
                                    <div className="flex items-center space-x-2">
                                      <div className="relative">
                                        <input
                                          type="checkbox"
                                          id={`behavior-${agent.id}`}
                                          checked={editingModules[agent.id].behaviorInfluence || false}
                                          onChange={(e) => handleFieldChange(agent.id, 'behaviorInfluence', e.target.checked)}
                                          className="peer h-4 w-4 rounded appearance-none cursor-pointer"
                                          style={{ 
                                            border: '1px solid #e1dfdd',
                                            backgroundColor: editingModules[agent.id].behaviorInfluence ? '#E9C796' : 'transparent'
                                          }}
                                        />
                                        {editingModules[agent.id].behaviorInfluence && (
                                          <svg className="absolute top-0 left-0 w-4 h-4 pointer-events-none" viewBox="0 0 16 16" fill="none">
                                            <path d="M13 4L6 11L3 8" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                          </svg>
                                        )}
                                      </div>
                                      <Label htmlFor={`behavior-${agent.id}`} className="text-sm cursor-pointer">Verhalten wird beeinflusst</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <div className="relative">
                                        <input
                                          type="checkbox"
                                          id={`deception-${agent.id}`}
                                          checked={editingModules[agent.id].intentionalDeception || false}
                                          onChange={(e) => handleFieldChange(agent.id, 'intentionalDeception', e.target.checked)}
                                          className="peer h-4 w-4 rounded appearance-none cursor-pointer"
                                          style={{ 
                                            border: '1px solid #e1dfdd',
                                            backgroundColor: editingModules[agent.id].intentionalDeception ? '#E9C796' : 'transparent'
                                          }}
                                        />
                                        {editingModules[agent.id].intentionalDeception && (
                                          <svg className="absolute top-0 left-0 w-4 h-4 pointer-events-none" viewBox="0 0 16 16" fill="none">
                                            <path d="M13 4L6 11L3 8" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                          </svg>
                                        )}
                                      </div>
                                      <Label htmlFor={`deception-${agent.id}`} className="text-sm cursor-pointer">Person wird absichtlich getäuscht</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <div className="relative">
                                        <input
                                          type="checkbox"
                                          id={`manipulation-${agent.id}`}
                                          checked={editingModules[agent.id].intentionalManipulation || false}
                                          onChange={(e) => handleFieldChange(agent.id, 'intentionalManipulation', e.target.checked)}
                                          className="peer h-4 w-4 rounded appearance-none cursor-pointer"
                                          style={{ 
                                            border: '1px solid #e1dfdd',
                                            backgroundColor: editingModules[agent.id].intentionalManipulation ? '#E9C796' : 'transparent'
                                          }}
                                        />
                                        {editingModules[agent.id].intentionalManipulation && (
                                          <svg className="absolute top-0 left-0 w-4 h-4 pointer-events-none" viewBox="0 0 16 16" fill="none">
                                            <path d="M13 4L6 11L3 8" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                          </svg>
                                        )}
                                      </div>
                                      <Label htmlFor={`manipulation-${agent.id}`} className="text-sm cursor-pointer">Person wird absichtlich manipuliert</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <div className="relative">
                                        <input
                                          type="checkbox"
                                          id={`freedom-${agent.id}`}
                                          checked={editingModules[agent.id].decisionFreedomImpaired || false}
                                          onChange={(e) => handleFieldChange(agent.id, 'decisionFreedomImpaired', e.target.checked)}
                                          className="peer h-4 w-4 rounded appearance-none cursor-pointer"
                                          style={{ 
                                            border: '1px solid #e1dfdd',
                                            backgroundColor: editingModules[agent.id].decisionFreedomImpaired ? '#E9C796' : 'transparent'
                                          }}
                                        />
                                        {editingModules[agent.id].decisionFreedomImpaired && (
                                          <svg className="absolute top-0 left-0 w-4 h-4 pointer-events-none" viewBox="0 0 16 16" fill="none">
                                            <path d="M13 4L6 11L3 8" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                          </svg>
                                        )}
                                      </div>
                                      <Label htmlFor={`freedom-${agent.id}`} className="text-sm cursor-pointer">Entscheidungsfreiheit wird stark beeinträchtigt</Label>
                                    </div>
                                  </div>
                                </div>
                                
                                {/* B. Potenzieller Schaden */}
                                <div className="space-y-2">
                                  <Label className="text-sm font-medium">B. Potenzieller Schaden</Label>
                                  <div className="space-y-2 pl-4">
                                    <div className="flex items-center space-x-2">
                                      <div className="relative">
                                        <input
                                          type="checkbox"
                                          id={`harm-${agent.id}`}
                                          checked={editingModules[agent.id].significantHarm || false}
                                          onChange={(e) => handleFieldChange(agent.id, 'significantHarm', e.target.checked)}
                                          className="peer h-4 w-4 rounded appearance-none cursor-pointer"
                                          style={{ 
                                            border: '1px solid #e1dfdd',
                                            backgroundColor: editingModules[agent.id].significantHarm ? '#E9C796' : 'transparent'
                                          }}
                                        />
                                        {editingModules[agent.id].significantHarm && (
                                          <svg className="absolute top-0 left-0 w-4 h-4 pointer-events-none" viewBox="0 0 16 16" fill="none">
                                            <path d="M13 4L6 11L3 8" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                          </svg>
                                        )}
                                      </div>
                                      <Label htmlFor={`harm-${agent.id}`} className="text-sm cursor-pointer">Der Person wird ein erheblicher Schaden zugefügt</Label>
                                    </div>
                                  </div>
                                </div>
                                
                                {/* C. Produktsicherheitsvorschriften */}
                                <div className="space-y-2">
                                  <Label className="text-sm font-medium">C. Produktsicherheitsvorschriften</Label>
                                  <div className="space-y-2 pl-4">
                                    <div className="flex items-center space-x-2">
                                      <div className="relative">
                                        <input
                                          type="checkbox"
                                          id={`annex1-${agent.id}`}
                                          checked={editingModules[agent.id].annex1Fulfilled || false}
                                          onChange={(e) => handleFieldChange(agent.id, 'annex1Fulfilled', e.target.checked)}
                                          className="peer h-4 w-4 rounded appearance-none cursor-pointer"
                                          style={{ 
                                            border: '1px solid #e1dfdd',
                                            backgroundColor: editingModules[agent.id].annex1Fulfilled ? '#E9C796' : 'transparent'
                                          }}
                                        />
                                        {editingModules[agent.id].annex1Fulfilled && (
                                          <svg className="absolute top-0 left-0 w-4 h-4 pointer-events-none" viewBox="0 0 16 16" fill="none">
                                            <path d="M13 4L6 11L3 8" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                          </svg>
                                        )}
                                      </div>
                                      <Label htmlFor={`annex1-${agent.id}`} className="text-sm cursor-pointer">Anhang 1 erfüllt</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <div className="relative">
                                        <input
                                          type="checkbox"
                                          id={`annex2-${agent.id}`}
                                          checked={editingModules[agent.id].annex2Fulfilled || false}
                                          onChange={(e) => handleFieldChange(agent.id, 'annex2Fulfilled', e.target.checked)}
                                          className="peer h-4 w-4 rounded appearance-none cursor-pointer"
                                          style={{ 
                                            border: '1px solid #e1dfdd',
                                            backgroundColor: editingModules[agent.id].annex2Fulfilled ? '#E9C796' : 'transparent'
                                          }}
                                        />
                                        {editingModules[agent.id].annex2Fulfilled && (
                                          <svg className="absolute top-0 left-0 w-4 h-4 pointer-events-none" viewBox="0 0 16 16" fill="none">
                                            <path d="M13 4L6 11L3 8" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                          </svg>
                                        )}
                                      </div>
                                      <Label htmlFor={`annex2-${agent.id}`} className="text-sm cursor-pointer">Anhang 2 erfüllt</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <div className="relative">
                                        <input
                                          type="checkbox"
                                          id={`annex3-${agent.id}`}
                                          checked={editingModules[agent.id].annex3Fulfilled || false}
                                          onChange={(e) => handleFieldChange(agent.id, 'annex3Fulfilled', e.target.checked)}
                                          className="peer h-4 w-4 rounded appearance-none cursor-pointer"
                                          style={{ 
                                            border: '1px solid #e1dfdd',
                                            backgroundColor: editingModules[agent.id].annex3Fulfilled ? '#E9C796' : 'transparent'
                                          }}
                                        />
                                        {editingModules[agent.id].annex3Fulfilled && (
                                          <svg className="absolute top-0 left-0 w-4 h-4 pointer-events-none" viewBox="0 0 16 16" fill="none">
                                            <path d="M13 4L6 11L3 8" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                          </svg>
                                        )}
                                      </div>
                                      <Label htmlFor={`annex3-${agent.id}`} className="text-sm cursor-pointer">Anhang 3 erfüllt</Label>
                                    </div>
                                  </div>
                                </div>
                                
                                {/* D. Profiling */}
                                <div className="space-y-2">
                                  <Label className="text-sm font-medium">D. Profiling</Label>
                                  <div className="space-y-2 pl-4">
                                    <div className="flex items-center space-x-2">
                                      <div className="relative">
                                        <input
                                          type="checkbox"
                                          id={`profiling-${agent.id}`}
                                          checked={editingModules[agent.id].isProfiling || false}
                                          onChange={(e) => handleFieldChange(agent.id, 'isProfiling', e.target.checked)}
                                          className="peer h-4 w-4 rounded appearance-none cursor-pointer"
                                          style={{ 
                                            border: '1px solid #e1dfdd',
                                            backgroundColor: editingModules[agent.id].isProfiling ? '#E9C796' : 'transparent'
                                          }}
                                        />
                                        {editingModules[agent.id].isProfiling && (
                                          <svg className="absolute top-0 left-0 w-4 h-4 pointer-events-none" viewBox="0 0 16 16" fill="none">
                                            <path d="M13 4L6 11L3 8" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                          </svg>
                                        )}
                                      </div>
                                      <Label htmlFor={`profiling-${agent.id}`} className="text-sm cursor-pointer">Es handelt sich um Profiling</Label>
                                    </div>
                                  </div>
                                </div>
                                
                                {/* E. Human in the loop */}
                                <div className="space-y-2">
                                  <Label className="text-sm font-medium">E. Human in the loop</Label>
                                  <div className="space-y-2 pl-4">
                                    <div className="flex items-center space-x-2">
                                      <div className="relative">
                                        <input
                                          type="checkbox"
                                          id={`human-${agent.id}`}
                                          checked={editingModules[agent.id].humanInLoop || false}
                                          onChange={(e) => handleFieldChange(agent.id, 'humanInLoop', e.target.checked)}
                                          className="peer h-4 w-4 rounded appearance-none cursor-pointer"
                                          style={{ 
                                            border: '1px solid #e1dfdd',
                                            backgroundColor: editingModules[agent.id].humanInLoop ? '#E9C796' : 'transparent'
                                          }}
                                        />
                                        {editingModules[agent.id].humanInLoop && (
                                          <svg className="absolute top-0 left-0 w-4 h-4 pointer-events-none" viewBox="0 0 16 16" fill="none">
                                            <path d="M13 4L6 11L3 8" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                          </svg>
                                        )}
                                      </div>
                                      <Label htmlFor={`human-${agent.id}`} className="text-sm cursor-pointer">Human in the loop ist aktiv</Label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor={`agent-icon-${agent.id}`}>{t.tenantAdmin.moduleOverviewFull.icon}</Label>
                                  <Input
                                    id={`agent-icon-${agent.id}`}
                                    value={editingModules[agent.id].icon}
                                    onChange={(e) => handleFieldChange(agent.id, 'icon', e.target.value)}
                                    maxLength={2}
                                  />
                                </div>
                              </div>
                              
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  onClick={() => handleSaveEdit(agent.id)}
                                  style={{
                                    border: '1px solid #e1dfdd',
                                    color: '#000000',
                                    backgroundColor: 'transparent'
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = '#E9C796';
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                  }}
                                >
                                  {t.tenantAdmin.moduleOverviewFull.save}
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleCancelEdit(agent.id)}
                                  style={{
                                    border: '1px solid #e1dfdd',
                                    color: '#000000',
                                    backgroundColor: 'transparent'
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = '#E9C796';
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                  }}
                                >
                                  {t.tenantAdmin.moduleOverviewFull.cancel}
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </CollapsibleContent>
                  </Card>
                </Collapsible>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Transparent Overlay for Right Side Panel */}
      {showAddSheet && (
        <div 
          className="fixed inset-0 bg-transparent"
          style={{ zIndex: 9 }}
          onClick={() => setShowAddSheet(false)}
        />
      )}

      {/* Right Side Panel - Add Agent */}
      <div 
        className="flex flex-col transition-all duration-300 ease-in-out overflow-hidden border-l absolute top-0 right-0 bottom-0"
        style={{ 
          width: showAddSheet ? '400px' : '0px',
          borderColor: showAddSheet ? '#e1dfdd' : 'transparent',
          backgroundColor: '#FFFFFF',
          zIndex: 10
        }}
      >
        {showAddSheet && (
          <div className="flex-1 flex flex-col h-full">
            {/* Panel Header */}
            <div 
              className="flex items-center justify-between px-6 border-b gap-3"
              style={{ 
                height: '57px',
                borderColor: '#e1dfdd',
                backgroundColor: '#DE851D'
              }}
            >
              <div className="flex items-center gap-3">
                <Plus className="h-5 w-5 flex-shrink-0 text-black" />
                <h3 className="font-medium text-black">
                  {t.tenantAdmin.moduleOverviewFull.addNewAgent}
                </h3>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowAddSheet(false)}
                className="h-8 w-8 hover:border hover:border-black hover:bg-transparent transition-colors"
              >
                <X className="h-4 w-4" style={{ color: '#000000' }} />
              </Button>
            </div>

            {/* Panel Content - Scrollable */}
            <div 
              className="flex-1 overflow-auto px-6 py-6"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: '#e1dfdd transparent'
              }}
            >
              <style>
                {`
                  .flex-1.overflow-auto.px-6::-webkit-scrollbar {
                    width: 8px;
                  }
                  .flex-1.overflow-auto.px-6::-webkit-scrollbar-track {
                    background: transparent;
                  }
                  .flex-1.overflow-auto.px-6::-webkit-scrollbar-thumb {
                    background-color: #e1dfdd;
                    border-radius: 4px;
                  }
                  .flex-1.overflow-auto.px-6::-webkit-scrollbar-thumb:hover {
                    background-color: #d1cfcd;
                  }
                `}
              </style>

              <div className="space-y-8">
                {/* Basic Information */}
                <div className="space-y-5">
                  <h3 className="font-medium text-base" style={{ color: 'var(--color-gray-dark)' }}>
                    {t.tenantAdmin.moduleOverviewFull.basicInformation}
                  </h3>

                  <div className="space-y-3">
                    <Label htmlFor="new-agent-name">{t.tenantAdmin.moduleOverviewFull.agentName} *</Label>
                    <Input 
                      id="new-agent-name"
                      placeholder={t.tenantAdmin.placeholders.agentName}
                      value={moduleName}
                      onChange={(e) => setModuleName(e.target.value)}
                      className="h-10"
                      style={{ borderColor: '#e1dfdd' }}
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="new-agent-desc">{t.tenantAdmin.moduleOverviewFull.description} *</Label>
                    <Textarea 
                      id="new-agent-desc"
                      placeholder={t.tenantAdmin.placeholders.agentDescription}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={3}
                      style={{ borderColor: '#e1dfdd' }}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <Label htmlFor="new-agent-category">{t.tenantAdmin.moduleOverviewFull.category} *</Label>
                      <Select value={category} onValueChange={(v) => setCategory(v as 'public' | 'private')}>
                        <SelectTrigger id="new-agent-category" className="h-10" style={{ borderColor: '#e1dfdd' }}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="public">{t.tenantAdmin.moduleOverviewFull.public}</SelectItem>
                          <SelectItem value="private">{t.tenantAdmin.moduleOverviewFull.private}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="new-agent-risk">{t.tenantAdmin.moduleOverviewFull.riskCategory} *</Label>
                      <Select value={riskCategory} onValueChange={(v) => setRiskCategory(v as 'niedrig' | 'hoch')}>
                        <SelectTrigger id="new-agent-risk" className="h-10" style={{ borderColor: '#e1dfdd' }}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="niedrig">{t.tenantAdmin.moduleOverviewFull.low}</SelectItem>
                          <SelectItem value="hoch">{t.tenantAdmin.moduleOverviewFull.high}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="new-agent-version">{t.tenantAdmin.moduleOverviewFull.version}</Label>
                    <Input 
                      id="new-agent-version"
                      placeholder={t.tenantAdmin.placeholders.version}
                      value={version}
                      onChange={(e) => setVersion(e.target.value)}
                      className="h-10"
                      style={{ borderColor: '#e1dfdd' }}
                    />
                  </div>
                </div>

                <Separator />

                {/* API Configuration */}
                <div className="space-y-5">
                  <h3 className="font-medium text-base" style={{ color: 'var(--color-gray-dark)' }}>
                    {t.tenantAdmin.moduleOverviewFull.agentConfiguration}
                  </h3>

                  <Alert>
                    <AlertDescription className="text-left">
                      {t.tenantAdmin.moduleOverviewFull.apiKeysEncrypted}
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-3">
                    <Label htmlFor="new-agent-endpoint">{t.tenantAdmin.moduleOverviewFull.apiEndpoint} *</Label>
                    <Input 
                      id="new-agent-endpoint"
                      placeholder={t.tenantAdmin.placeholders.agentEndpoint}
                      value={apiEndpoint}
                      onChange={(e) => setApiEndpoint(e.target.value)}
                      className="h-10 font-mono text-sm"
                      style={{ borderColor: '#e1dfdd' }}
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="new-agent-key">{t.tenantAdmin.moduleOverviewFull.apiKey} *</Label>
                    <Input 
                      id="new-agent-key"
                      type="password"
                      placeholder={t.tenantAdmin.placeholders.agentApiKey}
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      className="h-10 font-mono text-sm"
                      style={{ borderColor: '#e1dfdd' }}
                    />
                  </div>
                </div>

                <Separator />

                {/* Actions */}
                <div className="flex gap-3">
                  <Button 
                    className="flex-1 h-11"
                    style={{
                      border: '1px solid #e1dfdd',
                      color: '#000000',
                      backgroundColor: 'transparent'
                    }}
                    onMouseEnter={(e) => {
                      if (!e.currentTarget.disabled) {
                        e.currentTarget.style.backgroundColor = '#E9C796';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!e.currentTarget.disabled) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }
                    }}
                    onClick={handleAddAgent}
                    disabled={!moduleName.trim() || !description.trim() || !apiEndpoint.trim() || !apiKey.trim()}
                  >
                    {t.tenantAdmin.moduleOverviewFull.addAgent}
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1 h-11"
                    onClick={() => setShowAddSheet(false)}
                    style={{
                      border: '1px solid #e1dfdd',
                      color: '#000000',
                      backgroundColor: 'transparent'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#E9C796';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    {t.tenantAdmin.moduleOverviewFull.cancel}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      </div>
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteAgentId !== null} onOpenChange={(open) => !open && setDeleteAgentId(null)}>
        <AlertDialogContent style={{ borderColor: '#e1dfdd' }}>
          <AlertDialogHeader>
            <AlertDialogTitle>{t.tenantAdmin.moduleOverviewFull.deleteAgent}</AlertDialogTitle>
            <AlertDialogDescription>
              {t.tenantAdmin.moduleOverviewFull.deleteAgentConfirmation}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel 
              className="text-black"
              style={{ border: '1px solid #e1dfdd', backgroundColor: 'transparent' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#E9C796';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              {t.tenantAdmin.moduleOverviewFull.cancel}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeleteAgent}
              className="text-black"
              style={{ border: '1px solid #e1dfdd', backgroundColor: 'transparent' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#E9C796';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              {t.tenantAdmin.moduleOverviewFull.delete}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}