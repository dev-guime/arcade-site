
export interface Database {
  public: {
    Tables: {
      pcs: {
        Row: {
          id: number;
          name: string;
          price: number;
          category: string;
          description: string;
          specs: string[];
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
      perifericos: {
        Row: {
          id: number;
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
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
  specs: string[];
  highlight: boolean;
  highlight_text?: string;
  image?: string;
  secondaryImages?: string[];
}

export interface Periferico {
  id: number;
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
