import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { 
  Activity,
  Users,
  MessageSquare,
  Settings,
  TrendingUp,
  TrendingDown,
  Clock,
  Cpu,
  BarChart3
} from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

interface DashboardProps {
  user: { username: string };
  activeModules: string[];
}

export function Dashboard({ user, activeModules }: DashboardProps) {
  const { t } = useLanguage();
  
  const stats = [
    {
      title: t.tenantAdmin.dashboardExtended.stats.activeModules,
      value: activeModules.length,
      total: 5,
      icon: Activity,
      trend: "+12%",
      trendUp: true
    },
    {
      title: t.tenantAdmin.dashboardExtended.stats.processedToday,
      value: "2,547",
      total: t.tenantAdmin.dashboardExtended.stats.requests,
      icon: MessageSquare,
      trend: "+23%",
      trendUp: true
    },
    {
      title: t.tenantAdmin.dashboardExtended.stats.avgResponseTime,
      value: "1.2s",
      total: t.tenantAdmin.dashboardExtended.stats.seconds,
      icon: Clock,
      trend: "-8%",
      trendUp: false
    },
    {
      title: t.tenantAdmin.dashboardExtended.stats.systemLoad,
      value: "68%",
      total: t.tenantAdmin.dashboardExtended.stats.cpu,
      icon: Cpu,
      trend: "+5%",
      trendUp: true
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: "module_activated",
      message: t.tenantAdmin.dashboardExtended.activities.chatAgentActivated,
      time: t.tenantAdmin.dashboardExtended.activities.timeAgo.minutes.replace('{count}', '5'),
      status: "success"
    },
    {
      id: 2,
      type: "request_processed",
      message: t.tenantAdmin.dashboardExtended.activities.requestsProcessed,
      time: t.tenantAdmin.dashboardExtended.activities.timeAgo.minutes.replace('{count}', '15'),
      status: "info"
    },
    {
      id: 3,
      type: "settings_changed",
      message: t.tenantAdmin.dashboardExtended.activities.temperatureChanged,
      time: t.tenantAdmin.dashboardExtended.activities.timeAgo.minutes.replace('{count}', '32'),
      status: "warning"
    },
    {
      id: 4,
      type: "user_login",
      message: t.tenantAdmin.dashboardExtended.notifications.userLoggedIn.replace('{username}', user.username),
      time: t.tenantAdmin.dashboardExtended.activities.timeAgo.hour,
      status: "info"
    }
  ];

  const systemHealth = [
    { name: t.tenantAdmin.dashboardExtended.modules.chatAgent, status: "active", usage: 85 },
    { name: t.tenantAdmin.dashboardExtended.modules.documentAnalyzer, status: "active", usage: 42 },
    { name: t.tenantAdmin.dashboardExtended.modules.calendarAssistant, status: "active", usage: 23 },
    { name: t.tenantAdmin.dashboardExtended.modules.dataAnalyst, status: "warning", usage: 67 },
    { name: t.tenantAdmin.dashboardExtended.modules.securityMonitor, status: "active", usage: 12 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'error': return 'text-red-600';
      case 'info': return 'text-blue-600';
      default: return 'text-muted-foreground';
    }
  };

  const getHealthStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'warning': return 'secondary';
      case 'error': return 'destructive';
      default: return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div>
        <h2>{t.tenantAdmin.dashboardExtended.ui.welcomeBack}, {user.username}!</h2>
        <p className="text-muted-foreground">
          {t.tenantAdmin.dashboardExtended.ui.overviewText}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <span>{stat.total}</span>
                <span className={`ml-2 flex items-center ${
                  stat.trendUp ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.trendUp ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                  {stat.trend}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              {t.tenantAdmin.dashboardExtended.ui.recentActivity}
            </CardTitle>
            <CardDescription>
              {t.tenantAdmin.dashboardExtended.ui.recentActivityDesc}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.status === 'success' ? 'bg-green-500' :
                    activity.status === 'warning' ? 'bg-yellow-500' :
                    activity.status === 'error' ? 'bg-red-500' : 'bg-blue-500'
                  }`} />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm">{activity.message}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              {t.tenantAdmin.dashboardExtended.ui.viewAllActivities}
            </Button>
          </CardContent>
        </Card>

        {/* System Health */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              {t.tenantAdmin.dashboardExtended.ui.systemStatus}
            </CardTitle>
            <CardDescription>
              {t.tenantAdmin.dashboardExtended.ui.systemStatusDesc}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {systemHealth.map((module, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{module.name}</span>
                      <Badge 
                        variant={getHealthStatusColor(module.status)}
                        className="text-xs"
                      >
                        {module.status === 'active' ? t.tenantAdmin.dashboardExtended.ui.statusActive : 
                         module.status === 'warning' ? t.tenantAdmin.dashboardExtended.ui.statusWarning : t.tenantAdmin.dashboardExtended.ui.statusError}
                      </Badge>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {module.usage}%
                    </span>
                  </div>
                  <Progress value={module.usage} className="h-2" />
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              {t.tenantAdmin.dashboardExtended.ui.detailedMetrics}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>{t.tenantAdmin.dashboardExtended.ui.quickActions}</CardTitle>
          <CardDescription>
            {t.tenantAdmin.dashboardExtended.ui.quickActionsDesc}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <MessageSquare className="h-6 w-6" />
              <span className="text-sm">{t.tenantAdmin.dashboardExtended.ui.newChat}</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Settings className="h-6 w-6" />
              <span className="text-sm">{t.tenantAdmin.dashboardExtended.ui.configureAI}</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Activity className="h-6 w-6" />
              <span className="text-sm">{t.tenantAdmin.dashboardExtended.ui.manageModules}</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Users className="h-6 w-6" />
              <span className="text-sm">{t.tenantAdmin.dashboardExtended.ui.settings}</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}