import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, X, Gamepad2, Headphones, Keyboard, Monitor, Cpu } from "lucide-react";
import { useProducts } from "@/contexts/ProductsContext";
import { useToast } from "@/hooks/use-toast";

interface PerifericosFormProps {
  editingProduct?: any;
  onSubmit?: (data: any) => void;
  onCancel?: () => void;
}

export const AdminPerifericosForm = ({ editingProduct, onSubmit, onCancel }: PerifericosFormProps) => {
  const { addPeriferico, updatePeriferico } = useProducts();
  const { toast } = useToast();
  
  const [specs, setSpecs] = useState<string[]>([editingProduct?.specs?.[0] || ""]);
  const [mainImage, setMainImage] = useState<string>(editingProduct?.image || "/placeholder.svg");
  const [secondaryImages, setSecondaryImages] = useState<string[]>(editingProduct?.secondaryImages || []);
  const [formData, setFormData] = useState({
    name: editingProduct?.name || "",
    price: editingProduct?.price || 0,
    description: editingProduct?.description || "",
    highlight: editingProduct?.highlight || false,
    highlight_text: editingProduct?.highlight_text || "",
  });
  const [currentCategory, setCurrentCategory] = useState("combos");

  const addSpec = () => {
    setSpecs([...specs, ""]);
  };

  const removeSpec = (index: number) => {
    setSpecs(specs.filter((_, i) => i !== index));
  };

  const updateSpec = (index: number, value: string) => {
    const newSpecs = [...specs];
    newSpecs[index] = value;
    setSpecs(newSpecs);
  };

  const addSecondaryImage = () => {
    setSecondaryImages([...secondaryImages, ""]);
  };

  const removeSecondaryImage = (index: number) => {
    setSecondaryImages(secondaryImages.filter((_, i) => i !== index));
  };

  const updateSecondaryImage = (index: number, value: string) => {
    const newImages = [...secondaryImages];
    newImages[index] = value;
    setSecondaryImages(newImages);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      price: 0,
      description: "",
      highlight: false,
      highlight_text: "",
    });
    setSpecs([""]);
    setMainImage("/placeholder.svg");
    setSecondaryImages([]);
  };

  const getCategoryFromTab = (tab: string) => {
    const categoryMap: { [key: string]: string } = {
      combos: "Combos",
      audio: "Áudio",
      controles: "Controles",
      video: "Vídeo",
      setup: "Setup"
    };
    return categoryMap[tab] || "Combos";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.price) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    const data = {
      ...formData,
      category: getCategoryFromTab(currentCategory),
      image: mainImage,
      secondaryImages,
      specs: specs.filter(Boolean),
    };
    
    if (onSubmit) {
      onSubmit(data);
    } else if (editingProduct) {
      updatePeriferico(editingProduct.id, data);
      toast({
        title: "Sucesso!",
        description: "Periférico atualizado com sucesso!",
      });
    } else {
      addPeriferico(data);
      toast({
        title: "Sucesso!",
        description: "Periférico adicionado com sucesso!",
      });
      resetForm();
    }
  };

  const renderForm = (category: string) => (
    <Card className="bg-gray-800/50 border-gray-600 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-pink-400 flex items-center">
          <Gamepad2 className="w-5 h-5 mr-2" />
          {editingProduct ? "Editar" : "Adicionar"} {category}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informações Básicas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-gray-300">Nome do Produto *</Label>
                <Input
                  id="name"
                  placeholder="Ex: Headset Gamer RGB Pro"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
                  required
                />
              </div>

              <div>
                <Label htmlFor="price" className="text-gray-300">Preço (R$) *</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="Ex: 299.99"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value) || 0})}
                  className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
                  required
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="highlight"
                  checked={formData.highlight}
                  onChange={(e) => setFormData({...formData, highlight: e.target.checked})}
                  className="rounded border-gray-600 bg-gray-800"
                />
                <Label htmlFor="highlight" className="text-gray-300">Destacar produto</Label>
              </div>

              {formData.highlight && (
                <div>
                  <Label htmlFor="highlight_text" className="text-gray-300">Destacar como:</Label>
                  <Input
                    id="highlight_text"
                    placeholder="Ex: Mais Vendido, Recomendado, etc."
                    value={formData.highlight_text}
                    onChange={(e) => setFormData({...formData, highlight_text: e.target.value})}
                    className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
                  />
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="description" className="text-gray-300">Descrição</Label>
                <Textarea
                  id="description"
                  placeholder="Descrição detalhada do produto..."
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 min-h-[120px]"
                />
              </div>
            </div>
          </div>

          {/* Especificações */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Especificações</h3>
              <Button
                type="button"
                onClick={addSpec}
                variant="outline"
                size="sm"
                className="border-pink-500 text-pink-400 hover:bg-pink-500/20 bg-transparent"
              >
                <Plus className="w-4 h-4 mr-1" />
                Adicionar
              </Button>
            </div>
            
            {specs.map((spec, index) => (
              <div key={index} className="flex space-x-2">
                <div className="w-8 h-8 bg-pink-500/20 rounded flex items-center justify-center">
                  <div className="w-2 h-2 bg-pink-400 rounded-full" />
                </div>
                <Input
                  placeholder={`Especificação ${index + 1}`}
                  value={spec}
                  onChange={(e) => updateSpec(index, e.target.value)}
                  className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
                />
                {specs.length > 1 && (
                  <Button
                    type="button"
                    onClick={() => removeSpec(index)}
                    variant="outline"
                    size="sm"
                    className="border-red-500 text-red-400 hover:bg-red-500/20 bg-transparent"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>

          {/* Botões de Ação */}
          <div className="flex space-x-4 pt-6">
            <Button
              type="submit"
              className="bg-gradient-to-r from-pink-500 to-orange-600 hover:from-pink-400 hover:to-orange-500"
            >
              {editingProduct ? "Atualizar Produto" : "Salvar Produto"}
            </Button>
            <Button
              type="button"
              onClick={onCancel || resetForm}
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
            >
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );

  return (
    <Tabs defaultValue="combos" className="w-full" onValueChange={setCurrentCategory}>
      <TabsList className="grid w-full grid-cols-5 bg-gray-800/50 border border-gray-600 mb-6">
        <TabsTrigger value="combos" className="data-[state=active]:bg-pink-400 data-[state=active]:text-black">
          <Gamepad2 className="w-4 h-4 mr-1" />
          Combos
        </TabsTrigger>
        <TabsTrigger value="audio" className="data-[state=active]:bg-pink-400 data-[state=active]:text-black">
          <Headphones className="w-4 h-4 mr-1" />
          Áudio
        </TabsTrigger>
        <TabsTrigger value="controles" className="data-[state=active]:bg-pink-400 data-[state=active]:text-black">
          <Keyboard className="w-4 h-4 mr-1" />
          Controles
        </TabsTrigger>
        <TabsTrigger value="video" className="data-[state=active]:bg-pink-400 data-[state=active]:text-black">
          <Monitor className="w-4 h-4 mr-1" />
          Vídeo
        </TabsTrigger>
        <TabsTrigger value="setup" className="data-[state=active]:bg-pink-400 data-[state=active]:text-black">
          <Cpu className="w-4 h-4 mr-1" />
          Setup
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="combos">{renderForm("Combo")}</TabsContent>
      <TabsContent value="audio">{renderForm("Produto de Áudio")}</TabsContent>
      <TabsContent value="controles">{renderForm("Controle")}</TabsContent>
      <TabsContent value="video">{renderForm("Produto de Vídeo")}</TabsContent>
      <TabsContent value="setup">{renderForm("Produto de Setup")}</TabsContent>
    </Tabs>
  );
};
