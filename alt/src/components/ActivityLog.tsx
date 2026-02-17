import { useState, useMemo } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import {
  Search,
  Filter,
  Download,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Info,
  Activity,
} from 'lucide-react';
import { useLanguage } from '../utils/i18n';
import { useNewTranslations } from '../hooks/useNewTranslations';

export interface ActivityLogEntry {
  id: string;
  timestamp: Date;
  userName: string;
  userEmail: string;
  action: string;
  type: 'user' | 'role' | 'permission' | 'settings' | 'data' | 'login';
  severity: 'success' | 'info' | 'warning' | 'error';
  target?: string;
  ipAddress: string;
  details?: Record<string, any>;
  resource?: string;
}

interface ActivityLogProps {
  activities?: ActivityLogEntry[];
  onExport?: (activities: ActivityLogEntry[]) => void;
  isDarkMode?: boolean;
}

// Mock data
const mockActivities: ActivityLogEntry[] = [
  {
    id: '1',
    timestamp: new Date('2025-10-29T14:35:22'),
    userName: 'admin@rmb.ch',
    userEmail: 'admin@rmb.ch',
    action: 'Backup erstellt',
    type: 'data',
    severity: 'success',
    resource: 'AI Hub Main DB',
    ipAddress: '192.168.1.100',
    details: { size: '1.2GB', duration: '45s' }
  },
  {
    id: '2',
    timestamp: new Date('2025-10-29T14:30:15'),
    userName: 'user@neuco.ch',
    userEmail: 'user@neuco.ch',
    action: 'Login',
    type: 'login',
    severity: 'success',
    resource: 'Authentifizierung',
    ipAddress: '192.168.1.145',
  },
  {
    id: '3',
    timestamp: new Date('2025-10-29T14:22:08'),
    userName: 'system',
    userEmail: 'system@aihub.ch',
    action: 'API Rate Limit erreicht',
    type: 'settings',
    severity: 'warning',
    resource: 'Email-Agent',
    ipAddress: '192.168.1.200',
    details: { limit: 1000, current: 1000 }
  },
  {
    id: '4',
    timestamp: new Date('2025-10-29T14:15:45'),
    userName: 'admin@rmb.ch',
    userEmail: 'admin@rmb.ch',
    action: 'Benutzer erstellt',
    type: 'user',
    severity: 'success',
    target: 'Max Mustermann',
    resource: 'User Management',
    ipAddress: '192.168.1.100',
    details: { role: 'User', department: 'Sales' }
  },
  {
    id: '5',
    timestamp: new Date('2025-10-29T14:10:33'),
    userName: 'user@neuco.ch',
    userEmail: 'user@neuco.ch',
    action: 'Fehlerhafte Anmeldung',
    type: 'login',
    severity: 'error',
    resource: 'Authentifizierung',
    ipAddress: '192.168.1.145',
    details: { reason: 'Invalid credentials' }
  },
  {
    id: '6',
    timestamp: new Date('2025-10-29T13:55:12'),
    userName: 'admin@rmb.ch',
    userEmail: 'admin@rmb.ch',
    action: 'Konfiguration geändert',
    type: 'settings',
    severity: 'info',
    resource: 'Normen-Agent',
    ipAddress: '192.168.1.100',
    details: { setting: 'max_tokens', value: 4000 }
  },
  {
    id: '7',
    timestamp: new Date('2025-10-29T13:40:28'),
    userName: 'system',
    userEmail: 'system@aihub.ch',
    action: 'Automatisches Backup',
    type: 'data',
    severity: 'success',
    resource: 'User Analytics DB',
    ipAddress: '127.0.0.1',
  },
  {
    id: '8',
    timestamp: new Date('2025-10-29T13:25:19'),
    userName: 'admin@rmb.ch',
    userEmail: 'admin@rmb.ch',
    action: 'Rolle zugewiesen',
    type: 'role',
    severity: 'success',
    target: 'Power User',
    resource: 'User Management',
    ipAddress: '192.168.1.100',
  },
  {
    id: '9',
    timestamp: new Date('2025-10-29T13:10:55'),
    userName: 'system',
    userEmail: 'system@aihub.ch',
    action: 'Datenbankverbindung fehlgeschlagen',
    type: 'data',
    severity: 'error',
    resource: 'Agent Configuration DB',
    ipAddress: '127.0.0.1',
    details: { error: 'Connection timeout' }
  },
  {
    id: '10',
    timestamp: new Date('2025-10-29T13:00:00'),
    userName: 'system',
    userEmail: 'system@aihub.ch',
    action: 'Täglicher Gesundheitscheck',
    type: 'settings',
    severity: 'success',
    resource: 'System',
    ipAddress: '127.0.0.1',
  },
];

