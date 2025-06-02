
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Eye } from "lucide-react";

interface ProductListProps {
  type: "pcs" | "perifericos";
}

export const ProductList = ({ type }: ProductListProps) => {
  // Mock data - seria substituído por dados reais
  const products = [
    {
      id: 1,
      name: "PC Gamer RGB Pro",
      price: "R$ 2.499",
      category: "Linha Performance",
      highlight: true,
      image: "/lovable-uploads/f8260b15-2b51-400a-8d32-6242095a4419.png"
    },
    {
      id: 2,
      name: "Headset Gamer Pro",
      price: "R$ 299",
      category: "Áudio",
      highlight: false,
      image: "/placeholder.svg"
    },
  ];

  const colorScheme = type === "pcs" ? "cyan" : "pink";

  return (
    <Card className="bg-gray-900/50 border-gray-700">
      <CardHeader>
        <CardTitle className={`text-${colorScheme}-400`}>
          Lista de {type === "pcs" ? "PCs" : "Periféricos"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-700"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={product.image}
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
                        Mais Vendido
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-blue-500 text-blue-400 hover:bg-blue-500/10"
                >
                  <Eye className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className={`border-${colorScheme}-500 text-${colorScheme}-400 hover:bg-${colorScheme}-500/10`}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-red-500 text-red-400 hover:bg-red-500/10"
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
  );
};
