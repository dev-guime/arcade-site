-- PHASE 1: CRITICAL SECURITY FIXES - Customer & Financial Data Protection

-- 1. Create user roles system for proper admin access control
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create helper function to check if current user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COALESCE(public.has_role(auth.uid(), 'admin'), false)
$$;

-- 2. CRITICAL: Secure customer data in delivered_pcs table
-- Drop the dangerous policy that allows any authenticated user to manage delivered PCs
DROP POLICY IF EXISTS "Authenticated users can manage delivered PCs" ON public.delivered_pcs;
DROP POLICY IF EXISTS "Authenticated users can view delivered PCs" ON public.delivered_pcs;

-- Create admin-only policies for delivered_pcs (protects customer names and locations)
CREATE POLICY "Admin only can view delivered PCs"
  ON public.delivered_pcs
  FOR SELECT
  USING (public.is_admin());

CREATE POLICY "Admin only can manage delivered PCs"
  ON public.delivered_pcs
  FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- 3. CRITICAL: Secure customer data in sold_computers table  
-- The current policy allows any authenticated user to view customer info
DROP POLICY IF EXISTS "Authenticated users can view sold computers" ON public.sold_computers;
DROP POLICY IF EXISTS "Admin can manage sold computers" ON public.sold_computers;

-- Create admin-only policies for sold_computers (protects customer names and locations)
CREATE POLICY "Admin only can view sold computers"
  ON public.sold_computers
  FOR SELECT
  USING (public.is_admin());

CREATE POLICY "Admin only can manage sold computers"
  ON public.sold_computers
  FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- 4. CRITICAL: Secure financial data in monthly_expenses
-- Current policy allows any authenticated user to access financial data
DROP POLICY IF EXISTS "Admin only access to monthly expenses" ON public.monthly_expenses;

-- Create strict admin-only policies for financial data
CREATE POLICY "Admin only can view monthly expenses"
  ON public.monthly_expenses
  FOR SELECT
  USING (public.is_admin());

CREATE POLICY "Admin only can manage monthly expenses" 
  ON public.monthly_expenses
  FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- 5. Keep existing computer management policies (they are already secure)
-- The computers table policies are good as they allow public viewing but require auth for management

-- 6. User roles policies - only admins can manage roles
CREATE POLICY "Admin can view all user roles"
  ON public.user_roles
  FOR SELECT
  USING (public.is_admin());

CREATE POLICY "Admin can manage user roles"
  ON public.user_roles
  FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Users can view their own roles
CREATE POLICY "Users can view own roles"
  ON public.user_roles
  FOR SELECT
  USING (auth.uid() = user_id);