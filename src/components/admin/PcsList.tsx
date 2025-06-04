
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Edit, Trash2, Plus, Computer } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { EditProductModal } from "./EditProductModal";
import { AdminPcForm } from "./AdminPcForm";
import { useProducts } from "@/contexts/ProductsContext";
import { useToast } from "@/hooks/use-toast";

export const PcsList = () => {
  const navigate = useNavigate();
  const { pcs, deletePc, updatePc } = useProducts();
  const { toast } = useToast();
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const handleView = (productId: string) => {
    navigate(`/pc/${productId}`);
  };

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    setIsEditModalOpen(true);
  };

  const handleUpdate = (updatedProduct: any) => {
    updatePc(editingProduct.id, updatedProduct);
    toast({
      title: "Sucesso!",
      description: "PC atualizado com sucesso!",
    });
  };

  const handleDelete = (productId: string) => {
    if (confirm(`Tem certeza que deseja remover o PC ${productId}?`)) {
      deletePc(productId);
      toast({
        title: "PC removido",
        description: "PC removido com sucesso!",
      });
    }
  };

  if (showAddForm) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Adicionar Novo PC
          </h2>
          <Button
            onClick={() => setShowAddForm(false)}
            variant="outline"
            className="border-slate-600 text-slate-300 hover:bg-slate-800 bg-transparent"
          >
            Voltar à Lista
          </Button>
        </div>
        <AdminPcForm />
      </div>
    );
  }

  return (
    <div className="p-6">
      <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-blue-400 flex items-center gap-2">
              <Computer className="w-5 h-5" />
              Lista de PCs ({pcs.length} produtos)
            </CardTitle>
            <Button
              onClick={() => setShowAddForm(true)}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg"
            >
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Novo PC
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pcs.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg border border-slate-600/50 hover:border-slate-500/50 hover:bg-slate-700/50 transition-all duration-200"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-lg bg-slate-700 border border-slate-600"
                  />
                  <div>
                    <h3 className="text-white font-semibold">{product.name}</h3>
                    <p className="text-slate-400">{product.category}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-white font-bold">{formatPrice(product.price)}</span>
                      {product.highlight && (
                        <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                          {product.highlight_text || "Em Destaque"}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleView(product.id)}
                    className="border-blue-500/50 text-blue-400 hover:bg-blue-500/20 hover:border-blue-400 bg-transparent"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(product)}
                    className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/20 hover:border-cyan-400 bg-transparent"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(product.id)}
                    className="border-red-500/50 text-red-400 hover:bg-red-500/20 hover:border-red-400 bg-transparent"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}

            {pcs.length === 0 && (
              <div className="text-center py-12 text-slate-400">
                <Computer className="w-16 h-16 mx-auto mb-4 text-slate-600" />
                <p className="text-lg">Nenhum PC cadastrado ainda.</p>
                <p className="text-sm">Clique em "Adicionar Novo PC" para começar.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <EditProductModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        product={editingProduct}
        type="pcs"
        onUpdate={handleUpdate}
      />
    </div>
  );
};
