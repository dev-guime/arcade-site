
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
import { Plus, Upload, X, Cpu, HardDrive, Zap, Monitor } from "lucide-react";

export const AdminPcForm = () => {
  const [specs, setSpecs] = useState<string[]>([""]);
  const [mainImage, setMainImage] = useState<string>("");
  const [secondaryImages, setSecondaryImages] = useState<string[]>([]);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui seria implementada a lógica para salvar o produto
    console.log("PC adicionado!");
  };

  return (
    <Card className="bg-gray-900/50 border-gray-700">
      <CardHeader>
        <CardTitle className="text-cyan-400 flex items-center">
          <Cpu className="w-5 h-5 mr-2" />
          Adicionar Novo PC
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informações Básicas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-gray-300">Nome do PC</Label>
                <Input
                  id="name"
                  placeholder="Ex: PC Gamer RGB Pro"
                  className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
                />
              </div>

              <div>
                <Label htmlFor="price" className="text-gray-300">Preço</Label>
                <Input
                  id="price"
                  placeholder="Ex: R$ 2.499"
                  className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
                />
              </div>

              <div>
                <Label htmlFor="category" className="text-gray-300">Categoria</Label>
                <Select>
                  <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                    <SelectValue placeholder="Selecione a linha" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600">
                    <SelectItem value="essencial">Linha Essencial</SelectItem>
                    <SelectItem value="performance">Linha Performance</SelectItem>
                    <SelectItem value="avancada">Linha Avançada</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="highlight"
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
                  className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 min-h-[120px]"
                />
              </div>
            </div>
          </div>

          {/* Imagens */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Imagens</h3>
            
            {/* Imagem Principal */}
            <div>
              <Label htmlFor="mainImage" className="text-gray-300">Imagem Principal</Label>
              <div className="flex space-x-2">
                <Input
                  id="mainImage"
                  placeholder="URL da imagem principal"
                  value={mainImage}
                  onChange={(e) => setMainImage(e.target.value)}
                  className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
                />
                <Button type="button" variant="outline" className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10">
                  <Upload className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Imagens Secundárias */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label className="text-gray-300">Imagens Secundárias</Label>
                <Button
                  type="button"
                  onClick={addSecondaryImage}
                  variant="outline"
                  size="sm"
                  className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Adicionar
                </Button>
              </div>
              {secondaryImages.map((image, index) => (
                <div key={index} className="flex space-x-2 mb-2">
                  <Input
                    placeholder="URL da imagem"
                    value={image}
                    onChange={(e) => updateSecondaryImage(index, e.target.value)}
                    className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
                  />
                  <Button
                    type="button"
                    onClick={() => removeSecondaryImage(index)}
                    variant="outline"
                    size="sm"
                    className="border-red-500 text-red-400 hover:bg-red-500/10"
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
                className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10"
              >
                <Plus className="w-4 h-4 mr-1" />
                Adicionar
              </Button>
            </div>
            
            {specs.map((spec, index) => (
              <div key={index} className="flex space-x-2">
                <div className="w-8 h-8 bg-cyan-500/20 rounded flex items-center justify-center">
                  {index === 0 && <Cpu className="w-4 h-4 text-cyan-400" />}
                  {index === 1 && <Zap className="w-4 h-4 text-cyan-400" />}
                  {index === 2 && <HardDrive className="w-4 h-4 text-cyan-400" />}
                  {index === 3 && <Monitor className="w-4 h-4 text-cyan-400" />}
                  {index > 3 && <div className="w-2 h-2 bg-cyan-400 rounded-full" />}
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
                    className="border-red-500 text-red-400 hover:bg-red-500/10"
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
              Salvar PC
            </Button>
            <Button
              type="button"
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
