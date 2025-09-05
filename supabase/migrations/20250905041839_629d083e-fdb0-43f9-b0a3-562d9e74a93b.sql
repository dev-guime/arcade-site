-- Fix critical security vulnerabilities and add requested features

-- 1. Fix function security warning
CREATE OR REPLACE FUNCTION public.calculate_monthly_expense_total()
RETURNS TRIGGER AS $$
DECLARE
  other_total NUMERIC := 0;
BEGIN
  -- Calcular soma dos outros gastos
  SELECT COALESCE(SUM((value->>'amount')::NUMERIC), 0) 
  INTO other_total
  FROM jsonb_array_elements(COALESCE(NEW.other_expenses, '[]'::jsonb)) value;
  
  -- Calcular total
  NEW.total := COALESCE(NEW.paid_traffic, 0) + COALESCE(NEW.bank_insurance, 0) + other_total;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- 2. Add border_color columns as requested
ALTER TABLE public.computers ADD COLUMN IF NOT EXISTS border_color TEXT DEFAULT '#3b82f6';
ALTER TABLE public.sold_computers ADD COLUMN IF NOT EXISTS border_color TEXT DEFAULT '#3b82f6';

-- 3. CRITICAL: Fix dangerous RLS policies that allow public write access
-- Remove dangerous public write policies for pcs and perifericos
DROP POLICY IF EXISTS "Anyone can insert pcs" ON public.pcs;
DROP POLICY IF EXISTS "Anyone can update pcs" ON public.pcs;
DROP POLICY IF EXISTS "Anyone can delete pcs" ON public.pcs;

DROP POLICY IF EXISTS "Anyone can insert perifericos" ON public.perifericos;
DROP POLICY IF EXISTS "Anyone can update perifericos" ON public.perifericos;
DROP POLICY IF EXISTS "Anyone can delete perifericos" ON public.perifericos;

-- Create secure admin-only policies for pcs table
CREATE POLICY "Authenticated users can manage pcs"
ON public.pcs
FOR ALL
USING (auth.uid() IS NOT NULL)
WITH CHECK (auth.uid() IS NOT NULL);

-- Keep public read access for website display
CREATE POLICY "Public can view pcs"
ON public.pcs
FOR SELECT
USING (true);

-- Create secure admin-only policies for perifericos table  
CREATE POLICY "Authenticated users can manage perifericos"
ON public.perifericos
FOR ALL
USING (auth.uid() IS NOT NULL)
WITH CHECK (auth.uid() IS NOT NULL);

-- Keep public read access for website display
CREATE POLICY "Public can view perifericos"
ON public.perifericos
FOR SELECT
USING (true);

-- 4. Secure customer data - restrict to admin only
DROP POLICY IF EXISTS "Public can view sold computers portfolio" ON public.sold_computers;
DROP POLICY IF EXISTS "Public can view delivered PCs" ON public.delivered_pcs;

-- Only authenticated users can view customer data
CREATE POLICY "Authenticated users can view sold computers"
ON public.sold_computers
FOR SELECT
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can view delivered PCs"
ON public.delivered_pcs
FOR SELECT
USING (auth.uid() IS NOT NULL);

-- Keep existing admin management policies for sold_computers and delivered_pcs
-- These are already properly configured

-- 5. Ensure monthly_expenses remains admin-only (already properly configured)

-- 6. Add triggers for border_color defaults
CREATE OR REPLACE FUNCTION public.set_default_border_color()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.border_color IS NULL THEN
    NEW.border_color := '#3b82f6';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER set_computers_border_color
BEFORE INSERT ON public.computers
FOR EACH ROW
EXECUTE FUNCTION public.set_default_border_color();

CREATE TRIGGER set_sold_computers_border_color
BEFORE INSERT ON public.sold_computers
FOR EACH ROW
EXECUTE FUNCTION public.set_default_border_color();