
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Upload, X, Gamepad2, Headphones, Keyboard, Monitor, Cpu } from "lucide-react";

export const AdminPerifericosForm = () => {
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
    console.log("Periférico adicionado!");
  };

  const renderForm = (category: string) => (
    <Card className="bg-gray-900/50 border-gray-700">
      <CardHeader>
        <CardTitle className="text-pink-400 flex items-center">
          <Gamepad2 className="w-5 h-5 mr-2" />
          Adicionar {category}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informações Básicas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-gray-300">Nome do Produto</Label>
                <Input
                  id="name"
                  placeholder="Ex: Headset Gamer RGB Pro"
                  className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
                />
              </div>

              <div>
                <Label htmlFor="price" className="text-gray-300">Preço</Label>
                <Input
                  id="price"
                  placeholder="Ex: R$ 299"
                  className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
                />
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
                  placeholder="Descrição detalhada do produto..."
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
                <Button type="button" variant="outline" className="border-pink-500 text-pink-400 hover:bg-pink-500/10">
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
                  className="border-pink-500 text-pink-400 hover:bg-pink-500/10"
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
                className="border-pink-500 text-pink-400 hover:bg-pink-500/10"
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
              className="bg-gradient-to-r from-pink-500 to-orange-600 hover:from-pink-400 hover:to-orange-500"
            >
              Salvar Produto
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

  return (
    <Tabs defaultValue="combos" className="w-full">
      <TabsList className="grid w-full grid-cols-5 bg-gray-800 border border-gray-700 mb-6">
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
