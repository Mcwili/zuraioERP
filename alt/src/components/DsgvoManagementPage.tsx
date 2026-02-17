import { useState, useEffect } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { Switch } from "./ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";
import { Checkbox } from "./ui/checkbox";
import { useLanguage } from "../utils/i18n";
import { 
  Search, 
  Shield,
  Edit,
  Download,
  Trash2,
  MoreVertical,
  Maximize2,
  Filter,
  Check,
  ArrowUpDown,
  ChevronDown,
  X
} from "lucide-react";

type UserSource = "local" | "azure" | "google";
type UserStatus = "active" | "inactive" | "locked";
type UserApproval = "authorized" | "not_authorized";

interface User {
  id: number;
  name: string;
  email: string;
  source: UserSource;
  role: string;
  approval?: UserApproval;
  status: UserStatus;
  lastLogin: string;
  syncedAt?: string;
  groups?: string[];
  isDuplicate?: boolean;
  departments?: string[];
}

interface DsgvoUser extends User {
  dsgvoSettings?: {
    memory: boolean;
    personalization: boolean;
    profiling: boolean;
    orchestrator: boolean;
  };
}

interface DsgvoManagementPageProps {
  isDarkMode?: boolean;
  onPanelOpen?: (panelName: string) => void;
  panelZIndex?: Record<string, number>;
  allUsers?: User[];
  onUsersChange?: (users: User[]) => void;
}

