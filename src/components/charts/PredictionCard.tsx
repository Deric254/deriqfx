
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, BarChart2, Brain } from "lucide-react";

export function PredictionCard() {
  return (
    <Card className="bg-cardBg border-border">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base flex items-center">
            <Brain className="h-4 w-4 mr-2 text-blue-400" />
            ML Price Prediction
          </CardTitle>
          <Badge variant="outline" className="text-blue-400 border-blue-400/30 bg-blue-400/10">
            Real-time
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">4-Hour Forecast</p>
              <div className="flex items-center">
                <TrendingUp className="h-4 w-4 text-tradingUp mr-2" />
                <span className="text-lg font-mono text-tradingUp">18,640 - 18,720</span>
              </div>
            </div>
            <div className="text-right space-y-1">
              <p className="text-sm text-muted-foreground">Confidence</p>
              <p className="text-lg font-mono">76%</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Bullish Probability</span>
              <span className="font-mono">76%</span>
            </div>
            <Progress value={76} className="h-2 bg-muted/20" indicatorClassName="bg-tradingUp" />
            
            <div className="flex justify-between text-sm">
              <span>Bearish Probability</span>
              <span className="font-mono">24%</span>
            </div>
            <Progress value={24} className="h-2 bg-muted/20" indicatorClassName="bg-tradingDown" />
          </div>
          
          <div className="pt-2 border-t border-border">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center text-muted-foreground">
                <BarChart2 className="h-4 w-4 mr-1" />
                Model Accuracy (30d)
              </span>
              <span className="font-mono text-blue-400">81.3%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