export function ActivityLog({
  activities = mockActivities,
  onExport,
  isDarkMode = false,
}: ActivityLogProps) {
  const { t } = useLanguage();
  const tn = useNewTranslations();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterSeverity, setFilterSeverity] = useState<string>('all');

  // Calculate statistics
  const stats = useMemo(() => {
    return {
      success: activities.filter((a) => a.severity === 'success').length,
      warning: activities.filter((a) => a.severity === 'warning').length,
      error: activities.filter((a) => a.severity === 'error').length,
      info: activities.filter((a) => a.severity === 'info').length,
    };
  }, [activities]);

  // Filter activities
  const filteredActivities = useMemo(() => {
    return activities.filter((activity) => {
      // Search filter
      const matchesSearch =
        searchQuery === '' ||
        activity.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
        activity.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        activity.resource?.toLowerCase().includes(searchQuery.toLowerCase());

      // Severity filter
      const matchesSeverity =
        filterSeverity === 'all' || activity.severity === filterSeverity;

      return matchesSearch && matchesSeverity;
    });
  }, [activities, searchQuery, filterSeverity]);

  const formatTimestamp = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const getStatusIcon = (severity: string) => {
    switch (severity) {
      case 'success':
        return <CheckCircle className="h-4 w-4" style={{ color: '#000000' }} />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4" style={{ color: '#000000' }} />;
      case 'error':
        return <XCircle className="h-4 w-4" style={{ color: '#000000' }} />;
      case 'info':
        return <Info className="h-4 w-4" style={{ color: '#000000' }} />;
      default:
        return null;
    }
  };

  const handleExport = () => {
    if (onExport) {
      onExport(filteredActivities);
    } else {
      // Default export as JSON
      const dataStr = JSON.stringify(filteredActivities, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `activity-log-${Date.now()}.json`;
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Settings Header */}
      <div 
        className="h-14 flex items-center gap-3 px-4"
        style={{ 
          borderBottom: isDarkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.06)',
          backgroundColor: '#DE851D'
        }}
      >
        <Activity className="h-5 w-5 flex-shrink-0" style={{ color: '#000000' }} />
        <h2 className="font-medium" style={{ color: '#000000' }}>
          Aktivitätsprotokoll
        </h2>
      </div>

      {/* Scrollable Content */}
      <div 
        className="flex-1 overflow-auto"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: '#e1dfdd transparent',
        }}
      >
        <style>{`
          .flex-1.overflow-auto::-webkit-scrollbar {
            width: 12px;
            height: 12px;
          }
          .flex-1.overflow-auto::-webkit-scrollbar-track {
            background: transparent;
          }
          .flex-1.overflow-auto::-webkit-scrollbar-thumb {
            background-color: #e1dfdd;
            border-radius: 6px;
            border: 3px solid transparent;
            background-clip: content-box;
          }
          .flex-1.overflow-auto::-webkit-scrollbar-thumb:hover {
            background-color: #d1cfcd;
          }
        `}</style>
        <div className="px-4 sm:px-6 md:px-8 pt-8 pb-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="shadow-sm" style={{ border: '1px solid #e1dfdd' }}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm" style={{ color: '#000000' }}>Erfolgreich</p>
                      <p className="text-3xl mt-1" style={{ color: '#000000' }}>
                        {stats.success}
                      </p>
                    </div>
                    <CheckCircle className="h-6 w-6" style={{ color: '#000000' }} />
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm" style={{ border: '1px solid #e1dfdd' }}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm" style={{ color: '#000000' }}>Warnungen</p>
                      <p className="text-3xl mt-1" style={{ color: '#000000' }}>
                        {stats.warning}
                      </p>
                    </div>
                    <AlertTriangle className="h-6 w-6" style={{ color: '#000000' }} />
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm" style={{ border: '1px solid #e1dfdd' }}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm" style={{ color: '#000000' }}>Fehler</p>
                      <p className="text-3xl mt-1" style={{ color: '#000000' }}>
                        {stats.error}
                      </p>
                    </div>
                    <XCircle className="h-6 w-6" style={{ color: '#000000' }} />
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm" style={{ border: '1px solid #e1dfdd' }}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm" style={{ color: '#000000' }}>Informationen</p>
                      <p className="text-3xl mt-1" style={{ color: '#000000' }}>
                        {stats.info}
                      </p>
                    </div>
                    <Info className="h-6 w-6" style={{ color: '#000000' }} />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Search and Filter Bar */}
            <Card className="shadow-sm" style={{ border: '1px solid #e1dfdd' }}>
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-3">
                  {/* Search */}
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" style={{ color: '#000000' }} />
                      <Input
                        placeholder="Suchen nach Benutzer, Aktion oder Ressource..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9"
                        style={{ border: '1px solid #e1dfdd', color: '#000000' }}
                      />
                    </div>
                  </div>

                  {/* Filter by Status */}
                  <Select value={filterSeverity} onValueChange={setFilterSeverity}>
                    <SelectTrigger 
                      className="w-40" 
                      style={{ border: '1px solid #e1dfdd', color: '#000000' }}
                    >
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Alle Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Alle Status</SelectItem>
                      <SelectItem value="success">Erfolgreich</SelectItem>
                      <SelectItem value="info">Information</SelectItem>
                      <SelectItem value="warning">Warnung</SelectItem>
                      <SelectItem value="error">Fehler</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Export Button */}
                  <Button
                    variant="outline"
                    onClick={handleExport}
                    className="border-[#e1dfdd] hover:bg-[#E9C796] transition-colors"
                    style={{ color: '#000000' }}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Exportieren
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Activities Table */}
            <Card className="shadow-sm" style={{ border: '1px solid #e1dfdd' }}>
              <CardContent className="p-6">
                <div className="mb-4 flex items-center gap-2">
                  <Activity className="h-5 w-5" style={{ color: '#000000' }} />
                  <h3 className="font-semibold" style={{ color: '#000000' }}>({filteredActivities.length})</h3>
                </div>
                <p className="text-sm mb-4" style={{ color: '#000000' }}>
                  Chronologische Auflistung aller System-Aktivitäten
                </p>

                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[80px]">Status</TableHead>
                        <TableHead className="w-[180px]">Zeitstempel</TableHead>
                        <TableHead>Benutzer</TableHead>
                        <TableHead>Aktion</TableHead>
                        <TableHead>Ressource</TableHead>
                        <TableHead>IP-Adresse</TableHead>
                        <TableHead className="w-[120px]">Details</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredActivities.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-8" style={{ color: '#000000' }}>
                            Keine Aktivitäten gefunden
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredActivities.map((activity) => (
                          <TableRow 
                            key={activity.id}
                            className="hover:bg-[#E9C796] transition-colors"
                          >
                            <TableCell>{getStatusIcon(activity.severity)}</TableCell>
                            <TableCell className="text-sm" style={{ color: '#000000' }}>
                              {formatTimestamp(activity.timestamp)}
                            </TableCell>
                            <TableCell className="text-sm" style={{ color: '#000000' }}>
                              {activity.userName}
                            </TableCell>
                            <TableCell className="text-sm" style={{ color: '#000000' }}>{activity.action}</TableCell>
                            <TableCell className="text-sm" style={{ color: '#000000' }}>{activity.resource || '-'}</TableCell>
                            <TableCell className="text-sm" style={{ color: '#000000' }}>
                              {activity.ipAddress}
                            </TableCell>
                            <TableCell className="text-sm" style={{ color: '#000000' }}>
                              {activity.details ? 'Vollständig' : '-'}
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
  );
}