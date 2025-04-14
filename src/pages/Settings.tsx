
import React from 'react';
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { UserSettingsForm } from "@/components/settings/UserSettingsForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Settings = () => {
  return (
    <DashboardLayout>
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Trading Settings</h1>
        <p className="text-muted-foreground">Configure your DAX trading parameters</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Trading Parameters</CardTitle>
        </CardHeader>
        <CardContent>
          <UserSettingsForm />
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default Settings;
