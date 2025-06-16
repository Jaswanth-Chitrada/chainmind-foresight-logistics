
import React from 'react';
import { Menu, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Topbar = () => {
  return (
    <header className="glass-panel px-6 py-4 border-b border-white/10">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white md:hidden">
            <Menu className="w-5 h-5" />
          </Button>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-logistics-accent to-logistics-glow rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">CM</span>
            </div>
            <span className="text-xl font-bold text-white">ChainMind AI</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm">
            <div className="status-indicator bg-logistics-success"></div>
            <span className="text-gray-300">4 Agents Active</span>
          </div>
          
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
            <User className="w-4 h-4" />
            <span className="ml-2 hidden sm:inline">Manager</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
