
import React from 'react';
import { DashboardHeader } from './DashboardHeader';
import { DashboardSidebar } from './DashboardSidebar';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function DashboardLayout({ children, className }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-dashboardBg text-foreground">
      <DashboardHeader />
      <div className="flex flex-1 overflow-hidden">
        <DashboardSidebar />
        <main className={cn("flex-1 p-4 overflow-auto", className)}>
          <div className="container mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>
      <footer className="py-2 px-4 border-t border-border text-center text-xs text-muted-foreground">
        DerIQfx © {new Date().getFullYear()} | Built with ML-powered DAX trading intelligence
      </footer>
    </div>
  );
}
