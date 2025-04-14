
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  BarChart3, 
  Home, 
  LineChart, 
  Settings as SettingsIcon, 
  Brain, 
  History,
  PieChart
} from 'lucide-react';

const navItems = [
  { href: '/', label: 'Dashboard', icon: Home },
  { href: '/historical-data', label: 'Historical Data', icon: History },
  { href: '/ml-rules', label: 'ML Rules', icon: Brain },
  { href: '/settings', label: 'Settings', icon: SettingsIcon },
];

export function DashboardSidebar() {
  const location = useLocation();
  
  return (
    <div className="w-64 bg-cardBg border-r border-border hidden md:block">
      <div className="p-4">
        <div className="flex items-center space-x-2">
          <LineChart className="h-6 w-6 text-blue-500" />
          <h2 className="text-lg font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            DerIQfx
          </h2>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          DAX Trading Platform
        </p>
      </div>
      
      <nav className="mt-6">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                to={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                  location.pathname === item.href 
                    ? "bg-blue-500/10 text-blue-500" 
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="absolute bottom-4 left-4 right-4">
        <div className="rounded-md bg-blue-950/10 p-3 border border-blue-900/20">
          <div className="flex items-center space-x-2">
            <PieChart className="h-5 w-5 text-blue-400" />
            <h3 className="text-sm font-medium">London Session</h3>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Next session starts in 2 hours 15 minutes
          </p>
        </div>
      </div>
    </div>
  );
}
