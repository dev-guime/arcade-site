-- PHASE 2: CRITICAL STORAGE SECURITY FIXES

-- CRITICAL: Fix dangerous public storage policies
-- Current policies allow ANYONE on the internet to upload, modify, or delete product images

-- 1. Drop all dangerous public storage policies
DROP POLICY IF EXISTS "Anyone can upload product images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can update product images" ON storage.objects;  
DROP POLICY IF EXISTS "Anyone can delete product images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can view product images" ON storage.objects;

-- 2. Create secure storage policies for product-images bucket

-- Allow public viewing of product images (needed for website display)
CREATE POLICY "Public can view product images"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'product-images');

-- Only authenticated admins can upload product images
CREATE POLICY "Admin only can upload product images"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'product-images' 
    AND public.is_admin()
  );

-- Only authenticated admins can update product images
CREATE POLICY "Admin only can update product images"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'product-images' 
    AND public.is_admin()
  );

-- Only authenticated admins can delete product images
CREATE POLICY "Admin only can delete product images"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'product-images' 
    AND public.is_admin()
  );

-- 3. Add additional security: Set file size and mime type restrictions on bucket
UPDATE storage.buckets 
SET 
  file_size_limit = 10485760, -- 10MB limit
  allowed_mime_types = ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
WHERE id = 'product-images';