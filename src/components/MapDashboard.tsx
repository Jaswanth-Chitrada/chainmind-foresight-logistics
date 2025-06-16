
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Warehouse, Truck } from 'lucide-react';

const MapDashboard = () => {
  const [selectedWarehouse, setSelectedWarehouse] = useState<string | null>(null);

  const warehouses = [
    { id: '1', name: 'Mumbai Central', lat: 19.0760, lng: 72.8777, status: 'operational', inventory: 2847 },
    { id: '2', name: 'Delhi North', lat: 28.7041, lng: 77.1025, status: 'operational', inventory: 3201 },
    { id: '3', name: 'Chennai Port', lat: 13.0827, lng: 80.2707, status: 'warning', inventory: 1456 },
    { id: '4', name: 'Bangalore Tech', lat: 12.9716, lng: 77.5946, status: 'operational', inventory: 2103 },
    { id: '5', name: 'Kolkata East', lat: 22.5726, lng: 88.3639, status: 'operational', inventory: 1879 }
  ];

  const routes = [
    { from: 'Mumbai Central', to: 'Pune', status: 'active', vehicles: 3 },
    { from: 'Delhi North', to: 'Gurgaon', status: 'delayed', vehicles: 2 },
    { from: 'Chennai Port', to: 'Bangalore Tech', status: 'rerouted', vehicles: 1 },
    { from: 'Bangalore Tech', to: 'Hyderabad', status: 'active', vehicles: 4 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500';
      case 'critical': return 'bg-red-500';
      case 'active': return 'bg-blue-500';
      case 'delayed': return 'bg-orange-500';
      case 'rerouted': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="flex-1 glass-panel p-6 relative overflow-hidden">
      {/* Map Background with Grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full bg-gradient-to-br from-logistics-accent/20 to-logistics-glow/20"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(96, 165, 250, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(96, 165, 250, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>
      
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

      {/* Simulated Map Interface */}
      <div className="relative z-10 flex-1 bg-logistics-dark/50 rounded-lg border border-white/10 p-6 min-h-[500px]">
        {/* Warehouses Grid */}
        <div className="grid grid-cols-3 gap-8 h-full">
          {warehouses.map((warehouse, index) => (
            <div
              key={warehouse.id}
              className={`relative cursor-pointer transition-all duration-300 ${
                selectedWarehouse === warehouse.id ? 'scale-110' : 'hover:scale-105'
              }`}
              style={{
                gridRow: Math.floor(index / 2) + 1,
                gridColumn: (index % 3) + 1,
                transform: `translate(${index * 20}px, ${index * 15}px)`
              }}
              onClick={() => setSelectedWarehouse(warehouse.id)}
            >
              <Card className="bg-logistics-panel/80 border-white/20 p-4 hover:border-logistics-accent/50 transition-all">
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
                  <div className="mt-2 text-xs text-yellow-400 animate-fade-in">
                    ⚠️ Storm warning detected
                  </div>
                )}
              </Card>
            </div>
          ))}
        </div>

        {/* Animated Routes */}
        {routes.map((route, index) => (
          <div
            key={index}
            className="absolute top-1/2 left-1/4 w-1/2 h-0.5 bg-gradient-to-r from-logistics-accent/50 to-logistics-glow/50 transform -translate-y-1/2"
            style={{
              transform: `rotate(${index * 15}deg) translateY(-50%)`,
              transformOrigin: 'left center'
            }}
          >
            <div className={`absolute right-0 top-1/2 transform -translate-y-1/2 ${getStatusColor(route.status)} rounded-full p-1`}>
              <Truck className="w-3 h-3 text-white" />
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="relative z-10 mt-4 grid grid-cols-4 gap-4 text-xs">
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
