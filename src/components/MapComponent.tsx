
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

  return (
    <div className="relative">
      <MapContainer
        center={[28.6139, 77.2090]} // Delhi, India
        zoom={5}
        className="w-full h-96 rounded-lg border border-white/10"
        style={{ height: '384px' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {disruptions.map((disruption) => (
          <Marker
            key={disruption.id}
            position={[disruption.coordinates[1], disruption.coordinates[0]]}
            icon={createCustomIcon(disruption.severity)}
            eventHandlers={{
              click: () => onDisruptionClick?.(disruption),
            }}
          >
            <Popup className="custom-popup">
              <div className="p-3 bg-logistics-dark text-white rounded-lg border border-white/20 min-w-[200px]">
                <h3 className="font-semibold text-logistics-accent">{disruption.location}</h3>
                <p className="text-sm text-gray-300 mt-1">{disruption.type}</p>
                <p className="text-xs text-gray-400 mt-2">{disruption.description}</p>
                <div className="flex justify-between mt-2 text-xs">
                  <span className="text-logistics-success">{disruption.confidence}% confidence</span>
                  <span className="text-gray-400">ETA: {disruption.eta}</span>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      
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
