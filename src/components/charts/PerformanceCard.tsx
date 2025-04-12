
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, TrendingDown, BarChart2 } from "lucide-react";

export function PerformanceCard() {
  return (
    <Card className="bg-cardBg border-border">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Performance</CardTitle>
          <Tabs defaultValue="day">
            <TabsList className="h-8 bg-muted/20">
              <TabsTrigger value="day" className="text-xs">Day</TabsTrigger>
              <TabsTrigger value="week" className="text-xs">Week</TabsTrigger>
              <TabsTrigger value="month" className="text-xs">Month</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">P&L</p>
              <p className="text-xl font-mono text-tradingUp">+€1,240</p>
              <Badge variant="outline" className="text-tradingUp border-tradingUp/20 bg-tradingUp/5">
                <TrendingUp className="h-3 w-3 mr-1" />
                +2.8%
              </Badge>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Win Rate</p>
              <p className="text-xl font-mono">68%</p>
              <div className="flex -space-x-1">
                <div className="w-8 h-1 bg-tradingUp rounded-l-full"></div>
                <div className="w-4 h-1 bg-tradingDown rounded-r-full"></div>
              </div>
            </div>
          </div>
          
          <div className="pt-3 border-t border-border space-y-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-2 h-4 bg-tradingUp rounded-sm mr-2"></div>
                <span className="text-sm">Long Trades</span>
              </div>
              <div className="text-right">
                <p className="text-sm font-mono">5 trades</p>
                <p className="text-xs text-muted-foreground">+€940</p>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-2 h-4 bg-tradingDown rounded-sm mr-2"></div>
                <span className="text-sm">Short Trades</span>
              </div>
              <div className="text-right">
                <p className="text-sm font-mono">3 trades</p>
                <p className="text-xs text-muted-foreground">+€300</p>
              </div>
            </div>
          </div>
          
          <div className="h-[60px] w-full relative">
            <svg className="w-full h-full" viewBox="0 0 300 60" preserveAspectRatio="none">
              <path 
                d="M0,30 L20,25 L40,35 L60,20 L80,15 L100,25 L120,10 L140,20 L160,5 L180,15 L200,10 L220,30 L240,20 L260,10 L280,5 L300,15" 
                fill="none" 
                stroke="hsl(var(--primary))" 
                strokeWidth="2"
              />
            </svg>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
