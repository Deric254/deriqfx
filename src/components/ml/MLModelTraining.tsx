
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Brain, Check } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function MLModelTraining() {
  const [isTraining, setIsTraining] = useState(false);
  const [progress, setProgress] = useState(0);
  const [trainingPeriod, setTrainingPeriod] = useState("30");
  const [optimizationMetric, setOptimizationMetric] = useState("winRate");
  const [maxRiskReward, setMaxRiskReward] = useState([10]);
  const { toast } = useToast();

  const startTraining = () => {
    setIsTraining(true);
    setProgress(0);
    
    // Simulate training progress
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 5;
        if (newProgress >= 100) {
          clearInterval(interval);
          
          // Simulate ML model finishing training
          setTimeout(() => {
            setIsTraining(false);
            toast({
              title: "Training Completed",
              description: "ML model has been trained successfully. New trading rules generated.",
            });
          }, 500);
          
          return 100;
        }
        return newProgress;
      });
    }, 300);
  };

  return (
    <div className="space-y-6">
      <Alert className="bg-blue-50 text-blue-800 border-blue-200">
        <Brain className="h-4 w-4" />
        <AlertTitle>Machine Learning Training</AlertTitle>
        <AlertDescription>
          Train the ML model using historical DAX data to generate optimal entry and exit rules
          with your specific risk management parameters.
        </AlertDescription>
      </Alert>
      
      <div className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="trainingPeriod">Training Period (Days)</Label>
          <Select value={trainingPeriod} onValueChange={setTrainingPeriod}>
            <SelectTrigger id="trainingPeriod" className="w-full">
              <SelectValue placeholder="Select training period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="14">Last 14 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="60">Last 60 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
              <SelectItem value="180">Last 180 days</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="optimizationMetric">Optimization Metric</Label>
          <Select value={optimizationMetric} onValueChange={setOptimizationMetric}>
            <SelectTrigger id="optimizationMetric" className="w-full">
              <SelectValue placeholder="Select optimization metric" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="winRate">Win Rate</SelectItem>
              <SelectItem value="profitFactor">Profit Factor</SelectItem>
              <SelectItem value="sharpeRatio">Sharpe Ratio</SelectItem>
              <SelectItem value="maxDrawdown">Minimum Drawdown</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid gap-2">
          <div className="flex justify-between">
            <Label htmlFor="riskRewardRatio">Risk/Reward Ratio</Label>
            <span className="text-sm text-muted-foreground">{maxRiskReward[0]}:1</span>
          </div>
          <Slider
            id="riskRewardRatio"
            min={1}
            max={20}
            step={1}
            value={maxRiskReward}
            onValueChange={setMaxRiskReward}
          />
          <p className="text-xs text-muted-foreground">
            Default is 10:1 as per your requirements. This sets take profit at {maxRiskReward[0]} times the stop loss of 20 pips.
          </p>
        </div>
      </div>
      
      <Separator />
      
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Training Progress</h3>
          {isTraining && progress === 100 && <Check className="h-5 w-5 text-green-500" />}
        </div>
        
        <Progress value={progress} className="h-2" />
        
        <div className="text-sm text-muted-foreground">
          {isTraining 
            ? `Training model... ${Math.round(progress)}%` 
            : progress === 100 
              ? "Training complete" 
              : "Click start to begin training"}
        </div>
        
        <Button 
          className="w-full" 
          onClick={startTraining}
          disabled={isTraining}
        >
          {isTraining ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Training in progress...
            </>
          ) : (
            "Start Training"
          )}
        </Button>
      </div>
    </div>
  );
}
