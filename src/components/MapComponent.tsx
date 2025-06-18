
import React, { useState } from 'react';

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
  const [selectedDisruption, setSelectedDisruption] = useState<DisruptionData | null>(null);
  
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'severe': return '#ef4444'; // red
      case 'moderate': return '#f59e0b'; // yellow
      case 'low': return '#3b82f6'; // blue
      default: return '#6b7280'; // gray
    }
  };

  const handleMarkerClick = (disruption: DisruptionData) => {
    setSelectedDisruption(disruption);
    onDisruptionClick?.(disruption);
  };

  // Convert coordinates to map position (simplified projection)
  const getMapPosition = (coordinates: [number, number]) => {
    const [lng, lat] = coordinates;
    // Simple projection for India region (roughly 68-97E, 8-37N)
    const x = ((lng - 68) / (97 - 68)) * 100;
    const y = ((37 - lat) / (37 - 8)) * 100;
    return { x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) };
  };

  return (
    <div className="relative">
      <div className="w-full h-96 rounded-lg border border-white/10 bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden">
        {/* Map Background */}
        <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%" viewBox="0 0 100 100" className="w-full h-full">
            {/* India outline (simplified) */}
            <path
              d="M20,80 L25,70 L30,65 L35,60 L40,55 L45,50 L50,45 L55,40 L60,35 L65,30 L70,25 L75,30 L80,35 L85,40 L90,45 L85,50 L80,55 L75,60 L70,65 L65,70 L60,75 L55,80 L50,85 L45,80 L40,75 L35,80 L30,85 L25,85 Z"
              fill="rgba(59, 130, 246, 0.1)"
              stroke="rgba(59, 130, 246, 0.3)"
              strokeWidth="0.5"
            />
          </svg>
        </div>

        {/* Grid lines */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" viewBox="0 0 100 100">
            {[0, 20, 40, 60, 80, 100].map(x => (
              <line key={`v${x}`} x1={x} y1="0" x2={x} y2="100" stroke="white" strokeWidth="0.2" />
            ))}
            {[0, 20, 40, 60, 80, 100].map(y => (
              <line key={`h${y}`} x1="0" y1={y} x2="100" y2={y} stroke="white" strokeWidth="0.2" />
            ))}
          </svg>
        </div>

        {/* Disruption Markers */}
        {disruptions.map((disruption) => {
          const position = getMapPosition(disruption.coordinates);
          const color = getSeverityColor(disruption.severity);
          
          return (
            <div
              key={disruption.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all hover:scale-110"
              style={{
                left: `${position.x}%`,
                top: `${position.y}%`,
              }}
              onClick={() => handleMarkerClick(disruption)}
            >
              <div
                className="w-4 h-4 rounded-full border-2 border-white shadow-lg animate-pulse"
                style={{ backgroundColor: color }}
              />
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs text-white bg-black/70 px-2 py-1 rounded whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity">
                {disruption.location}
              </div>
            </div>
          );
        })}

        {/* Selected Disruption Popup */}
        {selectedDisruption && (
          <div className="absolute top-4 right-4 bg-logistics-dark/95 border border-white/20 rounded-lg p-4 max-w-sm z-10">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-logistics-accent">{selectedDisruption.location}</h3>
              <button
                onClick={() => setSelectedDisruption(null)}
                className="text-gray-400 hover:text-white text-xl leading-none"
              >
                ×
              </button>
            </div>
            <p className="text-sm text-gray-300 mb-1">{selectedDisruption.type}</p>
            <p className="text-xs text-gray-400 mb-2">{selectedDisruption.description}</p>
            <div className="flex justify-between text-xs">
              <span className="text-logistics-success">{selectedDisruption.confidence}% confidence</span>
              <span className="text-gray-400">ETA: {selectedDisruption.eta}</span>
            </div>
          </div>
        )}
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
};

export default MapComponent;
