import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  Users,
  TrendingUp,
  Activity,
  Clock,
  Calendar,
  Download,
  ArrowUp,
  ArrowDown,
  Minus,
} from 'lucide-react';
import { useLanguage } from '../utils/i18n';
import { useNewTranslations } from '../hooks/useNewTranslations';

interface AnalyticsData {
  users: {
    total: number;
    active: number;
    inactive: number;
    new: number;
    trend: number; // percentage change
  };
  activity: {
    logins: number;
    actions: number;
    avgSessionTime: number;
    trend: number;
  };
  timeline: Array<{
    date: string;
    users: number;
    logins: number;
    actions: number;
  }>;
  roles: Array<{
    name: string;
    count: number;
    percentage: number;
  }>;
  departments: Array<{
    name: string;
    users: number;
    active: number;
  }>;
}

interface AnalyticsDashboardProps {
  isDarkMode?: boolean;
}

// Mock data generator
const generateMockData = (): AnalyticsData => {
  const dates = Array.from({ length: 30 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (29 - i));
    return d.toISOString().split('T')[0];
  });

  return {
    users: {
      total: 1247,
      active: 892,
      inactive: 355,
      new: 47,
      trend: 12.5
    },
    activity: {
      logins: 3428,
      actions: 15691,
      avgSessionTime: 42,
      trend: 8.3
    },
    timeline: dates.map(date => ({
      date,
      users: Math.floor(Math.random() * 100) + 800,
      logins: Math.floor(Math.random() * 200) + 2000,
      actions: Math.floor(Math.random() * 1000) + 10000
    })),
    roles: [
      { name: 'Admin', count: 12, percentage: 1.0 },
      { name: 'Manager', count: 45, percentage: 3.6 },
      { name: 'User', count: 980, percentage: 78.6 },
      { name: 'Guest', count: 210, percentage: 16.8 }
    ],
    departments: [
      { name: 'Engineering', users: 340, active: 298 },
      { name: 'Sales', users: 256, active: 234 },
      { name: 'Marketing', users: 189, active: 167 },
      { name: 'HR', users: 87, active: 79 },
      { name: 'Finance', users: 145, active: 114 }
    ]
  };
};

const COLORS = ['#DE851D', '#E9C796', '#8b5a00', '#f4d4a0', '#6b4500'];

/**
 * AnalyticsDashboard Component
 * Comprehensive analytics and reporting dashboard
 * Features:
 * - Key metrics with trend indicators
 * - Time series charts (users, logins, actions)
 * - Distribution charts (roles, departments)
 * - Export capabilities
 * - Time range filtering
 */
