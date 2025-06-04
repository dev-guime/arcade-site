import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, X, Cpu, HardDrive, Zap, Monitor, MemoryStick, Fan, Gamepad2 } from "lucide-react";
import { useProducts } from "@/contexts/ProductsContext";
import { useToast } from "@/hooks/use-toast";
import { ImageUploadButton } from "./ImageUploadButton";

const iconOptions = [
  { value: "cpu", label: "Processador", icon: Cpu },
  { value: "memory", label: "Memória RAM", icon: MemoryStick },
  { value: "storage", label: "Armazenamento", icon: HardDrive },
  { value: "gpu", label: "Placa de Vídeo", icon: Monitor },
  { value: "power", label: "Fonte", icon: Zap },
  { value: "cooling", label: "Refrigeração", icon: Fan },
  { value: "other", label: "Outros", icon: Gamepad2 },
];

interface PcFormProps {
  editingPc?: any;
  onSubmit?: (data: any) => void;
  onCancel?: () => void;
}

export const AdminPcForm = ({ editingPc, onSubmit, onCancel }: PcFormProps) => {
  const { addPc, updatePc } = useProducts();
  const { toast } = useToast();
  
  const [specs, setSpecs] = useState<Array<{value: string, icon: string}>>(() => {
    if (editingPc?.specs) {
      return editingPc.specs.map((spec: string, index: number) => ({
        value: spec,
        icon: editingPc.spec_icons?.[index] || "cpu"
      }));
    }
    return [{ value: "", icon: "cpu" }];
  });
  
  const [mainImage, setMainImage] = useState<string>(editingPc?.image || "");
  const [secondaryImages, setSecondaryImages] = useState<string[]>(editingPc?.secondary_images || []);
  const [formData, setFormData] = useState({
    name: editingPc?.name || "",
    price: editingPc?.price || "",
    category: editingPc?.category || "",
    description: editingPc?.description || "",
    highlight: editingPc?.highlight || false,
    highlight_text: editingPc?.highlight_text || "",
  });

  const addSpec = () => {
    setSpecs([...specs, { value: "", icon: "cpu" }]);
  };

  const removeSpec = (index: number) => {
    setSpecs(specs.filter((_, i) => i !== index));
  };

  const updateSpec = (index: number, field: string, value: string) => {
    const newSpecs = [...specs];
    newSpecs[index] = { ...newSpecs[index], [field]: value };
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
      category: "",
      description: "",
      highlight: false,
      highlight_text: "",
    });
    setSpecs([{ value: "", icon: "cpu" }]);
    setMainImage("");
    setSecondaryImages([]);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numericValue = value.replace(/[^0-9.]/g, '');
    setFormData({...formData, price: numericValue});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.price || !formData.category) {
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
        image: mainImage,
        secondary_images: secondaryImages.filter(Boolean),
        specs: specs.map(spec => spec.value).filter(Boolean),
        spec_icons: specs.map(spec => spec.icon),
      };
      
      if (onSubmit) {
        onSubmit(data);
      } else if (editingPc) {
        await updatePc(editingPc.id, data);
        toast({
          title: "Sucesso!",
          description: "PC atualizado com sucesso!",
        });
      } else {
        await addPc(data);
        toast({
          title: "Sucesso!",
          description: "PC adicionado com sucesso!",
        });
        resetForm();
      }
    } catch (error) {
      // Error handling is done in the context
    }
  };

  const getIconComponent = (iconType: string) => {
    const iconOption = iconOptions.find(opt => opt.value === iconType);
    return iconOption ? iconOption.icon : Cpu;
  };

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-cyan-400 flex items-center">
          <Cpu className="w-5 h-5 mr-2" />
          {editingPc ? "Editar PC" : "Adicionar Novo PC"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informações Básicas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-gray-300">Nome do PC *</Label>
                <Input
                  id="name"
                  placeholder="Ex: PC Gamer RGB Pro"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                  required
                />
              </div>

              <div>
                <Label htmlFor="price" className="text-gray-300">Preço (R$) *</Label>
                <Input
                  id="price"
                  type="text"
                  placeholder="Ex: 2499.99"
                  value={formData.price}
                  onChange={handlePriceChange}
                  className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                  required
                />
              </div>

              <div>
                <Label htmlFor="category" className="text-gray-300">Categoria *</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="Selecione a linha" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600">
                    <SelectItem value="Linha Essencial">Linha Essencial</SelectItem>
                    <SelectItem value="Linha Performance">Linha Performance</SelectItem>
                    <SelectItem value="Linha Avançada">Linha Avançada</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="highlight"
                  checked={formData.highlight}
                  onChange={(e) => setFormData({...formData, highlight: e.target.checked})}
                  className="rounded border-gray-600 bg-gray-700"
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
                    className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                  />
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="description" className="text-gray-300">Descrição</Label>
                <Textarea
                  id="description"
                  placeholder="Descrição detalhada do PC..."
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 min-h-[120px]"
                />
              </div>
            </div>
          </div>

          {/* Upload de Imagens */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Imagens do Produto</h3>
            
            {/* Imagem Principal */}
            <div className="space-y-2">
              <Label className="text-gray-300">Imagem Principal *</Label>
              <div className="flex space-x-2">
                <Input
                  placeholder="URL da imagem principal ou faça upload"
                  value={mainImage}
                  onChange={(e) => setMainImage(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                />
                <ImageUploadButton
                  onImageUploaded={setMainImage}
                  className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/20 bg-transparent"
                />
              </div>
              {mainImage && (
                <div className="mt-2">
                  <img src={mainImage} alt="Preview" className="w-24 h-24 object-cover rounded border border-gray-600" />
                </div>
              )}
            </div>

            {/* Imagens Secundárias */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-gray-300">Imagens Secundárias (Carrossel)</Label>
                <Button
                  type="button"
                  onClick={addSecondaryImage}
                  variant="outline"
                  size="sm"
                  className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/20 bg-transparent"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Adicionar
                </Button>
              </div>
              
              {secondaryImages.map((image, index) => (
                <div key={index} className="flex space-x-2">
                  <Input
                    placeholder={`URL da imagem ${index + 1} ou faça upload`}
                    value={image}
                    onChange={(e) => updateSecondaryImage(index, e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                  />
                  <ImageUploadButton
                    onImageUploaded={(url) => updateSecondaryImage(index, url)}
                    className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/20 bg-transparent"
                  />
                  <Button
                    type="button"
                    onClick={() => removeSecondaryImage(index)}
                    variant="outline"
                    className="border-red-500 text-red-400 hover:bg-red-500/20 bg-transparent"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
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
                className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/20 bg-transparent"
              >
                <Plus className="w-4 h-4 mr-1" />
                Adicionar
              </Button>
            </div>
            
            {specs.map((spec, index) => (
              <div key={index} className="flex space-x-2 items-center">
                <div className="w-8 h-8 bg-cyan-500/20 rounded flex items-center justify-center">
                  {(() => {
                    const IconComponent = getIconComponent(spec.icon);
                    return <IconComponent className="w-4 h-4 text-cyan-400" />;
                  })()}
                </div>
                <Select value={spec.icon} onValueChange={(value) => updateSpec(index, 'icon', value)}>
                  <SelectTrigger className="w-48 bg-gray-700 border-gray-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600">
                    {iconOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value} className="text-white">
                        <div className="flex items-center space-x-2">
                          <option.icon className="w-4 h-4" />
                          <span>{option.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  placeholder={`Especificação ${index + 1}`}
                  value={spec.value}
                  onChange={(e) => updateSpec(index, 'value', e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
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
              className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500"
            >
              {editingPc ? "Atualizar PC" : "Salvar PC"}
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
};
