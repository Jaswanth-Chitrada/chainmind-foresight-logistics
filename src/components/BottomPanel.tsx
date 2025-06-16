
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Package, ShoppingCart, Play, BarChart3 } from 'lucide-react';

const BottomPanel = () => {
  const [activeSimulation, setActiveSimulation] = useState(false);

  const inventoryData = [
    { id: '1', item: 'Electronics', location: 'Mumbai', current: 450, minimum: 500, status: 'low', action: 'Redistribute from Delhi' },
    { id: '2', item: 'Textiles', location: 'Chennai', current: 230, minimum: 200, status: 'critical', action: 'Emergency restock needed' },
    { id: '3', item: 'Pharmaceuticals', location: 'Bangalore', current: 890, minimum: 300, status: 'optimal', action: 'No action required' },
    { id: '4', item: 'Food Products', location: 'Delhi', current: 670, minimum: 400, status: 'good', action: 'Consider redistribution' }
  ];

  const procurementOrders = [
    { id: 'PO-001', item: 'Medical Supplies', supplier: 'MedTech India', amount: '₹2,34,000', status: 'approved', eta: '2 days' },
    { id: 'PO-002', item: 'Electronic Components', supplier: 'TechSource Ltd', amount: '₹5,67,000', status: 'pending', eta: '5 days' },
    { id: 'PO-003', item: 'Raw Materials', supplier: 'Global Materials', amount: '₹8,90,000', status: 'in-transit', eta: '1 day' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'low': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'good': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'optimal': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'approved': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'in-transit': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const runSimulation = () => {
    setActiveSimulation(true);
    // Simulate AI agent processing
    setTimeout(() => {
      setActiveSimulation(false);
    }, 3000);
  };

  return (
    <div className="h-80 glass-panel p-4">
      <Tabs defaultValue="inventory" className="h-full">
        <TabsList className="bg-logistics-surface border-white/10">
          <TabsTrigger value="inventory" className="flex items-center space-x-2">
            <Package className="w-4 h-4" />
            <span>Inventory</span>
          </TabsTrigger>
          <TabsTrigger value="procurement" className="flex items-center space-x-2">
            <ShoppingCart className="w-4 h-4" />
            <span>Procurement</span>
          </TabsTrigger>
          <TabsTrigger value="simulation" className="flex items-center space-x-2">
            <Play className="w-4 h-4" />
            <span>Simulation</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="inventory" className="mt-4 h-full overflow-y-auto">
          <div className="space-y-3">
            {inventoryData.map((item) => (
              <Card key={item.id} className="bg-logistics-panel/50 border-white/10 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex flex-col">
                      <h3 className="font-medium text-white">{item.item}</h3>
                      <p className="text-sm text-gray-400">{item.location}</p>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-white">{item.current}</div>
                      <div className="text-xs text-gray-400">Min: {item.minimum}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <Badge className={getStatusColor(item.status)}>
                      {item.status.toUpperCase()}
                    </Badge>
                    <div className="text-sm text-gray-300 max-w-48">
                      {item.action}
                    </div>
                    {item.status !== 'optimal' && (
                      <Button size="sm" variant="outline" className="border-logistics-accent text-logistics-accent hover:bg-logistics-accent hover:text-white">
                        Execute
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="procurement" className="mt-4 h-full overflow-y-auto">
          <div className="space-y-3">
            {procurementOrders.map((order) => (
              <Card key={order.id} className="bg-logistics-panel/50 border-white/10 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex flex-col">
                      <h3 className="font-medium text-white">{order.id}</h3>
                      <p className="text-sm text-gray-400">{order.item}</p>
                    </div>
                    <div className="flex flex-col">
                      <div className="font-semibold text-logistics-accent">{order.amount}</div>
                      <div className="text-xs text-gray-400">{order.supplier}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <Badge className={getStatusColor(order.status)}>
                      {order.status.toUpperCase()}
                    </Badge>
                    <div className="text-sm text-gray-300">
                      ETA: {order.eta}
                    </div>
                    {order.status === 'pending' && (
                      <div className="space-x-2">
                        <Button size="sm" variant="outline" className="border-green-500 text-green-400 hover:bg-green-500 hover:text-white">
                          Approve
                        </Button>
                        <Button size="sm" variant="outline" className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white">
                          Cancel
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="simulation" className="mt-4 h-full">
          <div className="flex items-center justify-center h-full">
            <Card className="bg-logistics-panel/50 border-white/10 p-8 text-center max-w-md">
              <div className="space-y-4">
                <div className="flex items-center justify-center">
                  <BarChart3 className="w-12 h-12 text-logistics-accent" />
                </div>
                <h3 className="text-lg font-semibold text-white">What-If Simulation</h3>
                <p className="text-sm text-gray-400">
                  Run predictive scenarios to test supply chain resilience
                </p>
                
                {activeSimulation ? (
                  <div className="space-y-3">
                    <div className="animate-pulse text-logistics-accent">
                      🤖 AI Agents Processing...
                    </div>
                    <div className="space-y-1 text-xs text-gray-400">
                      <div>• Forecast Agent: Analyzing weather data</div>
                      <div>• Inventory Agent: Calculating redistribution</div>
                      <div>• Route Agent: Optimizing delivery paths</div>
                    </div>
                  </div>
                ) : (
                  <Button 
                    onClick={runSimulation}
                    className="bg-logistics-accent hover:bg-logistics-accent/80"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Run Disruption Simulation
                  </Button>
                )}
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BottomPanel;
