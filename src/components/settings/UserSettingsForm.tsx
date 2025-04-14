
import React, { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Save } from "lucide-react";

type UserSettings = {
  id: string;
  default_lot_size: number;
  default_stop_loss_pips: number;
  default_risk_reward_ratio: number;
  dax_session_preference: string;
  timezone: string;
};

export function UserSettingsForm() {
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase
        .from('user_settings')
        .select('*')
        .limit(1)
        .single();
      
      if (error && error.code !== 'PGRST116') {
        // PGRST116 is the error code for no rows returned
        throw error;
      }
      
      if (data) {
        setSettings(data as UserSettings);
      } else {
        // No settings found, create default
        await createDefaultSettings();
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load settings",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const createDefaultSettings = async () => {
    const defaultSettings = {
      default_lot_size: 0.01,
      default_stop_loss_pips: 20,
      default_risk_reward_ratio: 10.0,
      dax_session_preference: 'london',
      timezone: 'Africa/Nairobi',
    };
    
    const { data, error } = await supabase
      .from('user_settings')
      .insert([defaultSettings])
      .select();
    
    if (error) throw error;
    
    setSettings(data[0] as UserSettings);
  };

  const handleChange = (field: keyof UserSettings, value: string | number) => {
    if (!settings) return;
    
    setSettings({
      ...settings,
      [field]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    
    setIsSaving(true);
    
    try {
      const { error } = await supabase
        .from('user_settings')
        .update({
          default_lot_size: settings.default_lot_size,
          default_stop_loss_pips: settings.default_stop_loss_pips,
          default_risk_reward_ratio: settings.default_risk_reward_ratio,
          dax_session_preference: settings.dax_session_preference,
          timezone: settings.timezone,
        })
        .eq('id', settings.id);
      
      if (error) throw error;
      
      toast({
        title: "Settings Saved",
        description: "Your trading settings have been updated",
      });
    } catch (error) {
      console.error('Error saving settings:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save settings",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="flex justify-center p-4">Loading settings...</div>;
  }

  if (!settings) {
    return <div className="text-red-500 p-4">Error: Unable to load settings</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Risk Management</h3>
        
        <div className="grid gap-2">
          <Label htmlFor="lotSize">Default Lot Size</Label>
          <Input
            id="lotSize"
            type="number"
            value={settings.default_lot_size}
            onChange={(e) => handleChange('default_lot_size', parseFloat(e.target.value))}
            step="0.01"
            min="0.01"
            max="100"
            required
          />
          <p className="text-xs text-muted-foreground">
            Standard lot size for DAX trading (e.g., 0.01 = micro lot)
          </p>
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="stopLoss">Default Stop Loss (pips)</Label>
          <Input
            id="stopLoss"
            type="number"
            value={settings.default_stop_loss_pips}
            onChange={(e) => handleChange('default_stop_loss_pips', parseInt(e.target.value, 10))}
            min="1"
            required
          />
          <p className="text-xs text-muted-foreground">
            Default stop loss in pips (recommended: 20 pips)
          </p>
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="riskReward">Risk/Reward Ratio</Label>
          <Input
            id="riskReward"
            type="number"
            value={settings.default_risk_reward_ratio}
            onChange={(e) => handleChange('default_risk_reward_ratio', parseFloat(e.target.value))}
            step="0.1"
            min="1"
            required
          />
          <p className="text-xs text-muted-foreground">
            Take profit will be this many times the stop loss (recommended: 10)
          </p>
        </div>
      </div>
      
      <Separator />
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Session Preferences</h3>
        
        <div className="grid gap-2">
          <Label htmlFor="daxSession">DAX Trading Session</Label>
          <Select
            value={settings.dax_session_preference}
            onValueChange={(value) => handleChange('dax_session_preference', value)}
          >
            <SelectTrigger id="daxSession">
              <SelectValue placeholder="Select trading session" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="london">London Session</SelectItem>
              <SelectItem value="new_york">New York Session</SelectItem>
              <SelectItem value="asia">Asian Session</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="timezone">Timezone</Label>
          <Select
            value={settings.timezone}
            onValueChange={(value) => handleChange('timezone', value)}
          >
            <SelectTrigger id="timezone">
              <SelectValue placeholder="Select timezone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Africa/Nairobi">Africa/Nairobi (EAT)</SelectItem>
              <SelectItem value="Europe/London">Europe/London (GMT/BST)</SelectItem>
              <SelectItem value="Europe/Berlin">Europe/Berlin (CET/CEST)</SelectItem>
              <SelectItem value="America/New_York">America/New_York (EST/EDT)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Button type="submit" disabled={isSaving} className="w-full">
        {isSaving ? (
          <>Saving...</>
        ) : (
          <>
            <Save className="mr-2 h-4 w-4" />
            Save Settings
          </>
        )}
      </Button>
    </form>
  );
}
