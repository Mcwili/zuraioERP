import { Users, Package, HardDrive, Activity, AlertCircle, CheckCircle, Clock, TrendingUp, ArrowUpRight, ArrowDownRight, Zap, Shield, Globe, LayoutDashboard } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { useLanguage } from "../utils/i18n";

interface TenantDashboardProps {
  tenantName: string;
  isDarkMode?: boolean;
  onSectionChange?: (section: string) => void;
  userStats?: { total: number; active: number; inactive: number; locked: number };
  modelStats?: { total: number; active: number; inactive: number; error: number };
  agentStats?: { total: number; active: number; inactive: number; error: number };
}

export function TenantDashboard({ tenantName, isDarkMode = false, onSectionChange, userStats, modelStats, agentStats }: TenantDashboardProps) {
  const { t } = useLanguage();
  
  // Mock data - in real app would come from API
  const stats = {
    users: { 
      total: userStats?.total || 45, 
      active: userStats?.active || 38, 
      inactive: (userStats?.inactive || 0) + (userStats?.locked || 0) || 7, 
      trend: +12 
    },
    modules: { 
      total: modelStats?.total || 8, 
      active: modelStats?.active || 6, 
      available: 12, 
      trend: +2 
    },
    agents: {
      total: agentStats?.total || 5,
      active: agentStats?.active || 4,
      inactive: (agentStats?.inactive || 0) + (agentStats?.error || 0) || 1,
      trend: +1
    },
    apiCalls: { today: 1247, thisMonth: 34582, trend: +15 }
  };

  const recentActivities = [
    { id: 1, user: "Max Müller", action: t.tenantAdmin.dashboardExtended.activities.newUserCreated, time: `${t.tenantAdmin.dashboardExtended.activities.timeAgo.minutes.replace('{n}', '5')}`, type: "success" },
    { id: 2, user: "System", action: t.tenantAdmin.dashboardExtended.activities.backupCompleted, time: `${t.tenantAdmin.dashboardExtended.activities.timeAgo.hour.replace('{n}', '1')}`, type: "success" },
    { id: 3, user: "Anna Schmidt", action: t.tenantAdmin.dashboardExtended.activities.roleUpdated, time: `${t.tenantAdmin.dashboardExtended.activities.timeAgo.hours.replace('{n}', '2')}`, type: "info" },
    { id: 4, user: "System", action: t.tenantAdmin.dashboardExtended.activities.apiRateLimitReached, time: `${t.tenantAdmin.dashboardExtended.activities.timeAgo.hours.replace('{n}', '3')}`, type: "warning" },
    { id: 5, user: "Thomas Weber", action: t.tenantAdmin.dashboardExtended.activities.moduleActivated, time: `${t.tenantAdmin.dashboardExtended.activities.timeAgo.hours.replace('{n}', '4')}`, type: "success" }
  ];

  const systemMessages = [
    { id: 1, message: t.tenantAdmin.dashboardExtended.systemMessages.planExpiring.replace('{days}', '15'), type: "warning", daysRemaining: 15 },
    { id: 2, message: t.tenantAdmin.dashboardExtended.systemMessages.newVersionAvailable, type: "info", isNewVersion: true }
  ];

  const quickStats = [
    { label: t.tenantAdmin.dashboardExtended.quickStats.uptime, value: "99.9%", icon: Shield, color: "#5ebc67" },
    { label: t.tenantAdmin.dashboardExtended.quickStats.activeSessions, value: "24", icon: Zap, color: "#3b82f6" },
    { label: t.tenantAdmin.dashboardExtended.quickStats.regions, value: "3", icon: Globe, color: "#8b5cf6" }
  ];

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Dashboard Header */}
      <div 
        className="h-14 flex items-center gap-3 px-4"
        style={{ 
          borderBottom: isDarkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.06)',
          backgroundColor: '#DE851D'
        }}
      >
        <LayoutDashboard className="h-5 w-5 flex-shrink-0" style={{ color: '#000000' }} />
        <h2 className="font-medium" style={{ color: '#000000' }}>
          {t.tenantAdmin.sidebar.dashboard}
        </h2>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-auto">
        {/* Header Section */}
        <div className="px-4 sm:px-6 md:px-8 pt-8 pb-8">
          <div className="max-w-7xl mx-auto">
            {/* Combined Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-1">
              {/* System Messages */}
              {systemMessages.map((msg) => {
                // Check if this is a tariff message with 30 days or less remaining
                const isTariffExpiring = msg.daysRemaining !== undefined && msg.daysRemaining <= 30;
                // Check if this is a new version message
                const isNewVersion = msg.isNewVersion === true;
                
                return (
                  <Card
                    key={msg.id}
                    className="p-4 shadow-sm"
                    style={{
                      border: '1px solid #e1dfdd',
                      backgroundColor: (isNewVersion || isTariffExpiring) ? '#E9C796' : 'transparent'
                    }}
                  >
                    <div className="flex flex-col items-center gap-2 text-center">
                      <AlertCircle 
                        className="h-5 w-5 flex-shrink-0" 
                        style={{ color: '#000000' }}
                      />
                      <span className="text-xs" style={{ color: '#000000' }}>
                        {msg.message}
                      </span>
                    </div>
                  </Card>
                );
              })}
              
              {/* Quick Stats */}
              {quickStats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <Card
                    key={`stat-${index}`}
                    className="p-4 shadow-sm"
                    style={{
                      border: '1px solid #e1dfdd',
                    }}
                  >
                    <div className="flex flex-col items-center gap-2 text-center">
                      <Icon className="h-5 w-5" style={{ color: '#000000' }} />
                      <div>
                        <div className="text-xs" style={{ color: '#000000' }}>
                          {stat.label}
                        </div>
                        <div className="text-xl" style={{ color: '#000000' }}>
                          {stat.value}
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-4 sm:px-6 md:px-8 pb-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Main Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Users Card */}
              <Card 
                className="relative overflow-hidden shadow-sm cursor-pointer transition-all hover:shadow-md" 
                style={{ border: '1px solid #e1dfdd' }}
                onClick={() => onSectionChange?.('user-management.overview')}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#E9C796';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm" style={{ color: '#000000' }}>{t.tenantAdmin.dashboardExtended.cards.users}</CardTitle>
                    <Users className="h-5 w-5" style={{ color: '#000000' }} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-3xl" style={{ color: '#000000' }}>
                      {stats.users.total}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-xs" style={{ color: '#000000' }}>
                        {stats.users.active} {t.tenantAdmin.dashboardExtended.cards.active}, {stats.users.inactive} {t.tenantAdmin.dashboardExtended.cards.inactive}
                      </div>
                      <div className="flex items-center gap-1 text-xs" style={{ color: '#000000' }}>
                        <ArrowUpRight className="h-3 w-3" />
                        {stats.users.trend}%
                      </div>
                    </div>
                    <div className="relative w-full h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: '#E9C796' }}>
                      <div 
                        className="h-full transition-all rounded-full" 
                        style={{ 
                          width: `${(stats.users.active / stats.users.total) * 100}%`,
                          backgroundColor: '#DE851D'
                        }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Modules Card */}
              <Card 
                className="relative overflow-hidden shadow-sm cursor-pointer transition-all hover:shadow-md" 
                style={{ border: '1px solid #e1dfdd' }}
                onClick={() => onSectionChange?.('modules.models')}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#E9C796';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm" style={{ color: '#000000' }}>{t.tenantAdmin.dashboardExtended.cards.modules}</CardTitle>
                    <Package className="h-5 w-5" style={{ color: '#000000' }} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-3xl" style={{ color: '#000000' }}>
                      {stats.modules.active}<span className="text-lg" style={{ color: '#000000' }}>/{stats.modules.total}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-xs" style={{ color: '#000000' }}>
                        {stats.modules.available - stats.modules.total} {t.tenantAdmin.dashboardExtended.cards.moreAvailable}
                      </div>
                      <div className="flex items-center gap-1 text-xs" style={{ color: '#000000' }}>
                        <ArrowUpRight className="h-3 w-3" />
                        {stats.modules.trend}%
                      </div>
                    </div>
                    <div className="relative w-full h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: '#E9C796' }}>
                      <div 
                        className="h-full transition-all rounded-full" 
                        style={{ 
                          width: `${(stats.modules.active / stats.modules.total) * 100}%`,
                          backgroundColor: '#DE851D'
                        }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Agents Card */}
              <Card 
                className="relative overflow-hidden shadow-sm cursor-pointer transition-all hover:shadow-md" 
                style={{ border: '1px solid #e1dfdd' }}
                onClick={() => onSectionChange?.('modules.overview')}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#E9C796';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm" style={{ color: '#000000' }}>{t.tenantAdmin.dashboardExtended.cards.agents}</CardTitle>
                    <Activity className="h-5 w-5" style={{ color: '#000000' }} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-3xl" style={{ color: '#000000' }}>
                      {stats.agents.active}<span className="text-lg" style={{ color: '#000000' }}>/{stats.agents.total}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-xs" style={{ color: '#000000' }}>
                        {stats.agents.inactive} {t.tenantAdmin.dashboardExtended.cards.inactive}
                      </div>
                      <div className="flex items-center gap-1 text-xs" style={{ color: '#000000' }}>
                        <ArrowUpRight className="h-3 w-3" />
                        {stats.agents.trend}%
                      </div>
                    </div>
                    <div className="relative w-full h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: '#E9C796' }}>
                      <div 
                        className="h-full transition-all rounded-full" 
                        style={{ 
                          width: `${(stats.agents.active / stats.agents.total) * 100}%`,
                          backgroundColor: '#DE851D'
                        }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* API Calls Card */}
              <Card className="relative overflow-hidden shadow-sm" style={{ border: '1px solid #e1dfdd' }}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm" style={{ color: '#000000' }}>{t.tenantAdmin.dashboardExtended.cards.apiCalls}</CardTitle>
                    <TrendingUp className="h-5 w-5" style={{ color: '#000000' }} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-3xl" style={{ color: '#000000' }}>
                      {stats.apiCalls.today.toLocaleString()}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-xs" style={{ color: '#000000' }}>
                        {stats.apiCalls.thisMonth.toLocaleString()} {t.tenantAdmin.dashboardExtended.cards.thisMonth}
                      </div>
                      <div className="flex items-center gap-1 text-xs" style={{ color: '#000000' }}>
                        <ArrowUpRight className="h-3 w-3" />
                        {stats.apiCalls.trend}%
                      </div>
                    </div>
                    <div className="pt-1">
                      <div className="h-8 flex items-end gap-1">
                        {[40, 60, 45, 80, 55, 90, 70].map((height, i) => (
                          <div 
                            key={i}
                            className="flex-1 rounded-t"
                            style={{ 
                              height: `${height}%`,
                              backgroundColor: i === 6 ? '#E9C796' : '#DE851D'
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activities */}
            <Card className="shadow-sm" style={{ border: '1px solid #e1dfdd' }}>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle style={{ color: '#000000' }}>{t.tenantAdmin.dashboardExtended.ui.recentActivity}</CardTitle>
                    <CardDescription style={{ color: '#000000' }}>{t.tenantAdmin.dashboardExtended.ui.recentActivityDesc}</CardDescription>
                  </div>
                  <Activity className="h-5 w-5" style={{ color: '#000000' }} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div 
                      key={activity.id} 
                      className="flex items-start gap-4 p-3 rounded-lg transition-colors hover:bg-[#E9C796]"
                    >
                      <div 
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                      >
                        {activity.type === 'success' && (
                          <CheckCircle className="h-4 w-4" style={{ color: '#000000' }} />
                        )}
                        {activity.type === 'warning' && (
                          <AlertCircle className="h-4 w-4" style={{ color: '#000000' }} />
                        )}
                        {activity.type === 'info' && (
                          <Activity className="h-4 w-4" style={{ color: '#000000' }} />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm" style={{ color: '#000000' }}>
                          {activity.action}
                        </div>
                        <div className="text-xs mt-1" style={{ color: '#000000' }}>
                          {activity.user}
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs flex-shrink-0 px-2 py-1 rounded-md" style={{ 
                        color: '#000000',
                        backgroundColor: '#E9C796'
                      }}>
                        <Clock className="h-3 w-3" />
                        {activity.time}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}