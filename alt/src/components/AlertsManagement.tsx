import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Switch } from "./ui/switch";
import { Textarea } from "./ui/textarea";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
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
  Bell,
  BellOff,
  AlertTriangle,
  AlertCircle,
  Info,
  CheckCircle2,
  Mail,
  MessageSquare,
  Plus,
  Settings as SettingsIcon,
  Trash2,
  Clock,
  TrendingUp,
  Shield,
  MoreVertical,
  Search,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Edit,
  Filter,
  Copy,
  X
} from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { useExtendedTranslations } from "../utils/i18n";

interface Alert {
  id: string;
  name: string;
  type: 'error' | 'warning' | 'info';
  condition: string;
  threshold: string;
  enabled: boolean;
  lastTriggered?: string;
  triggerCount: number;
  channels: ('email' | 'slack')[];
}

interface AlertNotification {
  id: string;
  alertName: string;
  message: string;
  severity: 'critical' | 'warning' | 'info';
  timestamp: string;
  acknowledged: boolean;
}

interface AlertsManagementProps {
  isDarkMode?: boolean;
}

export function AlertsManagement({ isDarkMode = false }: AlertsManagementProps) {
  const { t } = useLanguage();
  const tAlerts = t.tenantAdmin.alertsManagement;
  const tExt = useExtendedTranslations();
  
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: "1",
      name: "CPU Auslastung Kritisch",
      type: "error",
      condition: "CPU Auslastung > 85%",
      threshold: "85%",
      enabled: true,
      lastTriggered: "2025-10-28 16:45",
      triggerCount: 3,
      channels: ['email', 'slack']
    },
    {
      id: "2",
      name: "Speicher Fast Voll",
      type: "warning",
      condition: "Festplatte > 80%",
      threshold: "80%",
      enabled: true,
      lastTriggered: "2025-10-27 09:20",
      triggerCount: 1,
      channels: ['email']
    },
    {
      id: "3",
      name: "API Antwortzeit Hoch",
      type: "warning",
      condition: "Antwortzeit > 500ms",
      threshold: "500ms",
      enabled: true,
      lastTriggered: "2025-10-29 12:15",
      triggerCount: 8,
      channels: ['email', 'slack']
    },
    {
      id: "4",
      name: "Service Offline",
      type: "error",
      condition: "Service Status = Offline",
      threshold: "N/A",
      enabled: true,
      channels: ['email', 'slack']
    },
    {
      id: "5",
      name: "Backup Fehlgeschlagen",
      type: "error",
      condition: "Backup Status = Failed",
      threshold: "N/A",
      enabled: true,
      lastTriggered: "2025-10-26 03:05",
      triggerCount: 1,
      channels: ['email']
    },
    {
      id: "6",
      name: "Ungewöhnlicher Traffic",
      type: "info",
      condition: "Requests > 10,000/h",
      threshold: "10,000/h",
      enabled: false,
      channels: ['slack']
    }
  ]);

  const [notifications, setNotifications] = useState<AlertNotification[]>([
    {
      id: "1",
      alertName: "API Antwortzeit Hoch",
      message: "Die durchschnittliche API Antwortzeit liegt bei 678ms und überschreitet den Schwellenwert von 500ms.",
      severity: "warning",
      timestamp: "2025-10-29 12:15",
      acknowledged: false
    },
    {
      id: "2",
      alertName: "CPU Auslastung Kritisch",
      message: "CPU Auslastung hat 92% erreicht. Sofortige Maßnahmen erforderlich.",
      severity: "critical",
      timestamp: "2025-10-28 16:45",
      acknowledged: true
    },
    {
      id: "3",
      alertName: "Speicher Fast Voll",
      message: "Festplattenauslastung liegt bei 83%. Bitte prüfen und bereinigen.",
      severity: "warning",
      timestamp: "2025-10-27 09:20",
      acknowledged: true
    },
    {
      id: "4",
      alertName: "Backup Fehlgeschlagen",
      message: "Das geplante Backup um 03:00 Uhr ist fehlgeschlagen. Fehlercode: DB_TIMEOUT",
      severity: "critical",
      timestamp: "2025-10-26 03:05",
      acknowledged: true
    }
  ]);

  const [showAlertPanel, setShowAlertPanel] = useState(false);
  const [newAlertName, setNewAlertName] = useState("");
  const [newAlertType, setNewAlertType] = useState<'error' | 'warning' | 'info'>('warning');
  const [newAlertCondition, setNewAlertCondition] = useState("");
  const [newAlertThreshold, setNewAlertThreshold] = useState("");
  const [newAlertChannels, setNewAlertChannels] = useState<('email' | 'slack')[]>(['email']);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<keyof Alert | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Filter states
  const [typeFilter, setTypeFilter] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [channelFilter, setChannelFilter] = useState<string[]>([]);

  // Delete confirmation dialog
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [alertToDelete, setAlertToDelete] = useState<string | null>(null);

  // Edit mode
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingAlertId, setEditingAlertId] = useState<string | null>(null);

  const toggleAlert = (alertId: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId ? { ...alert, enabled: !alert.enabled } : alert
    ));
  };

  const deleteAlert = (alertId: string) => {
    setAlerts(alerts.filter(alert => alert.id !== alertId));
  };

  const duplicateAlert = (alertId: string) => {
    const alertToDuplicate = alerts.find(alert => alert.id === alertId);
    if (alertToDuplicate) {
      const duplicatedAlert: Alert = {
        ...alertToDuplicate,
        id: String(Date.now()),
        name: `${alertToDuplicate.name} (Kopie)`,
        triggerCount: 0,
        lastTriggered: undefined
      };
      setAlerts([duplicatedAlert, ...alerts]);
    }
  };

  const acknowledgeNotification = (notificationId: string) => {
    setNotifications(notifications.map(notif =>
      notif.id === notificationId ? { ...notif, acknowledged: true } : notif
    ));
  };

  const createAlert = () => {
    const newAlert: Alert = {
      id: String(Date.now()),
      name: newAlertName,
      type: newAlertType,
      condition: newAlertCondition,
      threshold: newAlertThreshold,
      enabled: true,
      triggerCount: 0,
      channels: newAlertChannels
    };
    
    setAlerts([newAlert, ...alerts]);
    setShowAlertPanel(false);
    setNewAlertName("");
    setNewAlertCondition("");
    setNewAlertThreshold("");
    setNewAlertChannels(['email']);
    setNewAlertType('warning');
  };

  const openEditAlert = (alertId: string) => {
    const alertToEdit = alerts.find(alert => alert.id === alertId);
    if (alertToEdit) {
      setNewAlertName(alertToEdit.name);
      setNewAlertType(alertToEdit.type);
      setNewAlertCondition(alertToEdit.condition);
      setNewAlertThreshold(alertToEdit.threshold);
      setNewAlertChannels(alertToEdit.channels);
      setIsEditMode(true);
      setEditingAlertId(alertId);
      setShowAlertPanel(true);
    }
  };

  const saveAlert = () => {
    if (isEditMode && editingAlertId) {
      // Update existing alert
      setAlerts(alerts.map(alert => 
        alert.id === editingAlertId 
          ? {
              ...alert,
              name: newAlertName,
              type: newAlertType,
              condition: newAlertCondition,
              threshold: newAlertThreshold,
              channels: newAlertChannels
            }
          : alert
      ));
    } else {
      // Create new alert
      const newAlert: Alert = {
        id: String(Date.now()),
        name: newAlertName,
        type: newAlertType,
        condition: newAlertCondition,
        threshold: newAlertThreshold,
        enabled: true,
        triggerCount: 0,
        channels: newAlertChannels
      };
      setAlerts([newAlert, ...alerts]);
    }
    
    // Reset form
    setShowAlertPanel(false);
    setNewAlertName("");
    setNewAlertCondition("");
    setNewAlertThreshold("");
    setNewAlertChannels(['email']);
    setNewAlertType('warning');
    setIsEditMode(false);
    setEditingAlertId(null);
  };

  const closePanel = () => {
    setShowAlertPanel(false);
    setNewAlertName("");
    setNewAlertCondition("");
    setNewAlertThreshold("");
    setNewAlertChannels(['email']);
    setNewAlertType('warning');
    setIsEditMode(false);
    setEditingAlertId(null);
  };

  const getAlertTypeIcon = (type: string) => {
    switch (type) {
      case 'error':
        return <AlertCircle className="h-4 w-4" style={{ color: '#000000' }} />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4" style={{ color: '#000000' }} />;
      case 'info':
        return <Info className="h-4 w-4" style={{ color: '#000000' }} />;
      default:
        return null;
    }
  };

  const getAlertTypeBadge = (type: string) => {
    const badgeStyle = {
      border: '1px solid #e1dfdd',
      color: '#000000',
      backgroundColor: 'transparent',
      transition: 'background-color 0.2s'
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLSpanElement>) => {
      e.currentTarget.style.backgroundColor = '#E9C796';
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLSpanElement>) => {
      e.currentTarget.style.backgroundColor = 'transparent';
    };

    switch (type) {
      case 'error':
        return (
          <Badge 
            style={badgeStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {tAlerts.types.error}
          </Badge>
        );
      case 'warning':
        return (
          <Badge 
            style={badgeStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {tAlerts.types.warning}
          </Badge>
        );
      case 'info':
        return (
          <Badge 
            style={badgeStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {tAlerts.types.info}
          </Badge>
        );
      default:
        return null;
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'critical':
        return (
          <Badge 
            style={{
              border: '1px solid #e1dfdd',
              color: '#000000',
              backgroundColor: '#E9C796'
            }}
          >
            <AlertCircle className="h-3 w-3 mr-1" />
            {tAlerts.severity.critical}
          </Badge>
        );
      case 'warning':
        return (
          <Badge 
            style={{
              border: '1px solid #e1dfdd',
              color: '#000000',
              backgroundColor: '#E9C796'
            }}
          >
            <AlertTriangle className="h-3 w-3 mr-1" />
            {tAlerts.severity.warning}
          </Badge>
        );
      case 'info':
        return (
          <Badge 
            style={{
              border: '1px solid #e1dfdd',
              color: '#000000',
              backgroundColor: 'transparent'
            }}
          >
            <Info className="h-3 w-3 mr-1" />
            {tAlerts.severity.info}
          </Badge>
        );
      default:
        return null;
    }
  };

  const activeAlerts = alerts.filter(a => a.enabled).length;
  const unacknowledgedNotifications = notifications.filter(n => !n.acknowledged).length;
  const totalTriggers = alerts.reduce((sum, alert) => sum + (alert.triggerCount || 0), 0);

  const handleSort = (field: keyof Alert) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (field: keyof Alert) => {
    if (sortField !== field) {
      return <ArrowUpDown className="h-4 w-4 ml-1" style={{ color: '#000000' }} />;
    }
    return sortDirection === 'asc' 
      ? <ArrowUp className="h-4 w-4 ml-1" style={{ color: '#000000' }} />
      : <ArrowDown className="h-4 w-4 ml-1" style={{ color: '#000000' }} />;
  };

  const filteredAndSortedAlerts = alerts
    .filter(alert => {
      // Search filter
      const matchesSearch = alert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alert.condition.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alert.threshold.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Type filter
      const matchesType = typeFilter.length === 0 || typeFilter.includes(alert.type);
      
      // Status filter
      const matchesStatus = statusFilter.length === 0 || 
        (statusFilter.includes('active') && alert.enabled) ||
        (statusFilter.includes('inactive') && !alert.enabled);
      
      // Channel filter
      const matchesChannel = channelFilter.length === 0 ||
        channelFilter.some(channel => alert.channels.includes(channel as 'email' | 'slack'));
      
      return matchesSearch && matchesType && matchesStatus && matchesChannel;
    })
    .sort((a, b) => {
      if (!sortField) return 0;
      
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (aValue === undefined || bValue === undefined) return 0;
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }
      
      return 0;
    });

  const toggleTypeFilter = (type: string) => {
    setTypeFilter(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const toggleStatusFilter = (status: string) => {
    setStatusFilter(prev =>
      prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]
    );
  };

  const toggleChannelFilter = (channel: string) => {
    setChannelFilter(prev =>
      prev.includes(channel) ? prev.filter(c => c !== channel) : [...prev, channel]
    );
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden relative">
      {/* Alerts Header */}
      <div 
        className="h-14 flex items-center gap-3 px-4"
        style={{ 
          borderBottom: isDarkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.06)',
          backgroundColor: '#DE851D'
        }}
      >
        <Bell className="h-5 w-5 flex-shrink-0" style={{ color: '#000000' }} />
        <h2 className="font-medium" style={{ color: '#000000' }}>
          {tAlerts.title}
        </h2>
      </div>

      {/* Main Content Wrapper */}
      <div className="flex-1 flex overflow-hidden">
        {/* Scrollable Content */}
        <div className="flex-1 overflow-auto">
          <div className="px-8 pt-8 pb-8">
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="shadow-sm" style={{ border: '1px solid #e1dfdd' }}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm" style={{ color: '#000000' }}>{tAlerts.stats.activeAlerts}</p>
                        <p className="text-2xl mt-1" style={{ color: '#000000' }}>{activeAlerts}</p>
                      </div>
                      <Bell className="h-8 w-8" style={{ color: '#000000' }} />
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-sm" style={{ border: '1px solid #e1dfdd' }}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm" style={{ color: '#000000' }}>{tAlerts.stats.unacknowledged}</p>
                        <p className="text-2xl mt-1" style={{ color: '#000000' }}>{unacknowledgedNotifications}</p>
                      </div>
                      <AlertTriangle className="h-8 w-8" style={{ color: '#000000' }} />
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-sm" style={{ border: '1px solid #e1dfdd' }}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm" style={{ color: '#000000' }}>{tAlerts.stats.triggers24h}</p>
                        <p className="text-2xl mt-1" style={{ color: '#000000' }}>{totalTriggers}</p>
                      </div>
                      <TrendingUp className="h-8 w-8" style={{ color: '#000000' }} />
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-sm" style={{ border: '1px solid #e1dfdd' }}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm" style={{ color: '#000000' }}>{tAlerts.stats.totalAlerts}</p>
                        <p className="text-2xl mt-1" style={{ color: '#000000' }}>{alerts.length}</p>
                      </div>
                      <Shield className="h-8 w-8" style={{ color: '#000000' }} />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Notifications */}
              <Card className="shadow-sm" style={{ border: '1px solid #e1dfdd' }}>
                <CardHeader>
                  <CardTitle style={{ color: '#000000' }}>
                    {tAlerts.notifications.title}
                  </CardTitle>
                  <CardDescription style={{ color: '#000000' }}>
                    {tAlerts.notifications.subtitle}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className="p-2 rounded-lg border"
                        style={{
                          borderColor: notification.acknowledged ? '#e1dfdd' : '#e1dfdd',
                          backgroundColor: 'transparent'
                        }}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center gap-2">
                              {getSeverityBadge(notification.severity)}
                              <span className="text-sm" style={{ color: 'var(--color-gray-dark)' }}>
                                {notification.alertName}
                              </span>
                            </div>
                            <p className="text-sm" style={{ color: 'var(--foreground-muted)' }}>
                              {notification.message}
                            </p>
                            <div className="flex items-center gap-1 text-xs" style={{ color: 'var(--foreground-muted)' }}>
                              <Clock className="h-3 w-3" />
                              {notification.timestamp}
                            </div>
                          </div>
                          {!notification.acknowledged && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => acknowledgeNotification(notification.id)}
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
                              <CheckCircle2 className="h-4 w-4 mr-1" />
                              {tAlerts.notifications.acknowledge}
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Alert Rules */}
              <Card className="shadow-sm" style={{ border: '1px solid #e1dfdd' }}>
                <CardHeader>
                  <CardTitle style={{ color: '#000000' }}>
                    {tAlerts.rules.title}
                  </CardTitle>
                  <CardDescription style={{ color: '#000000' }}>
                    {tAlerts.rules.subtitle}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Search Bar */}
                  <div className="mb-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" style={{ color: '#000000' }} />
                      <Input
                        placeholder={tAlerts.rules.searchPlaceholder}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                        style={{
                          border: '1px solid #e1dfdd',
                          backgroundColor: 'transparent'
                        }}
                      />
                    </div>
                  </div>

                  {/* Scrollable Table Container */}
                  <div 
                    className="overflow-auto"
                    style={{
                      maxHeight: '600px',
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
                          background-color: #d1cfcd;
                        }
                        .alerts-table-row {
                          transition: background-color 0.2s;
                        }
                        .alerts-table-row:hover {
                          background-color: #E9C796 !important;
                        }
                      `}
                    </style>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>
                            <button
                              onClick={() => handleSort('name')}
                              className="flex items-center hover:opacity-70"
                              style={{ color: '#000000' }}
                            >
                              {tAlerts.table.name}
                              {getSortIcon('name')}
                            </button>
                          </TableHead>
                          <TableHead>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-6 px-0 hover:bg-transparent flex items-center text-black"
                                >
                                  {tAlerts.table.type}
                                  <Filter className="h-3.5 w-3.5 ml-1" style={{ color: typeFilter.length > 0 ? '#DE851D' : '#000000' }} />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="start">
                                {['error', 'warning', 'info'].map((type) => (
                                  <DropdownMenuItem 
                                    key={type}
                                    onClick={(e) => {
                                      e.preventDefault();
                                      toggleTypeFilter(type);
                                    }}
                                  >
                                    <div 
                                      className="flex items-center justify-between w-full cursor-pointer"
                                      style={{
                                        backgroundColor: typeFilter.includes(type) ? '#E9C796' : 'transparent',
                                        padding: '4px 8px',
                                        borderRadius: '4px',
                                        margin: '-4px -8px'
                                      }}
                                    >
                                      {type === 'error' ? tAlerts.types.error : type === 'warning' ? tAlerts.types.warning : tAlerts.types.info}
                                    </div>
                                  </DropdownMenuItem>
                                ))}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableHead>
                          <TableHead>
                            <button
                              onClick={() => handleSort('condition')}
                              className="flex items-center hover:opacity-70"
                              style={{ color: '#000000' }}
                            >
                              {tAlerts.table.condition}
                              {getSortIcon('condition')}
                            </button>
                          </TableHead>
                          <TableHead>
                            <button
                              onClick={() => handleSort('threshold')}
                              className="flex items-center hover:opacity-70"
                              style={{ color: '#000000' }}
                            >
                              {tAlerts.table.threshold}
                              {getSortIcon('threshold')}
                            </button>
                          </TableHead>
                          <TableHead>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-6 px-0 hover:bg-transparent flex items-center text-black"
                                >
                                  {tAlerts.table.channels}
                                  <Filter className="h-3.5 w-3.5 ml-1" style={{ color: channelFilter.length > 0 ? '#DE851D' : '#000000' }} />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="start">
                                {['email', 'slack'].map((channel) => (
                                  <DropdownMenuItem 
                                    key={channel}
                                    onClick={(e) => {
                                      e.preventDefault();
                                      toggleChannelFilter(channel);
                                    }}
                                  >
                                    <div 
                                      className="flex items-center justify-between w-full cursor-pointer"
                                      style={{
                                        backgroundColor: channelFilter.includes(channel) ? '#E9C796' : 'transparent',
                                        padding: '4px 8px',
                                        borderRadius: '4px',
                                        margin: '-4px -8px'
                                      }}
                                    >
                                      {channel === 'email' ? tAlerts.channels.email : tAlerts.channels.slack}
                                    </div>
                                  </DropdownMenuItem>
                                ))}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableHead>
                          <TableHead>
                            <button
                              onClick={() => handleSort('triggerCount')}
                              className="flex items-center hover:opacity-70"
                              style={{ color: '#000000' }}
                            >
                              {tAlerts.table.triggers}
                              {getSortIcon('triggerCount')}
                            </button>
                          </TableHead>
                          <TableHead style={{ color: '#000000' }}>{tAlerts.table.lastTrigger}</TableHead>
                          <TableHead>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-6 px-0 hover:bg-transparent flex items-center text-black"
                                >
                                  {tAlerts.table.status}
                                  <Filter className="h-3.5 w-3.5 ml-1" style={{ color: statusFilter.length > 0 ? '#DE851D' : '#000000' }} />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="start">
                                {['active', 'inactive'].map((status) => (
                                  <DropdownMenuItem 
                                    key={status}
                                    onClick={(e) => {
                                      e.preventDefault();
                                      toggleStatusFilter(status);
                                    }}
                                  >
                                    <div 
                                      className="flex items-center justify-between w-full cursor-pointer"
                                      style={{
                                        backgroundColor: statusFilter.includes(status) ? '#E9C796' : 'transparent',
                                        padding: '4px 8px',
                                        borderRadius: '4px',
                                        margin: '-4px -8px'
                                      }}
                                    >
                                      {status === 'active' ? tAlerts.status.active : tAlerts.status.inactive}
                                    </div>
                                  </DropdownMenuItem>
                                ))}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableHead>
                          <TableHead className="text-right" style={{ color: '#000000' }}>{tAlerts.table.actions}</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredAndSortedAlerts.map((alert) => (
                          <TableRow 
                            key={alert.id}
                            className="alerts-table-row"
                            style={{
                              borderBottom: '1px solid #e1dfdd'
                            }}
                          >
                            <TableCell className="text-sm py-2">
                              <div className="flex items-center gap-1.5">
                                {getAlertTypeIcon(alert.type)}
                                <span style={{ color: '#000000' }}>{alert.name}</span>
                              </div>
                            </TableCell>
                            <TableCell className="text-sm py-2">
                              {getAlertTypeBadge(alert.type)}
                            </TableCell>
                            <TableCell className="text-sm py-2" style={{ color: '#000000' }}>
                              {alert.condition}
                            </TableCell>
                            <TableCell className="text-sm py-2" style={{ color: '#000000' }}>
                              {alert.threshold}
                            </TableCell>
                            <TableCell className="text-sm py-2">
                              <div className="flex gap-1">
                                {alert.channels.includes('email') && (
                                  <Badge 
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
                                    {tAlerts.channels.email}
                                  </Badge>
                                )}
                                {alert.channels.includes('slack') && (
                                  <Badge 
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
                                    {tAlerts.channels.slack}
                                  </Badge>
                                )}
                              </div>
                            </TableCell>
                            <TableCell className="text-sm py-2" style={{ color: '#000000' }}>
                              {alert.triggerCount || 0}
                            </TableCell>
                            <TableCell className="text-xs py-2" style={{ color: '#000000' }}>
                              {alert.lastTriggered || '-'}
                            </TableCell>
                            <TableCell className="py-2">
                              <Badge 
                                style={{
                                  border: '1px solid #e1dfdd',
                                  color: '#000000',
                                  backgroundColor: 'transparent',
                                  transition: 'background-color 0.2s',
                                  cursor: 'pointer'
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.backgroundColor = '#E9C796';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }}
                                onClick={() => toggleAlert(alert.id)}
                              >
                                {alert.enabled ? tAlerts.status.active : tAlerts.status.inactive}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right py-2">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    className="h-7 w-7 p-0"
                                  >
                                    <MoreVertical className="h-3.5 w-3.5" style={{ color: '#000000' }} />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => setShowAlertPanel(true)}>
                                    <Plus className="h-4 w-4 mr-2" />
                                    {tExt.alertsManagement.actions.newAlert}
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => duplicateAlert(alert.id)}>
                                    <Copy className="h-4 w-4 mr-2" />
                                    {tExt.alertsManagement.actions.duplicate}
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => openEditAlert(alert.id)}>
                                    <Edit className="h-4 w-4 mr-2" />
                                    {tExt.alertsManagement.actions.edit}
                                  </DropdownMenuItem>
                                  <DropdownMenuItem 
                                    onClick={() => {
                                      setDeleteDialogOpen(true);
                                      setAlertToDelete(alert.id);
                                    }}
                                  >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    {tExt.alertsManagement.actions.delete}
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

              {/* Notification Channels */}
              <Card className="shadow-sm" style={{ border: '1px solid #e1dfdd' }}>
                <CardHeader>
                  <CardTitle style={{ color: '#000000' }}>
                    {tExt.alertsManagement.notificationChannels.title}
                  </CardTitle>
                  <CardDescription style={{ color: '#000000' }}>
                    {tExt.alertsManagement.notificationChannels.subtitle}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg border" style={{ borderColor: '#e1dfdd' }}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4" style={{ color: '#000000' }} />
                          <span style={{ color: 'var(--color-gray-dark)' }}>{tAlerts.channels.email}</span>
                        </div>
                        <Badge 
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
                          {tAlerts.status.active}
                        </Badge>
                      </div>
                      <div className="space-y-1 text-sm" style={{ color: 'var(--foreground-muted)' }}>
                        <p>admin@rmb.ch</p>
                        <p>alerts@neuco.ch</p>
                      </div>
                    </div>

                    <div className="p-3 rounded-lg border" style={{ borderColor: '#e1dfdd' }}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <MessageSquare className="h-4 w-4" style={{ color: '#000000' }} />
                          <span style={{ color: 'var(--color-gray-dark)' }}>{tAlerts.channels.slack}</span>
                        </div>
                        <Badge 
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
                          {tAlerts.status.active}
                        </Badge>
                      </div>
                      <div className="space-y-1 text-sm" style={{ color: 'var(--foreground-muted)' }}>
                        <p>#ai-hub-alerts</p>
                        <p>#system-monitoring</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Transparent Overlay for Right Side Panel */}
        {showAlertPanel && (
          <div 
            className="fixed inset-0 bg-transparent"
            style={{ zIndex: 9 }}
            onClick={() => setShowAlertPanel(false)}
          />
        )}

        {/* Right Side Panel - Alert Create */}
        <div 
          className="flex flex-col transition-all duration-300 ease-in-out overflow-hidden border-l absolute right-0 bottom-0"
          style={{ 
            top: 0,
            width: showAlertPanel ? '400px' : '0px',
            borderColor: showAlertPanel ? '#e1dfdd' : 'transparent',
            backgroundColor: '#FFFFFF',
            zIndex: 10
          }}
        >
          {showAlertPanel && (
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
                  {isEditMode ? (
                    <Edit className="h-5 w-5 flex-shrink-0 text-black" />
                  ) : (
                    <Plus className="h-5 w-5 flex-shrink-0 text-black" />
                  )}
                  <h3 className="font-medium text-black">
                    {isEditMode ? tExt.alertsManagement.panel.editAlert : tExt.alertsManagement.panel.createAlert}
                  </h3>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => closePanel()}
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
                  {/* Basic Information */}
                  <div className="space-y-4">
                    <h3 className="font-medium text-base" style={{ color: 'var(--color-gray-dark)' }}>
                      {tExt.alertsManagement.form.basicInfo}
                    </h3>

                    <div className="space-y-3">
                      <Label htmlFor="alert-name">{tExt.alertsManagement.form.alertName} *</Label>
                      <Input 
                        id="alert-name"
                        placeholder={tExt.alertsManagement.form.alertNamePlaceholder}
                        value={newAlertName}
                        onChange={(e) => setNewAlertName(e.target.value)}
                        className="h-10"
                        style={{ borderColor: '#e1dfdd' }}
                      />
                      <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>
                        {tExt.alertsManagement.form.alertNameHelper}
                      </p>
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="alert-type">{tExt.alertsManagement.form.type} *</Label>
                      <Select value={newAlertType} onValueChange={(value: any) => setNewAlertType(value)}>
                        <SelectTrigger id="alert-type" className="h-10" style={{ borderColor: '#e1dfdd' }}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="error">{tAlerts.types.error}</SelectItem>
                          <SelectItem value="warning">{tAlerts.types.warning}</SelectItem>
                          <SelectItem value="info">{tAlerts.types.info}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Conditions */}
                  <div className="space-y-4">
                    <h3 className="font-medium text-base" style={{ color: 'var(--color-gray-dark)' }}>
                      {tExt.alertsManagement.form.conditions}
                    </h3>

                    <div className="space-y-3">
                      <Label htmlFor="alert-condition">{tExt.alertsManagement.form.condition} *</Label>
                      <Input 
                        id="alert-condition"
                        placeholder={tExt.alertsManagement.form.conditionPlaceholder}
                        value={newAlertCondition}
                        onChange={(e) => setNewAlertCondition(e.target.value)}
                        className="h-10"
                        style={{ borderColor: '#e1dfdd' }}
                      />
                      <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>
                        {tExt.alertsManagement.form.conditionHelper}
                      </p>
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="alert-threshold">{tExt.alertsManagement.form.threshold}</Label>
                      <Input 
                        id="alert-threshold"
                        placeholder={tExt.alertsManagement.form.thresholdPlaceholder}
                        value={newAlertThreshold}
                        onChange={(e) => setNewAlertThreshold(e.target.value)}
                        className="h-10"
                        style={{ borderColor: '#e1dfdd' }}
                      />
                      <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>
                        {tExt.alertsManagement.form.conditionHelper}
                      </p>
                    </div>
                  </div>

                  {/* Notification Channels */}
                  <div className="space-y-4">
                    <h3 className="font-medium text-base" style={{ color: 'var(--color-gray-dark)' }}>
                      {tExt.alertsManagement.form.channels}
                    </h3>

                    <div className="space-y-3">
                      <style>
                        {`
                          .custom-checkbox {
                            appearance: none;
                            -webkit-appearance: none;
                            -moz-appearance: none;
                            width: 16px;
                            height: 16px;
                            border: 1px solid #e1dfdd;
                            border-radius: 3px;
                            background-color: transparent;
                            cursor: pointer;
                            position: relative;
                            transition: all 0.2s;
                          }
                          .custom-checkbox:hover {
                            border-color: #E9C796;
                            box-shadow: 0 0 0 2px rgba(233, 199, 150, 0.2);
                          }
                          .custom-checkbox:checked {
                            background-color: #E9C796;
                            border-color: #E9C796;
                          }
                          .custom-checkbox:checked::after {
                            content: '';
                            position: absolute;
                            left: 4px;
                            top: 1px;
                            width: 5px;
                            height: 9px;
                            border: solid black;
                            border-width: 0 2px 2px 0;
                            transform: rotate(45deg);
                          }
                        `}
                      </style>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="channel-email"
                          checked={newAlertChannels.includes('email')}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setNewAlertChannels([...newAlertChannels, 'email']);
                            } else {
                              setNewAlertChannels(newAlertChannels.filter(c => c !== 'email'));
                            }
                          }}
                          className="h-4 w-4 custom-checkbox"
                        />
                        <Label htmlFor="channel-email" className="flex items-center gap-2 cursor-pointer">
                          <Mail className="h-4 w-4" />
                          {tAlerts.channels.email}
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="channel-slack"
                          checked={newAlertChannels.includes('slack')}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setNewAlertChannels([...newAlertChannels, 'slack']);
                            } else {
                              setNewAlertChannels(newAlertChannels.filter(c => c !== 'slack'));
                            }
                          }}
                          className="h-4 w-4 custom-checkbox"
                        />
                        <Label htmlFor="channel-slack" className="flex items-center gap-2 cursor-pointer">
                          <MessageSquare className="h-4 w-4" />
                          {tAlerts.channels.slack}
                        </Label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Panel Footer */}
              <div 
                className="flex items-center justify-end gap-3 px-6 border-t"
                style={{ 
                  height: '72px',
                  borderColor: '#e1dfdd'
                }}
              >
                <Button 
                  variant="outline"
                  onClick={() => closePanel()}
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
                  {tExt.alertsManagement.form.cancelButton}
                </Button>
                <Button
                  onClick={saveAlert}
                  disabled={!newAlertName || !newAlertCondition}
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
                >
                  {tExt.alertsManagement.form.saveButton}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{tAlerts.deleteDialog.title}</AlertDialogTitle>
            <AlertDialogDescription>
              {tAlerts.deleteDialog.description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
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
              {tAlerts.deleteDialog.cancel}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (alertToDelete) {
                  deleteAlert(alertToDelete);
                }
                setDeleteDialogOpen(false);
              }}
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
              {tAlerts.deleteDialog.confirm}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}