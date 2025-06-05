
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useProducts } from "@/contexts/ProductsContext";
import { ImageUploadButton } from "./ImageUploadButton";

interface AddExampleFormProps {
  onBack: () => void;
  onSubmit: () => void;
}

export const AddExampleForm = ({ onBack, onSubmit }: AddExampleFormProps) => {
  const { toast } = useToast();
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

  const handleSpecChange = (index: number, value: string) => {
    const newSpecs = [...specs];
    newSpecs[index] = value;
    setSpecs(newSpecs);
  };

  const addSpec = () => {
    setSpecs([...specs, ""]);
  };

  const removeSpec = (index: number) => {
    const newSpecs = specs.filter((_, i) => i !== index);
    setSpecs(newSpecs.length > 0 ? newSpecs : [""]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.customer || !formData.delivery_date || !formData.location) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const filteredSpecs = specs.filter(spec => spec.trim() !== "");
      
      await addDeliveredPc({
        name: formData.name,
        customer: formData.customer,
        delivery_date: formData.delivery_date,
        location: formData.location,
        specs: filteredSpecs,
        image: formData.image || undefined,
      });
      
      onSubmit();
    } catch (error) {
      console.error('Error adding example:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-3 lg:p-6">
      <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
        <CardHeader>
          <div className="flex items-center gap-2 lg:gap-3">
            <Button
              onClick={onBack}
              variant="ghost"
              className="text-slate-400 hover:text-slate-300 hover:bg-slate-700/50 p-2"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <CardTitle className="text-green-400 text-lg lg:text-xl">
              Adicionar Novo Exemplo de PC Entregue
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-3 lg:p-6">
          <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-slate-300 text-sm lg:text-base">Nome do PC *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Ex: PC Gamer RTX 4060"
                  className="bg-slate-700/50 border-slate-600 text-white text-sm lg:text-base"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="customer" className="text-slate-300 text-sm lg:text-base">Cliente *</Label>
                <Input
                  id="customer"
                  value={formData.customer}
                  onChange={(e) => setFormData({...formData, customer: e.target.value})}
                  placeholder="Ex: João Silva"
                  className="bg-slate-700/50 border-slate-600 text-white text-sm lg:text-base"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="delivery_date" className="text-slate-300 text-sm lg:text-base">Data de Entrega *</Label>
                <Input
                  id="delivery_date"
                  type="date"
                  value={formData.delivery_date}
                  onChange={(e) => setFormData({...formData, delivery_date: e.target.value})}
                  className="bg-slate-700/50 border-slate-600 text-white text-sm lg:text-base"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className="text-slate-300 text-sm lg:text-base">Local *</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  placeholder="Ex: Londrina-PR"
                  className="bg-slate-700/50 border-slate-600 text-white text-sm lg:text-base"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-slate-300 text-sm lg:text-base">Imagem do PC</Label>
              <ImageUploadButton
                onImageUploaded={(url) => setFormData({...formData, image: url})}
                currentImage={formData.image}
                className="bg-slate-700/50 border-slate-600 text-white hover:bg-slate-600/50 text-sm lg:text-base"
              />
            </div>

            <div className="space-y-3 lg:space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-slate-300 text-sm lg:text-base">Especificações</Label>
                <Button
                  type="button"
                  onClick={addSpec}
                  variant="outline"
                  size="sm"
                  className="border-green-500/50 text-green-400 hover:bg-green-500/20 text-xs lg:text-sm"
                >
                  <Plus className="w-3 h-3 lg:w-4 lg:h-4 mr-1" />
                  Adicionar
                </Button>
              </div>
              
              {specs.map((spec, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={spec}
                    onChange={(e) => handleSpecChange(index, e.target.value)}
                    placeholder={`Especificação ${index + 1}`}
                    className="bg-slate-700/50 border-slate-600 text-white flex-1 text-sm lg:text-base"
                  />
                  {specs.length > 1 && (
                    <Button
                      type="button"
                      onClick={() => removeSpec(index)}
                      variant="outline"
                      size="sm"
                      className="border-red-500/50 text-red-400 hover:bg-red-500/20 px-2 lg:px-3 text-xs lg:text-sm"
                    >
                      <Trash2 className="w-3 h-3 lg:w-4 lg:h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>

            <div className="flex flex-col lg:flex-row justify-end space-y-3 lg:space-y-0 lg:space-x-4 pt-4 lg:pt-6">
              <Button
                type="button"
                onClick={onBack}
                variant="outline"
                className="border-slate-500 text-slate-300 hover:bg-slate-700 text-sm lg:text-base py-2 lg:py-3"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white text-sm lg:text-base py-2 lg:py-3"
              >
                {isSubmitting ? "Salvando..." : "Salvar Exemplo"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
