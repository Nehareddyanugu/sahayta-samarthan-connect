import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { TrendingUp, Users, MessageCircle, Target, Globe, Clock } from 'lucide-react';

// Mock data for charts
const queryVolumeData = [
  { time: '00:00', queries: 45, resolved: 42 },
  { time: '04:00', queries: 32, resolved: 30 },
  { time: '08:00', queries: 128, resolved: 122 },
  { time: '12:00', queries: 245, resolved: 235 },
  { time: '16:00', queries: 312, resolved: 298 },
  { time: '20:00', queries: 189, resolved: 182 },
];

const languageUsageData = [
  { name: 'Hindi', value: 45, users: 4500, color: '#3B82F6' },
  { name: 'English', value: 30, users: 3000, color: '#06B6D4' },
  { name: 'Marathi', value: 12, users: 1200, color: '#8B5CF6' },
  { name: 'Telugu', value: 8, users: 800, color: '#F59E0B' },
  { name: 'Urdu', value: 5, users: 500, color: '#EF4444' },
];

const categoryData = [
  { category: 'Fees', queries: 1250, accuracy: 96 },
  { category: 'Scholarships', queries: 980, accuracy: 94 },
  { category: 'Timetables', queries: 750, accuracy: 98 },
  { category: 'Admissions', queries: 650, accuracy: 92 },
  { category: 'Documents', queries: 420, accuracy: 95 },
  { category: 'General', queries: 380, accuracy: 88 },
];

const weeklyTrends = [
  { day: 'Mon', students: 2400, queries: 4800, satisfaction: 4.2 },
  { day: 'Tue', students: 2800, queries: 5200, satisfaction: 4.3 },
  { day: 'Wed', students: 3200, queries: 6100, satisfaction: 4.4 },
  { day: 'Thu', students: 3600, queries: 6800, satisfaction: 4.5 },
  { day: 'Fri', students: 4100, queries: 7200, satisfaction: 4.6 },
  { day: 'Sat', students: 1800, queries: 3200, satisfaction: 4.1 },
  { day: 'Sun', students: 1200, queries: 2100, satisfaction: 4.0 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border border-border/50 rounded-lg shadow-lg">
        <p className="font-medium text-foreground mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export const DashboardCharts: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="card-gradient border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Queries Today</p>
                <p className="text-2xl font-bold text-foreground">1,451</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +12% from yesterday
                </p>
              </div>
              <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <MessageCircle className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-gradient border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Students</p>
                <p className="text-2xl font-bold text-foreground">10,247</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <Users className="h-3 w-3 mr-1" />
                  +8% this week
                </p>
              </div>
              <div className="h-10 w-10 bg-accent-teal/10 rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5 text-accent-teal" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-gradient border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Accuracy Rate</p>
                <p className="text-2xl font-bold text-foreground">95.2%</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <Target className="h-3 w-3 mr-1" />
                  +2.1% improved
                </p>
              </div>
              <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Target className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-gradient border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Response Time</p>
                <p className="text-2xl font-bold text-foreground">1.2s</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <Clock className="h-3 w-3 mr-1" />
                  -0.3s faster
                </p>
              </div>
              <div className="h-10 w-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Clock className="h-5 w-5 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Query Volume Over Time */}
        <Card className="card-gradient border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <span>Query Volume (24h)</span>
            </CardTitle>
            <CardDescription>
              Real-time student queries and resolution rates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={queryVolumeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="time" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="queries" 
                  stackId="1" 
                  stroke="#3B82F6" 
                  fill="url(#gradient1)" 
                  strokeWidth={2}
                />
                <Area 
                  type="monotone" 
                  dataKey="resolved" 
                  stackId="2" 
                  stroke="#06B6D4" 
                  fill="url(#gradient2)" 
                  strokeWidth={2}
                />
                <defs>
                  <linearGradient id="gradient1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.05}/>
                  </linearGradient>
                  <linearGradient id="gradient2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#06B6D4" stopOpacity={0.05}/>
                  </linearGradient>
                </defs>
                <Legend />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Language Usage Distribution */}
        <Card className="card-gradient border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Globe className="h-5 w-5 text-accent-teal" />
              <span>Language Preferences</span>
            </CardTitle>
            <CardDescription>
              Distribution of student language choices
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={languageUsageData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {languageUsageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value, name) => [`${value}% (${languageUsageData.find(d => d.name === name)?.users} users)`, name]}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
            
            <div className="mt-4 grid grid-cols-2 gap-2">
              {languageUsageData.map((lang, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: lang.color }}></div>
                    <span className="font-medium">{lang.name}</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {lang.value}%
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Query Categories & Accuracy */}
        <Card className="card-gradient border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-green-600" />
              <span>Query Categories & Accuracy</span>
            </CardTitle>
            <CardDescription>
              Performance by question type
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis type="number" stroke="#64748b" />
                <YAxis type="category" dataKey="category" stroke="#64748b" width={80} />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="queries" 
                  fill="#3B82F6" 
                  radius={[0, 4, 4, 0]}
                  name="Total Queries"
                />
                <Bar 
                  dataKey="accuracy" 
                  fill="#06B6D4" 
                  radius={[0, 4, 4, 0]}
                  name="Accuracy %"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Weekly Engagement Trends */}
        <Card className="card-gradient border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-purple-600" />
              <span>Weekly Student Engagement</span>
            </CardTitle>
            <CardDescription>
              Student activity and satisfaction trends
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="day" stroke="#64748b" />
                <YAxis yAxisId="left" stroke="#64748b" />
                <YAxis yAxisId="right" orientation="right" stroke="#64748b" />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="students" 
                  stroke="#8B5CF6" 
                  strokeWidth={3}
                  dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 6 }}
                  name="Active Students"
                />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="queries" 
                  stroke="#F59E0B" 
                  strokeWidth={3}
                  dot={{ fill: '#F59E0B', strokeWidth: 2, r: 6 }}
                  name="Total Queries"
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="satisfaction" 
                  stroke="#10B981" 
                  strokeWidth={3}
                  dot={{ fill: '#10B981', strokeWidth: 2, r: 6 }}
                  name="Satisfaction (5.0)"
                />
                <Legend />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};