
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, X, Gamepad2 } from "lucide-react";
import { useProducts } from "@/contexts/ProductsContext";
import { useToast } from "@/hooks/use-toast";
import { ImageUploadButton } from "./ImageUploadButton";

interface PerifericosFormProps {
  editingProduct?: any;
  onSubmit?: (data: any) => void;
  onCancel?: () => void;
}

export const AdminPerifericosForm = ({ editingProduct, onSubmit, onCancel }: PerifericosFormProps) => {
  const { addPeriferico, updatePeriferico } = useProducts();
  const { toast } = useToast();
  
  const [specs, setSpecs] = useState<string[]>([editingProduct?.specs?.[0] || ""]);
  const [mainImage, setMainImage] = useState<string>(editingProduct?.image || "");
  const [secondaryImages, setSecondaryImages] = useState<string[]>(editingProduct?.secondary_images || []);
  const [formData, setFormData] = useState({
    name: editingProduct?.name || "",
    price: editingProduct?.price || "",
    description: editingProduct?.description || "",
    highlight: editingProduct?.highlight || false,
    highlight_text: editingProduct?.highlight_text || "",
  });
  const [currentCategory, setCurrentCategory] = useState("combos");

  const categories = [
    { id: "combos", name: "Combos", icon: Gamepad2, color: "from-purple-500 to-pink-500" },
    { id: "audio", name: "Áudio", icon: Gamepad2, color: "from-blue-500 to-cyan-500" },
    { id: "controles", name: "Controles", icon: Gamepad2, color: "from-green-500 to-emerald-500" },
    { id: "video", name: "Vídeo", icon: Gamepad2, color: "from-orange-500 to-red-500" },
    { id: "setup", name: "Setup", icon: Gamepad2, color: "from-indigo-500 to-purple-500" },
  ];

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
      price: "",
      description: "",
      highlight: false,
      highlight_text: "",
    });
    setSpecs([""]);
    setMainImage("");
    setSecondaryImages([]);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numericValue = value.replace(/[^0-9.]/g, '');
    setFormData({...formData, price: numericValue});
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.price) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    try {
      const data = {
        ...formData,
        price: parseFloat(formData.price),
        category: getCategoryFromTab(currentCategory),
        image: mainImage,
        secondary_images: secondaryImages.filter(Boolean),
        specs: specs.filter(Boolean),
      };
      
      if (onSubmit) {
        onSubmit(data);
      } else if (editingProduct) {
        await updatePeriferico(editingProduct.id, data);
      } else {
        await addPeriferico(data);
        resetForm();
      }
    } catch (error) {
      // Error handling is done in the context
    }
  };

  return (
    <div className="p-3 lg:p-6 space-y-4 lg:space-y-6">
      {/* Seletor de Categoria */}
      <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
        <CardHeader>
          <CardTitle className="text-purple-400 flex items-center gap-2 text-lg lg:text-xl">
            <Gamepad2 className="w-4 h-4 lg:w-5 lg:h-5" />
            Selecione o Tipo de Periférico
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3 lg:p-6">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-2 lg:gap-4">
            {categories.map((category) => (
              <Button
                key={category.id}
                type="button"
                onClick={() => setCurrentCategory(category.id)}
                className={`h-12 lg:h-16 flex flex-col items-center justify-center space-y-1 transition-all duration-200 text-xs lg:text-sm ${
                  currentCategory === category.id
                    ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                    : 'bg-slate-700/50 border border-slate-600/50 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <category.icon className="w-4 h-4 lg:w-5 lg:h-5" />
                <span className="font-medium">{category.name}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Formulário */}
      <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
        <CardHeader>
          <CardTitle className="text-purple-400 flex items-center text-lg lg:text-xl">
            <Gamepad2 className="w-4 h-4 lg:w-5 lg:h-5 mr-2" />
            {editingProduct ? "Editar" : "Adicionar"} {getCategoryFromTab(currentCategory)}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3 lg:p-6">
          <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-6">
            {/* Informações Básicas */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              <div className="space-y-3 lg:space-y-4">
                <div>
                  <Label htmlFor="name" className="text-slate-300 text-sm lg:text-base">Nome do Produto *</Label>
                  <Input
                    id="name"
                    placeholder="Ex: Headset Gamer RGB Pro"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 text-sm lg:text-base"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="price" className="text-slate-300 text-sm lg:text-base">Preço (R$) *</Label>
                  <Input
                    id="price"
                    type="text"
                    placeholder="Ex: 299.99"
                    value={formData.price}
                    onChange={handlePriceChange}
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 text-sm lg:text-base"
                    required
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="highlight"
                    checked={formData.highlight}
                    onChange={(e) => setFormData({...formData, highlight: e.target.checked})}
                    className="rounded border-slate-600 bg-slate-700"
                  />
                  <Label htmlFor="highlight" className="text-slate-300 text-sm lg:text-base">Destacar produto</Label>
                </div>

                {formData.highlight && (
                  <div>
                    <Label htmlFor="highlight_text" className="text-slate-300 text-sm lg:text-base">Destacar como:</Label>
                    <Input
                      id="highlight_text"
                      placeholder="Ex: Mais Vendido, Recomendado, etc."
                      value={formData.highlight_text}
                      onChange={(e) => setFormData({...formData, highlight_text: e.target.value})}
                      className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 text-sm lg:text-base"
                    />
                  </div>
                )}
              </div>

              <div className="space-y-3 lg:space-y-4">
                <div>
                  <Label htmlFor="description" className="text-slate-300 text-sm lg:text-base">Descrição</Label>
                  <Textarea
                    id="description"
                    placeholder="Descrição detalhada do produto..."
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 text-sm lg:text-base min-h-20 lg:min-h-[120px]"
                  />
                </div>
              </div>
            </div>

            {/* Upload de Imagens */}
            <div className="space-y-3 lg:space-y-4">
              <h3 className="text-base lg:text-lg font-semibold text-white">Imagens do Produto</h3>
              
              {/* Imagem Principal */}
              <div className="space-y-2">
                <Label className="text-slate-300 text-sm lg:text-base">Imagem Principal *</Label>
                <div className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-2">
                  <Input
                    placeholder="URL da imagem principal ou faça upload"
                    value={mainImage}
                    onChange={(e) => setMainImage(e.target.value)}
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 text-sm lg:text-base"
                  />
                  <ImageUploadButton
                    onImageUploaded={setMainImage}
                    className="border-purple-500/50 text-purple-400 hover:bg-purple-500/20 bg-transparent text-sm lg:text-base py-2"
                  />
                </div>
                {mainImage && (
                  <div className="mt-2">
                    <img src={mainImage} alt="Preview" className="w-20 h-20 lg:w-24 lg:h-24 object-cover rounded border border-slate-600" />
                  </div>
                )}
              </div>

              {/* Imagens Secundárias */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-slate-300 text-sm lg:text-base">Imagens Secundárias (Carrossel)</Label>
                  <Button
                    type="button"
                    onClick={addSecondaryImage}
                    variant="outline"
                    size="sm"
                    className="border-purple-500/50 text-purple-400 hover:bg-purple-500/20 bg-transparent text-xs lg:text-sm"
                  >
                    <Plus className="w-3 h-3 lg:w-4 lg:h-4 mr-1" />
                    Adicionar
                  </Button>
                </div>
                
                {secondaryImages.map((image, index) => (
                  <div key={index} className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-2">
                    <Input
                      placeholder={`URL da imagem ${index + 1} ou faça upload`}
                      value={image}
                      onChange={(e) => updateSecondaryImage(index, e.target.value)}
                      className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 text-sm lg:text-base"
                    />
                    <div className="flex space-x-2">
                      <ImageUploadButton
                        onImageUploaded={(url) => updateSecondaryImage(index, url)}
                        className="border-purple-500/50 text-purple-400 hover:bg-purple-500/20 bg-transparent text-xs lg:text-sm"
                      />
                      <Button
                        type="button"
                        onClick={() => removeSecondaryImage(index)}
                        variant="outline"
                        className="border-red-500/50 text-red-400 hover:bg-red-500/20 bg-transparent text-xs lg:text-sm px-2 lg:px-3"
                      >
                        <X className="w-3 h-3 lg:w-4 lg:h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Especificações */}
            <div className="space-y-3 lg:space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base lg:text-lg font-semibold text-white">Especificações</h3>
                <Button
                  type="button"
                  onClick={addSpec}
                  variant="outline"
                  size="sm"
                  className="border-purple-500/50 text-purple-400 hover:bg-purple-500/20 bg-transparent text-xs lg:text-sm"
                >
                  <Plus className="w-3 h-3 lg:w-4 lg:h-4 mr-1" />
                  Adicionar
                </Button>
              </div>
              
              {specs.map((spec, index) => (
                <div key={index} className="flex space-x-2">
                  <div className="w-6 h-6 lg:w-8 lg:h-8 bg-purple-500/20 rounded flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-purple-400 rounded-full" />
                  </div>
                  <Input
                    placeholder={`Especificação ${index + 1}`}
                    value={spec}
                    onChange={(e) => updateSpec(index, e.target.value)}
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 text-sm lg:text-base"
                  />
                  {specs.length > 1 && (
                    <Button
                      type="button"
                      onClick={() => removeSpec(index)}
                      variant="outline"
                      size="sm"
                      className="border-red-500/50 text-red-400 hover:bg-red-500/20 bg-transparent flex-shrink-0 text-xs lg:text-sm px-2 lg:px-3"
                    >
                      <X className="w-3 h-3 lg:w-4 lg:h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>

            {/* Botões de Ação */}
            <div className="flex flex-col lg:flex-row space-y-3 lg:space-y-0 lg:space-x-4 pt-4 lg:pt-6">
              <Button
                type="submit"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-sm lg:text-base py-2 lg:py-3"
              >
                {editingProduct ? "Atualizar Produto" : "Salvar Produto"}
              </Button>
              <Button
                type="button"
                onClick={onCancel || resetForm}
                variant="outline"
                className="border-slate-600 text-slate-300 hover:bg-slate-800 bg-transparent text-sm lg:text-base py-2 lg:py-3"
              >
                Cancelar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
