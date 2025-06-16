
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface DisruptionData {
  id: string;
  location: string;
  coordinates: [number, number];
  type: string;
  severity: 'low' | 'moderate' | 'severe';
  description: string;
  confidence: number;
  eta: string;
}

interface MapComponentProps {
  disruptions: DisruptionData[];
  onDisruptionClick?: (disruption: DisruptionData) => void;
}

const MapComponent: React.FC<MapComponentProps> = ({ disruptions, onDisruptionClick }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>('');
  const [tokenSet, setTokenSet] = useState<boolean>(false);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'severe': return '#ef4444'; // red
      case 'moderate': return '#f59e0b'; // yellow
      case 'low': return '#3b82f6'; // blue
      default: return '#6b7280'; // gray
    }
  };

  const initializeMap = () => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [77.2090, 28.6139], // Delhi, India
      zoom: 5,
    });

    map.current.on('load', () => {
      // Add markers for disruptions
      disruptions.forEach((disruption) => {
        const marker = new mapboxgl.Marker({
          color: getSeverityColor(disruption.severity),
          scale: 1.2
        })
          .setLngLat(disruption.coordinates)
          .setPopup(
            new mapboxgl.Popup({ offset: 25 })
              .setHTML(`
                <div class="p-3 bg-logistics-dark text-white rounded-lg border border-white/20">
                  <h3 class="font-semibold text-logistics-accent">${disruption.location}</h3>
                  <p class="text-sm text-gray-300 mt-1">${disruption.type}</p>
                  <p class="text-xs text-gray-400 mt-2">${disruption.description}</p>
                  <div class="flex justify-between mt-2 text-xs">
                    <span class="text-logistics-success">${disruption.confidence}% confidence</span>
                    <span class="text-gray-400">ETA: ${disruption.eta}</span>
                  </div>
                </div>
              `)
          );

        if (onDisruptionClick) {
          marker.getElement().addEventListener('click', () => {
            onDisruptionClick(disruption);
          });
        }

        marker.addTo(map.current!);
      });
    });
  };

  const handleTokenSubmit = () => {
    if (mapboxToken.trim()) {
      setTokenSet(true);
      setTimeout(() => {
        initializeMap();
      }, 100);
    }
  };

  useEffect(() => {
    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  if (!tokenSet) {
    return (
      <Card className="glass-panel border-white/10 p-6">
        <div className="text-center space-y-4">
          <h3 className="text-white font-medium">Configure Mapbox Token</h3>
          <p className="text-gray-400 text-sm">
            To display the interactive map, please enter your Mapbox public token.
            You can get one from <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-logistics-accent hover:underline">mapbox.com</a>
          </p>
          <div className="flex space-x-2 max-w-md mx-auto">
            <Input
              type="text"
              placeholder="pk.eyJ1..."
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
              className="bg-logistics-panel border-white/20 text-white"
            />
            <Button onClick={handleTokenSubmit} className="bg-logistics-accent hover:bg-logistics-accent/80">
              Set Token
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <div className="relative">
      <div ref={mapContainer} className="w-full h-96 rounded-lg border border-white/10" />
      
      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-logistics-dark/90 p-3 rounded-lg border border-white/10">
        <h4 className="text-white text-sm font-medium mb-2">Disruption Levels</h4>
        <div className="space-y-1 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-gray-300">Severe</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span className="text-gray-300">Moderate</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-gray-300">Low</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapComponent;
