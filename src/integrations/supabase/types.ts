export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      dax_historical_data: {
        Row: {
          close: number
          created_at: string
          high: number
          id: string
          low: number
          open: number
          session: string | null
          timestamp: string
          volume: number
        }
        Insert: {
          close: number
          created_at?: string
          high: number
          id?: string
          low: number
          open: number
          session?: string | null
          timestamp: string
          volume: number
        }
        Update: {
          close?: number
          created_at?: string
          high?: number
          id?: string
          low?: number
          open?: number
          session?: string | null
          timestamp?: string
          volume?: number
        }
        Relationships: []
      }
      ml_trading_rules: {
        Row: {
          active: boolean | null
          created_at: string
          description: string | null
          id: string
          parameters: Json | null
          performance_score: number | null
          rule_name: string
          rule_type: string | null
          updated_at: string
          win_rate: number | null
        }
        Insert: {
          active?: boolean | null
          created_at?: string
          description?: string | null
          id?: string
          parameters?: Json | null
          performance_score?: number | null
          rule_name: string
          rule_type?: string | null
          updated_at?: string
          win_rate?: number | null
        }
        Update: {
          active?: boolean | null
          created_at?: string
          description?: string | null
          id?: string
          parameters?: Json | null
          performance_score?: number | null
          rule_name?: string
          rule_type?: string | null
          updated_at?: string
          win_rate?: number | null
        }
        Relationships: []
      }
      trading_signals: {
        Row: {
          created_at: string
          direction: string | null
          entry_price: number
          id: string
          lot_size: number
          profit_loss: number | null
          result: string | null
          risk_amount: number
          status: string | null
          stop_loss: number
          take_profit: number
          timestamp: string
        }
        Insert: {
          created_at?: string
          direction?: string | null
          entry_price: number
          id?: string
          lot_size: number
          profit_loss?: number | null
          result?: string | null
          risk_amount: number
          status?: string | null
          stop_loss: number
          take_profit: number
          timestamp: string
        }
        Update: {
          created_at?: string
          direction?: string | null
          entry_price?: number
          id?: string
          lot_size?: number
          profit_loss?: number | null
          result?: string | null
          risk_amount?: number
          status?: string | null
          stop_loss?: number
          take_profit?: number
          timestamp?: string
        }
        Relationships: []
      }
      user_settings: {
        Row: {
          created_at: string
          dax_session_preference: string | null
          default_lot_size: number | null
          default_risk_reward_ratio: number | null
          default_stop_loss_pips: number | null
          id: string
          timezone: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          dax_session_preference?: string | null
          default_lot_size?: number | null
          default_risk_reward_ratio?: number | null
          default_stop_loss_pips?: number | null
          id?: string
          timezone?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          dax_session_preference?: string | null
          default_lot_size?: number | null
          default_risk_reward_ratio?: number | null
          default_stop_loss_pips?: number | null
          id?: string
          timezone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
