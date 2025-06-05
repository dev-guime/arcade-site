
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

  const handleUpdate = async (updatedProduct: any) => {
    try {
      await updatePc(editingProduct.id, updatedProduct);
      setIsEditModalOpen(false);
      setEditingProduct(null);
    } catch (error) {
      console.error('Error updating PC:', error);
    }
  };

  const handleDelete = async (productId: string, productName: string) => {
    if (confirm(`Tem certeza que deseja remover o PC "${productName}"?`)) {
      try {
        await deletePc(productId);
      } catch (error) {
        console.error('Error deleting PC:', error);
      }
    }
  };

  if (showAddForm) {
    return (
      <div className="p-3 lg:p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4 lg:mb-6 space-y-2 lg:space-y-0">
          <h2 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Adicionar Novo PC
          </h2>
          <Button
            onClick={() => setShowAddForm(false)}
            variant="outline"
            className="border-slate-600 text-slate-300 hover:bg-slate-800 bg-transparent text-sm lg:text-base"
          >
            Voltar à Lista
          </Button>
        </div>
        <AdminPcForm />
      </div>
    );
  }

  return (
    <div className="p-3 lg:p-6">
      <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
        <CardHeader>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-3 lg:space-y-0">
            <CardTitle className="text-blue-400 flex items-center gap-2 text-lg lg:text-xl">
              <Computer className="w-4 h-4 lg:w-5 lg:h-5" />
              Lista de PCs ({pcs.length} produtos)
            </CardTitle>
            <Button
              onClick={() => setShowAddForm(true)}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg text-sm lg:text-base"
            >
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Novo PC
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-3 lg:p-6">
          <div className="space-y-3 lg:space-y-4">
            {pcs.map((product) => (
              <div
                key={product.id}
                className="flex flex-col lg:flex-row lg:items-center justify-between p-3 lg:p-4 bg-slate-700/30 rounded-lg border border-slate-600/50 hover:border-slate-500/50 hover:bg-slate-700/50 transition-all duration-200 space-y-3 lg:space-y-0"
              >
                <div className="flex items-center space-x-3 lg:space-x-4">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-12 h-12 lg:w-16 lg:h-16 object-cover rounded-lg bg-slate-700 border border-slate-600 flex-shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="text-white font-semibold text-sm lg:text-base truncate">{product.name}</h3>
                    <p className="text-slate-400 text-xs lg:text-sm">{product.category}</p>
                    <div className="flex flex-col lg:flex-row lg:items-center space-y-1 lg:space-y-0 lg:space-x-2 mt-1">
                      <span className="text-white font-bold text-sm lg:text-base">{formatPrice(product.price)}</span>
                      {product.highlight && (
                        <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">
                          {product.highlight_text || "Em Destaque"}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2 justify-end lg:justify-start">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleView(product.id)}
                    className="border-blue-500/50 text-blue-400 hover:bg-blue-500/20 hover:border-blue-400 bg-transparent text-xs lg:text-sm px-2 lg:px-3"
                  >
                    <Eye className="w-3 h-3 lg:w-4 lg:h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(product)}
                    className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/20 hover:border-cyan-400 bg-transparent text-xs lg:text-sm px-2 lg:px-3"
                  >
                    <Edit className="w-3 h-3 lg:w-4 lg:h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(product.id, product.name)}
                    className="border-red-500/50 text-red-400 hover:bg-red-500/20 hover:border-red-400 bg-transparent text-xs lg:text-sm px-2 lg:px-3"
                  >
                    <Trash2 className="w-3 h-3 lg:w-4 lg:h-4" />
                  </Button>
                </div>
              </div>
            ))}

            {pcs.length === 0 && (
              <div className="text-center py-8 lg:py-12 text-slate-400">
                <Computer className="w-12 h-12 lg:w-16 lg:h-16 mx-auto mb-4 text-slate-600" />
                <p className="text-base lg:text-lg">Nenhum PC cadastrado ainda.</p>
                <p className="text-xs lg:text-sm">Clique em "Adicionar Novo PC" para começar.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <EditProductModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingProduct(null);
        }}
        product={editingProduct}
        type="pcs"
        onUpdate={handleUpdate}
      />
    </div>
  );
};
