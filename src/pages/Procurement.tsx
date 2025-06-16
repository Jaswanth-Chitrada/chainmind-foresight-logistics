
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ShoppingCart, MessageSquare, CheckCircle, Clock, Settings } from 'lucide-react';

const Procurement = () => {
  const orders = [
    {
      id: 'PO-2024-001',
      supplier: 'TechSupply Corp',
      items: 'Electronics Components',
      value: '₹2,50,000',
      status: 'in-negotiation',
      initiated: '2 hours ago',
      eta: '3-5 days',
    },
    {
      id: 'PO-2024-002',
      supplier: 'FastLogistics Ltd',
      items: 'Packaging Materials',
      value: '₹75,000',
      status: 'shipped',
      initiated: '1 day ago',
      eta: '2 days',
    },
    {
      id: 'PO-2024-003',
      supplier: 'MegaSupplier Inc',
      items: 'Raw Materials',
      value: '₹4,20,000',
      status: 'pending-approval',
      initiated: '30 mins ago',
      eta: '1-2 days',
    },
  ];

  const communications = [
    {
      time: '14:30',
      type: 'outbound',
      message: 'Requesting 500 units of X due to forecasted spike in Mumbai region',
      supplier: 'TechSupply Corp',
    },
    {
      time: '14:15',
      type: 'inbound',
      message: 'Confirmed availability. Can deliver within 48 hours.',
      supplier: 'TechSupply Corp',
    },
    {
      time: '13:45',
      type: 'outbound',
      message: 'Following up on pending delivery for PO-2024-001',
      supplier: 'FastLogistics Ltd',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'shipped': return 'bg-green-500/20 text-green-400';
      case 'in-negotiation': return 'bg-yellow-500/20 text-yellow-400';
      case 'pending-approval': return 'bg-blue-500/20 text-blue-400';
      case 'cancelled': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Procurement</h1>
        <Button className="bg-logistics-accent hover:bg-logistics-accent/80">
          <Settings className="w-4 h-4 mr-2" />
          Approval Settings
        </Button>
      </div>

      {/* Order Timeline */}
      <Card className="glass-panel border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <ShoppingCart className="w-5 h-5 mr-2" />
            Order Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-white/10">
                <TableHead className="text-gray-300">Order ID</TableHead>
                <TableHead className="text-gray-300">Supplier</TableHead>
                <TableHead className="text-gray-300">Items</TableHead>
                <TableHead className="text-gray-300">Value</TableHead>
                <TableHead className="text-gray-300">Status</TableHead>
                <TableHead className="text-gray-300">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id} className="border-white/10">
                  <TableCell className="text-white font-medium">{order.id}</TableCell>
                  <TableCell className="text-gray-300">{order.supplier}</TableCell>
                  <TableCell className="text-gray-300">{order.items}</TableCell>
                  <TableCell className="text-white font-medium">{order.value}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status.replace('-', ' ').toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {order.status === 'pending-approval' && (
                      <div className="space-x-2">
                        <Button size="sm" variant="outline" className="text-xs">
                          Reject
                        </Button>
                        <Button size="sm" className="bg-logistics-success hover:bg-logistics-success/80 text-xs">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Approve
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Supplier Communication Log */}
        <Card className="glass-panel border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <MessageSquare className="w-5 h-5 mr-2" />
              Supplier Communication Log
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-64 overflow-y-auto">
              {communications.map((comm, index) => (
                <div key={index} className="p-3 rounded-lg bg-logistics-panel/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-400">{comm.time}</span>
                    <Badge className={comm.type === 'outbound' ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'}>
                      {comm.type}
                    </Badge>
                  </div>
                  <p className="text-sm text-white mb-2">{comm.message}</p>
                  <p className="text-xs text-logistics-accent">{comm.supplier}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Approval Toggles */}
        <Card className="glass-panel border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Approval Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 rounded-lg bg-logistics-panel/30">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-white">Auto-approve orders under ₹1,00,000</h4>
                  <div className="w-10 h-6 bg-logistics-success rounded-full flex items-center px-1">
                    <div className="w-4 h-4 bg-white rounded-full ml-auto"></div>
                  </div>
                </div>
                <p className="text-xs text-gray-400">Currently enabled for trusted suppliers</p>
              </div>
              
              <div className="p-3 rounded-lg bg-logistics-panel/30">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-white">Emergency procurement override</h4>
                  <div className="w-10 h-6 bg-gray-600 rounded-full flex items-center px-1">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>
                <p className="text-xs text-gray-400">Allow AI to bypass approval for critical shortages</p>
              </div>

              <div className="p-3 rounded-lg bg-logistics-panel/30">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-white">Preferred supplier priority</h4>
                  <div className="w-10 h-6 bg-logistics-success rounded-full flex items-center px-1">
                    <div className="w-4 h-4 bg-white rounded-full ml-auto"></div>
                  </div>
                </div>
                <p className="text-xs text-gray-400">Always try preferred suppliers first</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Procurement;
