
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Truck, Route, Zap, DollarSign, Clock, MapPin, TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';

const Optimization = () => {
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  const [isOptimizing, setIsOptimizing] = useState(false);

  const activeRoutes = [
    {
      id: 'R001',
      from: 'Mumbai Central',
      to: 'Pune District',
      vehicles: 3,
      distance: '149 km',
      estimatedTime: '3h 45m',
      fuelCost: '₹2,840',
      status: 'optimal',
      efficiency: 94
    },
    {
      id: 'R002',
      from: 'Delhi North',
      to: 'Gurgaon Hub',
      vehicles: 2,
      distance: '32 km',
      estimatedTime: '1h 20m',
      fuelCost: '₹720',
      status: 'suboptimal',
      efficiency: 78
    },
    {
      id: 'R003',
      from: 'Chennai Port',
      to: 'Bangalore Tech',
      vehicles: 4,
      distance: '347 km',
      estimatedTime: '6h 30m',
      fuelCost: '₹6,200',
      status: 'rerouted',
      efficiency: 85
    }
  ];

  const reallocationSuggestions = [
    {
      id: 'A001',
      type: 'inventory',
      suggestion: 'Redistribute 500 units from Bangalore to Chennai',
      impact: 'Reduces delivery time by 2 days',
      cost: '₹12,500',
      confidence: 92
    },
    {
      id: 'A002',
      type: 'vehicle',
      suggestion: 'Reroute Truck-045 via Highway NH-44',
      impact: 'Saves ₹850 in fuel costs',
      cost: '₹0',
      confidence: 87
    },
    {
      id: 'A003',
      type: 'priority',
      suggestion: 'Prioritize urgent orders in Delhi region',
      impact: 'Improves SLA compliance by 15%',
      cost: '₹3,200',
      confidence: 95
    }
  ];

  const rlMetrics = [
    { metric: 'Cost Efficiency', value: '89.2%', trend: 'up', change: '+3.2%' },
    { metric: 'Time Optimization', value: '91.7%', trend: 'up', change: '+1.8%' },
    { metric: 'Fuel Savings', value: '₹24,580', trend: 'up', change: '+₹2,140' },
    { metric: 'Route Adherence', value: '96.4%', trend: 'down', change: '-0.6%' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal': return 'bg-green-500';
      case 'suboptimal': return 'bg-yellow-500';
      case 'rerouted': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'optimal': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'suboptimal': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'rerouted': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const handleRunOptimization = () => {
    setIsOptimizing(true);
    setTimeout(() => setIsOptimizing(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center space-x-3">
            <div className="p-2 bg-logistics-accent rounded-lg">
              <Route className="w-8 h-8 text-white" />
            </div>
            <span>Optimization Agent</span>
          </h1>
          <p className="text-gray-400 mt-2">Real-time routing optimization with reinforcement learning</p>
        </div>
        
        <Button 
          onClick={handleRunOptimization}
          disabled={isOptimizing}
          className="bg-logistics-accent hover:bg-logistics-accent/80"
        >
          {isOptimizing ? (
            <>
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              Optimizing...
            </>
          ) : (
            <>
              <Zap className="w-4 h-4 mr-2" />
              Run Global Optimization
            </>
          )}
        </Button>
      </div>

      {/* RL Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {rlMetrics.map((metric, index) => (
          <Card key={index} className="glass-panel border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">{metric.metric}</p>
                  <p className="text-2xl font-bold text-white">{metric.value}</p>
                </div>
                <div className={`flex items-center space-x-1 ${metric.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                  {metric.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  <span className="text-sm">{metric.change}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Routes */}
        <Card className="glass-panel border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Truck className="w-5 h-5" />
              <span>Active Route Optimization</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {activeRoutes.map((route) => (
              <div
                key={route.id}
                className={`p-4 rounded-lg border transition-all cursor-pointer ${
                  selectedRoute === route.id 
                    ? 'border-logistics-accent bg-logistics-accent/10' 
                    : 'border-white/20 hover:border-white/30'
                }`}
                onClick={() => setSelectedRoute(route.id)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(route.status)}`}></div>
                    <span className="font-medium text-white">{route.id}</span>
                    <Badge className={getStatusBadge(route.status)}>
                      {route.status}
                    </Badge>
                  </div>
                  <span className="text-sm text-gray-400">{route.efficiency}% efficient</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400">Route</p>
                    <p className="text-white">{route.from} → {route.to}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Vehicles</p>
                    <p className="text-white">{route.vehicles} trucks</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Distance</p>
                    <p className="text-white">{route.distance}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Est. Time</p>
                    <p className="text-white">{route.estimatedTime}</p>
                  </div>
                </div>
                
                <div className="mt-3 pt-3 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Fuel Cost</span>
                    <span className="text-white font-medium">{route.fuelCost}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Reallocation Strategies */}
        <Card className="glass-panel border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <MapPin className="w-5 h-5" />
              <span>AI Reallocation Strategies</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {reallocationSuggestions.map((suggestion) => (
              <div key={suggestion.id} className="p-4 rounded-lg border border-white/20 hover:border-white/30 transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <p className="text-white font-medium mb-1">{suggestion.suggestion}</p>
                    <p className="text-sm text-gray-400">{suggestion.impact}</p>
                  </div>
                  <Badge className="bg-logistics-glow/20 text-logistics-glow border-logistics-glow/30 ml-2">
                    {suggestion.confidence}% confidence
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="text-gray-400">Cost: <span className="text-white">{suggestion.cost}</span></span>
                    <span className="text-gray-400">Type: <span className="text-white capitalize">{suggestion.type}</span></span>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="text-xs">
                      Simulate
                    </Button>
                    <Button size="sm" className="bg-logistics-accent hover:bg-logistics-accent/80 text-xs">
                      Apply
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Cost-Speed Simulation Results */}
      <Card className="glass-panel border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <DollarSign className="w-5 h-5" />
            <span>Cost-Speed Simulation Results</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 border border-white/20 rounded-lg">
              <div className="text-3xl font-bold text-green-400 mb-2">₹18,760</div>
              <div className="text-sm text-gray-400">Daily Cost Savings</div>
              <div className="text-xs text-green-400 mt-1">↑ 12% vs yesterday</div>
            </div>
            
            <div className="text-center p-6 border border-white/20 rounded-lg">
              <div className="text-3xl font-bold text-blue-400 mb-2">2.3h</div>
              <div className="text-sm text-gray-400">Average Time Reduction</div>
              <div className="text-xs text-blue-400 mt-1">↑ 8% improvement</div>
            </div>
            
            <div className="text-center p-6 border border-white/20 rounded-lg">
              <div className="text-3xl font-bold text-logistics-accent mb-2">94.2%</div>
              <div className="text-sm text-gray-400">Route Optimization Score</div>
              <div className="text-xs text-logistics-accent mt-1">↑ 2.1% this week</div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-logistics-dark/50 rounded-lg border border-white/10">
            <div className="flex items-center space-x-2 mb-3">
              <Clock className="w-4 h-4 text-logistics-glow" />
              <span className="text-sm font-medium text-white">Latest RL Training Results</span>
            </div>
            <div className="text-sm text-gray-400">
              <p>• Reinforcement learning model completed 10,000+ route simulations</p>
              <p>• Identified 23% fuel efficiency improvement opportunities</p>
              <p>• Reduced average delivery time by 18 minutes across all routes</p>
              <p>• Model confidence: 96.7% (last updated 12 minutes ago)</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Optimization;
