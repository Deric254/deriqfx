
import React from 'react';
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { HistoricalDataTable } from "@/components/data/HistoricalDataTable";
import { DataImportForm } from "@/components/data/DataImportForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const HistoricalData = () => {
  return (
    <DashboardLayout>
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Historical DAX Data</h1>
        <p className="text-muted-foreground">Import and view historical DAX data for London session</p>
      </div>
      
      <Tabs defaultValue="view">
        <TabsList className="mb-4">
          <TabsTrigger value="view">View Data</TabsTrigger>
          <TabsTrigger value="import">Import Data</TabsTrigger>
        </TabsList>
        
        <TabsContent value="view">
          <Card>
            <CardHeader>
              <CardTitle>London Session DAX Data</CardTitle>
            </CardHeader>
            <CardContent>
              <HistoricalDataTable />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="import">
          <Card>
            <CardHeader>
              <CardTitle>Import Historical Data</CardTitle>
            </CardHeader>
            <CardContent>
              <DataImportForm />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default HistoricalData;
