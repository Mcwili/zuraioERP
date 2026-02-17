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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "./ui/dropdown-menu";
import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { Alert, AlertDescription } from "./ui/alert";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { 
  Plus, 
  Search, 
  MoreVertical, 
  Edit, 
  Trash2,
  CheckCircle2,
  XCircle,
  Loader2,
  Brain,
  Key,
  Globe,
  AlertTriangle,
  Zap,
  Activity,
  Copy,
  ExternalLink,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Filter,
  X,
  Settings2,
  ChevronDown,
  Building2,
  FileText,
  TrendingUp,
} from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

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

interface ModelManagementProps {
  section?: string;
  isDarkMode?: boolean;
  allModels?: Model[];
  onModelsChange?: (models: Model[]) => void;
}

const mockModels: Model[] = [
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
];

const providerOptions = [
  { value: "openai", label: "OpenAI", icon: "🤖" },
  { value: "anthropic", label: "Anthropic", icon: "🔮" },
  { value: "google", label: "Google AI", icon: "🌐" },
  { value: "azure", label: "Azure OpenAI", icon: "☁️" },
  { value: "aws", label: "AWS Bedrock", icon: "🔶" },
  { value: "mistral", label: "Mistral AI", icon: "🌬️" },
  { value: "cohere", label: "Cohere", icon: "🧬" },
  { value: "custom", label: "Custom Endpoint", icon: "🔧" }
];

