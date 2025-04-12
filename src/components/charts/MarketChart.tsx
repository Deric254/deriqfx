
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowUp, ArrowDown, BarChart, LineChart, CandlestickChart } from 'lucide-react';
import { cn } from '@/lib/utils';

// This is a placeholder component that would be replaced with Plotly/Chart.js
// in a real implementation with actual DAX data
export function MarketChart() {
  return (
    <Card className="h-full bg-cardBg border-border">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CardTitle>DAX 40 Index</CardTitle>
            <div className="flex items-center text-tradingUp">
              <span className="text-lg font-mono">18,592.62</span>
              <span className="ml-2 flex items-center text-sm">
                <ArrowUp className="h-4 w-4 mr-1" />
                +1.2%
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Tabs defaultValue="1D">
              <TabsList className="bg-muted/20">
                <TabsTrigger value="1H">1H</TabsTrigger>
                <TabsTrigger value="1D">1D</TabsTrigger>
                <TabsTrigger value="1W">1W</TabsTrigger>
                <TabsTrigger value="1M">1M</TabsTrigger>
                <TabsTrigger value="YTD">YTD</TabsTrigger>
              </TabsList>
            </Tabs>
            <Select defaultValue="candle">
              <SelectTrigger className="w-[110px] h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="candle">
                  <div className="flex items-center">
                    <CandlestickChart className="mr-2 h-4 w-4" />
                    <span>Candle</span>
                  </div>
                </SelectItem>
                <SelectItem value="line">
                  <div className="flex items-center">
                    <LineChart className="mr-2 h-4 w-4" />
                    <span>Line</span>
                  </div>
                </SelectItem>
                <SelectItem value="bar">
                  <div className="flex items-center">
                    <BarChart className="mr-2 h-4 w-4" />
                    <span>Bar</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[400px] relative">
          {/* This would be replaced with an actual chart library */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/5 pointer-events-none"></div>
          <div className="absolute inset-0 flex flex-col">
            <div className="h-4/5 border-b border-chartGrid relative">
              {/* Simulated chart line */}
              <svg className="w-full h-full" viewBox="0 0 1000 400" preserveAspectRatio="none">
                <path
                  d="M0,200 Q50,180 100,190 T200,170 T300,200 T400,220 T500,190 T600,150 T700,190 T800,110 T900,130 T1000,100"
                  fill="none"
                  stroke="hsl(221, 83%, 53%)"
                  strokeWidth="2"
                />
                <path
                  d="M0,200 Q50,180 100,190 T200,170 T300,200 T400,220 T500,190 T600,150 T700,190 T800,110 T900,130 T1000,100"
                  fill="url(#gradient)"
                  fillOpacity="0.2"
                  stroke="none"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="hsl(221, 83%, 53%)" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="hsl(221, 83%, 53%)" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
              
              {/* Price levels */}
              <div className="absolute top-0 right-0 flex flex-col justify-between h-full text-xs text-muted-foreground pr-2">
                <div>18,700</div>
                <div>18,650</div>
                <div>18,600</div>
                <div>18,550</div>
                <div>18,500</div>
              </div>
            </div>
            
            {/* Volume chart at bottom */}
            <div className="h-1/5 relative">
              <svg className="w-full h-full" preserveAspectRatio="none">
                <rect x="10%" y="10%" width="5%" height="60%" fill="rgba(99, 102, 241, 0.3)" />
                <rect x="20%" y="20%" width="5%" height="50%" fill="rgba(99, 102, 241, 0.3)" />
                <rect x="30%" y="5%" width="5%" height="65%" fill="rgba(99, 102, 241, 0.3)" />
                <rect x="40%" y="30%" width="5%" height="40%" fill="rgba(99, 102, 241, 0.3)" />
                <rect x="50%" y="15%" width="5%" height="55%" fill="rgba(99, 102, 241, 0.3)" />
                <rect x="60%" y="25%" width="5%" height="45%" fill="rgba(99, 102, 241, 0.3)" />
                <rect x="70%" y="10%" width="5%" height="60%" fill="rgba(99, 102, 241, 0.3)" />
                <rect x="80%" y="40%" width="5%" height="30%" fill="rgba(99, 102, 241, 0.3)" />
                <rect x="90%" y="20%" width="5%" height="50%" fill="rgba(99, 102, 241, 0.3)" />
              </svg>
            </div>
          </div>
          
          {/* Overlay for ML prediction zone */}
          <div className="absolute right-20 top-1/4 rounded-md bg-blue-500/10 border border-blue-500/20 px-3 py-1 text-xs text-blue-400">
            ML Prediction Zone
          </div>
          
          {/* Time markers */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-muted-foreground px-2">
            <div>09:00</div>
            <div>10:00</div>
            <div>11:00</div>
            <div>12:00</div>
            <div>13:00</div>
            <div>14:00</div>
            <div>15:00</div>
            <div>16:00</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
