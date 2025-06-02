
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
import { Plus, Upload, X, Cpu, HardDrive, Zap, Monitor, MemoryStick, Fan, Gamepad2 } from "lucide-react";
import { useProducts } from "@/contexts/ProductsContext";
import { useToast } from "@/hooks/use-toast";

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
        icon: index === 0 ? "cpu" : index === 1 ? "memory" : index === 2 ? "storage" : "other"
      }));
    }
    return [{ value: "", icon: "cpu" }];
  });
  
  const [mainImage, setMainImage] = useState<string>(editingPc?.image || "/lovable-uploads/f8260b15-2b51-400a-8d32-6242095a4419.png");
  const [secondaryImages, setSecondaryImages] = useState<string[]>(editingPc?.secondaryImages || []);
  const [formData, setFormData] = useState({
    name: editingPc?.name || "",
    price: editingPc?.price || "",
    category: editingPc?.category || "",
    description: editingPc?.description || "",
    highlight: editingPc?.highlight || false,
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
    });
    setSpecs([{ value: "", icon: "cpu" }]);
    setMainImage("/lovable-uploads/f8260b15-2b51-400a-8d32-6242095a4419.png");
    setSecondaryImages([]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.price || !formData.category) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    const data = {
      ...formData,
      image: mainImage,
      secondaryImages,
      specs: specs.map(spec => spec.value).filter(Boolean),
      specIcons: specs.map(spec => spec.icon),
    };
    
    if (onSubmit) {
      onSubmit(data);
    } else if (editingPc) {
      updatePc(editingPc.id, data);
      toast({
        title: "Sucesso!",
        description: "PC atualizado com sucesso!",
      });
    } else {
      addPc(data);
      toast({
        title: "Sucesso!",
        description: "PC adicionado com sucesso!",
      });
      resetForm();
    }
  };

  const getIconComponent = (iconType: string) => {
    const iconOption = iconOptions.find(opt => opt.value === iconType);
    return iconOption ? iconOption.icon : Cpu;
  };

  return (
    <Card className="bg-gray-900/50 border-gray-700">
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
                  className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
                  required
                />
              </div>

              <div>
                <Label htmlFor="price" className="text-gray-300">Preço *</Label>
                <Input
                  id="price"
                  placeholder="Ex: R$ 2.499"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
                  required
                />
              </div>

              <div>
                <Label htmlFor="category" className="text-gray-300">Categoria *</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                  <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
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
                  className="rounded border-gray-600 bg-gray-800"
                />
                <Label htmlFor="highlight" className="text-gray-300">Destacar como "Mais Vendido"</Label>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="description" className="text-gray-300">Descrição</Label>
                <Textarea
                  id="description"
                  placeholder="Descrição detalhada do PC..."
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
                  <SelectTrigger className="w-48 bg-gray-800 border-gray-600 text-white">
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
