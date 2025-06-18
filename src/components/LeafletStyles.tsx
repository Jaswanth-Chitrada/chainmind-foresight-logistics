
import { useEffect } from 'react';

// Component to handle Leaflet CSS injection and custom styles
const LeafletStyles = () => {
  useEffect(() => {
    // Add custom styles for the map popups to match our theme
    const style = document.createElement('style');
    style.textContent = `
      .leaflet-popup-content-wrapper {
        background: transparent !important;
        padding: 0 !important;
        border-radius: 8px !important;
      }
      
      .leaflet-popup-content {
        margin: 0 !important;
      }
      
      .leaflet-popup-tip {
        background: rgba(17, 24, 39, 0.9) !important;
        border: 1px solid rgba(255, 255, 255, 0.2) !important;
      }
      
      .leaflet-container {
        background: #1f2937 !important;
      }
      
      .custom-marker {
        background: transparent !important;
        border: none !important;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return null;
};

export default LeafletStyles;
