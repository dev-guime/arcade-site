import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageUploadButton } from "./ImageUploadButton";
import { useAdmin } from "@/contexts/AdminContext";
import { sanitizeInput, formRateLimiter } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { X, Plus } from "lucide-react";

const soldComputerSchema = z.object({
  name: z.string()
    .min(1, "Nome é obrigatório")
    .max(100, "Nome muito longo")
    .transform(val => sanitizeInput(val)),
  customer: z.string()
    .min(1, "Nome do cliente é obrigatório")
    .max(100, "Nome do cliente muito longo")
    .transform(val => sanitizeInput(val)),
  sold_date: z.string().min(1, "Data da venda é obrigatória"),
  location: z.string()
    .min(1, "Localização é obrigatória")
    .max(100, "Localização muito longa")
    .transform(val => sanitizeInput(val)),
  border_color: z.string()
    .min(1, "Cor da borda é obrigatória")
    .regex(/^#[0-9A-Fa-f]{6}$/, "Cor inválida"),
});

type SoldComputerFormData = z.infer<typeof soldComputerSchema>;

interface SoldComputerFormProps {
  editingSoldComputer?: any;
  onClose: () => void;
}

export const SoldComputerForm = ({ editingSoldComputer, onClose }: SoldComputerFormProps) => {
  const { addSoldComputer, updateSoldComputer } = useAdmin();
  const { toast } = useToast();
  const [image, setImage] = useState(editingSoldComputer?.image || "");
  const [specs, setSpecs] = useState<string[]>(editingSoldComputer?.specs || []);
  const [newSpec, setNewSpec] = useState("");
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<SoldComputerFormData>({
    resolver: zodResolver(soldComputerSchema),
    defaultValues: {
      name: editingSoldComputer?.name || "",
      customer: editingSoldComputer?.customer || "",
      sold_date: editingSoldComputer?.sold_date || "",
      location: editingSoldComputer?.location || "",
      border_color: editingSoldComputer?.border_color || "#3b82f6",
    },
  });

  const onSubmit = async (data: SoldComputerFormData) => {
    // Rate limiting check
    const rateLimitKey = `sold-computer-form-${Date.now()}`;
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
      
      // Sanitize specs as well
      const sanitizedSpecs = specs.map(spec => sanitizeInput(spec));
      
      const soldComputerData = {
        name: data.name,
        customer: data.customer,
        sold_date: data.sold_date,
        location: data.location,
        image,
        specs: sanitizedSpecs,
        border_color: data.border_color,
      };

      if (editingSoldComputer) {
        await updateSoldComputer(editingSoldComputer.id, soldComputerData);
        console.info('Sold computer updated:', { 
          id: editingSoldComputer.id, 
          timestamp: new Date().toISOString() 
        });
      } else {
        await addSoldComputer(soldComputerData);
        console.info('Sold computer added:', { 
          customer: data.customer, 
          timestamp: new Date().toISOString() 
        });
      }
      
      onClose();
    } catch (error) {
      console.error('Error saving sold computer:', error);
    } finally {
      setLoading(false);
    }
  };

  const addSpec = () => {
    const sanitizedSpec = sanitizeInput(newSpec.trim());
    if (sanitizedSpec && sanitizedSpec.length <= 100) {
      setSpecs([...specs, sanitizedSpec]);
      setNewSpec("");
    } else if (sanitizedSpec.length > 100) {
      toast({
        title: "Especificação muito longa",
        description: "Máximo de 100 caracteres por especificação.",
        variant: "destructive",
      });
    }
  };

  const removeSpec = (index: number) => {
    setSpecs(specs.filter((_, i) => i !== index));
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

        {/* Cliente */}
        <div className="space-y-2">
          <Label htmlFor="customer" className="text-white">Nome do Cliente *</Label>
          <Input
            id="customer"
            {...register("customer")}
            className="bg-gray-700 border-gray-600 text-white"
            placeholder="Ex: João Silva"
          />
          {errors.customer && (
            <p className="text-red-400 text-sm">{errors.customer.message}</p>
          )}
        </div>

        {/* Data da Venda */}
        <div className="space-y-2">
          <Label htmlFor="sold_date" className="text-white">Data da Venda *</Label>
          <Input
            id="sold_date"
            type="date"
            {...register("sold_date")}
            className="bg-gray-700 border-gray-600 text-white"
          />
          {errors.sold_date && (
            <p className="text-red-400 text-sm">{errors.sold_date.message}</p>
          )}
        </div>

        {/* Localização */}
        <div className="space-y-2">
          <Label htmlFor="location" className="text-white">Localização *</Label>
          <Input
            id="location"
            {...register("location")}
            className="bg-gray-700 border-gray-600 text-white"
            placeholder="Ex: São Paulo, SP"
          />
          {errors.location && (
            <p className="text-red-400 text-sm">{errors.location.message}</p>
          )}
        </div>
      </div>

      {/* Imagem */}
      <div className="space-y-2">
        <Label className="text-white">Imagem do Computador</Label>
        <ImageUploadButton
          onImageUploaded={setImage}
          currentImage={image}
          className="bg-purple-600 hover:bg-purple-700"
        />
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
          <Label htmlFor="custom_color_sold" className="text-gray-300">Cor personalizada:</Label>
          <Input
            id="custom_color_sold"
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

      {/* Especificações */}
      <div className="space-y-2">
        <Label className="text-white">Especificações</Label>
        <div className="space-y-3">
          {specs.map((spec, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-gray-700 rounded">
              <span className="text-gray-300 flex-1">{spec}</span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeSpec(index)}
                className="text-red-400 hover:text-red-300"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
          <div className="flex gap-2">
            <Input
              value={newSpec}
              onChange={(e) => setNewSpec(e.target.value)}
              placeholder="Ex: GPU: RTX 4060 8GB"
              className="bg-gray-700 border-gray-600 text-white flex-1"
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSpec())}
            />
            <Button
              type="button"
              onClick={addSpec}
              className="bg-gray-600 hover:bg-gray-500"
            >
              <Plus className="w-4 h-4" />
            </Button>
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
          {loading ? "Salvando..." : editingSoldComputer ? "Atualizar" : "Adicionar"}
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