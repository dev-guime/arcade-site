
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Edit, Trash2, Plus, Package, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AddExampleForm } from "./AddExampleForm";

interface DeliveredPc {
  id: string;
  name: string;
  customer: string;
  deliveryDate: string;
  image?: string;
  specs: string[];
  location: string;
}

export const ExamplesManagement = () => {
  const { toast } = useToast();
  const [deliveredPcs, setDeliveredPcs] = useState<DeliveredPc[]>([
    {
      id: "1",
      name: "PC Gamer RTX 4060",
      customer: "João Silva",
      deliveryDate: "2024-01-15",
      specs: ["RTX 4060", "Ryzen 5 5600X", "16GB RAM", "SSD 500GB"],
      location: "Londrina-PR"
    },
    {
      id: "2", 
      name: "PC Streamer Pro",
      customer: "Maria Santos",
      deliveryDate: "2024-01-10",
      specs: ["RTX 4070", "Intel i7-12700F", "32GB RAM", "SSD 1TB"],
      location: "Maringá-PR"
    }
  ]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingPc, setEditingPc] = useState<DeliveredPc | null>(null);

  const handleDelete = (id: string) => {
    if (confirm("Tem certeza que deseja remover este exemplo?")) {
      setDeliveredPcs(prev => prev.filter(pc => pc.id !== id));
      toast({
        title: "Exemplo removido",
        description: "Exemplo removido com sucesso!",
      });
    }
  };

  const handleAddExample = (data: any) => {
    setDeliveredPcs(prev => [...prev, data]);
    setShowAddForm(false);
  };

  const handleViewOnSite = (pc: DeliveredPc) => {
    // Simular visualização no site - pode ser implementado como modal ou página
    toast({
      title: "Visualizar no Site",
      description: `Visualizando ${pc.name} no site...`,
    });
  };

  const handleEdit = (pc: DeliveredPc) => {
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
                        Entregue em {new Date(pc.deliveryDate).toLocaleDateString('pt-BR')}
                      </Badge>
                      <Badge variant="outline" className="text-slate-300 border-slate-500">
                        {pc.location}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {pc.specs.slice(0, 3).map((spec, index) => (
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
