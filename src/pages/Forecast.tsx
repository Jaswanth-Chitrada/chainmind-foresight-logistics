
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, TrendingUp, AlertTriangle } from 'lucide-react';
import MapComponent from '@/components/MapComponent';

const Forecast = () => {
  const [selectedDisruption, setSelectedDisruption] = useState<any>(null);

  const predictions = [
    {
      region: 'Mumbai Zone',
      type: 'Heavy Rainfall',
      severity: 'high',
      confidence: 87,
      impact: 'Expected 6-8 hour delays',
      eta: '2 hours',
    },
    {
      region: 'Chennai Region',
      type: 'Local Festival',
      severity: 'medium',
      confidence: 92,
      impact: 'High demand spike expected',
      eta: '1 day',
    },
    {
      region: 'Delhi NCR',
      type: 'Truckers Strike',
      severity: 'high',
      confidence: 73,
      impact: 'Major route disruptions',
      eta: '12 hours',
    },
  ];

  const mapDisruptions = [
    {
      id: '1',
      location: 'Mumbai',
      coordinates: [72.8777, 19.0760] as [number, number],
      type: 'Heavy Rainfall',
      severity: 'severe' as const,
      description: 'Expected 6-8 hour delays due to flooding',
      confidence: 87,
      eta: '2 hours'
    },
    {
      id: '2',
      location: 'Chennai',
      coordinates: [80.2707, 13.0827] as [number, number],
      type: 'Local Festival',
      severity: 'moderate' as const,
      description: 'High demand spike expected during festival',
      confidence: 92,
      eta: '1 day'
    },
    {
      id: '3',
      location: 'Delhi',
      coordinates: [77.1025, 28.7041] as [number, number],
      type: 'Truckers Strike',
      severity: 'severe' as const,
      description: 'Major route disruptions expected',
      confidence: 73,
      eta: '12 hours'
    },
    {
      id: '4',
      location: 'Bangalore',
      coordinates: [77.5946, 12.9716] as [number, number],
      type: 'Traffic Congestion',
      severity: 'low' as const,
      description: 'Minor delays due to road construction',
      confidence: 65,
      eta: '6 hours'
    }
  ];

  const handleDisruptionClick = (disruption: any) => {
    setSelectedDisruption(disruption);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Forecast</h1>
        <Button className="bg-logistics-accent hover:bg-logistics-accent/80">
          <RefreshCw className="w-4 h-4 mr-2" />
          Run Manual Forecast
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive Disruption Map */}
        <div className="lg:col-span-2">
          <Card className="glass-panel border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Live Disruption Map
              </CardTitle>
            </CardHeader>
            <CardContent>
              <MapComponent 
                disruptions={mapDisruptions}
                onDisruptionClick={handleDisruptionClick}
              />
              
              {selectedDisruption && (
                <div className="mt-4 p-4 bg-logistics-panel/30 rounded-lg border border-white/10">
                  <h4 className="text-white font-medium mb-2">Selected: {selectedDisruption.location}</h4>
                  <p className="text-logistics-accent text-sm">{selectedDisruption.type}</p>
                  <p className="text-gray-400 text-sm mt-1">{selectedDisruption.description}</p>
                  <div className="flex justify-between mt-2 text-xs">
                    <Badge variant={selectedDisruption.severity === 'severe' ? 'destructive' : 'secondary'}>
                      {selectedDisruption.severity.toUpperCase()}
                    </Badge>
                    <span className="text-logistics-success">{selectedDisruption.confidence}% confidence</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Prediction Insights */}
        <div>
          <Card className="glass-panel border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Prediction Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {predictions.map((prediction, index) => (
                  <div key={index} className="p-3 rounded-lg bg-logistics-panel/30">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium text-white">{prediction.region}</h4>
                      <Badge variant={prediction.severity === 'high' ? 'destructive' : 'secondary'} className="text-xs">
                        {prediction.severity.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-sm text-logistics-accent font-medium">{prediction.type}</p>
                    <p className="text-xs text-gray-400 mt-1">{prediction.impact}</p>
                    <div className="flex items-center justify-between mt-2 text-xs">
                      <span className="text-gray-400">ETA: {prediction.eta}</span>
                      <span className="text-logistics-success">{prediction.confidence}% confidence</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Forecast Activity */}
      <Card className="glass-panel border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2" />
            Recent Forecast Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { time: '14:35', action: 'Weather API scan completed', status: 'success' },
              { time: '14:32', action: 'Traffic disruption detected in Mumbai', status: 'warning' },
              { time: '14:28', action: 'News sentiment analysis: Strike probability increased', status: 'warning' },
              { time: '14:25', action: 'Route optimization triggered for Chennai zone', status: 'info' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center space-x-3 p-2 rounded-lg bg-logistics-panel/20">
                <div className={`w-2 h-2 rounded-full ${
                  activity.status === 'success' ? 'bg-logistics-success' :
                  activity.status === 'warning' ? 'bg-logistics-warning' :
                  'bg-logistics-accent'
                }`} />
                <span className="text-xs text-gray-400">{activity.time}</span>
                <span className="text-sm text-white">{activity.action}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Forecast;
