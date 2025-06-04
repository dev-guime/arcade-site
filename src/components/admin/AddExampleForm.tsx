
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Plus, X } from "lucide-react";
import { ImageUploadButton } from "./ImageUploadButton";
import { useProducts } from "@/contexts/ProductsContext";

interface AddExampleFormProps {
  onBack: () => void;
  onSubmit: () => void;
}

export const AddExampleForm = ({ onBack, onSubmit }: AddExampleFormProps) => {
  const { addDeliveredPc } = useProducts();
  const [formData, setFormData] = useState({
    name: "",
    customer: "",
    delivery_date: "",
    location: "",
    image: "",
  });
  const [specs, setSpecs] = useState<string[]>([""]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSpecChange = (index: number, value: string) => {
    const newSpecs = [...specs];
    newSpecs[index] = value;
    setSpecs(newSpecs);
  };

  const addSpec = () => {
    setSpecs([...specs, ""]);
  };

  const removeSpec = (index: number) => {
    if (specs.length > 1) {
      setSpecs(specs.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.customer || !formData.delivery_date || !formData.location) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const validSpecs = specs.filter(spec => spec.trim() !== "");
      
      await addDeliveredPc({
        name: formData.name,
        customer: formData.customer,
        delivery_date: formData.delivery_date,
        location: formData.location,
        specs: validSpecs,
        image: formData.image,
      });
      
      onSubmit();
    } catch (error) {
      console.error('Error adding delivered PC:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-3 md:p-6">
      <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
        <CardHeader>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={onBack}
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <CardTitle className="text-green-400">Adicionar Novo Exemplo</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" className="text-slate-300 text-sm">
                  Nome do PC *
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400"
                  placeholder="Ex: PC Gamer RTX 4060"
                  required
                />
              </div>

              <div>
                <Label htmlFor="customer" className="text-slate-300 text-sm">
                  Nome do Cliente *
                </Label>
                <Input
                  id="customer"
                  value={formData.customer}
                  onChange={(e) => handleInputChange("customer", e.target.value)}
                  className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400"
                  placeholder="Ex: João Silva"
                  required
                />
              </div>

              <div>
                <Label htmlFor="delivery_date" className="text-slate-300 text-sm">
                  Data de Entrega *
                </Label>
                <Input
                  id="delivery_date"
                  type="date"
                  value={formData.delivery_date}
                  onChange={(e) => handleInputChange("delivery_date", e.target.value)}
                  className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400"
                  required
                />
              </div>

              <div>
                <Label htmlFor="location" className="text-slate-300 text-sm">
                  Localização *
                </Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400"
                  placeholder="Ex: Londrina-PR"
                  required
                />
              </div>
            </div>

            <div>
              <Label className="text-slate-300 text-sm">Imagem do PC</Label>
              <ImageUploadButton
                onImageUploaded={(url) => handleInputChange("image", url)}
                currentImage={formData.image}
                className="mt-2"
              />
            </div>

            <div>
              <Label className="text-slate-300 text-sm mb-2 block">Especificações</Label>
              <div className="space-y-2">
                {specs.map((spec, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={spec}
                      onChange={(e) => handleSpecChange(index, e.target.value)}
                      className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400"
                      placeholder={`Especificação ${index + 1}`}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeSpec(index)}
                      disabled={specs.length === 1}
                      className="border-red-500/50 text-red-400 hover:bg-red-500/20 hover:border-red-400 bg-transparent"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addSpec}
                  className="border-green-500/50 text-green-400 hover:bg-green-500/20 hover:border-green-400 bg-transparent"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Especificação
                </Button>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onBack}
                className="border-slate-600 text-slate-300 hover:bg-slate-700 order-2 md:order-1"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg order-1 md:order-2"
              >
                {isSubmitting ? "Adicionando..." : "Adicionar Exemplo"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
