
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
import { format } from 'date-fns';
import { Card } from '@/components/ui/card';

type HistoricalData = {
  id: string;
  timestamp: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  session: string;
};

export function HistoricalDataTable() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['daxHistoricalData'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('dax_historical_data')
        .select('*')
        .eq('session', 'london')
        .order('timestamp', { ascending: false })
        .limit(100);
      
      if (error) throw error;
      return data as HistoricalData[];
    }
  });

  if (isLoading) {
    return <div className="flex justify-center p-4">Loading historical data...</div>;
  }

  if (error) {
    return <div className="text-red-500 p-4">Error loading data: {(error as Error).message}</div>;
  }

  if (!data || data.length === 0) {
    return (
      <Card className="p-4 text-center">
        <p>No historical data available. Please import data first.</p>
      </Card>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date & Time</TableHead>
            <TableHead>Open</TableHead>
            <TableHead>High</TableHead>
            <TableHead>Low</TableHead>
            <TableHead>Close</TableHead>
            <TableHead>Volume</TableHead>
            <TableHead>Session</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{format(new Date(row.timestamp), 'yyyy-MM-dd HH:mm')}</TableCell>
              <TableCell>{row.open.toFixed(2)}</TableCell>
              <TableCell>{row.high.toFixed(2)}</TableCell>
              <TableCell>{row.low.toFixed(2)}</TableCell>
              <TableCell>{row.close.toFixed(2)}</TableCell>
              <TableCell>{row.volume.toLocaleString()}</TableCell>
              <TableCell className="capitalize">{row.session}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
