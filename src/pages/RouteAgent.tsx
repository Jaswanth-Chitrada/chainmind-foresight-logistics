
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Route, Truck, MapPin, Clock, Zap, AlertTriangle } from 'lucide-react';
import MapComponent from '@/components/MapComponent';

const RouteAgent = () => {
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);

  const warehouses = [
    { id: 'WH001', name: 'Mumbai Central', lat: 19.0760, lng: 72.8777, status: 'operational' },
    { id: 'WH002', name: 'Delhi North', lat: 28.7041, lng: 77.1025, status: 'operational' },
    { id: 'WH003', name: 'Chennai Port', lat: 13.0827, lng: 80.2707, status: 'operational' },
    { id: 'WH004', name: 'Bangalore Tech', lat: 12.9716, lng: 77.5946, status: 'operational' },
    { id: 'WH005', name: 'Kolkata East', lat: 22.5726, lng: 88.3639, status: 'maintenance' }
  ];

  const activeRoutes = [
    {
      id: 'RT001',
      from: 'Mumbai Central',
      to: 'Bangalore Tech',
      distance: '980 km',
      duration: '14h 30m',
      cost: '₹18,500',
      status: 'active',
      trucks: 3,
      priority: 'high'
    },
    {
      id: 'RT002',
      from: 'Delhi North',
      to: 'Chennai Port',
      distance: '2,180 km',
      duration: '32h 15m',
      cost: '₹42,300',
      status: 'active',
      trucks: 2,
      priority: 'medium'
    },
    {
      id: 'RT003',
      from: 'Bangalore Tech',
      to: 'Kolkata East',
      distance: '1,880 km',
      duration: '28h 45m',
      cost: '₹35,200',
      status: 'delayed',
      trucks: 1,
      priority: 'high'
    },
    {
      id: 'RT004',
      from: 'Chennai Port',
      to: 'Mumbai Central',
      distance: '1,340 km',
      duration: '19h 20m',
      cost: '₹25,800',
      status: 'active',
      trucks: 4,
      priority: 'low'
    }
  ];

  const routeOptimizations = [
    {
      routeId: 'RT001',
      suggestion: 'Alternative route via NH48 saves 2h 15m',
      savings: '₹3,200',
      confidence: 92
    },
    {
      routeId: 'RT003',
      suggestion: 'Reroute due to road construction on NH16',
      savings: '4h 30m delay avoided',
      confidence: 87
    },
    {
      routeId: 'RT002',
      suggestion: 'Fuel-efficient route reduces cost by 8%',
      savings: '₹3,400',
      confidence: 95
    }
  ];

  const mapDisruptions = warehouses.map(warehouse => ({
    id: warehouse.id,
    location: warehouse.name,
    coordinates: [warehouse.lng, warehouse.lat] as [number, number],
    type: warehouse.status === 'maintenance' ? 'Maintenance' : 'Operational',
    severity: warehouse.status === 'maintenance' ? 'moderate' as const : 'low' as const,
    description: warehouse.status === 'maintenance' ? 
      'Warehouse under maintenance - limited operations' :
      'Operational warehouse - normal capacity',
    confidence: 95,
    eta: warehouse.status === 'maintenance' ? '6 hours' : 'N/A'
  }));

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400';
      case 'delayed': return 'bg-red-500/20 text-red-400';
      case 'maintenance': return 'bg-yellow-500/20 text-yellow-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500/20 text-red-400';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400';
      case 'low': return 'bg-green-500/20 text-green-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Route Agent</h1>
        <Button className="bg-logistics-accent hover:bg-logistics-accent/80">
          <Zap className="w-4 h-4 mr-2" />
          Optimize All Routes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Warehouse Network Map */}
        <div className="lg:col-span-2">
          <Card className="glass-panel border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                Warehouse Network
              </CardTitle>
            </CardHeader>
            <CardContent>
              <MapComponent 
                disruptions={mapDisruptions}
                onDisruptionClick={(disruption) => setSelectedRoute(disruption.id)}
              />
              
              {selectedRoute && (
                <div className="mt-4 p-4 bg-logistics-panel/30 rounded-lg border border-white/10">
                  <h4 className="text-white font-medium mb-2">
                    Selected Warehouse: {mapDisruptions.find(d => d.id === selectedRoute)?.location}
                  </h4>
                  <p className="text-logistics-accent text-sm">
                    {mapDisruptions.find(d => d.id === selectedRoute)?.type}
                  </p>
                  <p className="text-gray-400 text-sm mt-1">
                    {mapDisruptions.find(d => d.id === selectedRoute)?.description}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Route Optimization Suggestions */}
        <div>
          <Card className="glass-panel border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Zap className="w-5 h-5 mr-2" />
                AI Suggestions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {routeOptimizations.map((opt, index) => (
                  <div key={index} className="p-3 rounded-lg bg-logistics-panel/30 border border-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium text-white">{opt.routeId}</h4>
                      <Badge className="bg-logistics-accent/20 text-logistics-accent text-xs">
                        {opt.confidence}% confidence
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-300 mb-2">{opt.suggestion}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-logistics-success text-sm font-medium">
                        Save: {opt.savings}
                      </span>
                      <div className="space-x-2">
                        <Button size="sm" variant="outline" className="text-xs">
                          Dismiss
                        </Button>
                        <Button size="sm" className="bg-logistics-success hover:bg-logistics-success/80 text-xs">
                          Apply
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Active Routes Table */}
      <Card className="glass-panel border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Route className="w-5 h-5 mr-2" />
            Active Transportation Routes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-white/10">
                <TableHead className="text-gray-300">Route ID</TableHead>
                <TableHead className="text-gray-300">From</TableHead>
                <TableHead className="text-gray-300">To</TableHead>
                <TableHead className="text-gray-300">Distance</TableHead>
                <TableHead className="text-gray-300">Duration</TableHead>
                <TableHead className="text-gray-300">Cost</TableHead>
                <TableHead className="text-gray-300">Trucks</TableHead>
                <TableHead className="text-gray-300">Priority</TableHead>
                <TableHead className="text-gray-300">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activeRoutes.map((route) => (
                <TableRow key={route.id} className="border-white/10">
                  <TableCell className="text-white font-medium">{route.id}</TableCell>
                  <TableCell className="text-gray-300">{route.from}</TableCell>
                  <TableCell className="text-gray-300">{route.to}</TableCell>
                  <TableCell className="text-white">{route.distance}</TableCell>
                  <TableCell className="text-gray-300">{route.duration}</TableCell>
                  <TableCell className="text-white">{route.cost}</TableCell>
                  <TableCell className="text-gray-300 flex items-center">
                    <Truck className="w-4 h-4 mr-1" />
                    {route.trucks}
                  </TableCell>
                  <TableCell>
                    <Badge className={getPriorityColor(route.priority)}>
                      {route.priority.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(route.status)}>
                      {route.status === 'delayed' && <AlertTriangle className="w-3 h-3 mr-1" />}
                      {route.status === 'active' && <Clock className="w-3 h-3 mr-1" />}
                      {route.status.toUpperCase()}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Active Routes', value: '4', icon: Route, color: 'text-logistics-accent' },
          { label: 'Total Distance', value: '6,380 km', icon: MapPin, color: 'text-logistics-success' },
          { label: 'Trucks in Transit', value: '10', icon: Truck, color: 'text-logistics-warning' },
          { label: 'Avg. Route Time', value: '23h 42m', icon: Clock, color: 'text-gray-400' }
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="glass-panel border-white/10">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <Icon className={`w-8 h-8 ${stat.color}`} />
                  <div>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className="text-sm text-gray-400">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default RouteAgent;
