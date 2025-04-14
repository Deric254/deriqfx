
import React, { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { AlertCircle, Upload } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function DataImportForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [csvData, setCsvData] = useState('');
  const [fileName, setFileName] = useState('');
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    setFileName(file.name);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      setCsvData(text || '');
    };
    reader.readAsText(file);
  };

  const handleImport = async () => {
    if (!csvData) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select a CSV file to import",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Parse CSV data
      // This is a simple parser, might need improvement for complex CSVs
      const rows = csvData.split('\n');
      const header = rows[0].split(',');
      
      const dataToInsert = rows.slice(1)
        .filter(row => row.trim() !== '')
        .map(row => {
          const values = row.split(',');
          return {
            timestamp: new Date(values[0]).toISOString(),
            open: parseFloat(values[1]),
            high: parseFloat(values[2]),
            low: parseFloat(values[3]),
            close: parseFloat(values[4]),
            volume: parseInt(values[5], 10),
            session: 'london' // Default to London session
          };
        });
      
      // Insert data to Supabase
      const { error } = await supabase
        .from('dax_historical_data')
        .insert(dataToInsert);
      
      if (error) throw error;
      
      toast({
        title: "Import Successful",
        description: `Imported ${dataToInsert.length} records`,
      });
      
      // Clear form
      setCsvData('');
      setFileName('');
      
    } catch (error) {
      console.error('Import error:', error);
      toast({
        variant: "destructive",
        title: "Import Failed",
        description: (error as Error).message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Import Format</AlertTitle>
        <AlertDescription>
          CSV file should have columns: Timestamp,Open,High,Low,Close,Volume
        </AlertDescription>
      </Alert>
      
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="csvFile">CSV File</Label>
        <Input 
          id="csvFile" 
          type="file" 
          accept=".csv" 
          onChange={handleFileChange}
        />
      </div>
      
      {fileName && (
        <div className="text-sm text-muted-foreground">
          Selected file: {fileName}
        </div>
      )}
      
      <div className="grid gap-1.5">
        <Label htmlFor="csvPreview">CSV Preview</Label>
        <Textarea 
          id="csvPreview" 
          value={csvData.slice(0, 500) + (csvData.length > 500 ? '...' : '')} 
          rows={6} 
          readOnly 
        />
      </div>
      
      <Button 
        onClick={handleImport} 
        disabled={isLoading || !csvData}
        className="w-full"
      >
        {isLoading ? 'Importing...' : 'Import Data'}
        {!isLoading && <Upload className="ml-2 h-4 w-4" />}
      </Button>
    </div>
  );
}