export function AnalyticsDashboard({ isDarkMode }: AnalyticsDashboardProps) {
  const { t } = useLanguage();
  const { tn } = useNewTranslations();
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [activeTab, setActiveTab] = useState('overview');
  
  const data = useMemo(() => generateMockData(), []);

  const TrendIndicator = ({ value }: { value: number }) => {
    const isPositive = value > 0;
    const isNeutral = value === 0;
    
    return (
      <div className={`flex items-center gap-1 text-xs ${
        isPositive ? 'text-green-600' : isNeutral ? 'text-gray-500' : 'text-red-600'
      }`}>
        {isPositive ? <ArrowUp className="h-3 w-3" /> : 
         isNeutral ? <Minus className="h-3 w-3" /> : 
         <ArrowDown className="h-3 w-3" />}
        <span>{Math.abs(value).toFixed(1)}%</span>
      </div>
    );
  };

  const MetricCard = ({ 
    title, 
    value, 
    subtitle, 
    trend, 
    icon: Icon,
    color = '#DE851D'
  }: { 
    title: string;
    value: string | number;
    subtitle?: string;
    trend?: number;
    icon: any;
    color?: string;
  }) => (
    <Card className="border-[#e1dfdd]">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-xs text-gray-600 mb-1">{title}</p>
            <div className="flex items-baseline gap-2">
              <p className="text-2xl">{value}</p>
              {trend !== undefined && <TrendIndicator value={trend} />}
            </div>
            {subtitle && (
              <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
            )}
          </div>
          <div 
            className="p-2 rounded-lg"
            style={{ backgroundColor: color + '20' }}
          >
            <Icon className="h-5 w-5" style={{ color }} />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl">{tn('analyticsDashboard.title')}</h2>
          <p className="text-sm text-gray-600 mt-1">
            {tn('analyticsDashboard.subtitle')}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={(v: any) => setTimeRange(v)}>
            <SelectTrigger className="w-32 border-[#e1dfdd]">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">{tn('analyticsDashboard.timeRanges.last7days')}</SelectItem>
              <SelectItem value="30d">{tn('analyticsDashboard.timeRanges.last30days')}</SelectItem>
              <SelectItem value="90d">{tn('analyticsDashboard.timeRanges.last90days')}</SelectItem>
              <SelectItem value="1y">{tn('analyticsDashboard.timeRanges.lastYear')}</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="sm"
            className="border-[#e1dfdd] hover:bg-[#E9C796] text-black"
          >
            <Download className="h-4 w-4 mr-2" />
            {tn('analyticsDashboard.export')}
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title={tn('analyticsDashboard.metrics.totalUsers')}
          value={data.users.total.toLocaleString()}
          subtitle={`${data.users.new} ${tn('analyticsDashboard.metrics.newThisMonth')}`}
          trend={data.users.trend}
          icon={Users}
          color="#DE851D"
        />
        <MetricCard
          title={tn('analyticsDashboard.metrics.activeUsers')}
          value={data.users.active.toLocaleString()}
          subtitle={`${((data.users.active / data.users.total) * 100).toFixed(1)}% ${tn('analyticsDashboard.metrics.ofTotal')}`}
          trend={data.users.trend}
          icon={TrendingUp}
          color="#10b981"
        />
        <MetricCard
          title={tn('analyticsDashboard.metrics.totalLogins')}
          value={data.activity.logins.toLocaleString()}
          subtitle={tn('analyticsDashboard.metrics.thisPeriod')}
          trend={data.activity.trend}
          icon={Activity}
          color="#3b82f6"
        />
        <MetricCard
          title={tn('analyticsDashboard.metrics.avgSession')}
          value={`${data.activity.avgSessionTime}m`}
          subtitle={tn('analyticsDashboard.metrics.perUserSession')}
          trend={5.2}
          icon={Clock}
          color="#8b5cf6"
        />
      </div>

      {/* Charts */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="border-b border-[#e1dfdd] bg-transparent">
          <TabsTrigger 
            value="overview"
            className="data-[state=active]:border-b-2 data-[state=active]:border-[#DE851D] data-[state=active]:bg-transparent"
          >
            {tn('analyticsDashboard.tabs.overview')}
          </TabsTrigger>
          <TabsTrigger 
            value="users"
            className="data-[state=active]:border-b-2 data-[state=active]:border-[#DE851D] data-[state=active]:bg-transparent"
          >
            {tn('analyticsDashboard.tabs.users')}
          </TabsTrigger>
          <TabsTrigger 
            value="activity"
            className="data-[state=active]:border-b-2 data-[state=active]:border-[#DE851D] data-[state=active]:bg-transparent"
          >
            {tn('analyticsDashboard.tabs.activity')}
          </TabsTrigger>
          <TabsTrigger 
            value="distribution"
            className="data-[state=active]:border-b-2 data-[state=active]:border-[#DE851D] data-[state=active]:bg-transparent"
          >
            {tn('analyticsDashboard.tabs.distribution')}
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* User Trend */}
            <Card className="border-[#e1dfdd]">
              <CardHeader className="py-4">
                <CardTitle className="text-sm">{tn('analyticsDashboard.charts.userGrowthTrend')}</CardTitle>
                <CardDescription className="text-xs">{tn('analyticsDashboard.charts.userGrowthSubtitle')}</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={data.timeline}>
                    <defs>
                      <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#DE851D" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#DE851D" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e1dfdd" />
                    <XAxis 
                      dataKey="date" 
                      tickFormatter={(value) => new Date(value).getDate().toString()}
                      tick={{ fontSize: 12 }}
                      stroke="#666"
                    />
                    <YAxis tick={{ fontSize: 12 }} stroke="#666" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #e1dfdd',
                        borderRadius: '8px',
                        fontSize: '12px'
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="users" 
                      stroke="#DE851D" 
                      strokeWidth={2}
                      fillOpacity={1} 
                      fill="url(#colorUsers)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Login Activity */}
            <Card className="border-[#e1dfdd]">
              <CardHeader className="py-4">
                <CardTitle className="text-sm">{tn('analyticsDashboard.charts.loginActivity')}</CardTitle>
                <CardDescription className="text-xs">{tn('analyticsDashboard.charts.loginActivitySubtitle')}</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={data.timeline}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e1dfdd" />
                    <XAxis 
                      dataKey="date" 
                      tickFormatter={(value) => new Date(value).getDate().toString()}
                      tick={{ fontSize: 12 }}
                      stroke="#666"
                    />
                    <YAxis tick={{ fontSize: 12 }} stroke="#666" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #e1dfdd',
                        borderRadius: '8px',
                        fontSize: '12px'
                      }}
                    />
                    <Bar dataKey="logins" fill="#DE851D" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Role Distribution */}
            <Card className="border-[#e1dfdd]">
              <CardHeader className="py-4">
                <CardTitle className="text-sm">{tn('analyticsDashboard.charts.roleDistribution')}</CardTitle>
                <CardDescription className="text-xs">{tn('analyticsDashboard.charts.roleDistributionSubtitle')}</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={data.roles}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(entry) => `${entry.name} (${entry.percentage}%)`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {data.roles.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #e1dfdd',
                        borderRadius: '8px',
                        fontSize: '12px'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Department Activity */}
            <Card className="border-[#e1dfdd]">
              <CardHeader className="py-4">
                <CardTitle className="text-sm">Department Activity</CardTitle>
                <CardDescription className="text-xs">Active vs total users</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={data.departments} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#e1dfdd" />
                    <XAxis type="number" tick={{ fontSize: 12 }} stroke="#666" />
                    <YAxis dataKey="name" type="category" width={80} tick={{ fontSize: 12 }} stroke="#666" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #e1dfdd',
                        borderRadius: '8px',
                        fontSize: '12px'
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: '12px' }} />
                    <Bar dataKey="users" fill="#E9C796" name="Total Users" radius={[0, 4, 4, 0]} />
                    <Bar dataKey="active" fill="#DE851D" name="Active Users" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Users Tab */}
        <TabsContent value="users" className="space-y-4">
          <Card className="border-[#e1dfdd]">
            <CardHeader className="py-4">
              <CardTitle className="text-sm">User Growth Over Time</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={data.timeline}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e1dfdd" />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    tick={{ fontSize: 12 }}
                    stroke="#666"
                  />
                  <YAxis tick={{ fontSize: 12 }} stroke="#666" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e1dfdd',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Line 
                    type="monotone" 
                    dataKey="users" 
                    stroke="#DE851D" 
                    strokeWidth={2}
                    name="Total Users"
                    dot={{ fill: '#DE851D', r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Activity Tab */}
        <TabsContent value="activity" className="space-y-4">
          <Card className="border-[#e1dfdd]">
            <CardHeader className="py-4">
              <CardTitle className="text-sm">System Activity</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={data.timeline}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e1dfdd" />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    tick={{ fontSize: 12 }}
                    stroke="#666"
                  />
                  <YAxis tick={{ fontSize: 12 }} stroke="#666" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e1dfdd',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Line 
                    type="monotone" 
                    dataKey="logins" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    name="Logins"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="actions" 
                    stroke="#10b981" 
                    strokeWidth={2}
                    name="Actions"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Distribution Tab */}
        <TabsContent value="distribution" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card className="border-[#e1dfdd]">
              <CardHeader className="py-4">
                <CardTitle className="text-sm">Roles Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="space-y-3">
                  {data.roles.map((role, index) => (
                    <div key={role.name} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span>{role.name}</span>
                        <span className="text-gray-600">{role.count} users</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full"
                          style={{
                            width: `${role.percentage}%`,
                            backgroundColor: COLORS[index % COLORS.length]
                          }}
                        />
                      </div>
                      <div className="text-xs text-gray-500">{role.percentage}%</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-[#e1dfdd]">
              <CardHeader className="py-4">
                <CardTitle className="text-sm">Departments Overview</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="space-y-3">
                  {data.departments.map((dept) => (
                    <div key={dept.name} className="flex items-center justify-between p-3 border border-[#e1dfdd] rounded-lg">
                      <div>
                        <div className="text-sm">{dept.name}</div>
                        <div className="text-xs text-gray-500">{dept.active} active</div>
                      </div>
                      <Badge 
                        variant="outline" 
                        className="border-[#e1dfdd] bg-[#E9C796] text-black"
                      >
                        {dept.users} total
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}