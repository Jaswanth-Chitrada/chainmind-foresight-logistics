
import React from 'react';
import { AlertCircle, TrendingUp, Package, Truck } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Alert {
  id: string;
  type: 'disruption' | 'inventory' | 'route' | 'procurement';
  severity: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  location: string;
  timestamp: string;
  agent: string;
}

const AlertsSidebar = () => {
  const alerts: Alert[] = [
    {
      id: '1',
      type: 'disruption',
      severity: 'high',
      title: 'Weather Disruption Detected',
      description: 'Severe thunderstorm forecast for Chennai region',
      location: 'Chennai, India',
      timestamp: '2 min ago',
      agent: 'Forecast Agent'
    },
    {
      id: '2',
      type: 'inventory',
      severity: 'medium',
      title: 'Inventory Redistribution',
      description: 'Low stock levels detected for Electronics',
      location: 'Mumbai Warehouse',
      timestamp: '15 min ago',
      agent: 'Inventory Agent'
    },
    {
      id: '3',
      type: 'route',
      severity: 'medium',
      title: 'Route Optimization',
      description: 'Alternative route suggested due to traffic',
      location: 'Delhi-Bangalore',
      timestamp: '32 min ago',
      agent: 'Route Agent'
    },
    {
      id: '4',
      type: 'procurement',
      severity: 'low',
      title: 'Auto Procurement',
      description: 'Triggered purchase order for critical supplies',
      location: 'Supplier Network',
      timestamp: '1 hour ago',
      agent: 'Procurement Agent'
    }
  ];

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'disruption': return <AlertCircle className="w-4 h-4" />;
      case 'inventory': return <Package className="w-4 h-4" />;
      case 'route': return <Truck className="w-4 h-4" />;
      case 'procurement': return <TrendingUp className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'low': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="w-80 glass-panel p-4 h-full overflow-hidden flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white">Live Alerts</h2>
        <Badge variant="secondary" className="bg-logistics-accent/20 text-logistics-accent">
          {alerts.length} Active
        </Badge>
      </div>
      
      <div className="flex-1 overflow-y-auto space-y-3">
        {alerts.map((alert) => (
          <Card key={alert.id} className="bg-logistics-panel/50 border-white/10 p-3 hover:bg-logistics-panel/70 transition-all duration-200 animate-fade-in">
            <div className="flex items-start space-x-3">
              <div className={`p-2 rounded-lg ${getSeverityColor(alert.severity)}`}>
                {getAlertIcon(alert.type)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm font-medium text-white truncate">
                    {alert.title}
                  </h3>
                  <Badge variant="outline" className="text-xs border-white/20 text-gray-400">
                    {alert.severity.toUpperCase()}
                  </Badge>
                </div>
                
                <p className="text-xs text-gray-400 mb-2 line-clamp-2">
                  {alert.description}
                </p>
                
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{alert.location}</span>
                  <span>{alert.timestamp}</span>
                </div>
                
                <div className="mt-2 text-xs text-logistics-accent">
                  {alert.agent}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-white/10">
        <button className="w-full text-sm text-logistics-accent hover:text-white transition-colors">
          View All Alerts →
        </button>
      </div>
    </div>
  );
};

export default AlertsSidebar;
