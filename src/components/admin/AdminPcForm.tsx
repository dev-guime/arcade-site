import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useProducts } from "@/contexts/ProductsContext";
import { ImageUploadButton } from "./ImageUploadButton";
import { Computer } from "lucide-react";

const pcSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  price: z.number().min(0, "Preço deve ser maior que 0"),
  category: z.string().min(1, "Categoria é obrigatória"),
  description: z.string().min(1, "Descrição é obrigatória"),
  specs: z.string().min(1, "Especificações são obrigatórias"),
  highlight: z.boolean().default(false),
  highlight_text: z.string().optional(),
  highlight_color: z.string().optional(),
  image: z.string().optional(),
});

type PcFormData = z.infer<typeof pcSchema>;

const highlightColors = [
  { value: "cyan", label: "Ciano", color: "border-cyan-400" },
  { value: "pink", label: "Rosa", color: "border-pink-400" },
  { value: "green", label: "Verde", color: "border-green-400" },
  { value: "red", label: "Vermelho", color: "border-red-400" },
  { value: "purple", label: "Roxo", color: "border-purple-400" },
  { value: "yellow", label: "Amarelo", color: "border-yellow-400" },
  { value: "blue", label: "Azul", color: "border-blue-400" },
];

interface AdminPcFormProps {
  editingPc?: any;
  onSubmit?: (data: any) => void;
  onCancel?: () => void;
}

export const AdminPcForm = ({ editingPc, onSubmit: onSubmitProp, onCancel }: AdminPcFormProps) => {
  const { toast } = useToast();
  const { addPc, updatePc } = useProducts();
  const [image, setImage] = useState<string>(editingPc?.image || "");

  const form = useForm<PcFormData>({
    resolver: zodResolver(pcSchema),
    defaultValues: {
      name: editingPc?.name || "",
      price: editingPc?.price || 0,
      category: editingPc?.category || "",
      description: editingPc?.description || "",
      specs: editingPc?.specs ? editingPc.specs.join('\n') : "",
      highlight: editingPc?.highlight || false,
      highlight_text: editingPc?.highlight_text || "",
      highlight_color: editingPc?.highlight_color || "cyan",
      image: editingPc?.image || "",
    },
  });

  const isHighlighted = form.watch("highlight");

  const handleSubmit = async (data: PcFormData) => {
    try {
      const specsArray = data.specs.split('\n').filter(spec => spec.trim() !== '');
      
      const pcData = {
        name: data.name,
        price: data.price,
        category: data.category,
        description: data.description,
        specs: specsArray,
        spec_icons: [],
        secondary_images: [],
        image: image || undefined,
        highlight: data.highlight,
        highlight_text: data.highlight ? data.highlight_text : undefined,
        highlight_color: data.highlight ? data.highlight_color : undefined,
      };

      if (editingPc) {
        if (onSubmitProp) {
          onSubmitProp(pcData);
        } else {
          await updatePc(editingPc.id, pcData);
        }
      } else {
        await addPc(pcData);
      }
      
      toast({
        title: "Sucesso!",
        description: editingPc ? "PC atualizado com sucesso!" : "PC adicionado com sucesso!",
      });

      if (!editingPc) {
        form.reset();
        setImage("");
      }
    } catch (error) {
      console.error('Error saving PC:', error);
      toast({
        title: "Erro",
        description: "Erro ao salvar PC. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
      <CardHeader>
        <CardTitle className="text-cyan-400 flex items-center gap-2">
          <Computer className="w-5 h-5" />
          {editingPc ? "Editar PC" : "Adicionar Novo PC"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-300">Nome do PC</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex: PC Gamer RTX 4060"
                        {...field}
                        className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-300">Preço (R$)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="2500.00"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
                        className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-300">Categoria</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex: Gamer, Office, Workstation"
                        {...field}
                        className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center space-x-4">
                <FormField
                  control={form.control}
                  name="highlight"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-slate-300">Destacar Produto</FormLabel>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {isHighlighted && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-slate-700/20 rounded-lg border border-slate-600/50">
                <FormField
                  control={form.control}
                  name="highlight_text"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-300">Texto do Destaque</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ex: MAIS VENDIDO, OFERTA ESPECIAL"
                          {...field}
                          className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="highlight_color"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-300">Cor da Borda</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                            <SelectValue placeholder="Selecione uma cor" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-slate-800 border-slate-600">
                          {highlightColors.map((color) => (
                            <SelectItem key={color.value} value={color.value} className="text-white hover:bg-slate-700">
                              <div className="flex items-center space-x-2">
                                <div className={`w-4 h-4 rounded border-2 ${color.color}`}></div>
                                <span>{color.label}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-300">Descrição</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Descrição detalhada do PC..."
                      {...field}
                      className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="specs"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-300">Especificações (uma por linha)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="RTX 4060&#10;Ryzen 5 5600X&#10;16GB RAM&#10;SSD 500GB"
                      {...field}
                      className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 min-h-24"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Imagem do PC
              </label>
              <ImageUploadButton
                onImageUploaded={setImage}
                currentImage={image}
              />
            </div>

            <div className="flex gap-4">
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white shadow-lg"
              >
                <Computer className="w-4 h-4 mr-2" />
                {editingPc ? "Atualizar PC" : "Adicionar PC"}
              </Button>
              {onCancel && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={onCancel}
                  className="border-slate-600 text-slate-300 hover:bg-slate-800"
                >
                  Cancelar
                </Button>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
