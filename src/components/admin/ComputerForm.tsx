import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUploadButton } from "./ImageUploadButton";
import { useAdmin } from "@/contexts/AdminContext";
import { sanitizeInput, formRateLimiter } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { X, Plus } from "lucide-react";

const computerSchema = z.object({
  name: z.string()
    .min(1, "Nome é obrigatório")
    .max(100, "Nome muito longo")
    .transform(val => sanitizeInput(val)),
  price: z.number()
    .min(0, "Preço deve ser positivo")
    .max(999999, "Preço muito alto"),
  gpu: z.string()
    .max(100, "Especificação muito longa")
    .optional()
    .transform(val => val ? sanitizeInput(val) : val),
  cpu: z.string()
    .max(100, "Especificação muito longa")
    .optional()
    .transform(val => val ? sanitizeInput(val) : val),
  ram: z.string()
    .max(50, "Especificação muito longa")
    .optional()
    .transform(val => val ? sanitizeInput(val) : val),
  storage: z.string()
    .max(100, "Especificação muito longa")
    .optional()
    .transform(val => val ? sanitizeInput(val) : val),
  motherboard: z.string()
    .max(100, "Especificação muito longa")
    .optional()
    .transform(val => val ? sanitizeInput(val) : val),
  cooler: z.string()
    .max(100, "Especificação muito longa")
    .optional()
    .transform(val => val ? sanitizeInput(val) : val),
  watercooler: z.string()
    .max(100, "Especificação muito longa")
    .optional()
    .transform(val => val ? sanitizeInput(val) : val),
  border_color: z.string()
    .min(1, "Cor da borda é obrigatória")
    .regex(/^#[0-9A-Fa-f]{6}$/, "Cor inválida"),
});

type ComputerFormData = z.infer<typeof computerSchema>;

interface ComputerFormProps {
  editingComputer?: any;
  onClose: () => void;
}

export const ComputerForm = ({ editingComputer, onClose }: ComputerFormProps) => {
  const { addComputer, updateComputer } = useAdmin();
  const { toast } = useToast();
  const [mainImage, setMainImage] = useState(editingComputer?.main_image || "");
  const [secondaryImages, setSecondaryImages] = useState<string[]>(
    editingComputer?.secondary_images || []
  );
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<ComputerFormData>({
    resolver: zodResolver(computerSchema),
    defaultValues: {
      name: editingComputer?.name || "",
      price: editingComputer?.price || 0,
      gpu: editingComputer?.gpu || "",
      cpu: editingComputer?.cpu || "",
      ram: editingComputer?.ram || "",
      storage: editingComputer?.storage || "",
      motherboard: editingComputer?.motherboard || "",
      cooler: editingComputer?.cooler || "",
      watercooler: editingComputer?.watercooler || "",
      border_color: editingComputer?.border_color || "#3b82f6",
    },
  });

  const onSubmit = async (data: ComputerFormData) => {
    // Rate limiting check
    const rateLimitKey = `computer-form-${Date.now()}`;
    if (!formRateLimiter.isAllowed(rateLimitKey)) {
      toast({
        title: "Muitas tentativas",
        description: "Aguarde um momento antes de tentar novamente.",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      
      const computerData = {
        name: data.name,
        price: data.price,
        gpu: data.gpu,
        cpu: data.cpu,
        ram: data.ram,
        storage: data.storage,
        motherboard: data.motherboard,
        cooler: data.cooler,
        watercooler: data.watercooler,
        main_image: mainImage,
        secondary_images: secondaryImages,
        is_sold: editingComputer?.is_sold || false,
        border_color: data.border_color,
      };

      if (editingComputer) {
        await updateComputer(editingComputer.id, computerData);
      } else {
        await addComputer(computerData);
      }
      
      onClose();
    } catch (error) {
      console.error('Error saving computer:', error);
    } finally {
      setLoading(false);
    }
  };

  const addSecondaryImage = (url: string) => {
    setSecondaryImages([...secondaryImages, url]);
  };

  const removeSecondaryImage = (index: number) => {
    setSecondaryImages(secondaryImages.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Nome */}
        <div className="space-y-2">
          <Label htmlFor="name" className="text-white">Nome do Computador *</Label>
          <Input
            id="name"
            {...register("name")}
            className="bg-gray-700 border-gray-600 text-white"
            placeholder="Ex: PC Gamer RTX 4060"
          />
          {errors.name && (
            <p className="text-red-400 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Preço */}
        <div className="space-y-2">
          <Label htmlFor="price" className="text-white">Preço (R$) *</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            {...register("price", { valueAsNumber: true })}
            className="bg-gray-700 border-gray-600 text-white"
            placeholder="Ex: 2500.00"
          />
          {errors.price && (
            <p className="text-red-400 text-sm">{errors.price.message}</p>
          )}
        </div>
      </div>

      {/* Cor da Borda */}
      <div className="space-y-3">
        <Label className="text-white">Cor da Borda do Card *</Label>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
          {[
            { name: "Azul", color: "#3b82f6" },
            { name: "Roxo", color: "#8b5cf6" },
            { name: "Rosa", color: "#ec4899" },
            { name: "Verde", color: "#10b981" },
            { name: "Amarelo", color: "#f59e0b" },
            { name: "Vermelho", color: "#ef4444" },
            { name: "Ciano", color: "#06b6d4" },
            { name: "Laranja", color: "#f97316" },
          ].map((colorOption) => (
            <button
              key={colorOption.color}
              type="button"
              onClick={() => setValue("border_color", colorOption.color)}
              className={`relative w-full h-12 rounded-lg border-2 transition-all hover:scale-105 ${
                watch("border_color") === colorOption.color
                  ? "border-white shadow-lg"
                  : "border-gray-600 hover:border-gray-400"
              }`}
              style={{ backgroundColor: colorOption.color }}
              title={colorOption.name}
            >
              {watch("border_color") === colorOption.color && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-4 h-4 bg-white rounded-full" />
                </div>
              )}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Label htmlFor="custom_color" className="text-gray-300">Cor personalizada:</Label>
          <Input
            id="custom_color"
            type="color"
            {...register("border_color")}
            className="w-16 h-10 bg-gray-700 border-gray-600 cursor-pointer"
          />
          <span className="text-gray-400 text-sm">{watch("border_color")}</span>
        </div>
        {errors.border_color && (
          <p className="text-red-400 text-sm">{errors.border_color.message}</p>
        )}
      </div>

      {/* Imagem Principal */}
      <div className="space-y-2">
        <Label className="text-white">Imagem Principal</Label>
        <ImageUploadButton
          onImageUploaded={setMainImage}
          currentImage={mainImage}
          className="bg-purple-600 hover:bg-purple-700"
        />
      </div>

      {/* Imagens Secundárias */}
      <div className="space-y-2">
        <Label className="text-white">Imagens Secundárias (Carrossel)</Label>
        <div className="space-y-3">
          {secondaryImages.map((image, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-gray-700 rounded">
              <img src={image} alt={`Secondary ${index + 1}`} className="w-16 h-16 object-cover rounded" />
              <span className="text-gray-300 flex-1 truncate">{image}</span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeSecondaryImage(index)}
                className="text-red-400 hover:text-red-300"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
          <ImageUploadButton
            onImageUploaded={addSecondaryImage}
            className="bg-gray-600 hover:bg-gray-500"
          />
        </div>
      </div>

      {/* Especificações */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Especificações (Opcionais)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="gpu" className="text-white">Placa de Vídeo</Label>
            <Input
              id="gpu"
              {...register("gpu")}
              className="bg-gray-700 border-gray-600 text-white"
              placeholder="Ex: RTX 4060 8GB"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cpu" className="text-white">Processador</Label>
            <Input
              id="cpu"
              {...register("cpu")}
              className="bg-gray-700 border-gray-600 text-white"
              placeholder="Ex: Intel i5-12400F"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ram" className="text-white">Memória RAM</Label>
            <Input
              id="ram"
              {...register("ram")}
              className="bg-gray-700 border-gray-600 text-white"
              placeholder="Ex: 16GB DDR4"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="storage" className="text-white">Armazenamento</Label>
            <Input
              id="storage"
              {...register("storage")}
              className="bg-gray-700 border-gray-600 text-white"
              placeholder="Ex: SSD 512GB"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="motherboard" className="text-white">Placa Mãe</Label>
            <Input
              id="motherboard"
              {...register("motherboard")}
              className="bg-gray-700 border-gray-600 text-white"
              placeholder="Ex: ASUS B450M"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cooler" className="text-white">Cooler</Label>
            <Input
              id="cooler"
              {...register("cooler")}
              className="bg-gray-700 border-gray-600 text-white"
              placeholder="Ex: Cooler Master"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="watercooler" className="text-white">Watercooler</Label>
            <Input
              id="watercooler"
              {...register("watercooler")}
              className="bg-gray-700 border-gray-600 text-white"
              placeholder="Ex: Corsair H100i"
            />
          </div>
        </div>
      </div>

      {/* Botões */}
      <div className="flex gap-3 pt-6">
        <Button
          type="submit"
          disabled={loading}
          className="bg-purple-600 hover:bg-purple-700 flex-1"
        >
          {loading ? "Salvando..." : editingComputer ? "Atualizar" : "Adicionar"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          className="border-gray-600 text-gray-300 hover:bg-gray-700"
        >
          Cancelar
        </Button>
      </div>
    </form>
  );
};