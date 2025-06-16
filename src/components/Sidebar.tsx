
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, CloudRain, Package, ShoppingCart, FlaskConical } from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Forecast', href: '/forecast', icon: CloudRain },
  { name: 'Inventory', href: '/inventory', icon: Package },
  { name: 'Procurement', href: '/procurement', icon: ShoppingCart },
  { name: 'Simulation Lab', href: '/simulation', icon: FlaskConical },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <nav className="w-64 glass-panel border-r border-white/10 p-4">
      <div className="space-y-2">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-logistics-accent text-white"
                  : "text-gray-400 hover:text-white hover:bg-logistics-panel/50"
              )}
            >
              <Icon className="w-5 h-5" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Sidebar;
