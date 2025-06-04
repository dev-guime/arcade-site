
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { ImageUploadButton } from "./ImageUploadButton";
import { Package, ArrowLeft } from "lucide-react";

const exampleSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  customer: z.string().min(1, "Nome do cliente é obrigatório"),
  deliveryDate: z.string().min(1, "Data de entrega é obrigatória"),
  location: z.string().min(1, "Localização é obrigatória"),
  specs: z.string().min(1, "Especificações são obrigatórias"),
  image: z.string().optional(),
});

type ExampleFormData = z.infer<typeof exampleSchema>;

interface AddExampleFormProps {
  onBack: () => void;
  onSubmit: (data: any) => void;
}

export const AddExampleForm = ({ onBack, onSubmit }: AddExampleFormProps) => {
  const { toast } = useToast();
  const [image, setImage] = useState<string>("");

  const form = useForm<ExampleFormData>({
    resolver: zodResolver(exampleSchema),
    defaultValues: {
      name: "",
      customer: "",
      deliveryDate: "",
      location: "",
      specs: "",
      image: "",
    },
  });

  const handleSubmit = (data: ExampleFormData) => {
    const specsArray = data.specs.split('\n').filter(spec => spec.trim() !== '');
    
    const exampleData = {
      ...data,
      specs: specsArray,
      image: image || undefined,
      id: crypto.randomUUID(),
    };

    onSubmit(exampleData);
    
    toast({
      title: "Sucesso!",
      description: "Exemplo adicionado com sucesso!",
    });

    form.reset();
    setImage("");
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
          Adicionar Novo Exemplo
        </h2>
        <Button
          onClick={onBack}
          variant="outline"
          className="border-slate-600 text-slate-300 hover:bg-slate-800 bg-transparent"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar à Lista
        </Button>
      </div>
      
      <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
        <CardHeader>
          <CardTitle className="text-green-400 flex items-center gap-2">
            <Package className="w-5 h-5" />
            Dados do Exemplo
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
                  name="customer"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-300">Nome do Cliente</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ex: João Silva"
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
                  name="deliveryDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-300">Data de Entrega</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          {...field}
                          className="bg-slate-700/50 border-slate-600 text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-300">Localização</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ex: Londrina-PR"
                          {...field}
                          className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

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

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg"
              >
                <Package className="w-4 h-4 mr-2" />
                Adicionar Exemplo
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
