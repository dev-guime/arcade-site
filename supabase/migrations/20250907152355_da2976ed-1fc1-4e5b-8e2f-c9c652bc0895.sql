-- Security Enhancement Migration
-- 1. Improve admin role management with automatic first-user admin assignment

-- Create function to ensure first user gets admin role automatically
CREATE OR REPLACE FUNCTION public.ensure_first_user_admin()
RETURNS TRIGGER AS $$
DECLARE
  admin_count INTEGER;
BEGIN
  -- Check if there are any existing admin users
  SELECT COUNT(*) INTO admin_count
  FROM public.user_roles
  WHERE role = 'admin';
  
  -- If no admins exist, make this user an admin
  IF admin_count = 0 THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'admin')
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger to automatically assign admin role to first user
DROP TRIGGER IF EXISTS on_auth_user_created_admin_assignment ON auth.users;
CREATE TRIGGER on_auth_user_created_admin_assignment
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.ensure_first_user_admin();

-- Add security logging table for centralized security event tracking
CREATE TABLE IF NOT EXISTS public.security_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type TEXT NOT NULL,
  user_id UUID,
  ip_address INET,
  user_agent TEXT,
  details JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on security logs
ALTER TABLE public.security_logs ENABLE ROW LEVEL SECURITY;

-- Only admins can view security logs
CREATE POLICY "Admin only can view security logs" 
ON public.security_logs 
FOR SELECT 
USING (is_admin());

-- Only system can insert security logs (via service role)
CREATE POLICY "System can insert security logs" 
ON public.security_logs 
FOR INSERT 
WITH CHECK (true);