
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FlaskConical, Play, RotateCcw, TrendingUp, AlertTriangle, Package, ShoppingCart } from 'lucide-react';

const SimulationLab = () => {
  const [scenario, setScenario] = useState({
    type: '',
    location: '',
    duration: '',
    impact: ''
  });

  const [simulationResults, setSimulationResults] = useState(null);

  const agentReactions = [
    {
      agent: 'Forecast Agent',
      icon: AlertTriangle,
      reaction: 'Predicts shortage in 5 hours based on disruption pattern',
      status: 'completed',
      time: '2.3s'
    },
    {
      agent: 'Inventory Agent',
      icon: Package,
      reaction: 'Suggests redistributing 300 units from Delhi warehouse',
      status: 'completed',
      time: '1.8s'
    },
    {
      agent: 'Procurement Agent',
      icon: ShoppingCart,
      reaction: 'Initiates emergency order to Supplier B (₹2,50,000)',
      status: 'in-progress',
      time: '5.1s'
    },
    {
      agent: 'Route Agent',
      icon: TrendingUp,
      reaction: 'Calculates alternative routes with 15% cost increase',
      status: 'completed',
      time: '3.2s'
    }
  ];

  const simulationSummary = {
    totalCost: '₹4,75,000',
    timeToResolve: '8.5 hours',
    slaStatus: 'Met (92%)',
    riskMitigation: '87%'
  };

  const runSimulation = () => {
    // Simulate running the scenario
    setSimulationResults(true);
  };

  const resetSimulation = () => {
    setScenario({ type: '', location: '', duration: '', impact: '' });
    setSimulationResults(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Simulation Lab</h1>
        <Button onClick={resetSimulation} variant="outline" className="border-white/20">
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset Simulation
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Scenario Builder */}
        <Card className="glass-panel border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <FlaskConical className="w-5 h-5 mr-2" />
              Scenario Builder
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-gray-300">Disruption Type</Label>
              <select 
                className="w-full mt-1 px-3 py-2 bg-logistics-panel border border-white/20 rounded-md text-white"
                value={scenario.type}
                onChange={(e) => setScenario({...scenario, type: e.target.value})}
              >
                <option value="">Select type...</option>
                <option value="warehouse-fire">Warehouse Fire</option>
                <option value="natural-disaster">Natural Disaster</option>
                <option value="supplier-failure">Supplier Failure</option>
                <option value="transport-strike">Transport Strike</option>
                <option value="demand-spike">Demand Spike</option>
              </select>
            </div>

            <div>
              <Label className="text-gray-300">Location</Label>
              <Input 
                placeholder="e.g., Mumbai Central Warehouse"
                className="bg-logistics-panel border-white/20 text-white"
                value={scenario.location}
                onChange={(e) => setScenario({...scenario, location: e.target.value})}
              />
            </div>

            <div>
              <Label className="text-gray-300">Duration</Label>
              <Input 
                placeholder="e.g., 2 days"
                className="bg-logistics-panel border-white/20 text-white"
                value={scenario.duration}
                onChange={(e) => setScenario({...scenario, duration: e.target.value})}
              />
            </div>

            <div>
              <Label className="text-gray-300">Impact Description</Label>
              <Input 
                placeholder="e.g., Complete warehouse shutdown"
                className="bg-logistics-panel border-white/20 text-white"
                value={scenario.impact}
                onChange={(e) => setScenario({...scenario, impact: e.target.value})}
              />
            </div>

            <Button 
              onClick={runSimulation}
              className="w-full bg-logistics-accent hover:bg-logistics-accent/80"
              disabled={!scenario.type || !scenario.location}
            >
              <Play className="w-4 h-4 mr-2" />
              Run Simulation
            </Button>
          </CardContent>
        </Card>

        {/* Agent Reactions */}
        <Card className="glass-panel border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Agent Reactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!simulationResults ? (
              <div className="text-center text-gray-400 py-8">
                <FlaskConical className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Configure and run a simulation to see agent reactions</p>
              </div>
            ) : (
              <div className="space-y-4">
                {agentReactions.map((reaction, index) => {
                  const Icon = reaction.icon;
                  return (
                    <div key={index} className="p-3 rounded-lg bg-logistics-panel/30 border border-white/10">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Icon className="w-4 h-4 text-logistics-accent" />
                          <h4 className="text-sm font-medium text-white">{reaction.agent}</h4>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={
                            reaction.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                            reaction.status === 'in-progress' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-gray-500/20 text-gray-400'
                          }>
                            {reaction.status}
                          </Badge>
                          <span className="text-xs text-gray-400">{reaction.time}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-300">{reaction.reaction}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Simulation Summary */}
      {simulationResults && (
        <Card className="glass-panel border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Simulation Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-lg bg-logistics-panel/30 text-center">
                <p className="text-2xl font-bold text-white">{simulationSummary.totalCost}</p>
                <p className="text-sm text-gray-400">Total Cost</p>
              </div>
              <div className="p-4 rounded-lg bg-logistics-panel/30 text-center">
                <p className="text-2xl font-bold text-white">{simulationSummary.timeToResolve}</p>
                <p className="text-sm text-gray-400">Time to Resolve</p>
              </div>
              <div className="p-4 rounded-lg bg-logistics-panel/30 text-center">
                <p className="text-2xl font-bold text-logistics-success">{simulationSummary.slaStatus}</p>
                <p className="text-sm text-gray-400">SLA Status</p>
              </div>
              <div className="p-4 rounded-lg bg-logistics-panel/30 text-center">
                <p className="text-2xl font-bold text-logistics-accent">{simulationSummary.riskMitigation}</p>
                <p className="text-sm text-gray-400">Risk Mitigation</p>
              </div>
            </div>
            <div className="mt-6 p-4 rounded-lg bg-logistics-success/10 border border-logistics-success/30">
              <h4 className="text-logistics-success font-medium mb-2">Simulation Complete</h4>
              <p className="text-sm text-gray-300">
                The system successfully handled the {scenario.type?.replace('-', ' ')} scenario at {scenario.location}. 
                All agents responded within acceptable timeframes and SLA requirements were met.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SimulationLab;
