
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, MapPin, TrendingUp, AlertTriangle } from 'lucide-react';

const Forecast = () => {
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

  const disruptionHotspots = [
    { location: 'Chennai', type: 'Weather', level: 'severe' },
    { location: 'Mumbai', type: 'Traffic', level: 'moderate' },
    { location: 'Bangalore', type: 'Festival', level: 'low' },
    { location: 'Delhi', type: 'Strike', level: 'severe' },
  ];

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
        {/* Disruption Map Placeholder */}
        <div className="lg:col-span-2">
          <Card className="glass-panel border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                Disruption Map
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-96 bg-logistics-panel/30 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <MapPin className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Interactive Mapbox disruption map</p>
                  <p className="text-sm">Red/orange/yellow zones showing risk levels</p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2">
                {disruptionHotspots.map((spot, index) => (
                  <div key={index} className="p-2 rounded-lg bg-logistics-panel/30 text-center">
                    <div className={`w-3 h-3 rounded-full mx-auto mb-1 ${
                      spot.level === 'severe' ? 'bg-red-500' :
                      spot.level === 'moderate' ? 'bg-yellow-500' :
                      'bg-blue-500'
                    }`} />
                    <p className="text-xs text-white">{spot.location}</p>
                    <p className="text-xs text-gray-400">{spot.type}</p>
                  </div>
                ))}
              </div>
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
