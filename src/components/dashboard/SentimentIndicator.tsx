
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Clock, MessageCircle, TrendingUp, TrendingDown } from "lucide-react";

export function SentimentIndicator() {
  return (
    <Card className="bg-cardBg border-border">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base flex items-center">
            <MessageCircle className="h-4 w-4 mr-2 text-blue-400" />
            Market Sentiment
          </CardTitle>
          <div className="flex items-center text-xs text-muted-foreground">
            <Clock className="h-3 w-3 mr-1" />
            Updated 5m ago
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-2 flex-1">
              <div className="flex justify-between text-sm">
                <span>Bullish</span>
                <span className="font-mono">64%</span>
              </div>
              <Progress value={64} className="h-2 bg-muted/20" indicatorClassName="bg-tradingUp" />
              
              <div className="flex justify-between text-sm">
                <span>Bearish</span>
                <span className="font-mono">36%</span>
              </div>
              <Progress value={36} className="h-2 bg-muted/20" indicatorClassName="bg-tradingDown" />
            </div>
            
            <div className="ml-4 w-16 h-16 rounded-full border-4 border-chartLine flex items-center justify-center">
              <span className="text-lg font-bold">64%</span>
            </div>
          </div>
          
          <div className="space-y-2 border-t border-border pt-3">
            <div className="text-sm text-muted-foreground">
              Top Market Drivers
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-tradingUp border-tradingUp/20 bg-tradingUp/5">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  ECB
                </Badge>
                <Badge variant="outline" className="text-tradingUp border-tradingUp/20 bg-tradingUp/5">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Earnings
                </Badge>
                <Badge variant="outline" className="text-tradingDown border-tradingDown/20 bg-tradingDown/5">
                  <TrendingDown className="h-3 w-3 mr-1" />
                  Inflation
                </Badge>
              </div>
              
              <p className="text-xs text-muted-foreground italic">
                "European markets showing strength following tech sector earnings and ECB comments on stable interest rates."
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
