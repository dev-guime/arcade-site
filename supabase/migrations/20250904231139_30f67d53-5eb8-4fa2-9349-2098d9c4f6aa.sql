-- Create computers table for admin panel
CREATE TABLE public.computers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  main_image TEXT,
  secondary_images JSONB DEFAULT '[]'::jsonb,
  gpu TEXT,
  cpu TEXT,
  ram TEXT,
  storage TEXT,
  motherboard TEXT,
  cooler TEXT,
  watercooler TEXT,
  is_sold BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create sold computers table for portfolio
CREATE TABLE public.sold_computers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  customer TEXT NOT NULL,
  sold_date DATE NOT NULL,
  location TEXT NOT NULL,
  image TEXT,
  specs JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create monthly expenses table
CREATE TABLE public.monthly_expenses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  month INTEGER NOT NULL,
  year INTEGER NOT NULL,
  paid_traffic DECIMAL(10,2) DEFAULT 0,
  bank_insurance DECIMAL(10,2) DEFAULT 0,
  other_expenses JSONB DEFAULT '[]'::jsonb,
  total DECIMAL(10,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(month, year)
);

-- Enable RLS
ALTER TABLE public.computers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sold_computers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.monthly_expenses ENABLE ROW LEVEL SECURITY;

-- Create policies for computers
CREATE POLICY "Public can view computers" ON public.computers FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage computers" ON public.computers FOR ALL USING (auth.uid() IS NOT NULL);

-- Create policies for sold computers
CREATE POLICY "Public can view sold computers" ON public.sold_computers FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage sold computers" ON public.sold_computers FOR ALL USING (auth.uid() IS NOT NULL);

-- Create policies for monthly expenses
CREATE POLICY "Authenticated users can manage monthly expenses" ON public.monthly_expenses FOR ALL USING (auth.uid() IS NOT NULL);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_computers_updated_at
  BEFORE UPDATE ON public.computers
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_sold_computers_updated_at
  BEFORE UPDATE ON public.sold_computers
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_monthly_expenses_updated_at
  BEFORE UPDATE ON public.monthly_expenses
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();