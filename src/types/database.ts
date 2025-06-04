
export interface Database {
  public: {
    Tables: {
      pcs: {
        Row: {
          id: string;
          name: string;
          price: number;
          category: string;
          description: string;
          specs: string[];
          spec_icons: string[];
          highlight: boolean;
          highlight_text?: string;
          image?: string;
          secondary_images?: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          name: string;
          price: number;
          category: string;
          description: string;
          specs: string[];
          spec_icons?: string[];
          highlight?: boolean;
          highlight_text?: string;
          image?: string;
          secondary_images?: string[];
        };
        Update: {
          name?: string;
          price?: number;
          category?: string;
          description?: string;
          specs?: string[];
          spec_icons?: string[];
          highlight?: boolean;
          highlight_text?: string;
          image?: string;
          secondary_images?: string[];
        };
      };
      perifericos: {
        Row: {
          id: string;
          name: string;
          price: number;
          category: string;
          description?: string;
          specs?: string[];
          highlight: boolean;
          highlight_text?: string;
          image?: string;
          secondary_images?: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          name: string;
          price: number;
          category: string;
          description?: string;
          specs?: string[];
          highlight?: boolean;
          highlight_text?: string;
          image?: string;
          secondary_images?: string[];
        };
        Update: {
          name?: string;
          price?: number;
          category?: string;
          description?: string;
          specs?: string[];
          highlight?: boolean;
          highlight_text?: string;
          image?: string;
          secondary_images?: string[];
        };
      };
    };
  };
}

export interface Pc {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  specs: string[];
  spec_icons?: string[];
  highlight: boolean;
  highlight_text?: string;
  image?: string;
  secondaryImages?: string[];
}

export interface Periferico {
  id: string;
  name: string;
  price: number;
  category: string;
  description?: string;
  specs?: string[];
  highlight: boolean;
  highlight_text?: string;
  image?: string;
  secondaryImages?: string[];
}
