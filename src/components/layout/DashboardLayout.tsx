
import React from 'react';
import { DashboardHeader } from './DashboardHeader';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function DashboardLayout({ children, className }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-dashboardBg text-foreground">
      <DashboardHeader />
      <main className={cn("flex-1 p-4 overflow-auto", className)}>
        {children}
      </main>
      <footer className="py-2 px-4 border-t border-border text-center text-xs text-muted-foreground">
        DerIQfx © {new Date().getFullYear()} | Built with ML-powered DAX trading intelligence
      </footer>
    </div>
  );
}
