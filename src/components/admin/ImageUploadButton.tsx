
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, Loader2 } from 'lucide-react';
import { useImageUpload } from '@/hooks/useImageUpload';

interface ImageUploadButtonProps {
  onImageUploaded: (url: string) => void;
  className?: string;
  disabled?: boolean;
  currentImage?: string;
}

export const ImageUploadButton = ({ onImageUploaded, className, disabled, currentImage }: ImageUploadButtonProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadImage, uploading } = useImageUpload();

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Por favor, selecione apenas arquivos de imagem.');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('O arquivo deve ter no máximo 5MB.');
      return;
    }

    const url = await uploadImage(file);
    if (url) {
      onImageUploaded(url);
    }

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <Button
        type="button"
        onClick={handleClick}
        disabled={disabled || uploading}
        className={className}
      >
        {uploading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Upload className="w-4 h-4" />
        )}
        {uploading ? 'Enviando...' : 'Selecionar Imagem'}
      </Button>
      {currentImage && (
        <div className="mt-2">
          <img
            src={currentImage}
            alt="Preview"
            className="w-20 h-20 object-cover rounded border"
          />
        </div>
      )}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};
