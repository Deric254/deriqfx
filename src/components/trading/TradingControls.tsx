
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowBigUp, ArrowBigDown, Gauge, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function TradingControls() {
  const [position, setPosition] = useState<'buy' | 'sell' | null>(null);
  const [amount, setAmount] = useState(1);
  const [leverage, setLeverage] = useState(10);
  const [stopLoss, setStopLoss] = useState(50);
  const [takeProfit, setTakeProfit] = useState(100);
  
  return (
    <Card className="bg-cardBg border-border">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Trading Controls</CardTitle>
          <Badge variant="outline" className="text-yellow-400 border-yellow-400/30 bg-yellow-400/10">
            Demo Account
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-2">
            <Button
              className={cn(
                "flex-1 gap-2",
                position === 'buy' ? "bg-tradingUp hover:bg-tradingUp/90" : "bg-muted hover:bg-muted/80"
              )}
              onClick={() => setPosition('buy')}
            >
              <ArrowBigUp className="h-4 w-4" />
              Buy / Long
            </Button>
            <Button
              className={cn(
                "flex-1 gap-2",
                position === 'sell' ? "bg-tradingDown hover:bg-tradingDown/90" : "bg-muted hover:bg-muted/80"
              )}
              onClick={() => setPosition('sell')}
            >
              <ArrowBigDown className="h-4 w-4" />
              Sell / Short
            </Button>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Amount</label>
              <div className="flex">
                <Input
                  type="number"
                  min={1}
                  max={100}
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="rounded-r-none"
                />
                <div className="bg-muted flex items-center justify-center px-3 rounded-r-md border border-l-0 border-input">
                  <span className="text-sm">lots</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm text-muted-foreground">Leverage</label>
                <span className="text-sm font-mono">{leverage}x</span>
              </div>
              <Slider 
                defaultValue={[leverage]} 
                min={1} 
                max={50} 
                step={1} 
                onValueChange={(value) => setLeverage(value[0])}
              />
            </div>
          </div>
          
          <div className="space-y-3 pt-2 border-t border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Shield className="h-4 w-4 text-blue-400 mr-2" />
                <span className="text-sm">Risk Management</span>
              </div>
              
              <Tabs defaultValue="basic">
                <TabsList className="h-8 bg-muted/20">
                  <TabsTrigger value="basic" className="text-xs">Basic</TabsTrigger>
                  <TabsTrigger value="advanced" className="text-xs">Advanced</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm text-muted-foreground">Stop Loss</label>
                  <span className="text-sm font-mono">{stopLoss} pts</span>
                </div>
                <Slider 
                  defaultValue={[stopLoss]} 
                  min={10} 
                  max={200} 
                  step={5} 
                  onValueChange={(value) => setStopLoss(value[0])}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm text-muted-foreground">Take Profit</label>
                  <span className="text-sm font-mono">{takeProfit} pts</span>
                </div>
                <Slider 
                  defaultValue={[takeProfit]} 
                  min={20} 
                  max={400} 
                  step={5} 
                  onValueChange={(value) => setTakeProfit(value[0])}
                />
              </div>
            </div>
          </div>
          
          <Button 
            disabled={!position} 
            className={cn(
              "w-full mt-2",
              position === 'buy' ? "bg-tradingUp hover:bg-tradingUp/90" : 
              position === 'sell' ? "bg-tradingDown hover:bg-tradingDown/90" : ""
            )}
          >
            {position === 'buy' ? 'Execute Buy Order' : 
             position === 'sell' ? 'Execute Sell Order' : 'Select Position Type'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
