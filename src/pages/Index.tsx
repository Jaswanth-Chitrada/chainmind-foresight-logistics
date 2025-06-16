
import React from 'react';
import Header from '@/components/Header';
import AlertsSidebar from '@/components/AlertsSidebar';
import MapDashboard from '@/components/MapDashboard';
import BottomPanel from '@/components/BottomPanel';

const Index = () => {
  return (
    <div className="min-h-screen bg-logistics-dark p-4">
      <div className="max-w-[1600px] mx-auto">
        <Header />
        
        <div className="flex gap-6 mb-6">
          <AlertsSidebar />
          <MapDashboard />
        </div>
        
        <BottomPanel />
      </div>
    </div>
  );
};

export default Index;
