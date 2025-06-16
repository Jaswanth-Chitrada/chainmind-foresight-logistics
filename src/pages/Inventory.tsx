
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Package, TrendingUp, MapPin, CheckCircle } from 'lucide-react';

const Inventory = () => {
  const inventoryData = [
    {
      warehouse: 'Mumbai Central',
      product: 'Electronics',
      currentStock: 450,
      daysLeft: 2,
      status: 'critical',
    },
    {
      warehouse: 'Chennai Hub',
      product: 'Textiles',
      currentStock: 1200,
      daysLeft: 15,
      status: 'good',
    },
    {
      warehouse: 'Delhi North',
      product: 'Home Appliances',
      currentStock: 800,
      daysLeft: 8,
      status: 'warning',
    },
    {
      warehouse: 'Bangalore Tech',
      product: 'Electronics',
      currentStock: 2100,
      daysLeft: 25,
      status: 'overstocked',
    },
  ];

  const redistributionSuggestions = [
    {
      from: 'Bangalore Tech',
      to: 'Mumbai Central',
      product: 'Electronics',
      quantity: 200,
      cost: '₹12,000',
      eta: '6h',
    },
    {
      from: 'Chennai Hub',
      to: 'Delhi North',
      product: 'Textiles',
      quantity: 150,
      cost: '₹8,500',
      eta: '12h',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'text-red-400 bg-red-500/20';
      case 'warning': return 'text-yellow-400 bg-yellow-500/20';
      case 'good': return 'text-green-400 bg-green-500/20';
      case 'overstocked': return 'text-blue-400 bg-blue-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Inventory</h1>
        <Button className="bg-logistics-accent hover:bg-logistics-accent/80">
          <TrendingUp className="w-4 h-4 mr-2" />
          Optimize Distribution
        </Button>
      </div>

      {/* Warehouse Inventory Table */}
      <Card className="glass-panel border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Package className="w-5 h-5 mr-2" />
            Warehouse Inventory
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-white/10">
                <TableHead className="text-gray-300">Warehouse</TableHead>
                <TableHead className="text-gray-300">Product</TableHead>
                <TableHead className="text-gray-300">Current Stock</TableHead>
                <TableHead className="text-gray-300">Days Left</TableHead>
                <TableHead className="text-gray-300">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventoryData.map((item, index) => (
                <TableRow key={index} className="border-white/10">
                  <TableCell className="text-white">{item.warehouse}</TableCell>
                  <TableCell className="text-gray-300">{item.product}</TableCell>
                  <TableCell className="text-white font-medium">{item.currentStock}</TableCell>
                  <TableCell className="text-gray-300">{item.daysLeft}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(item.status)}>
                      {item.status === 'critical' ? 'Stockout Risk' :
                       item.status === 'warning' ? 'Low Stock' :
                       item.status === 'good' ? 'Good' :
                       'Overstocked'}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Redistribution Suggestions */}
        <Card className="glass-panel border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Redistribution Suggestions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {redistributionSuggestions.map((suggestion, index) => (
                <div key={index} className="p-4 rounded-lg bg-logistics-panel/30 border border-white/10">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-medium text-white">
                      Move {suggestion.quantity} units of {suggestion.product}
                    </h4>
                    <Badge className="bg-logistics-accent/20 text-logistics-accent">
                      Recommended
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-300 space-y-1">
                    <p>From: <span className="text-white">{suggestion.from}</span></p>
                    <p>To: <span className="text-white">{suggestion.to}</span></p>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="text-xs text-gray-400">
                      Cost: {suggestion.cost} | ETA: {suggestion.eta}
                    </div>
                    <div className="space-x-2">
                      <Button size="sm" variant="outline" className="text-xs">
                        Override
                      </Button>
                      <Button size="sm" className="bg-logistics-success hover:bg-logistics-success/80 text-xs">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Accept
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Route Map View */}
        <Card className="glass-panel border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              Route Map View
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-logistics-panel/30 rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-400">
                <MapPin className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Live delivery tracking map</p>
                <p className="text-sm">Shows trucks and rerouted paths</p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {[
                { label: 'Active Routes', value: '12' },
                { label: 'Delayed', value: '3' },
                { label: 'Rerouted', value: '2' },
                { label: 'On Time', value: '7' },
              ].map((stat, index) => (
                <div key={index} className="p-2 rounded-lg bg-logistics-panel/30 text-center">
                  <p className="text-lg font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-gray-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Inventory;
