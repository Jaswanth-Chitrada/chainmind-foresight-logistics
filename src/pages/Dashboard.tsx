
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, Activity, TrendingUp, AlertTriangle, Truck } from 'lucide-react';

const Dashboard = () => {
  const agentStatus = [
    { name: 'Forecast Agent', status: 'healthy', lastRun: '3 mins ago', nextRun: '2 mins' },
    { name: 'Route Agent', status: 'in-progress', lastRun: '1 min ago', nextRun: '4 mins' },
    { name: 'Inventory Agent', status: 'healthy', lastRun: '5 mins ago', nextRun: '1 min' },
    { name: 'Procurement Agent', status: 'issue', lastRun: '15 mins ago', nextRun: 'paused' },
  ];

  const alerts = [
    { type: 'warning', message: 'Route RT003 delayed due to road construction', time: '2 mins ago' },
    { type: 'error', message: 'Kolkata warehouse under maintenance – routes affected', time: '5 mins ago' },
    { type: 'info', message: 'Route optimization saved ₹8,600 across 3 routes', time: '10 mins ago' },
  ];

  const metrics = [
    { label: 'Active Routes Today', value: '4', icon: Truck },
    { label: 'Average Route Time', value: '23.7h', icon: Activity },
    { label: 'Route Disruptions', value: '1', icon: AlertTriangle },
    { label: 'Agent Optimizations (24h)', value: '12', icon: TrendingUp },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <Button className="bg-logistics-accent hover:bg-logistics-accent/80">
          <RefreshCw className="w-4 h-4 mr-2" />
          Trigger Full System Sync
        </Button>
      </div>

      {/* Agent Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {agentStatus.map((agent) => (
          <Card key={agent.name} className="glass-panel border-white/10">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-300">{agent.name}</CardTitle>
                <div className={`w-3 h-3 rounded-full ${
                  agent.status === 'healthy' ? 'bg-logistics-success' :
                  agent.status === 'in-progress' ? 'bg-logistics-warning' :
                  'bg-logistics-danger'
                } animate-pulse`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-gray-400 space-y-1">
                <p>Last run: {agent.lastRun}</p>
                <p>Next run: {agent.nextRun}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Metrics */}
        <div className="lg:col-span-2">
          <Card className="glass-panel border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Quick Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {metrics.map((metric) => {
                  const Icon = metric.icon;
                  return (
                    <div key={metric.label} className="flex items-center space-x-3 p-3 rounded-lg bg-logistics-panel/30">
                      <Icon className="w-8 h-8 text-logistics-accent" />
                      <div>
                        <p className="text-2xl font-bold text-white">{metric.value}</p>
                        <p className="text-sm text-gray-400">{metric.label}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Live Alerts Feed */}
        <div>
          <Card className="glass-panel border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Live Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {alerts.map((alert, index) => (
                  <div key={index} className="flex items-start space-x-3 p-2 rounded-lg bg-logistics-panel/30 hover:bg-logistics-panel/50 cursor-pointer transition-colors">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      alert.type === 'warning' ? 'bg-logistics-warning' :
                      alert.type === 'error' ? 'bg-logistics-danger' :
                      'bg-logistics-accent'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white">{alert.message}</p>
                      <p className="text-xs text-gray-400 mt-1">{alert.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
