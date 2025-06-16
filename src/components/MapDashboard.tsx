
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Warehouse, Truck } from 'lucide-react';
import MapComponent from './MapComponent';

const MapDashboard = () => {
  const [selectedWarehouse, setSelectedWarehouse] = useState<string | null>(null);

  const warehouses = [
    { id: '1', name: 'Mumbai Central', lat: 19.0760, lng: 72.8777, status: 'operational', inventory: 2847 },
    { id: '2', name: 'Delhi North', lat: 28.7041, lng: 77.1025, status: 'operational', inventory: 3201 },
    { id: '3', name: 'Chennai Port', lat: 13.0827, lng: 80.2707, status: 'warning', inventory: 1456 },
    { id: '4', name: 'Bangalore Tech', lat: 12.9716, lng: 77.5946, status: 'operational', inventory: 2103 },
    { id: '5', name: 'Kolkata East', lat: 22.5726, lng: 88.3639, status: 'operational', inventory: 1879 }
  ];

  const mapDisruptions = warehouses.map(warehouse => ({
    id: warehouse.id,
    location: warehouse.name,
    coordinates: [warehouse.lng, warehouse.lat] as [number, number],
    type: warehouse.status === 'warning' ? 'Storm Warning' : 'Operational',
    severity: warehouse.status === 'warning' ? 'moderate' as const : 'low' as const,
    description: warehouse.status === 'warning' ? 
      `Storm warning detected - ${warehouse.inventory} items in inventory` :
      `Operational - ${warehouse.inventory} items in inventory`,
    confidence: 95,
    eta: warehouse.status === 'warning' ? '2 hours' : 'N/A'
  }));

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500';
      case 'critical': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="flex-1 glass-panel p-6 relative overflow-hidden">
      {/* Map Header */}
      <div className="relative z-10 flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-white">Supply Chain Network</h2>
          <p className="text-sm text-gray-400">Real-time logistics overview across India</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
            Live Tracking
          </Badge>
        </div>
      </div>

      {/* Interactive Map */}
      <div className="relative z-10 mb-4">
        <MapComponent 
          disruptions={mapDisruptions}
          onDisruptionClick={(disruption) => setSelectedWarehouse(disruption.id)}
        />
      </div>

      {/* Warehouse Cards */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {warehouses.map((warehouse) => (
          <Card 
            key={warehouse.id} 
            className={`bg-logistics-panel/80 border-white/20 p-4 cursor-pointer transition-all ${
              selectedWarehouse === warehouse.id ? 'border-logistics-accent/50 scale-105' : 'hover:border-logistics-accent/30'
            }`}
            onClick={() => setSelectedWarehouse(warehouse.id)}
          >
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${getStatusColor(warehouse.status)} ${warehouse.status === 'warning' ? 'animate-pulse' : ''}`}>
                <Warehouse className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-white text-sm">{warehouse.name}</h3>
                <p className="text-xs text-gray-400">{warehouse.inventory} items</p>
              </div>
            </div>
            
            {warehouse.status === 'warning' && (
              <div className="mt-2 text-xs text-yellow-400">
                ⚠️ Storm warning detected
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Legend */}
      <div className="relative z-10 grid grid-cols-4 gap-4 text-xs">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-gray-400">Operational</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
          <span className="text-gray-400">Warning</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span className="text-gray-400">Active Route</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <span className="text-gray-400">Critical</span>
        </div>
      </div>
    </div>
  );
};

export default MapDashboard;
