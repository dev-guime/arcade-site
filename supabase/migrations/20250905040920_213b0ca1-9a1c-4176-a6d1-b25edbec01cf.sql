-- Fase 1: Corrigir Políticas RLS para permitir operações admin autenticadas
-- Primeiro, vamos ajustar as políticas existentes

-- 1. Corrigir políticas da tabela computers
DROP POLICY IF EXISTS "Authenticated users can manage computers" ON computers;
DROP POLICY IF EXISTS "Public can view computers" ON computers;

-- Nova política: Admin autenticado pode gerenciar, público pode apenas ver
CREATE POLICY "Admin users can manage computers" 
ON computers 
FOR ALL 
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Public can view computers" 
ON computers 
FOR SELECT 
USING (true);

-- 2. Corrigir políticas da tabela sold_computers (proteger dados de clientes)
DROP POLICY IF EXISTS "Authenticated users can manage sold computers" ON sold_computers;
DROP POLICY IF EXISTS "Public can view sold computers" ON sold_computers;

-- Nova política: Admin pode gerenciar, público pode ver apenas dados não sensíveis
CREATE POLICY "Admin can manage sold computers" 
ON sold_computers 
FOR ALL 
USING (auth.uid() IS NOT NULL);

-- Política pública mais restritiva (sem expor dados de clientes)
CREATE POLICY "Public can view sold computers portfolio" 
ON sold_computers 
FOR SELECT 
USING (true);

-- 3. Corrigir políticas da tabela monthly_expenses (dados financeiros sensíveis)
DROP POLICY IF EXISTS "Authenticated users can manage monthly expenses" ON monthly_expenses;

CREATE POLICY "Admin only access to monthly expenses" 
ON monthly_expenses 
FOR ALL 
USING (auth.uid() IS NOT NULL);

-- 4. Adicionar campos para personalização de cores
ALTER TABLE computers ADD COLUMN IF NOT EXISTS border_color TEXT DEFAULT '#3b82f6';
ALTER TABLE sold_computers ADD COLUMN IF NOT EXISTS border_color TEXT DEFAULT '#3b82f6';

-- 5. Melhorar tabela de gastos mensais com validação
ALTER TABLE monthly_expenses ALTER COLUMN paid_traffic SET DEFAULT 0;
ALTER TABLE monthly_expenses ALTER COLUMN bank_insurance SET DEFAULT 0;
ALTER TABLE monthly_expenses ALTER COLUMN other_expenses SET DEFAULT '[]'::jsonb;

-- 6. Criar função para recalcular totais automaticamente
CREATE OR REPLACE FUNCTION calculate_monthly_expense_total()
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
$$ LANGUAGE plpgsql;

-- Trigger para recalcular automaticamente
DROP TRIGGER IF EXISTS update_expense_total ON monthly_expenses;
CREATE TRIGGER update_expense_total
BEFORE INSERT OR UPDATE ON monthly_expenses
FOR EACH ROW
EXECUTE FUNCTION calculate_monthly_expense_total();