export function DsgvoManagementPage({ isDarkMode, onPanelOpen, panelZIndex, allUsers: propAllUsers, onUsersChange }: DsgvoManagementPageProps) {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showUserDrawer, setShowUserDrawer] = useState(false);
  const [selectedUser, setSelectedUser] = useState<DsgvoUser | null>(null);
  const [isMaximized, setIsMaximized] = useState(false);
  
  // Filter states
  const [memoryFilter, setMemoryFilter] = useState<boolean[]>([]);
  const [personalizationFilter, setPersonalizationFilter] = useState<boolean[]>([]);
  const [profilingFilter, setProfilingFilter] = useState<boolean[]>([]);
  const [orchestratorFilter, setOrchestratorFilter] = useState<boolean[]>([]);
  
  // Default DSGVO settings for users
  const defaultDsgvoSettings = {
    memory: true,
    personalization: true,
    profiling: true,
    orchestrator: true
  };

  // Get specific DSGVO settings based on user name
  const getDsgvoSettingsForUser = (user: User): DsgvoUser['dsgvoSettings'] => {
    // Check if user already has settings
    if ((user as DsgvoUser).dsgvoSettings) {
      return (user as DsgvoUser).dsgvoSettings;
    }
    
    // Specific settings for Monika Frey
    if (user.name === 'Monika Frey') {
      return {
        memory: true,
        personalization: true,
        profiling: false,
        orchestrator: true
      };
    }
    
    // Specific settings for Fritz Baumann
    if (user.name === 'Fritz Baumann') {
      return {
        memory: false,
        personalization: false,
        profiling: false,
        orchestrator: false
      };
    }
    
    // Default settings for all other users
    return defaultDsgvoSettings;
  };

  // Use prop data if available, otherwise fall back to local state with initial data
  const defaultUsers: User[] = propAllUsers || [];
  const [allUsers, setAllUsers] = useState<User[]>(defaultUsers);

  // Sync with prop changes
  useEffect(() => {
    if (propAllUsers) {
      setAllUsers(propAllUsers);
    }
  }, [propAllUsers]);

  // Update parent when local state changes
  useEffect(() => {
    if (onUsersChange && allUsers !== propAllUsers) {
      onUsersChange(allUsers);
    }
  }, [allUsers, onUsersChange, propAllUsers]);

  // Convert users to DSGVO users with settings
  const dsgvoUsers: DsgvoUser[] = allUsers.map(user => ({
    ...user,
    dsgvoSettings: getDsgvoSettingsForUser(user)
  }));

  // Filter users based on search and filters
  const filteredUsers = dsgvoUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesMemory = memoryFilter.length === 0 || memoryFilter.includes(user.dsgvoSettings?.memory || false);
    const matchesPersonalization = personalizationFilter.length === 0 || personalizationFilter.includes(user.dsgvoSettings?.personalization || false);
    const matchesProfiling = profilingFilter.length === 0 || profilingFilter.includes(user.dsgvoSettings?.profiling || false);
    const matchesOrchestrator = orchestratorFilter.length === 0 || orchestratorFilter.includes(user.dsgvoSettings?.orchestrator || false);
    
    return matchesSearch && matchesMemory && matchesPersonalization && matchesProfiling && matchesOrchestrator;
  });

  const handleEditUser = (user: DsgvoUser) => {
    setSelectedUser(user);
    setShowUserDrawer(true);
    if (onPanelOpen) {
      onPanelOpen('dsgvoEdit');
    }
  };

  const handleSaveUser = () => {
    if (!selectedUser) return;

    // Update user with new DSGVO settings
    const updatedUsers = allUsers.map(u => 
      u.id === selectedUser.id 
        ? { ...u, dsgvoSettings: selectedUser.dsgvoSettings } as DsgvoUser
        : u
    );
    
    setAllUsers(updatedUsers);
    setShowUserDrawer(false);
  };

  const handleDownloadData = (user: DsgvoUser, type: 'usage' | 'export' | 'delete') => {
    // Mock download functionality
    const fileName = `${user.name.replace(/\s+/g, '_')}_${type}_${new Date().toISOString().split('T')[0]}.json`;
    console.log(`Downloading ${fileName} for user ${user.name}`);
    // In real implementation, this would trigger actual data download
  };

  const handleDeleteUserData = (user: DsgvoUser) => {
    console.log(`Deleting data for user ${user.name}`);
    // In real implementation, this would trigger data deletion
  };

  const getBadgeStyle = (isActive: boolean, accentOnActive: boolean = false) => ({
    backgroundColor: accentOnActive 
      ? (isActive ? '#E9C796' : 'transparent')
      : (isActive ? 'transparent' : '#E9C796'),
    color: '#000',
    border: '1px solid #e1dfdd'
  });

  const toggleFilter = (value: boolean, filterState: boolean[], setFilterState: (state: boolean[]) => void) => {
    if (filterState.includes(value)) {
      setFilterState(filterState.filter(v => v !== value));
    } else {
      setFilterState([...filterState, value]);
    }
  };

  const FilterPopover = ({ 
    title, 
    filterState, 
    setFilterState 
  }: { 
    title: string; 
    filterState: boolean[]; 
    setFilterState: (state: boolean[]) => void;
  }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <button
            className="flex items-center gap-1 cursor-pointer hover:opacity-80"
            style={{ background: 'none', border: 'none', padding: 0, color: '#000000' }}
          >
            {title}
            <ChevronDown className="h-3.5 w-3.5" style={{ color: filterState.length > 0 ? '#DE851D' : '#666' }} />
          </button>
        </PopoverTrigger>
        <PopoverContent 
          className="w-56" 
          align="start" 
          style={{ border: '1px solid #e1dfdd', backgroundColor: 'white' }}
          onPointerDownOutside={() => setIsOpen(false)}
        >
          <div className="space-y-3">
            {/* Sort Section */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm" style={{ color: '#666' }}>
                <ArrowUpDown className="h-3.5 w-3.5" />
                <span>Sortieren</span>
              </div>
              <div 
                className="flex items-center px-2 py-1.5 rounded cursor-pointer transition-colors"
                style={{ color: '#000' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E9C796'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                onClick={(e) => {
                  e.stopPropagation();
                  // Add sort logic here
                }}
              >
                <span className="text-sm">Aufsteigend</span>
              </div>
              <div 
                className="flex items-center px-2 py-1.5 rounded cursor-pointer transition-colors"
                style={{ color: '#000' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E9C796'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                onClick={(e) => {
                  e.stopPropagation();
                  // Add sort logic here
                }}
              >
                <span className="text-sm">Absteigend</span>
              </div>
            </div>

            <Separator style={{ backgroundColor: '#e1dfdd' }} />

            {/* Filter Section */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm" style={{ color: '#666' }}>
                <Filter className="h-3.5 w-3.5" />
                <span>Filter</span>
              </div>
              <div 
                className="flex items-center gap-2 px-2 py-1.5 rounded cursor-pointer transition-colors"
                style={{ color: '#000' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E9C796'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                onPointerDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleFilter(true, filterState, setFilterState);
                }}
              >
                <div 
                  className="flex items-center justify-center w-4 h-4 border rounded"
                  style={{
                    borderColor: '#e1dfdd',
                    backgroundColor: filterState.includes(true) ? '#E9C796' : 'transparent'
                  }}
                >
                  {filterState.includes(true) && (
                    <Check className="h-3 w-3" style={{ color: '#000' }} />
                  )}
                </div>
                <span className="text-sm">Aktiviert</span>
              </div>
              <div 
                className="flex items-center gap-2 px-2 py-1.5 rounded cursor-pointer transition-colors"
                style={{ color: '#000' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E9C796'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                onPointerDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleFilter(false, filterState, setFilterState);
                }}
              >
                <div 
                  className="flex items-center justify-center w-4 h-4 border rounded"
                  style={{
                    borderColor: '#e1dfdd',
                    backgroundColor: filterState.includes(false) ? '#E9C796' : 'transparent'
                  }}
                >
                  {filterState.includes(false) && (
                    <Check className="h-3 w-3" style={{ color: '#000' }} />
                  )}
                </div>
                <span className="text-sm">Deaktiviert</span>
              </div>
            </div>

            {filterState.length > 0 && (
              <>
                <Separator style={{ backgroundColor: '#e1dfdd' }} />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFilterState([]);
                  }}
                  className="w-full"
                  style={{ border: '1px solid #e1dfdd', backgroundColor: 'white', color: '#000' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E9C796'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                >
                  Filter zurücksetzen
                </Button>
              </>
            )}
          </div>
        </PopoverContent>
      </Popover>
    );
  };

  return (
    <div 
      className="flex-1 flex flex-col overflow-hidden"
      style={isMaximized ? {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 9999,
        backgroundColor: '#FFFFFF'
      } : undefined}
    >
      {/* DSGVO Management Header */}
      <div 
        className="h-14 flex items-center gap-3 px-4"
        style={{ 
          borderBottom: isDarkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.06)',
          backgroundColor: '#DE851D'
        }}
      >
        <Shield className="h-5 w-5 flex-shrink-0" style={{ color: '#000000' }} />
        <h2 className="font-medium" style={{ color: '#000000' }}>
          DSGVO Verwaltung
        </h2>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-auto">
        <div className="px-8 pt-8 pb-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Toolbar */}
            <Card className="shadow-sm" style={{ border: '1px solid #e1dfdd' }}>
              <CardContent className="!pt-3 !pb-3 px-[24px]">
                <div className="flex items-center gap-2">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: 'var(--foreground-muted)' }} />
                    <Input 
                      placeholder="Benutzer suchen..."
                      className="pl-9 h-8"
                      style={{ borderColor: '#e1dfdd' }}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* DSGVO Table */}
            <Card className="shadow-sm" style={{ border: '1px solid #e1dfdd' }}>
              <CardContent className="p-0">
                {/* Title inside table card */}
                <div className="px-6 py-4" style={{ borderBottom: '1px solid #e1dfdd' }}>
                  <h4 className="font-semibold" style={{ color: '#000000' }}>
                    DSGVO Verwaltung
                  </h4>
                </div>
                <div className="overflow-x-auto">
                  <Table style={{ tableLayout: 'fixed', width: '100%' }}>
                    <TableHeader>
                      <TableRow style={{ borderBottom: '1px solid #e1dfdd' }}>
                        <TableHead className="w-[200px] pl-6" style={{ color: '#000000' }}>Name</TableHead>
                        <TableHead className="w-[150px]" style={{ color: '#000000' }}>
                          <FilterPopover 
                            title="Memory" 
                            filterState={memoryFilter} 
                            setFilterState={setMemoryFilter}
                          />
                        </TableHead>
                        <TableHead className="w-[180px]" style={{ color: '#000000' }}>
                          <FilterPopover 
                            title="Personalisierung" 
                            filterState={personalizationFilter} 
                            setFilterState={setPersonalizationFilter}
                          />
                        </TableHead>
                        <TableHead className="w-[150px]" style={{ color: '#000000' }}>
                          <FilterPopover 
                            title="Profilbildung" 
                            filterState={profilingFilter} 
                            setFilterState={setProfilingFilter}
                          />
                        </TableHead>
                        <TableHead className="w-[150px]" style={{ color: '#000000' }}>
                          <FilterPopover 
                            title="Orchestrator" 
                            filterState={orchestratorFilter} 
                            setFilterState={setOrchestratorFilter}
                          />
                        </TableHead>
                        <TableHead className="w-[140px] text-center" style={{ color: '#000000' }}>Daten-Verwendung</TableHead>
                        <TableHead className="w-[120px] text-center" style={{ color: '#000000' }}>Daten Export</TableHead>
                        <TableHead className="w-[120px] text-center" style={{ color: '#000000' }}>Daten Löschen</TableHead>
                        <TableHead className="w-[80px] text-center" style={{ color: '#000000' }}>Aktionen</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.map((user) => (
                        <TableRow 
                          key={user.id} 
                          style={{ borderBottom: '1px solid #e1dfdd' }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E9C796'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                          className="transition-colors cursor-pointer"
                        >
                          <TableCell className="pl-6">
                            <div style={{ color: '#000000', wordWrap: 'break-word', overflowWrap: 'break-word' }}>{user.name}</div>
                          </TableCell>
                          <TableCell>
                            <div className="flex justify-start">
                              <Badge variant="secondary" style={getBadgeStyle(user.dsgvoSettings?.memory || false)}>
                                {user.dsgvoSettings?.memory ? 'Aktiviert' : 'Deaktiviert'}
                              </Badge>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex justify-start">
                              <Badge variant="secondary" style={getBadgeStyle(user.dsgvoSettings?.personalization || false)}>
                                {user.dsgvoSettings?.personalization ? 'Aktiviert' : 'Deaktiviert'}
                              </Badge>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex justify-start">
                              <Badge variant="secondary" style={getBadgeStyle(user.dsgvoSettings?.profiling || false, true)}>
                                {user.dsgvoSettings?.profiling ? 'Aktiviert' : 'Deaktiviert'}
                              </Badge>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex justify-start">
                              <Badge variant="secondary" style={getBadgeStyle(user.dsgvoSettings?.orchestrator || false)}>
                                {user.dsgvoSettings?.orchestrator ? 'Aktiviert' : 'Deaktiviert'}
                              </Badge>
                            </div>
                          </TableCell>
                          <TableCell className="text-center">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDownloadData(user, 'usage')}
                              className="h-6 px-2"
                              style={{ border: '1px solid #e1dfdd', backgroundColor: 'white' }}
                              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E9C796'}
                              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                            >
                              <Download className="h-3.5 w-3.5" />
                            </Button>
                          </TableCell>
                          <TableCell className="text-center">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDownloadData(user, 'export')}
                              className="h-6 px-2"
                              style={{ border: '1px solid #e1dfdd', backgroundColor: 'white' }}
                              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E9C796'}
                              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                            >
                              <Download className="h-3.5 w-3.5" />
                            </Button>
                          </TableCell>
                          <TableCell className="text-center">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteUserData(user)}
                              className="h-6 px-2"
                              style={{ border: '1px solid #e1dfdd', backgroundColor: 'white' }}
                              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E9C796'}
                              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </TableCell>
                          <TableCell className="text-center">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  style={{ border: '1px solid #e1dfdd', backgroundColor: 'white' }}
                                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E9C796'}
                                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                                >
                                  <MoreVertical className="h-3.5 w-3.5" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" style={{ border: '1px solid #e1dfdd' }}>
                                <DropdownMenuItem 
                                  onClick={() => handleEditUser(user)}
                                  className="focus:!bg-[#E9C796] cursor-pointer"
                                >
                                  <Edit className="h-4 w-4 mr-2" />
                                  Bearbeiten
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Transparent Overlay for Right Side Panel */}
      {showUserDrawer && (
        <div 
          className="fixed inset-0 bg-transparent"
          style={{ zIndex: 9 }}
          onClick={() => setShowUserDrawer(false)}
        />
      )}

      {/* Right Side Panel - DSGVO Edit */}
      <div 
        className="flex flex-col transition-all duration-300 ease-in-out overflow-hidden border-l absolute top-0 right-0 bottom-0"
        style={{ 
          width: showUserDrawer ? '400px' : '0px',
          borderColor: showUserDrawer ? '#e1dfdd' : 'transparent',
          backgroundColor: '#FFFFFF',
          zIndex: panelZIndex?.['dsgvoEdit'] || 10
        }}
      >
        {showUserDrawer && selectedUser && (
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
                <Shield className="h-5 w-5 flex-shrink-0 text-black" />
                <h3 className="font-medium text-black">
                  DSGVO Einstellungen bearbeiten
                </h3>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowUserDrawer(false)}
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

              <div className="space-y-6">
            {/* User Info */}
            <div className="space-y-2">
              <div style={{ color: '#000000' }}>{selectedUser?.name}</div>
              <div className="text-sm" style={{ color: '#666' }}>{selectedUser?.email}</div>
            </div>

            {/* Memory Setting */}
            <div className="flex items-start gap-3">
              <div className="flex-1">
                <Label className="font-semibold" style={{ color: '#000000' }}>Memory</Label>
                <p className="text-sm mt-1" style={{ color: '#666' }}>
                  Ist Memory aktiviert, werden frühere Nachrichten berücksichtigt.
                </p>
              </div>
              <Switch
                checked={selectedUser?.dsgvoSettings?.memory || false}
                onCheckedChange={(checked) => {
                  if (selectedUser) {
                    setSelectedUser({
                      ...selectedUser,
                      dsgvoSettings: {
                        ...selectedUser.dsgvoSettings,
                        memory: checked
                      }
                    });
                  }
                }}
                className="flex-shrink-0 mt-1"
              />
            </div>

            {/* Personalization Setting */}
            <div className="flex items-start gap-3">
              <div className="flex-1">
                <Label className="font-semibold" style={{ color: '#000000' }}>Personalisierung</Label>
                <p className="text-sm mt-1" style={{ color: '#666' }}>
                  Entscheidungen von Agenten oder Orchestrator werden anhand des Profils / Rolle in der Unternehmung angepasst.
                </p>
              </div>
              <Switch
                checked={selectedUser?.dsgvoSettings?.personalization || false}
                onCheckedChange={(checked) => {
                  if (selectedUser) {
                    setSelectedUser({
                      ...selectedUser,
                      dsgvoSettings: {
                        ...selectedUser.dsgvoSettings,
                        personalization: checked
                      }
                    });
                  }
                }}
                className="flex-shrink-0 mt-1"
              />
            </div>

            {/* Profiling Setting */}
            <div className="flex items-start gap-3">
              <div className="flex-1">
                <Label className="font-semibold" style={{ color: '#000000' }}>Profilbildung</Label>
                <p className="text-sm mt-1" style={{ color: '#666' }}>
                  Es wird ein grundsätzliches Profil über die Person erstellt. Dies ermöglicht eine gezieltere Interaktion mit der KI.
                </p>
                <p className="text-sm mt-2" style={{ color: '#666' }}>
                  <strong>Achtung!</strong> Ausdrückliche Zustimmung vom Mitarbeiter erforderlich!
                </p>
              </div>
              <Switch
                checked={selectedUser?.dsgvoSettings?.profiling || false}
                onCheckedChange={(checked) => {
                  if (selectedUser) {
                    setSelectedUser({
                      ...selectedUser,
                      dsgvoSettings: {
                        ...selectedUser.dsgvoSettings,
                        profiling: checked
                      }
                    });
                  }
                }}
                className="flex-shrink-0 mt-1"
              />
            </div>

            {/* Orchestrator Setting */}
            <div className="flex items-start gap-3">
              <div className="flex-1">
                <Label className="font-semibold" style={{ color: '#000000' }}>Orchestrator</Label>
                <p className="text-sm mt-1" style={{ color: '#666' }}>
                  Ist der Orchestrator deaktiviert kann der Mitarbeiter nur direkt auf LLM's oder Agenten zugreifen. Kein Routing über den Orchestrator. Diese Funktion wird nur benötigt, wenn der Mitarbeiter keine personenbezogenen Datenverarbeitung zulassen möchte.
                </p>
              </div>
              <Switch
                checked={selectedUser?.dsgvoSettings?.orchestrator || false}
                onCheckedChange={(checked) => {
                  if (selectedUser) {
                    setSelectedUser({
                      ...selectedUser,
                      dsgvoSettings: {
                        ...selectedUser.dsgvoSettings,
                        orchestrator: checked
                      }
                    });
                  }
                }}
                className="flex-shrink-0 mt-1"
              />
            </div>
              </div>
            </div>

            {/* Panel Footer */}
            <div 
              className="px-6 py-4 border-t"
              style={{ borderColor: '#e1dfdd' }}
            >
              <div className="flex gap-2">
                <Button 
                  className="flex-1"
                  style={{
                    backgroundColor: 'transparent',
                    borderColor: '#e1dfdd',
                    color: 'black',
                    borderWidth: '1px',
                    borderStyle: 'solid'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#E9C796';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                  onClick={() => setShowUserDrawer(false)}
                >
                  Abbrechen
                </Button>
                <Button 
                  className="flex-1"
                  style={{
                    backgroundColor: 'transparent',
                    borderColor: '#e1dfdd',
                    color: 'black',
                    borderWidth: '1px',
                    borderStyle: 'solid'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#E9C796';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                  onClick={handleSaveUser}
                >
                  Speichern
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}