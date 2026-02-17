import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import {
  Activity,
  Cpu,
  HardDrive,
  Network,
  Server,
  Database,
  Globe,
  Mail,
  FileText,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Minus,
  Zap,
  Clock
} from "lucide-react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";
import { useLanguage } from "../contexts/LanguageContext";
import { useExtendedTranslations } from "../utils/i18n";

interface MetricData {
  time: string;
  cpu: number;
  memory: number;
  disk: number;
  network: number;
}

interface ServiceStatus {
  name: string;
  status: 'online' | 'offline' | 'degraded';
  uptime: string;
  responseTime: string;
}

interface SystemMonitoringProps {
  isDarkMode?: boolean;
}

export function SystemMonitoring({ isDarkMode = false }: SystemMonitoringProps) {
  const { t } = useLanguage();
  const tSys = useExtendedTranslations().systemMonitoring;

  const [cpuUsage, setCpuUsage] = useState(45);
  const [memoryUsage, setMemoryUsage] = useState(62);
  const [diskUsage, setDiskUsage] = useState(38);
  const [networkLoad, setNetworkLoad] = useState(28);

  const [metricsData] = useState<MetricData[]>([
    { time: "00:00", cpu: 35, memory: 55, disk: 38, network: 20 },
    { time: "04:00", cpu: 28, memory: 52, disk: 38, network: 15 },
    { time: "08:00", cpu: 52, memory: 68, disk: 39, network: 45 },
    { time: "12:00", cpu: 65, memory: 72, disk: 40, network: 62 },
    { time: "16:00", cpu: 58, memory: 65, disk: 41, network: 55 },
    { time: "20:00", cpu: 42, memory: 58, disk: 38, network: 32 },
    { time: "24:00", cpu: 45, memory: 62, disk: 38, network: 28 }
  ]);

  const [requestsData] = useState([
    { time: "00:00", requests: 1200 },
    { time: "04:00", requests: 800 },
    { time: "08:00", requests: 3500 },
    { time: "12:00", requests: 5200 },
    { time: "16:00", requests: 4800 },
    { time: "20:00", requests: 2900 },
    { time: "24:00", requests: 1800 }
  ]);

  const [services] = useState<ServiceStatus[]>([
    {
      name: "AI Hub API",
      status: "online",
      uptime: "99.98%",
      responseTime: "45ms"
    },
    {
      name: "Email-Agent Service",
      status: "online",
      uptime: "99.95%",
      responseTime: "78ms"
    },
    {
      name: "Normen-Agent Service",
      status: "online",
      uptime: "99.92%",
      responseTime: "62ms"
    },
    {
      name: "Internet-Agent Service",
      status: "degraded",
      uptime: "98.50%",
      responseTime: "235ms"
    },
    {
      name: "Jelmoli-Agent Service",
      status: "online",
      uptime: "99.89%",
      responseTime: "91ms"
    },
    {
      name: "Database Cluster",
      status: "online",
      uptime: "99.99%",
      responseTime: "12ms"
    },
    {
      name: "Authentication Service",
      status: "online",
      uptime: "100.00%",
      responseTime: "23ms"
    },
    {
      name: "File Storage",
      status: "online",
      uptime: "99.94%",
      responseTime: "156ms"
    }
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCpuUsage(prev => Math.max(20, Math.min(80, prev + (Math.random() - 0.5) * 10)));
      setMemoryUsage(prev => Math.max(40, Math.min(85, prev + (Math.random() - 0.5) * 8)));
      setDiskUsage(prev => Math.max(30, Math.min(60, prev + (Math.random() - 0.5) * 3)));
      setNetworkLoad(prev => Math.max(15, Math.min(70, prev + (Math.random() - 0.5) * 12)));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'online':
        return (
          <Badge style={{ border: '1px solid #e1dfdd', backgroundColor: 'transparent', color: '#000000' }}>
            <CheckCircle2 className="h-3 w-3 mr-1" style={{ color: '#000000' }} />
            {tSys.online}
          </Badge>
        );
      case 'degraded':
        return (
          <Badge style={{ border: '1px solid #e1dfdd', backgroundColor: '#E9C796', color: '#000000' }}>
            <AlertCircle className="h-3 w-3 mr-1" style={{ color: '#000000' }} />
            {tSys.restricted}
          </Badge>
        );
      case 'offline':
        return (
          <Badge style={{ border: '1px solid #e1dfdd', backgroundColor: 'transparent', color: '#000000' }}>
            <AlertCircle className="h-3 w-3 mr-1" style={{ color: '#000000' }} />
            {tSys.offline}
          </Badge>
        );
      default:
        return null;
    }
  };

  const getUsageColor = (usage: number) => {
    if (usage < 50) return 'var(--color-primary)';
    if (usage < 75) return '#f59e0b';
    return '#ef4444';
  };

  const onlineServices = services.filter(s => s.status === 'online').length;
  const degradedServices = services.filter(s => s.status === 'degraded').length;
  const totalServices = services.length;

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div 
          className="p-3 rounded-lg shadow-lg"
          style={{ 
            backgroundColor: 'white',
            border: '1px solid #e1dfdd'
          }}
        >
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-sm" style={{ color: '#000000' }}>
                {entry.name}: {entry.value}%
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* System Monitoring Header */}
      <div 
        className="h-14 flex items-center gap-3 px-4"
        style={{ 
          borderBottom: isDarkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.06)',
          backgroundColor: '#DE851D'
        }}
      >
        <Activity className="h-5 w-5 flex-shrink-0" style={{ color: '#000000' }} />
        <h2 className="font-medium" style={{ color: '#000000' }}>
          {tSys.title}
        </h2>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-auto">
        <div className="px-8 pt-8 pb-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* System Health Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="shadow-sm" style={{ border: '1px solid #e1dfdd' }}>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Cpu className="h-4 w-4" style={{ color: '#000000' }} />
                        <span className="text-sm" style={{ color: '#000000' }}>CPU</span>
                      </div>
                      <span className="text-xl" style={{ color: '#000000' }}>
                        {cpuUsage.toFixed(0)}%
                      </span>
                    </div>
                    <Progress value={cpuUsage} className="h-2" style={{ backgroundColor: '#E9C796' }} />
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm" style={{ border: '1px solid #e1dfdd' }}>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Server className="h-4 w-4" style={{ color: '#000000' }} />
                        <span className="text-sm" style={{ color: '#000000' }}>RAM</span>
                      </div>
                      <span className="text-xl" style={{ color: '#000000' }}>
                        {memoryUsage.toFixed(0)}%
                      </span>
                    </div>
                    <Progress value={memoryUsage} className="h-2" style={{ backgroundColor: '#E9C796' }} />
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm" style={{ border: '1px solid #e1dfdd' }}>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <HardDrive className="h-4 w-4" style={{ color: '#000000' }} />
                        <span className="text-sm" style={{ color: '#000000' }}>Disk</span>
                      </div>
                      <span className="text-xl" style={{ color: '#000000' }}>
                        {diskUsage.toFixed(0)}%
                      </span>
                    </div>
                    <Progress value={diskUsage} className="h-2" style={{ backgroundColor: '#E9C796' }} />
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm" style={{ border: '1px solid #e1dfdd' }}>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Network className="h-4 w-4" style={{ color: '#000000' }} />
                        <span className="text-sm" style={{ color: '#000000' }}>{tSys.network}</span>
                      </div>
                      <span className="text-xl" style={{ color: '#000000' }}>
                        {networkLoad.toFixed(0)}%
                      </span>
                    </div>
                    <Progress value={networkLoad} className="h-2" style={{ backgroundColor: '#E9C796' }} />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Service Status */}
            <Card className="shadow-sm" style={{ border: '1px solid #e1dfdd' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2" style={{ color: '#000000' }}>
                  Service Status
                </CardTitle>
                <CardDescription style={{ color: '#000000' }}>
                  {onlineServices} von {totalServices} Services online
                  {degradedServices > 0 && ` • ${degradedServices} eingeschränkt`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {services.map((service) => (
                    <div
                      key={service.name}
                      className="p-4 rounded-lg border"
                      style={{ 
                        borderColor: '#e1dfdd',
                        backgroundColor: 'white'
                      }}
                    >
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-sm truncate">{service.name}</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          {getStatusBadge(service.status)}
                          <div className="flex items-center justify-between text-xs" style={{ color: 'var(--foreground-muted)' }}>
                            <span>Uptime:</span>
                            <span>{service.uptime}</span>
                          </div>
                          <div className="flex items-center justify-between text-xs" style={{ color: 'var(--foreground-muted)' }}>
                            <span>Antwortzeit:</span>
                            <span>{service.responseTime}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Resource Usage Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-sm" style={{ border: '1px solid #e1dfdd' }}>
                <CardHeader>
                  <CardTitle>
                    Ressourcenauslastung in % (24h)
                  </CardTitle>
                  <CardDescription>CPU, RAM, DISK & Netzwerk</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={metricsData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--color-gray-medium)" />
                      <XAxis dataKey="time" stroke="var(--foreground-muted)" />
                      <YAxis stroke="var(--foreground-muted)" />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Line type="monotone" dataKey="cpu" stroke="#E9C796" strokeWidth={2} name="CPU" dot={false} />
                      <Line type="monotone" dataKey="memory" stroke="#DE851D" strokeWidth={2} name="RAM" dot={false} />
                      <Line type="monotone" dataKey="disk" stroke="#e1dfdd" strokeWidth={2} name="Disk" dot={false} />
                      <Line type="monotone" dataKey="network" stroke="#000000" strokeWidth={2} name="Netzwerk" dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="shadow-sm" style={{ border: '1px solid #e1dfdd' }}>
                <CardHeader>
                  <CardTitle>
                    API Requests (24h)
                  </CardTitle>
                  <CardDescription>Anzahl der verarbeiteten Anfragen</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={requestsData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--color-gray-medium)" />
                      <XAxis dataKey="time" stroke="var(--foreground-muted)" />
                      <YAxis stroke="var(--foreground-muted)" />
                      <Tooltip />
                      <Area 
                        type="monotone" 
                        dataKey="requests" 
                        stroke="#DE851D" 
                        fill="#E9C796" 
                        fillOpacity={0.3}
                        name="Anfragen"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* System Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="shadow-sm" style={{ border: '1px solid #e1dfdd' }}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>Gesamte API Calls</p>
                      <p className="text-2xl mt-1" style={{ color: 'var(--color-gray-dark)' }}>24,387</p>
                      <p className="text-xs mt-1" style={{ color: '#000000' }}>+12.5% vs. gestern</p>
                    </div>
                    <Zap className="h-8 w-8" style={{ color: '#000000' }} />
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm" style={{ border: '1px solid #e1dfdd' }}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>Durchschn. Antwortzeit</p>
                      <p className="text-2xl mt-1" style={{ color: 'var(--color-gray-dark)' }}>87ms</p>
                      <p className="text-xs mt-1" style={{ color: '#000000' }}>-8ms vs. gestern</p>
                    </div>
                    <Clock className="h-8 w-8" style={{ color: '#000000' }} />
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm" style={{ border: '1px solid #e1dfdd' }}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>System Uptime</p>
                      <p className="text-2xl mt-1" style={{ color: 'var(--color-gray-dark)' }}>99.97%</p>
                      <p className="text-xs mt-1" style={{ color: 'var(--foreground-muted)' }}>28 Tage, 14 Std</p>
                    </div>
                    <CheckCircle2 className="h-8 w-8" style={{ color: '#000000' }} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}