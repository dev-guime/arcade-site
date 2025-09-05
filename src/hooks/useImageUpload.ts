
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export const useImageUpload = () => {
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const validateFile = (file: File): { isValid: boolean; error?: string } => {
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      return {
        isValid: false,
        error: 'Tipo de arquivo não permitido. Use apenas JPEG, PNG ou WebP.'
      };
    }

    if (file.size > MAX_FILE_SIZE) {
      return {
        isValid: false,
        error: 'Arquivo muito grande. Máximo permitido: 5MB.'
      };
    }

    return { isValid: true };
  };

  const sanitizeFileName = (fileName: string): string => {
    // Remove special characters and keep only alphanumeric, dots, and hyphens
    return fileName.replace(/[^a-zA-Z0-9.-]/g, '_').toLowerCase();
  };

  const uploadImage = async (file: File, folder: string = 'products'): Promise<string | null> => {
    if (!file) return null;

    const validation = validateFile(file);
    if (!validation.isValid) {
      toast({
        title: "Arquivo inválido",
        description: validation.error,
        variant: "destructive",
      });
      return null;
    }

    try {
      setUploading(true);

      const fileExt = file.name.split('.').pop()?.toLowerCase() || 'jpg';
      const sanitizedFolder = sanitizeFileName(folder);
      const fileName = `${sanitizedFolder}/${Date.now()}_${Math.random().toString(36).substring(2)}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage
        .from('product-images')
        .getPublicUrl(fileName);

      toast({
        title: "Sucesso!",
        description: "Imagem enviada com sucesso!",
      });

      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Erro",
        description: "Erro ao enviar imagem. Tente novamente.",
        variant: "destructive",
      });
      return null;
    } finally {
      setUploading(false);
    }
  };

  return { uploadImage, uploading };
};
