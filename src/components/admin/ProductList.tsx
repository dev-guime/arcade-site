
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { EditProductModal } from "./EditProductModal";
import { useProducts } from "@/contexts/ProductsContext";
import { useToast } from "@/hooks/use-toast";

interface ProductListProps {
  type: "pcs" | "perifericos";
}

export const ProductList = ({ type }: ProductListProps) => {
  const navigate = useNavigate();
  const { pcs, perifericos, deletePc, deletePeriferico, updatePc, updatePeriferico } = useProducts();
  const { toast } = useToast();
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const products = type === "pcs" ? pcs : perifericos;
  const colorScheme = type === "pcs" ? "cyan" : "pink";

  const handleView = (productId: number) => {
    if (type === "pcs") {
      navigate(`/pc/${productId}`);
    } else {
      navigate('/perifericos');
    }
  };

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    setIsEditModalOpen(true);
  };

  const handleUpdate = (updatedProduct: any) => {
    if (type === "pcs") {
      updatePc(editingProduct.id, updatedProduct);
    } else {
      updatePeriferico(editingProduct.id, updatedProduct);
    }
    
    toast({
      title: "Sucesso!",
      description: `${type === "pcs" ? "PC" : "Periférico"} atualizado com sucesso!`,
    });
  };

  const handleDelete = (productId: number) => {
    if (confirm(`Tem certeza que deseja remover o produto ${productId}?`)) {
      if (type === "pcs") {
        deletePc(productId);
      } else {
        deletePeriferico(productId);
      }
      
      toast({
        title: "Produto removido",
        description: `${type === "pcs" ? "PC" : "Periférico"} removido com sucesso!`,
      });
    }
  };

  return (
    <>
      <Card className="bg-gray-900/50 border-gray-700">
        <CardHeader>
          <CardTitle className={`text-${colorScheme}-400`}>
            Lista de {type === "pcs" ? "PCs" : "Periféricos"} ({products.length} produtos)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-lg bg-gray-700"
                  />
                  <div>
                    <h3 className="text-white font-semibold">{product.name}</h3>
                    <p className="text-gray-400">{product.category}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-white font-bold">{product.price}</span>
                      {product.highlight && (
                        <Badge className={`bg-${colorScheme}-500/20 text-${colorScheme}-400 border-${colorScheme}-500/30`}>
                          Em Destaque
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
                    className="border-blue-500 text-blue-400 hover:bg-blue-500/20 hover:border-blue-400 bg-transparent"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(product)}
                    className={`border-${colorScheme}-500 text-${colorScheme}-400 hover:bg-${colorScheme}-500/20 hover:border-${colorScheme}-400 bg-transparent`}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(product.id)}
                    className="border-red-500 text-red-400 hover:bg-red-500/20 hover:border-red-400 bg-transparent"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}

            {products.length === 0 && (
              <div className="text-center py-8 text-gray-400">
                Nenhum produto cadastrado ainda.
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <EditProductModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        product={editingProduct}
        type={type}
        onUpdate={handleUpdate}
      />
    </>
  );
};
