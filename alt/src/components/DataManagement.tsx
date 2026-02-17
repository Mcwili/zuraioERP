import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Database,
  Download,
  Upload,
  Trash2,
  Archive,
  CheckCircle2,
  Clock,
  HardDrive,
  AlertTriangle,
  RefreshCw,
  FileArchive,
  Calendar,
  Activity,
  MoreVertical,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Filter
} from "lucide-react";
import { useLanguage } from "../utils/i18n";

interface Backup {
  id: string;
  name: string;
  database: string;
  version: string;
  size: string;
  date: string;
  status: 'completed' | 'in_progress' | 'failed';
  type: 'manual' | 'automatic';
}

interface DatabaseInfo {
  id: string;
  name: string;
  size: string;
  tables: number;
  lastBackup: string;
}

interface DataManagementProps {
  isDarkMode?: boolean;
}

export function DataManagement({ isDarkMode = false }: DataManagementProps) {
  const { t } = useLanguage();
  
  const [backups, setBackups] = useState<Backup[]>([
    {
      id: "1",
      name: "Full Backup - Production",
      database: "AI Hub Main DB",
      version: "v2.1.0",
      size: "245 MB",
      date: "2025-10-28 14:30",
      status: "completed",
      type: "manual"
    },
    {
      id: "2",
      name: "Scheduled Backup",
      database: "AI Hub Main DB",
      version: "v2.0.9",
      size: "238 MB",
      date: "2025-10-27 03:00",
      status: "completed",
      type: "automatic"
    },
    {
      id: "3",
      name: "Full Backup - Production",
      database: "User Analytics DB",
      version: "v1.5.2",
      size: "89 MB",
      date: "2025-10-26 18:45",
      status: "completed",
      type: "manual"
    },
    {
      id: "4",
      name: "Scheduled Backup",
      database: "AI Hub Main DB",
      version: "v2.0.8",
      size: "235 MB",
      date: "2025-10-26 03:00",
      status: "failed",
      type: "automatic"
    }
  ]);

  const [databases] = useState<DatabaseInfo[]>([
    {
      id: "1",
      name: "AI Hub Main DB",
      size: "1.2 GB",
      tables: 45,
      lastBackup: "2025-10-28 14:30"
    },
    {
      id: "2",
      name: "User Analytics DB",
      size: "450 MB",
      tables: 18,
      lastBackup: "2025-10-26 18:45"
    },
    {
      id: "3",
      name: "Agent Configuration DB",
      size: "125 MB",
      tables: 12,
      lastBackup: "2025-10-25 09:15"
    }
  ]);

  const [selectedDatabase, setSelectedDatabase] = useState<string>("all");
  const [backupName, setBackupName] = useState("");
  const [isCreatingBackup, setIsCreatingBackup] = useState(false);
  const [backupProgress, setBackupProgress] = useState(0);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [backupToDelete, setBackupToDelete] = useState<string | null>(null);
  const [restoreDialogOpen, setRestoreDialogOpen] = useState(false);
  const [backupToRestore, setBackupToRestore] = useState<Backup | null>(null);

  // Sort & Filter States
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [databaseFilter, setDatabaseFilter] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [typeFilter, setTypeFilter] = useState<string[]>([]);

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

  const toggleDatabaseFilter = (database: string) => {
    setDatabaseFilter(prev => 
      prev.includes(database) 
        ? prev.filter(d => d !== database)
        : [...prev, database]
    );
  };

  const toggleStatusFilter = (status: string) => {
    setStatusFilter(prev => 
      prev.includes(status) 
        ? prev.filter(s => s !== status)
        : [...prev, status]
    );
  };

  const toggleTypeFilter = (type: string) => {
    setTypeFilter(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  // Get unique databases for filter
  const uniqueDatabases = Array.from(new Set(backups.map(b => b.database)));

  // Filtered and sorted backups
  const filteredBackups = backups.filter(backup => {
    const matchesDatabase = databaseFilter.length === 0 || databaseFilter.includes(backup.database);
    const matchesStatus = statusFilter.length === 0 || statusFilter.includes(backup.status);
    const matchesType = typeFilter.length === 0 || typeFilter.includes(backup.type);
    return matchesDatabase && matchesStatus && matchesType;
  }).sort((a, b) => {
    if (!sortColumn) return 0;
    
    let aValue: any, bValue: any;
    
    switch (sortColumn) {
      case 'name':
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
        break;
      case 'database':
        aValue = a.database.toLowerCase();
        bValue = b.database.toLowerCase();
        break;
      case 'version':
        aValue = a.version.toLowerCase();
        bValue = b.version.toLowerCase();
        break;
      case 'size':
        aValue = parseFloat(a.size.replace(' MB', ''));
        bValue = parseFloat(b.size.replace(' MB', ''));
        break;
      case 'date':
        aValue = a.date;
        bValue = b.date;
        break;
      case 'type':
        aValue = a.type;
        bValue = b.type;
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

  const handleCreateBackup = async () => {
    setIsCreatingBackup(true);
    setBackupProgress(0);

    // Simulate backup progress
    const interval = setInterval(() => {
      setBackupProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsCreatingBackup(false);
          
          // Add new backup to list
          const newBackup: Backup = {
            id: String(Date.now()),
            name: backupName || "Manual Backup",
            database: selectedDatabase === "all" ? t.tenantAdmin.dataManagementExtended.backups.allDatabases : databases.find(db => db.id === selectedDatabase)?.name || "",
            version: "v2.1.1",
            size: "250 MB",
            date: new Date().toLocaleString('de-DE', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit'
            }),
            status: "completed",
            type: "manual"
          };
          
          setBackups([newBackup, ...backups]);
          setBackupName("");
          setSelectedDatabase("all");
          
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const handleDownloadBackup = (backup: Backup) => {
    // Simulate download
    console.log("Downloading backup:", backup.name);
    // In real implementation, this would trigger a file download
  };

  const handleUploadBackup = () => {
    // Simulate file upload
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.sql,.zip,.tar.gz';
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (file) {
        console.log("Uploading backup:", file.name);
        // In real implementation, this would upload and process the file
      }
    };
    input.click();
  };

  const handleDeleteBackup = (backupId: string) => {
    setBackupToDelete(backupId);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteBackup = () => {
    if (backupToDelete) {
      setBackups(backups.filter(b => b.id !== backupToDelete));
      setBackupToDelete(null);
    }
    setDeleteDialogOpen(false);
  };

  const handleRestoreBackup = (backup: Backup) => {
    setBackupToRestore(backup);
    setRestoreDialogOpen(true);
  };

  const confirmRestoreBackup = () => {
    if (backupToRestore) {
      console.log("Restoring backup:", backupToRestore.name);
      // In real implementation, this would restore the database
    }
    setRestoreDialogOpen(false);
    setBackupToRestore(null);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <Badge 
            variant="outline"
            style={{
              borderColor: '#e1dfdd',
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
            <CheckCircle2 className="h-3 w-3 mr-1" />
            {t.tenantAdmin.dataManagementExtended.ui.statusCompleted}
          </Badge>
        );
      case 'in_progress':
        return (
          <Badge 
            variant="outline"
            style={{
              borderColor: '#e1dfdd',
              color: '#000000',
              backgroundColor: '#E9C796'
            }}
          >
            <Clock className="h-3 w-3 mr-1" />
            {t.tenantAdmin.dataManagementExtended.ui.statusInProgress}
          </Badge>
        );
      case 'failed':
        return (
          <Badge 
            variant="outline"
            style={{
              borderColor: '#e1dfdd',
              color: '#000000',
              backgroundColor: '#E9C796'
            }}
          >
            <AlertTriangle className="h-3 w-3 mr-1" />
            {t.tenantAdmin.dataManagementExtended.ui.statusFailed}
          </Badge>
        );
      default:
        return null;
    }
  };

  const totalBackupSize = backups.reduce((acc, backup) => {
    const size = parseFloat(backup.size.replace(' MB', ''));
    return acc + size;
  }, 0);

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Backup Header */}
      <div 
        className="h-14 flex items-center gap-3 px-4"
        style={{ 
          borderBottom: isDarkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.06)',
          backgroundColor: '#DE851D'
        }}
      >
        <Database className="h-5 w-5 flex-shrink-0" style={{ color: '#000000' }} />
        <h2 className="font-medium" style={{ color: '#000000' }}>
          {t.tenantAdmin.dataManagementExtended.ui.title}
        </h2>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-auto main-scrollbar">
        <style>{`
          .main-scrollbar::-webkit-scrollbar {
            width: 8px;
            background-color: transparent;
          }
          .main-scrollbar::-webkit-scrollbar-track {
            background-color: transparent;
          }
          .main-scrollbar::-webkit-scrollbar-thumb {
            background-color: #e1dfdd;
            border-radius: 4px;
          }
          .main-scrollbar::-webkit-scrollbar-thumb:hover {
            background-color: #d1cfcd;
          }
        `}</style>
        <div className="px-8 pt-8 pb-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="shadow-sm" style={{ border: '1px solid #e1dfdd' }}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm" style={{ color: '#000000' }}>{t.tenantAdmin.dataManagementExtended.ui.databases}</p>
                      <p className="text-2xl mt-1" style={{ color: '#000000' }}>
                        {databases.length}
                      </p>
                    </div>
                    <Database className="h-8 w-8" style={{ color: '#000000' }} />
                  </div>
                </CardContent>
              </Card>

              <Card 
                className="shadow-sm cursor-pointer transition-all" 
                style={{ 
                  border: '1px solid #e1dfdd',
                  backgroundColor: statusFilter.includes('completed') ? '#E9C796' : '#FFFFFF'
                }}
                onClick={() => toggleStatusFilter('completed')}
                onMouseEnter={(e) => {
                  if (!statusFilter.includes('completed')) {
                    e.currentTarget.style.backgroundColor = '#E9C796';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!statusFilter.includes('completed')) {
                    e.currentTarget.style.backgroundColor = '#FFFFFF';
                  }
                }}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm" style={{ color: '#000000' }}>{t.tenantAdmin.dataManagementExtended.ui.successful}</p>
                      <p className="text-2xl mt-1" style={{ color: '#000000' }}>
                        {backups.filter(b => b.status === 'completed').length}
                      </p>
                    </div>
                    <CheckCircle2 
                      className="h-8 w-8" 
                      style={{ color: '#000000' }} 
                    />
                  </div>
                </CardContent>
              </Card>

              <Card 
                className="shadow-sm cursor-pointer transition-all" 
                style={{ 
                  border: '1px solid #e1dfdd',
                  backgroundColor: statusFilter.includes('failed') ? '#E9C796' : '#FFFFFF'
                }}
                onClick={() => toggleStatusFilter('failed')}
                onMouseEnter={(e) => {
                  if (!statusFilter.includes('failed')) {
                    e.currentTarget.style.backgroundColor = '#E9C796';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!statusFilter.includes('failed')) {
                    e.currentTarget.style.backgroundColor = '#FFFFFF';
                  }
                }}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm" style={{ color: '#000000' }}>{t.tenantAdmin.dataManagementExtended.ui.failed}</p>
                      <p className="text-2xl mt-1" style={{ color: '#000000' }}>
                        {backups.filter(b => b.status === 'failed').length}
                      </p>
                    </div>
                    <AlertTriangle 
                      className="h-8 w-8" 
                      style={{ color: '#000000' }} 
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Create Backup Section */}
            <Card className="shadow-sm" style={{ border: '1px solid #e1dfdd' }}>
              <CardHeader>
                <CardTitle style={{ color: '#000000' }}>
                  {t.tenantAdmin.dataManagementExtended.ui.newBackup}
                </CardTitle>
                <CardDescription style={{ color: '#000000' }}>
                  {t.tenantAdmin.dataManagementExtended.ui.newBackupDesc}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="backup-name">{t.tenantAdmin.dataManagementExtended.ui.backupName}</Label>
                    <Input
                      id="backup-name"
                      placeholder={t.tenantAdmin.dataManagementExtended.ui.backupNamePlaceholder}
                      value={backupName}
                      onChange={(e) => setBackupName(e.target.value)}
                      disabled={isCreatingBackup}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="database-select">{t.tenantAdmin.dataManagementExtended.ui.selectDatabase}</Label>
                    <Select 
                      value={selectedDatabase} 
                      onValueChange={setSelectedDatabase}
                      disabled={isCreatingBackup}
                    >
                      <SelectTrigger id="database-select">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{t.tenantAdmin.dataManagementExtended.backups.allDatabases}</SelectItem>
                        {databases.map(db => (
                          <SelectItem key={db.id} value={db.id}>{db.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {isCreatingBackup && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span style={{ color: 'var(--foreground-muted)' }}>{t.tenantAdmin.dataManagementExtended.ui.creating}</span>
                      <span style={{ color: 'var(--color-gray-dark)' }}>{backupProgress}%</span>
                    </div>
                    <Progress value={backupProgress} className="h-2" />
                  </div>
                )}

                <div className="flex gap-2">
                  <Button
                    onClick={handleCreateBackup}
                    disabled={isCreatingBackup}
                    variant="outline"
                    style={{
                      borderColor: '#e1dfdd',
                      color: '#000000',
                      backgroundColor: 'transparent'
                    }}
                    onMouseEnter={(e) => {
                      if (!isCreatingBackup) {
                        e.currentTarget.style.backgroundColor = '#E9C796';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isCreatingBackup) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }
                    }}
                  >
                    {isCreatingBackup ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        {t.tenantAdmin.dataManagementExtended.ui.beingCreated}
                      </>
                    ) : (
                      <>
                        <Database className="h-4 w-4 mr-2" />
                        {t.tenantAdmin.dataManagementExtended.ui.createBackup}
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleUploadBackup}
                    disabled={isCreatingBackup}
                    style={{
                      borderColor: '#e1dfdd',
                      color: '#000000',
                      backgroundColor: 'transparent'
                    }}
                    onMouseEnter={(e) => {
                      if (!isCreatingBackup) {
                        e.currentTarget.style.backgroundColor = '#E9C796';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isCreatingBackup) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }
                    }}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    {t.tenantAdmin.dataManagementExtended.ui.uploadBackup}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Databases Overview */}
            <Card className="shadow-sm" style={{ border: '1px solid #e1dfdd' }}>
              <CardHeader>
                <CardTitle style={{ color: '#000000' }}>
                  {t.tenantAdmin.dataManagementExtended.ui.databasesTitle}
                </CardTitle>
                <CardDescription style={{ color: '#000000' }}>
                  {t.tenantAdmin.dataManagementExtended.ui.databasesDesc}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t.tenantAdmin.dataManagementExtended.ui.name}</TableHead>
                      <TableHead>{t.tenantAdmin.dataManagementExtended.ui.size}</TableHead>
                      <TableHead>{t.tenantAdmin.dataManagementExtended.ui.tables}</TableHead>
                      <TableHead>{t.tenantAdmin.dataManagementExtended.ui.lastBackup}</TableHead>
                      <TableHead className="text-right">{t.tenantAdmin.dataManagementExtended.ui.actions}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {databases.map((db) => (
                      <TableRow 
                        key={db.id}
                        className="transition-colors"
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#E9C796';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                      >
                        <TableCell>
                          <span>{db.name}</span>
                        </TableCell>
                        <TableCell>{db.size}</TableCell>
                        <TableCell>{db.tables}</TableCell>
                        <TableCell className="text-xs" style={{ color: 'var(--foreground-muted)' }}>
                          {db.lastBackup}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              setSelectedDatabase(db.id);
                              handleCreateBackup();
                            }}
                            className="text-black h-6 px-2 text-xs"
                            style={{ border: '1px solid #e1dfdd', backgroundColor: 'transparent' }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = '#E9C796';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = 'transparent';
                            }}
                          >
                            <Archive className="h-3 w-3 mr-1" />
                            {t.tenantAdmin.dataManagementExtended.ui.backup}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Backup History */}
            <Card className="shadow-sm" style={{ border: '1px solid #e1dfdd' }}>
              <CardHeader>
                <CardTitle style={{ color: '#000000' }}>
                  {t.tenantAdmin.dataManagementExtended.ui.backupHistory}
                </CardTitle>
                <CardDescription style={{ color: '#000000' }}>
                  {t.tenantAdmin.dataManagementExtended.ui.backupHistoryDesc}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div 
                  className="overflow-auto"
                  style={{
                    scrollbarWidth: 'thin',
                    scrollbarColor: '#e1dfdd transparent'
                  }}
                >
                  <style>
                    {`
                      .overflow-auto::-webkit-scrollbar {
                        width: 8px;
                        height: 8px;
                      }
                      .overflow-auto::-webkit-scrollbar-track {
                        background: transparent;
                      }
                      .overflow-auto::-webkit-scrollbar-thumb {
                        background-color: #e1dfdd;
                        border-radius: 4px;
                      }
                      .overflow-auto::-webkit-scrollbar-thumb:hover {
                        background-color: #e1dfdd;
                      }
                    `}
                  </style>
                  <Table>
                    <TableHeader>
                      <TableRow className="h-8">
                        <TableHead className="text-xs text-black">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-6 px-0 hover:bg-transparent flex items-center text-black"
                            onClick={() => handleSort('name')}
                          >
                            {t.tenantAdmin.dataManagementExtended.ui.name}
                            {getSortIcon('name')}
                          </Button>
                        </TableHead>
                        <TableHead className="text-xs text-black">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-6 px-0 hover:bg-transparent flex items-center text-black"
                              >
                                {t.tenantAdmin.dataManagementExtended.ui.database}
                                <Filter className={`h-3 w-3 ml-1 ${databaseFilter.length > 0 ? 'text-[#DE851D]' : 'text-black'}`} />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start">
                              <DropdownMenuItem className="focus:!bg-[#E9C796]" onClick={() => handleSort('database')}>
                                <div className="flex items-center w-full">
                                  {getSortIcon('database')}
                                  <span className="ml-2">{t.tenantAdmin.dataManagementExtended.ui.sort}</span>
                                </div>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="focus:!bg-[#E9C796]" onClick={() => setDatabaseFilter([])}>
                                {t.tenantAdmin.dataManagementExtended.ui.resetFilters}
                              </DropdownMenuItem>
                              <div className="border-t my-1" />
                              {uniqueDatabases.map((database) => (
                                <DropdownMenuItem key={database} className="focus:!bg-[#E9C796]" onSelect={(e) => e.preventDefault()} onClick={() => toggleDatabaseFilter(database)}>
                                  <div className="flex items-center w-full">
                                    <div 
                                      className="h-3.5 w-3.5 mr-2 rounded flex items-center justify-center"
                                      style={{ 
                                        backgroundColor: databaseFilter.includes(database) ? '#E9C796' : 'transparent',
                                        border: `1.5px solid ${databaseFilter.includes(database) ? '#E9C796' : '#e1dfdd'}`
                                      }}
                                    >
                                      {databaseFilter.includes(database) && (
                                        <svg className="h-2.5 w-2.5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                      )}
                                    </div>
                                    {database}
                                  </div>
                                </DropdownMenuItem>
                              ))}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableHead>
                        <TableHead className="text-xs text-black">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-6 px-0 hover:bg-transparent flex items-center text-black"
                            onClick={() => handleSort('version')}
                          >
                            {t.tenantAdmin.dataManagementExtended.ui.version}
                            {getSortIcon('version')}
                          </Button>
                        </TableHead>
                        <TableHead className="text-xs text-black">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-6 px-0 hover:bg-transparent flex items-center text-black"
                            onClick={() => handleSort('size')}
                          >
                            {t.tenantAdmin.dataManagementExtended.ui.size}
                            {getSortIcon('size')}
                          </Button>
                        </TableHead>
                        <TableHead className="text-xs text-black">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-6 px-0 hover:bg-transparent flex items-center text-black"
                            onClick={() => handleSort('date')}
                          >
                            {t.tenantAdmin.dataManagementExtended.ui.date}
                            {getSortIcon('date')}
                          </Button>
                        </TableHead>
                        <TableHead className="text-xs text-black">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-6 px-0 hover:bg-transparent flex items-center text-black"
                              >
                                {t.tenantAdmin.dataManagementExtended.ui.type}
                                <Filter className={`h-3 w-3 ml-1 ${typeFilter.length > 0 ? 'text-[#DE851D]' : 'text-black'}`} />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start">
                              <DropdownMenuItem className="focus:!bg-[#E9C796]" onClick={() => handleSort('type')}>
                                <div className="flex items-center w-full">
                                  {getSortIcon('type')}
                                  <span className="ml-2">{t.tenantAdmin.dataManagementExtended.ui.sort}</span>
                                </div>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="focus:!bg-[#E9C796]" onClick={() => setTypeFilter([])}>
                                {t.tenantAdmin.dataManagementExtended.ui.resetFilters}
                              </DropdownMenuItem>
                              <div className="border-t my-1" />
                              <DropdownMenuItem className="focus:!bg-[#E9C796]" onSelect={(e) => e.preventDefault()} onClick={() => toggleTypeFilter('manual')}>
                                <div className="flex items-center w-full">
                                  <div 
                                    className="h-3.5 w-3.5 mr-2 rounded flex items-center justify-center"
                                    style={{ 
                                      backgroundColor: typeFilter.includes('manual') ? '#E9C796' : 'transparent',
                                      border: `1.5px solid ${typeFilter.includes('manual') ? '#E9C796' : '#e1dfdd'}`
                                    }}
                                  >
                                    {typeFilter.includes('manual') && (
                                      <svg className="h-2.5 w-2.5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                      </svg>
                                    )}
                                  </div>
                                  {t.tenantAdmin.dataManagementExtended.ui.manual}
                                </div>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="focus:!bg-[#E9C796]" onSelect={(e) => e.preventDefault()} onClick={() => toggleTypeFilter('automatic')}>
                                <div className="flex items-center w-full">
                                  <div 
                                    className="h-3.5 w-3.5 mr-2 rounded flex items-center justify-center"
                                    style={{ 
                                      backgroundColor: typeFilter.includes('automatic') ? '#E9C796' : 'transparent',
                                      border: `1.5px solid ${typeFilter.includes('automatic') ? '#E9C796' : '#e1dfdd'}`
                                    }}
                                  >
                                    {typeFilter.includes('automatic') && (
                                      <svg className="h-2.5 w-2.5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                      </svg>
                                    )}
                                  </div>
                                  {t.tenantAdmin.dataManagementExtended.ui.automatic}
                                </div>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableHead>
                        <TableHead className="text-xs text-black">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-6 px-0 hover:bg-transparent flex items-center text-black"
                              >
                                {t.tenantAdmin.dataManagementExtended.ui.status}
                                <Filter className={`h-3 w-3 ml-1 ${statusFilter.length > 0 ? 'text-[#DE851D]' : 'text-black'}`} />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start">
                              <DropdownMenuItem className="focus:!bg-[#E9C796]" onClick={() => handleSort('status')}>
                                <div className="flex items-center w-full">
                                  {getSortIcon('status')}
                                  <span className="ml-2">{t.tenantAdmin.dataManagementExtended.ui.sort}</span>
                                </div>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="focus:!bg-[#E9C796]" onClick={() => setStatusFilter([])}>
                                {t.tenantAdmin.dataManagementExtended.ui.resetFilters}
                              </DropdownMenuItem>
                              <div className="border-t my-1" />
                              <DropdownMenuItem className="focus:!bg-[#E9C796]" onSelect={(e) => e.preventDefault()} onClick={() => toggleStatusFilter('completed')}>
                                <div className="flex items-center w-full">
                                  <div 
                                    className="h-3.5 w-3.5 mr-2 rounded flex items-center justify-center"
                                    style={{ 
                                      backgroundColor: statusFilter.includes('completed') ? '#E9C796' : 'transparent',
                                      border: `1.5px solid ${statusFilter.includes('completed') ? '#E9C796' : '#e1dfdd'}`
                                    }}
                                  >
                                    {statusFilter.includes('completed') && (
                                      <svg className="h-2.5 w-2.5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                      </svg>
                                    )}
                                  </div>
                                  {t.tenantAdmin.dataManagementExtended.ui.statusCompleted}
                                </div>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="focus:!bg-[#E9C796]" onSelect={(e) => e.preventDefault()} onClick={() => toggleStatusFilter('in_progress')}>
                                <div className="flex items-center w-full">
                                  <div 
                                    className="h-3.5 w-3.5 mr-2 rounded flex items-center justify-center"
                                    style={{ 
                                      backgroundColor: statusFilter.includes('in_progress') ? '#E9C796' : 'transparent',
                                      border: `1.5px solid ${statusFilter.includes('in_progress') ? '#E9C796' : '#e1dfdd'}`
                                    }}
                                  >
                                    {statusFilter.includes('in_progress') && (
                                      <svg className="h-2.5 w-2.5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                      </svg>
                                    )}
                                  </div>
                                  {t.tenantAdmin.dataManagementExtended.ui.statusInProgress}
                                </div>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="focus:!bg-[#E9C796]" onSelect={(e) => e.preventDefault()} onClick={() => toggleStatusFilter('failed')}>
                                <div className="flex items-center w-full">
                                  <div 
                                    className="h-3.5 w-3.5 mr-2 rounded flex items-center justify-center"
                                    style={{ 
                                      backgroundColor: statusFilter.includes('failed') ? '#E9C796' : 'transparent',
                                      border: `1.5px solid ${statusFilter.includes('failed') ? '#E9C796' : '#e1dfdd'}`
                                    }}
                                  >
                                    {statusFilter.includes('failed') && (
                                      <svg className="h-2.5 w-2.5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                      </svg>
                                    )}
                                  </div>
                                  {t.tenantAdmin.dataManagementExtended.ui.statusFailed}
                                </div>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableHead>
                        <TableHead className="text-right text-xs text-black">{t.tenantAdmin.dataManagementExtended.ui.actions}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredBackups.map((backup) => (
                        <TableRow 
                          key={backup.id}
                          className="transition-colors"
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#E9C796';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                          }}
                        >
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <span>{backup.name}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-xs">{backup.database}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{backup.version}</Badge>
                          </TableCell>
                          <TableCell className="text-xs">{backup.size}</TableCell>
                          <TableCell className="text-xs" style={{ color: 'var(--foreground-muted)' }}>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {backup.date}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge 
                              variant="outline"
                              style={{
                                borderColor: '#e1dfdd',
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
                              {backup.type === 'manual' ? t.tenantAdmin.dataManagementExtended.ui.manual : t.tenantAdmin.dataManagementExtended.ui.automatic}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {getStatusBadge(backup.status)}
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  style={{
                                    border: 'none',
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
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  className="focus:!bg-[#E9C796]"
                                  onClick={() => handleDownloadBackup(backup)}
                                  disabled={backup.status !== 'completed'}
                                >
                                  <Download className="h-4 w-4 mr-2" />
                                  {t.tenantAdmin.dataManagementExtended.ui.download}
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="focus:!bg-[#E9C796]"
                                  onClick={() => handleRestoreBackup(backup)}
                                  disabled={backup.status !== 'completed'}
                                >
                                  <RefreshCw className="h-4 w-4 mr-2" />
                                  {t.tenantAdmin.dataManagementExtended.ui.restore}
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="focus:!bg-[#E9C796]"
                                  onClick={() => handleDeleteBackup(backup.id)}
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  {t.tenantAdmin.dataManagementExtended.ui.delete}
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

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t.tenantAdmin.dataManagementExtended.ui.deleteTitle}</AlertDialogTitle>
            <AlertDialogDescription>
              {t.tenantAdmin.dataManagementExtended.ui.deleteMessage}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t.cancel}</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeleteBackup}
              className="bg-red-600 hover:bg-red-700"
            >
              {t.tenantAdmin.dataManagementExtended.ui.delete}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Restore Confirmation Dialog */}
      <AlertDialog open={restoreDialogOpen} onOpenChange={setRestoreDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t.tenantAdmin.dataManagementExtended.ui.restoreTitle}</AlertDialogTitle>
            <AlertDialogDescription>
              {t.tenantAdmin.dataManagementExtended.ui.restoreMessage}
              {backupToRestore && (
                <div className="mt-4 p-3 rounded-lg" style={{ backgroundColor: 'var(--color-gray-light)' }}>
                  <p className="text-sm mb-1"><strong>{t.tenantAdmin.dataManagementExtended.ui.backupLabel}</strong> {backupToRestore.name}</p>
                  <p className="text-sm mb-1"><strong>{t.tenantAdmin.dataManagementExtended.ui.databaseLabel}</strong> {backupToRestore.database}</p>
                  <p className="text-sm mb-1"><strong>{t.tenantAdmin.dataManagementExtended.ui.versionLabel}</strong> {backupToRestore.version}</p>
                  <p className="text-sm"><strong>{t.tenantAdmin.dataManagementExtended.ui.dateLabel}</strong> {backupToRestore.date}</p>
                </div>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t.cancel}</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmRestoreBackup}
              style={{
                background: 'linear-gradient(135deg, #5ebc67 0%, #7ed87e 100%)',
                color: 'white'
              }}
            >
              {t.tenantAdmin.dataManagementExtended.ui.restore}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}