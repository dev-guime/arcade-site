
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Plus, Package, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AddExampleForm } from "./AddExampleForm";
import { useProducts } from "@/contexts/ProductsContext";

export const ExamplesManagement = () => {
  const { toast } = useToast();
  const { deliveredPcs, deleteDeliveredPc, loading } = useProducts();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingPc, setEditingPc] = useState<any>(null);

  const handleDelete = async (id: string) => {
    if (confirm("Tem certeza que deseja remover este exemplo?")) {
      try {
        await deleteDeliveredPc(id);
        toast({
          title: "Exemplo removido",
          description: "Exemplo removido com sucesso!",
        });
      } catch (error) {
        toast({
          title: "Erro",
          description: "Erro ao remover exemplo.",
          variant: "destructive",
        });
      }
    }
  };

  const handleAddExample = () => {
    setShowAddForm(false);
    toast({
      title: "Exemplo adicionado",
      description: "Exemplo adicionado com sucesso!",
    });
  };

  const handleViewOnSite = (pc: any) => {
    toast({
      title: "Visualizar no Site",
      description: `Este PC aparece na seção "PCs Já Entregues" do site principal.`,
    });
  };

  const handleEdit = (pc: any) => {
    setEditingPc(pc);
    toast({
      title: "Modo de Edição",
      description: "Funcionalidade de edição em desenvolvimento...",
    });
  };

  if (showAddForm) {
    return (
      <AddExampleForm 
        onBack={() => setShowAddForm(false)}
        onSubmit={handleAddExample}
      />
    );
  }

  if (loading) {
    return (
      <div className="p-6">
        <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
          <CardContent className="p-6">
            <div className="flex justify-center">
              <p className="text-slate-400">Carregando exemplos...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6">
      <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-green-400 flex items-center gap-2">
              <Package className="w-5 h-5" />
              PCs Entregues - Exemplos ({deliveredPcs.length} exemplos)
            </CardTitle>
            <Button
              onClick={() => setShowAddForm(true)}
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg"
            >
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Exemplo
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {deliveredPcs.map((pc) => (
              <div
                key={pc.id}
                className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg border border-slate-600/50 hover:border-slate-500/50 hover:bg-slate-700/50 transition-all duration-200"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={pc.image || "/lovable-uploads/f8260b15-2b51-400a-8d32-6242095a4419.png"}
                    alt={pc.name}
                    className="w-16 h-16 object-cover rounded-lg bg-slate-700 border border-slate-600"
                  />
                  <div>
                    <h3 className="text-white font-semibold">{pc.name}</h3>
                    <p className="text-slate-400">Cliente: {pc.customer}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        Entregue em {new Date(pc.delivery_date).toLocaleDateString('pt-BR')}
                      </Badge>
                      <Badge variant="outline" className="text-slate-300 border-slate-500">
                        {pc.location}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {pc.specs.slice(0, 3).map((spec: string, index: number) => (
                        <span key={index} className="text-xs bg-slate-600/50 text-slate-300 px-2 py-1 rounded">
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewOnSite(pc)}
                    className="border-blue-500/50 text-blue-400 hover:bg-blue-500/20 hover:border-blue-400 bg-transparent"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(pc)}
                    className="border-green-500/50 text-green-400 hover:bg-green-500/20 hover:border-green-400 bg-transparent"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(pc.id)}
                    className="border-red-500/50 text-red-400 hover:bg-red-500/20 hover:border-red-400 bg-transparent"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}

            {deliveredPcs.length === 0 && (
              <div className="text-center py-12 text-slate-400">
                <Package className="w-16 h-16 mx-auto mb-4 text-slate-600" />
                <p className="text-lg">Nenhum exemplo cadastrado ainda.</p>
                <p className="text-sm">Clique em "Adicionar Exemplo" para começar.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
