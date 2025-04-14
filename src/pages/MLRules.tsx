
import React from 'react';
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MLRulesList } from "@/components/ml/MLRulesList";
import { MLModelTraining } from "@/components/ml/MLModelTraining";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const MLRules = () => {
  return (
    <DashboardLayout>
      <div className="mb-4">
        <h1 className="text-2xl font-bold">ML Trading Rules</h1>
        <p className="text-muted-foreground">Machine learning generated DAX trading rules</p>
      </div>
      
      <Tabs defaultValue="rules">
        <TabsList className="mb-4">
          <TabsTrigger value="rules">Trading Rules</TabsTrigger>
          <TabsTrigger value="training">Train Model</TabsTrigger>
        </TabsList>
        
        <TabsContent value="rules">
          <Card>
            <CardHeader>
              <CardTitle>Generated Trading Rules</CardTitle>
            </CardHeader>
            <CardContent>
              <MLRulesList />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="training">
          <Card>
            <CardHeader>
              <CardTitle>Train ML Model</CardTitle>
            </CardHeader>
            <CardContent>
              <MLModelTraining />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default MLRules;