export function ModelManagement({ section = "overview", isDarkMode = false, allModels, onModelsChange }: ModelManagementProps) {
  const { t } = useLanguage();
  
  // Update provider options to use translations
  const providerOptions = [
    { value: "openai", label: "OpenAI", icon: "🤖" },
    { value: "anthropic", label: "Anthropic", icon: "🔮" },
    { value: "google", label: t.tenantAdmin.modelManagementFull.providers.googleAI, icon: "🌐" },
    { value: "azure", label: t.tenantAdmin.modelManagementFull.providers.azureOpenAI, icon: "☁️" },
    { value: "aws", label: t.tenantAdmin.modelManagementFull.providers.awsBedrock, icon: "🔶" },
    { value: "mistral", label: t.tenantAdmin.modelManagementFull.providers.mistralAI, icon: "🌬️" },
    { value: "cohere", label: t.tenantAdmin.modelManagementFull.providers.cohere, icon: "🧬" },
    { value: "custom", label: t.tenantAdmin.modelManagementFull.providers.customEndpoint, icon: "🔧" }
  ];
  
  const [localModels, setLocalModels] = useState<Model[]>(mockModels);
  const models = allModels || localModels;
  const setModels = (newModels: Model[] | ((prev: Model[]) => Model[])) => {
    if (onModelsChange) {
      if (typeof newModels === 'function') {
        const updatedModels = newModels(models);
        onModelsChange(updatedModels);
      } else {
        onModelsChange(newModels);
      }
    } else {
      setLocalModels(newModels);
    }
  };
  
  const [searchQuery, setSearchQuery] = useState("");
  const [filterProvider, setFilterProvider] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [showModelSheet, setShowModelSheet] = useState(false);
  const [editingModel, setEditingModel] = useState<Model | null>(null);
  const [isNewModel, setIsNewModel] = useState(false);
  const [testingConnection, setTestingConnection] = useState<string | null>(null);
  
  // Delete confirmation dialog
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [modelToDelete, setModelToDelete] = useState<Model | null>(null);
  
  // Sort & Filter States
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [providerFilter, setProviderFilter] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  
  // Form state
  const [modelName, setModelName] = useState("");
  const [provider, setProvider] = useState("");
  const [modelId, setModelId] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [endpoint, setEndpoint] = useState("");
  const [notes, setNotes] = useState("");

  // Sort & Filter Functions
  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (column: string) => {
    if (sortColumn !== column) {
      return <ArrowUpDown className="h-3 w-3 ml-1" />;
    }
    return sortDirection === 'asc' 
      ? <ArrowUp className="h-3 w-3 ml-1" />
      : <ArrowDown className="h-3 w-3 ml-1" />;
  };

  const toggleProviderFilter = (provider: string) => {
    setProviderFilter(prev => 
      prev.includes(provider) 
        ? prev.filter(p => p !== provider)
        : [...prev, provider]
    );
  };

  const toggleStatusFilter = (status: string) => {
    setStatusFilter(prev => 
      prev.includes(status) 
        ? prev.filter(s => s !== status)
        : [...prev, status]
    );
  };

  const filteredModels = models.filter(model => {
    const matchesSearch = 
      model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      model.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
      model.modelId.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesProvider = providerFilter.length === 0 || 
      providerFilter.includes(model.provider);
    
    const matchesStatus = statusFilter.length === 0 || statusFilter.includes(model.status);
    
    return matchesSearch && matchesProvider && matchesStatus;
  }).sort((a, b) => {
    if (!sortColumn) return 0;
    
    let aValue: any, bValue: any;
    
    switch (sortColumn) {
      case 'name':
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
        break;
      case 'provider':
        aValue = a.provider.toLowerCase();
        bValue = b.provider.toLowerCase();
        break;
      case 'modelId':
        aValue = a.modelId.toLowerCase();
        bValue = b.modelId.toLowerCase();
        break;
      case 'status':
        aValue = a.status;
        bValue = b.status;
        break;
      default:
        return 0;
    }
    
    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const handleAddModel = () => {
    setIsNewModel(true);
    setEditingModel(null);
    setModelName("");
    setProvider("");
    setModelId("");
    setApiKey("");
    setEndpoint("");
    setNotes("");
    setShowModelSheet(true);
  };

  const handleEditModel = (model: Model) => {
    setIsNewModel(false);
    setEditingModel(model);
    setModelName(model.name);
    setProvider(model.provider.toLowerCase());
    setModelId(model.modelId);
    setApiKey(model.apiKey);
    setEndpoint(model.endpoint || "");
    setNotes("");
    setShowModelSheet(true);
  };

  const handleSaveModel = () => {
    if (isNewModel) {
      const newModel: Model = {
        id: String(models.length + 1),
        name: modelName,
        provider: provider.charAt(0).toUpperCase() + provider.slice(1),
        modelId: modelId,
        apiKey: apiKey,
        endpoint: endpoint || undefined,
        status: "inactive",
        addedDate: new Date().toISOString().split('T')[0],
        usedBy: []
      };
      setModels([...models, newModel]);
    } else if (editingModel) {
      setModels(models.map(m => 
        m.id === editingModel.id 
          ? { 
              ...m, 
              name: modelName,
              provider: provider.charAt(0).toUpperCase() + provider.slice(1),
              modelId: modelId,
              apiKey: apiKey,
              endpoint: endpoint || undefined
            }
          : m
      ));
    }
    setShowModelSheet(false);
  };

  const handleDeleteModel = (id: string) => {
    setModels(models.filter(m => m.id !== id));
  };

  const handleDuplicateModel = (model: Model) => {
    const duplicatedModel: Model = {
      ...model,
      id: String(models.length + 1),
      name: `${model.name} (Kopie)`,
      status: "inactive",
      addedDate: new Date().toISOString().split('T')[0],
      lastTested: undefined,
      usedBy: []
    };
    setModels([...models, duplicatedModel]);
  };

  const handleTestConnection = async (modelId: string) => {
    setTestingConnection(modelId);
    
    // Simulate API test
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setModels(models.map(m => 
      m.id === modelId 
        ? { 
            ...m, 
            status: Math.random() > 0.2 ? 'active' : 'error',
            lastTested: new Date().toLocaleString('de-DE', {
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <Badge className="bg-transparent text-black border-[#e1dfdd]">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Aktiv
          </Badge>
        );
      case 'inactive':
        return (
          <Badge style={{ backgroundColor: '#E9C796', color: '#000000', border: '1px solid #e1dfdd' }}>
            <XCircle className="h-3 w-3 mr-1" />
            Inaktiv
          </Badge>
        );
      case 'error':
        return (
          <Badge style={{ backgroundColor: '#E9C796', color: '#000000', border: '1px solid #e1dfdd' }}>
            <AlertTriangle className="h-3 w-3 mr-1" />
            Fehler
          </Badge>
        );
      default:
        return null;
    }
  };

  const getProviderIcon = (provider: string) => {
    const providerLower = provider.toLowerCase();
    const option = providerOptions.find(p => p.value === providerLower);
    return option?.icon || "🤖";
  };

  const activeModels = models.filter(m => m.status === 'active').length;
  const errorModels = models.filter(m => m.status === 'error').length;

  return (
    <div className="flex-1 flex flex-row overflow-hidden relative">
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Models Header */}
        <div 
          className="h-14 flex items-center gap-3 px-4 justify-between"
          style={{ 
            borderBottom: isDarkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.06)',
            backgroundColor: '#DE851D'
          }}
        >
          <div className="flex items-center gap-3">
            <Brain className="h-5 w-5 flex-shrink-0" style={{ color: '#000000' }} />
            <h2 className="font-medium" style={{ color: '#000000' }}>
              {t.tenantAdmin.modelManagementExtended.title}
            </h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 border border-transparent hover:border-black hover:bg-transparent"
            onClick={handleAddModel}
            title={t.tenantAdmin.modelManagementFull.dialog.addNewModel}
          >
            <Plus className="h-5 w-5 text-black" />
          </Button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-auto">
        <div className="px-8 pt-8 pb-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Stats & Action Button */}
            <div className="flex items-start justify-between gap-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 flex-1">
                <Card className="shadow-sm" style={{ border: '1px solid #e1dfdd' }}>
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm" style={{ color: '#000000' }}>{t.tenantAdmin.modelManagementExtended.statsTotal}</p>
                        <p className="text-2xl mt-1" style={{ color: '#000000' }}>
                          {models.length}
                        </p>
                      </div>
                      <Brain className="h-5 w-5" style={{ color: '#000000' }} />
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
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm" style={{ color: '#000000' }}>{t.tenantAdmin.modelManagementExtended.statsActive}</p>
                        <p className="text-2xl mt-1" style={{ color: '#000000' }}>
                          {activeModels}
                        </p>
                      </div>
                      <CheckCircle2 className="h-5 w-5" style={{ color: '#000000' }} />
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
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm" style={{ color: '#000000' }}>{t.tenantAdmin.modelManagementExtended.statsInactive}</p>
                        <p className="text-2xl mt-1" style={{ color: '#000000' }}>
                          {models.filter(m => m.status === 'inactive').length}
                        </p>
                      </div>
                      <XCircle className="h-5 w-5" style={{ color: '#000000' }} />
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
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm" style={{ color: '#000000' }}>{t.tenantAdmin.modelManagementExtended.statsError}</p>
                        <p className="text-2xl mt-1" style={{ color: '#000000' }}>
                          {errorModels}
                        </p>
                      </div>
                      <AlertTriangle className="h-5 w-5" style={{ color: '#000000' }} />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Models Table */}
            <Card className="shadow-sm" style={{ border: '1px solid #e1dfdd' }}>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <CardTitle style={{ color: '#000000' }}>{t.tenantAdmin.modelManagementExtended.configuredModels}</CardTitle>
                    <CardDescription style={{ color: '#000000' }}>
                      {filteredModels.length} von {models.length} {t.tenantAdmin.modelManagementExtended.modelsCount}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div 
                  className="rounded-lg overflow-auto max-h-[600px]" 
                  style={{ 
                    scrollbarWidth: 'thin',
                    scrollbarColor: '#e1dfdd transparent'
                  }}
                >
                  <style>
                    {`
                      div.border.rounded-lg.overflow-auto::-webkit-scrollbar {
                        width: 8px;
                        height: 8px;
                      }
                      div.border.rounded-lg.overflow-auto::-webkit-scrollbar-track {
                        background: transparent;
                      }
                      div.border.rounded-lg.overflow-auto::-webkit-scrollbar-thumb {
                        background-color: #e1dfdd;
                        border-radius: 4px;
                      }
                      div.border.rounded-lg.overflow-auto::-webkit-scrollbar-thumb:hover {
                        background-color: #d1cfcd;
                      }
                    `}
                  </style>
                  <Table className="table-fixed">
                    <TableHeader>
                      <TableRow className="h-8">
                        <TableHead className="w-[200px] text-xs text-black">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-6 px-0 hover:bg-transparent flex items-center text-black"
                            onClick={() => handleSort('name')}
                          >
                            {t.tenantAdmin.modelManagementExtended.model}
                            {getSortIcon('name')}
                          </Button>
                        </TableHead>
                        <TableHead className="w-[150px] text-xs text-black">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-6 px-0 hover:bg-transparent flex items-center text-black"
                              >
                                Provider
                                <Filter className={`h-3 w-3 ml-1 ${providerFilter.length > 0 ? 'text-[#DE851D]' : 'text-black'}`} />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start">
                              <DropdownMenuItem className="focus:!bg-[#E9C796]" onClick={() => handleSort('provider')}>
                                <div className="flex items-center w-full">
                                  {getSortIcon('provider')}
                                  <span className="ml-2">Sortieren</span>
                                </div>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="focus:!bg-[#E9C796]" onClick={() => setProviderFilter([])}>
                                Filter zurücksetzen
                              </DropdownMenuItem>
                              <div className="border-t my-1" />
                              <DropdownMenuItem className="focus:!bg-[#E9C796]" onSelect={(e) => e.preventDefault()} onClick={() => toggleProviderFilter('OpenAI')}>
                                <div className="flex items-center w-full">
                                  <div 
                                    className="h-3.5 w-3.5 mr-2 rounded flex items-center justify-center"
                                    style={{ 
                                      backgroundColor: providerFilter.includes('OpenAI') ? '#E9C796' : 'transparent',
                                      border: `1.5px solid ${providerFilter.includes('OpenAI') ? '#E9C796' : '#e1dfdd'}`
                                    }}
                                  >
                                    {providerFilter.includes('OpenAI') && (
                                      <svg className="h-2.5 w-2.5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                      </svg>
                                    )}
                                  </div>
                                  OpenAI
                                </div>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="focus:!bg-[#E9C796]" onSelect={(e) => e.preventDefault()} onClick={() => toggleProviderFilter('Anthropic')}>
                                <div className="flex items-center w-full">
                                  <div 
                                    className="h-3.5 w-3.5 mr-2 rounded flex items-center justify-center"
                                    style={{ 
                                      backgroundColor: providerFilter.includes('Anthropic') ? '#E9C796' : 'transparent',
                                      border: `1.5px solid ${providerFilter.includes('Anthropic') ? '#E9C796' : '#e1dfdd'}`
                                    }}
                                  >
                                    {providerFilter.includes('Anthropic') && (
                                      <svg className="h-2.5 w-2.5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                      </svg>
                                    )}
                                  </div>
                                  Anthropic
                                </div>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="focus:!bg-[#E9C796]" onSelect={(e) => e.preventDefault()} onClick={() => toggleProviderFilter('Google')}>
                                <div className="flex items-center w-full">
                                  <div 
                                    className="h-3.5 w-3.5 mr-2 rounded flex items-center justify-center"
                                    style={{ 
                                      backgroundColor: providerFilter.includes('Google') ? '#E9C796' : 'transparent',
                                      border: `1.5px solid ${providerFilter.includes('Google') ? '#E9C796' : '#e1dfdd'}`
                                    }}
                                  >
                                    {providerFilter.includes('Google') && (
                                      <svg className="h-2.5 w-2.5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                      </svg>
                                    )}
                                  </div>
                                  Google
                                </div>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="focus:!bg-[#E9C796]" onSelect={(e) => e.preventDefault()} onClick={() => toggleProviderFilter('Azure OpenAI')}>
                                <div className="flex items-center w-full">
                                  <div 
                                    className="h-3.5 w-3.5 mr-2 rounded flex items-center justify-center"
                                    style={{ 
                                      backgroundColor: providerFilter.includes('Azure OpenAI') ? '#E9C796' : 'transparent',
                                      border: `1.5px solid ${providerFilter.includes('Azure OpenAI') ? '#E9C796' : '#e1dfdd'}`
                                    }}
                                  >
                                    {providerFilter.includes('Azure OpenAI') && (
                                      <svg className="h-2.5 w-2.5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                      </svg>
                                    )}
                                  </div>
                                  Azure OpenAI
                                </div>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableHead>
                        <TableHead className="w-[200px] text-xs text-black">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-6 px-0 hover:bg-transparent flex items-center text-black"
                            onClick={() => handleSort('modelId')}
                          >
                            {t.tenantAdmin.modelManagementExtended.modelId}
                            {getSortIcon('modelId')}
                          </Button>
                        </TableHead>
                        <TableHead className="w-[120px] text-xs text-black">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-6 px-0 hover:bg-transparent flex items-center text-black"
                              >
                                Status
                                <Filter className={`h-3 w-3 ml-1 ${statusFilter.length > 0 ? 'text-[#DE851D]' : 'text-black'}`} />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start">
                              <DropdownMenuItem className="focus:!bg-[#E9C796]" onClick={() => handleSort('status')}>
                                <div className="flex items-center w-full">
                                  {getSortIcon('status')}
                                  <span className="ml-2">Sortieren</span>
                                </div>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="focus:!bg-[#E9C796]" onClick={() => setStatusFilter([])}>
                                Filter zurücksetzen
                              </DropdownMenuItem>
                              <div className="border-t my-1" />
                              <DropdownMenuItem className="focus:!bg-[#E9C796]" onSelect={(e) => e.preventDefault()} onClick={() => toggleStatusFilter('active')}>
                                <div className="flex items-center w-full">
                                  <div 
                                    className="h-3.5 w-3.5 mr-2 rounded flex items-center justify-center"
                                    style={{ 
                                      backgroundColor: statusFilter.includes('active') ? '#E9C796' : 'transparent',
                                      border: `1.5px solid ${statusFilter.includes('active') ? '#E9C796' : '#e1dfdd'}`
                                    }}
                                  >
                                    {statusFilter.includes('active') && (
                                      <svg className="h-2.5 w-2.5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                      </svg>
                                    )}
                                  </div>
                                  <CheckCircle2 className="h-3 w-3 mr-2 text-black" />
                                  Aktiv
                                </div>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="focus:!bg-[#E9C796]" onSelect={(e) => e.preventDefault()} onClick={() => toggleStatusFilter('inactive')}>
                                <div className="flex items-center w-full">
                                  <div 
                                    className="h-3.5 w-3.5 mr-2 rounded flex items-center justify-center"
                                    style={{ 
                                      backgroundColor: statusFilter.includes('inactive') ? '#E9C796' : 'transparent',
                                      border: `1.5px solid ${statusFilter.includes('inactive') ? '#E9C796' : '#e1dfdd'}`
                                    }}
                                  >
                                    {statusFilter.includes('inactive') && (
                                      <svg className="h-2.5 w-2.5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                      </svg>
                                    )}
                                  </div>
                                  <Activity className="h-3 w-3 mr-2 text-black" />
                                  Inaktiv
                                </div>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="focus:!bg-[#E9C796]" onSelect={(e) => e.preventDefault()} onClick={() => toggleStatusFilter('error')}>
                                <div className="flex items-center w-full">
                                  <div 
                                    className="h-3.5 w-3.5 mr-2 rounded flex items-center justify-center"
                                    style={{ 
                                      backgroundColor: statusFilter.includes('error') ? '#E9C796' : 'transparent',
                                      border: `1.5px solid ${statusFilter.includes('error') ? '#E9C796' : '#e1dfdd'}`
                                    }}
                                  >
                                    {statusFilter.includes('error') && (
                                      <svg className="h-2.5 w-2.5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                      </svg>
                                    )}
                                  </div>
                                  <XCircle className="h-3 w-3 mr-2 text-black" />
                                  Fehler
                                </div>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableHead>
                        <TableHead className="w-[150px] text-xs text-black">Letzter Test</TableHead>
                        <TableHead className="w-[150px] text-xs text-black">Verwendet von</TableHead>
                        <TableHead className="w-[100px] text-xs text-black text-right">Aktionen</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredModels.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-8" style={{ color: 'var(--foreground-muted)' }}>
                            Keine Modelle gefunden
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredModels.map((model) => (
                          <TableRow 
                            key={model.id}
                            className="hover:bg-[#E9C796] transition-colors"
                          >
                            <TableCell className="w-[200px] py-2 break-words">
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-black break-words">{model.name}</span>
                              </div>
                            </TableCell>
                            <TableCell className="w-[150px] text-xs py-2 text-black break-words">{model.provider}</TableCell>
                            <TableCell className="w-[200px] py-2 break-words">
                              <code className="text-xs px-2 py-1 rounded break-all" style={{ backgroundColor: 'transparent', border: '1px solid #e1dfdd' }}>
                                {model.modelId}
                              </code>
                            </TableCell>
                            <TableCell className="w-[120px] py-2">{getStatusBadge(model.status)}</TableCell>
                            <TableCell className="w-[150px] text-xs py-2 text-black break-words">
                              {model.lastTested || '-'}
                            </TableCell>
                            <TableCell className="w-[150px] py-2">
                              {model.usedBy.length > 0 ? (
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-5 px-1.5 text-xs border border-[#e1dfdd] bg-transparent text-black hover:bg-[#E9C796] transition-colors shrink-0"
                                    >
                                      {model.usedBy.length} {model.usedBy.length === 1 ? 'Agent' : 'Agents'}
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="start">
                                    {model.usedBy.map((agent, idx) => (
                                      <DropdownMenuItem key={idx} className="focus:!bg-[#E9C796]">
                                        {agent}
                                      </DropdownMenuItem>
                                    ))}
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              ) : (
                                <span className="text-sm" style={{ color: 'var(--foreground-muted)' }}>-</span>
                              )}
                            </TableCell>
                            <TableCell className="w-[100px] py-2">
                              <div className="flex items-center justify-end">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button 
                                      variant="ghost" 
                                      size="icon" 
                                      className="h-6 w-6 border border-transparent hover:border-black hover:bg-transparent shrink-0"
                                    >
                                      <MoreVertical className="h-3.5 w-3.5 text-black" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem 
                                      className="focus:!bg-[#E9C796]"
                                      onClick={() => handleEditModel(model)}
                                    >
                                      <Edit className="h-3.5 w-3.5 mr-2" />
                                      {t.tenantAdmin.models.edit}
                                    </DropdownMenuItem>
                                    <DropdownMenuItem 
                                      className="focus:!bg-[#E9C796]"
                                      onClick={() => handleTestConnection(model.id)}
                                      disabled={testingConnection === model.id}
                                    >
                                      {testingConnection === model.id ? (
                                        <Loader2 className="h-3.5 w-3.5 mr-2 animate-spin" />
                                      ) : (
                                        <Zap className="h-3.5 w-3.5 mr-2" />
                                      )}
                                      Testen
                                    </DropdownMenuItem>
                                    <DropdownMenuItem 
                                      className="focus:!bg-[#E9C796]"
                                      onClick={() => handleDuplicateModel(model)}
                                    >
                                      <Copy className="h-3.5 w-3.5 mr-2" />
                                      Kopieren
                                    </DropdownMenuItem>
                                    <DropdownMenuItem 
                                      className="focus:!bg-[#E9C796]"
                                      onClick={handleAddModel}
                                    >
                                      <Plus className="h-3.5 w-3.5 mr-2" />
                                      Neues Modell hinzufügen
                                    </DropdownMenuItem>
                                    <div className="border-t my-1" />
                                    <DropdownMenuItem 
                                      className="focus:!bg-[#E9C796] text-black"
                                      onClick={handleDeleteModel}
                                    >
                                      <Trash2 className="h-3.5 w-3.5 mr-2" />
                                      {t.tenantAdmin.models.delete}
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      </div>

      {/* Transparent Overlay for Right Side Panel */}
      {showModelSheet && (
        <div 
          className="fixed inset-0 bg-transparent"
          style={{ zIndex: 9 }}
          onClick={() => setShowModelSheet(false)}
        />
      )}

      {/* Right Side Panel - Model Edit/Create */}
      <div 
        className="flex flex-col transition-all duration-300 ease-in-out overflow-hidden border-l absolute top-0 right-0 bottom-0"
        style={{ 
          width: showModelSheet ? '400px' : '0px',
          borderColor: showModelSheet ? '#e1dfdd' : 'transparent',
          backgroundColor: '#FFFFFF',
          zIndex: 10
        }}
      >
        {showModelSheet && (
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
                {isNewModel ? (
                  <Plus className="h-5 w-5 flex-shrink-0 text-black" />
                ) : (
                  <Edit className="h-5 w-5 flex-shrink-0 text-black" />
                )}
                <h3 className="font-medium text-black">
                  {isNewModel ? t.tenantAdmin.modelManagementFull.dialog.addNewModel : t.tenantAdmin.modelManagementFull.dialog.editModel}
                </h3>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowModelSheet(false)}
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
                {t.tenantAdmin.modelManagementExtended.basicInformation}
              </h3>

              <div className="space-y-3">
                <Label htmlFor="model-name">{t.tenantAdmin.modelManagementExtended.modelNameLabel}</Label>
                <Input 
                  id="model-name"
                  placeholder={t.tenantAdmin.placeholders.modelName}
                  value={modelName}
                  onChange={(e) => setModelName(e.target.value)}
                  className="h-10"
                  style={{ borderColor: '#e1dfdd' }}
                />
                <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>
                  {t.tenantAdmin.modelManagementExtended.modelNameHelper}
                </p>
              </div>

              <div className="space-y-3">
                <Label htmlFor="provider">{t.tenantAdmin.modelManagementExtended.providerLabel}</Label>
                <Select value={provider} onValueChange={setProvider}>
                  <SelectTrigger id="provider" className="h-10" style={{ borderColor: '#e1dfdd' }}>
                    <SelectValue placeholder={t.tenantAdmin.placeholders.selectProvider} />
                  </SelectTrigger>
                  <SelectContent>
                    {providerOptions.map(p => (
                      <SelectItem key={p.value} value={p.value}>
                        {p.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label htmlFor="model-id">{t.tenantAdmin.modelManagementExtended.modelIdLabel}</Label>
                <Input 
                  id="model-id"
                  placeholder={t.tenantAdmin.placeholders.modelId}
                  value={modelId}
                  onChange={(e) => setModelId(e.target.value)}
                  className="h-10"
                  style={{ borderColor: '#e1dfdd' }}
                />
                <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>
                  {t.tenantAdmin.modelManagementExtended.modelIdDescription}
                </p>
              </div>
            </div>

            <Separator />

            {/* API Configuration */}
            <div className="space-y-5">
              <h3 className="font-medium text-base" style={{ color: 'var(--color-gray-dark)' }}>
                {t.tenantAdmin.modelManagementExtended.apiConfiguration}
              </h3>

              <Alert>
                <AlertDescription className="text-left">
                  {t.tenantAdmin.modelManagementExtended.apiKeySecurityNotice}
                </AlertDescription>
              </Alert>

              <div className="space-y-3">
                <Label htmlFor="api-key">{t.tenantAdmin.modelManagementExtended.apiKeyLabel}</Label>
                <Input 
                  id="api-key"
                  type="password"
                  placeholder={t.tenantAdmin.placeholders.apiKey}
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="h-10 font-mono text-sm"
                  style={{ borderColor: '#e1dfdd' }}
                />
              </div>

              {(provider === "azure" || provider === "custom") && (
                <div className="space-y-3">
                  <Label htmlFor="endpoint">{t.tenantAdmin.modelManagementExtended.endpointLabel}</Label>
                  <Input 
                    id="endpoint"
                    placeholder={t.tenantAdmin.placeholders.endpoint}
                    value={endpoint}
                    onChange={(e) => setEndpoint(e.target.value)}
                    className="h-10 font-mono text-sm"
                    style={{ borderColor: '#e1dfdd' }}
                  />
                  <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>
                    {t.tenantAdmin.modelManagementExtended.endpointHelper}
                  </p>
                </div>
              )}

              <div className="space-y-3">
                <Label htmlFor="notes">{t.tenantAdmin.modelManagementExtended.notes}</Label>
                <Textarea 
                  id="notes"
                  placeholder={t.tenantAdmin.placeholders.notes}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  className="text-left"
                  style={{ borderColor: '#e1dfdd' }}
                />
              </div>
            </div>

            <Separator />

            {/* Usage Information */}
            {!isNewModel && editingModel && (
              <div className="space-y-5">
                <h3 className="font-medium text-base" style={{ color: 'var(--color-gray-dark)' }}>
                  {t.tenantAdmin.modelManagementExtended.usage}
                </h3>

                <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--color-gray-light)' }}>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm" style={{ color: 'var(--foreground-muted)' }}>{t.tenantAdmin.modelManagementExtended.statusLabel}</span>
                      {getStatusBadge(editingModel.status)}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm" style={{ color: 'var(--foreground-muted)' }}>{t.tenantAdmin.modelManagementExtended.addedDate}</span>
                      <span className="text-sm">{editingModel.addedDate}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm" style={{ color: 'var(--foreground-muted)' }}>{t.tenantAdmin.modelManagementExtended.lastTest}</span>
                      <span className="text-sm">{editingModel.lastTested || t.tenantAdmin.modelManagementExtended.never}</span>
                    </div>
                    <div className="flex items-start justify-between">
                      <span className="text-sm" style={{ color: 'var(--foreground-muted)' }}>{t.tenantAdmin.modelManagementExtended.usedIn}</span>
                      <div className="flex flex-col items-end gap-1">
                        {editingModel.usedBy.length > 0 ? (
                          editingModel.usedBy.map((agent, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {agent}
                            </Badge>
                          ))
                        ) : (
                          <span className="text-sm" style={{ color: 'var(--foreground-muted)' }}>
                            {t.tenantAdmin.modelManagementExtended.notYetUsed}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <Separator />

            {/* Actions */}
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="flex-1 h-11"
                onClick={() => setShowModelSheet(false)}
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
                {t.tenantAdmin.models.cancel}
              </Button>
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
                onClick={handleSaveModel}
                disabled={!modelName.trim() || !provider || !modelId.trim() || !apiKey.trim()}
              >
                {isNewModel ? t.tenantAdmin.modelManagementFull.dialog.addModel : t.tenantAdmin.modelManagementFull.dialog.save}
              </Button>
            </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t.tenantAdmin.models.deleteConfirm}</AlertDialogTitle>
            <AlertDialogDescription>
              {t.tenantAdmin.models.deleteMessage}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              className="h-11"
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
              {t.tenantAdmin.models.cancel}
            </AlertDialogCancel>
            <AlertDialogAction
              className="h-11"
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
              onClick={() => {
                if (modelToDelete) {
                  handleDeleteModel(modelToDelete.id);
                }
                setShowDeleteDialog(false);
              }}
            >
              {t.tenantAdmin.models.delete}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}