
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Card } from '@/components/ui/card';
import { format } from 'date-fns';
import { Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type MLRule = {
  id: string;
  rule_name: string;
  rule_type: string;
  description: string;
  performance_score: number;
  win_rate: number;
  active: boolean;
  created_at: string;
};

export function MLRulesList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['mlRules'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('ml_trading_rules')
        .select('*')
        .order('performance_score', { ascending: false });
      
      if (error) throw error;
      return data as MLRule[];
    }
  });

  if (isLoading) {
    return <div className="flex justify-center p-4">Loading ML rules...</div>;
  }

  if (error) {
    return <div className="text-red-500 p-4">Error loading rules: {(error as Error).message}</div>;
  }

  if (!data || data.length === 0) {
    return (
      <Card className="p-4 text-center">
        <p>No ML trading rules available yet. Train the model to generate rules.</p>
      </Card>
    );
  }

  const toggleRuleStatus = async (id: string, currentStatus: boolean) => {
    await supabase
      .from('ml_trading_rules')
      .update({ active: !currentStatus })
      .eq('id', id);
    
    // Refetch the data
    // You would typically invalidate the query here
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Rule Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Performance</TableHead>
            <TableHead>Win Rate</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Active</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((rule) => (
            <TableRow key={rule.id}>
              <TableCell className="font-medium flex items-center">
                {rule.rule_name}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 ml-2 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">{rule.description}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
              <TableCell>
                <Badge variant={rule.rule_type === 'entry' ? 'default' : 'secondary'}>
                  {rule.rule_type}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  <div className={`w-24 h-2 rounded-full ${getPerformanceColor(rule.performance_score)}`} />
                  <span className="ml-2">{rule.performance_score.toFixed(2)}</span>
                </div>
              </TableCell>
              <TableCell>{(rule.win_rate * 100).toFixed(1)}%</TableCell>
              <TableCell>{format(new Date(rule.created_at), 'yyyy-MM-dd')}</TableCell>
              <TableCell>
                <Switch 
                  checked={rule.active} 
                  onCheckedChange={() => toggleRuleStatus(rule.id, rule.active)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function getPerformanceColor(score: number): string {
  if (score >= 8) return 'bg-green-500';
  if (score >= 6) return 'bg-yellow-500';
  if (score >= 4) return 'bg-orange-500';
  return 'bg-red-500';
}
