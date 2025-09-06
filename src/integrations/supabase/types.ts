export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      computers: {
        Row: {
          border_color: string | null
          cooler: string | null
          cpu: string | null
          created_at: string | null
          gpu: string | null
          id: string
          is_sold: boolean | null
          main_image: string | null
          motherboard: string | null
          name: string
          price: number
          ram: string | null
          secondary_images: Json | null
          storage: string | null
          updated_at: string | null
          watercooler: string | null
        }
        Insert: {
          border_color?: string | null
          cooler?: string | null
          cpu?: string | null
          created_at?: string | null
          gpu?: string | null
          id?: string
          is_sold?: boolean | null
          main_image?: string | null
          motherboard?: string | null
          name: string
          price: number
          ram?: string | null
          secondary_images?: Json | null
          storage?: string | null
          updated_at?: string | null
          watercooler?: string | null
        }
        Update: {
          border_color?: string | null
          cooler?: string | null
          cpu?: string | null
          created_at?: string | null
          gpu?: string | null
          id?: string
          is_sold?: boolean | null
          main_image?: string | null
          motherboard?: string | null
          name?: string
          price?: number
          ram?: string | null
          secondary_images?: Json | null
          storage?: string | null
          updated_at?: string | null
          watercooler?: string | null
        }
        Relationships: []
      }
      delivered_pcs: {
        Row: {
          created_at: string
          customer: string
          delivery_date: string
          id: string
          image: string | null
          location: string
          name: string
          specs: Json | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          customer: string
          delivery_date: string
          id?: string
          image?: string | null
          location: string
          name: string
          specs?: Json | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          customer?: string
          delivery_date?: string
          id?: string
          image?: string | null
          location?: string
          name?: string
          specs?: Json | null
          updated_at?: string
        }
        Relationships: []
      }
      monthly_expenses: {
        Row: {
          bank_insurance: number | null
          created_at: string | null
          id: string
          month: number
          other_expenses: Json | null
          paid_traffic: number | null
          total: number | null
          updated_at: string | null
          year: number
        }
        Insert: {
          bank_insurance?: number | null
          created_at?: string | null
          id?: string
          month: number
          other_expenses?: Json | null
          paid_traffic?: number | null
          total?: number | null
          updated_at?: string | null
          year: number
        }
        Update: {
          bank_insurance?: number | null
          created_at?: string | null
          id?: string
          month?: number
          other_expenses?: Json | null
          paid_traffic?: number | null
          total?: number | null
          updated_at?: string | null
          year?: number
        }
        Relationships: []
      }
      pcs: {
        Row: {
          category: string
          created_at: string
          description: string | null
          highlight: boolean | null
          highlight_text: string | null
          id: string
          image: string | null
          name: string
          price: number
          secondary_images: Json | null
          spec_icons: Json | null
          specs: Json | null
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          description?: string | null
          highlight?: boolean | null
          highlight_text?: string | null
          id?: string
          image?: string | null
          name: string
          price: number
          secondary_images?: Json | null
          spec_icons?: Json | null
          specs?: Json | null
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          highlight?: boolean | null
          highlight_text?: string | null
          id?: string
          image?: string | null
          name?: string
          price?: number
          secondary_images?: Json | null
          spec_icons?: Json | null
          specs?: Json | null
          updated_at?: string
        }
        Relationships: []
      }
      perifericos: {
        Row: {
          category: string
          created_at: string
          description: string | null
          highlight: boolean | null
          highlight_text: string | null
          id: string
          image: string | null
          name: string
          price: number
          secondary_images: Json | null
          specs: Json | null
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          description?: string | null
          highlight?: boolean | null
          highlight_text?: string | null
          id?: string
          image?: string | null
          name: string
          price: number
          secondary_images?: Json | null
          specs?: Json | null
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          highlight?: boolean | null
          highlight_text?: string | null
          id?: string
          image?: string | null
          name?: string
          price?: number
          secondary_images?: Json | null
          specs?: Json | null
          updated_at?: string
        }
        Relationships: []
      }
      sold_computers: {
        Row: {
          border_color: string | null
          created_at: string | null
          customer: string
          id: string
          image: string | null
          location: string
          name: string
          sold_date: string
          specs: Json | null
          updated_at: string | null
        }
        Insert: {
          border_color?: string | null
          created_at?: string | null
          customer: string
          id?: string
          image?: string | null
          location: string
          name: string
          sold_date: string
          specs?: Json | null
          updated_at?: string | null
        }
        Update: {
          border_color?: string | null
          created_at?: string | null
          customer?: string
          id?: string
          image?: string | null
          location?: string
          name?: string
          sold_date?: string
          specs?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const
