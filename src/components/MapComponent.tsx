
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { divIcon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

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
  console.log('MapComponent rendering with disruptions:', disruptions);
  
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'severe': return '#ef4444'; // red
      case 'moderate': return '#f59e0b'; // yellow
      case 'low': return '#3b82f6'; // blue
      default: return '#6b7280'; // gray
    }
  };

  const createCustomIcon = (severity: string) => {
    const color = getSeverityColor(severity);
    return divIcon({
      html: `<div style="
        background-color: ${color};
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 2px solid white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
      "></div>`,
      className: 'custom-marker',
      iconSize: [20, 20],
      iconAnchor: [10, 10],
    });
  };

  // Temporarily return a simple div to test if the issue is with MapContainer
  console.log('About to render MapComponent');
  
  try {
    return (
      <div className="relative">
        <div className="w-full h-96 rounded-lg border border-white/10 bg-gray-800 flex items-center justify-center">
          <p className="text-white">Map Loading... {disruptions.length} disruptions</p>
        </div>
        
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
  } catch (error) {
    console.error('Error rendering MapComponent:', error);
    return (
      <div className="relative">
        <div className="w-full h-96 rounded-lg border border-red-500 bg-red-900/20 flex items-center justify-center">
          <p className="text-red-400">Map Error: {error instanceof Error ? error.message : 'Unknown error'}</p>
        </div>
      </div>
    );
  }
};

export default MapComponent;
