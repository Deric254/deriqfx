
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MarketChart } from "@/components/charts/MarketChart";
import { PredictionCard } from "@/components/charts/PredictionCard";
import { PerformanceCard } from "@/components/charts/PerformanceCard";
import { TradingControls } from "@/components/trading/TradingControls";
import { SentimentIndicator } from "@/components/dashboard/SentimentIndicator";
import { Activity, ChevronRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <DashboardLayout>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">DAX trading powered by machine learning</p>
        </div>
        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
          <Zap className="h-4 w-4 mr-2" />
          Run Backtest
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="md:col-span-2">
          <MarketChart />
        </div>
        <div className="space-y-4">
          <PredictionCard />
          <PerformanceCard />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <TradingControls />
        </div>
        <div>
          <SentimentIndicator />
        </div>
      </div>
      
      <div className="mt-6 px-4 py-3 bg-cardBg rounded-md border border-border flex items-center justify-between">
        <div className="flex items-center text-sm text-muted-foreground">
          <Activity className="h-4 w-4 mr-2 text-blue-400" />
          <span>Ready to deploy ML models to MetaTrader 5 for automated trading</span>
        </div>
        <Button variant="outline" size="sm" className="text-xs">
          Configure
          <ChevronRight className="h-3 w-3 ml-1" />
        </Button>
      </div>
    </DashboardLayout>
  );
};

export default Index;
