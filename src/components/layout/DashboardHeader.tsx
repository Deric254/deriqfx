
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Clock, Settings, Bell, HelpCircle } from 'lucide-react';

interface DashboardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DashboardHeader({ className, ...props }: DashboardHeaderProps) {
  const [currentTime, setCurrentTime] = React.useState(new Date());
  
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  const formattedTime = currentTime.toLocaleTimeString();
  const formattedDate = currentTime.toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
  
  return (
    <header className={cn("flex items-center justify-between p-4 border-b border-border bg-cardBg", className)} {...props}>
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
          DerIQfx
        </h1>
        <span className="px-2 py-1 rounded-md bg-blue-900/30 text-blue-400 text-xs">
          DAX Trading
        </span>
      </div>
      
      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
        <Clock className="h-4 w-4 mr-1" />
        <span className="mr-1">{formattedTime}</span>
        <span>|</span>
        <span className="ml-1">{formattedDate}</span>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <HelpCircle className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}
