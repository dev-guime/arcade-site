
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Eye } from "lucide-react";
import { pcsData } from "@/data/pcsData";

interface ProductListProps {
  type: "pcs" | "perifericos";
}

export const ProductList = ({ type }: ProductListProps) => {
  // Dados reais dos PCs
  const pcProducts = pcsData.map(pc => ({
    id: pc.id,
    name: pc.name,
    price: `R$ ${pc.price.toLocaleString()}`,
    category: pc.price <= 2500 ? "Linha Essencial" : pc.price <= 5000 ? "Linha Performance" : "Linha Avançada",
    highlight: pc.highlight,
    image: pc.image
  }));

  // Mock data para periféricos - seria substituído por dados reais
  const perifericosProducts = [
    {
      id: 1,
      name: "Headset Gamer RGB Pro",
      price: "R$ 299",
      category: "Áudio",
      highlight: true,
      image: "/placeholder.svg"
    },
    {
      id: 2,
      name: "Controle Wireless Elite",
      price: "R$ 199",
      category: "Controles",
      highlight: false,
      image: "/placeholder.svg"
    },
    {
      id: 3,
      name: "Monitor Gamer 27' 144Hz",
      price: "R$ 899",
      category: "Vídeo",
      highlight: true,
      image: "/placeholder.svg"
    },
    {
      id: 4,
      name: "Kit Teclado + Mouse RGB",
      price: "R$ 159",
      category: "Setup",
      highlight: false,
      image: "/placeholder.svg"
    },
  ];

  const products = type === "pcs" ? pcProducts : perifericosProducts;
  const colorScheme = type === "pcs" ? "cyan" : "pink";

  return (
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
                  className="border-blue-500 text-blue-400 hover:bg-blue-500/10 hover:border-blue-400"
                >
                  <Eye className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className={`border-${colorScheme}-500 text-${colorScheme}-400 hover:bg-${colorScheme}-500/10 hover:border-${colorScheme}-400`}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-red-500 text-red-400 hover:bg-red-500/10 hover:border-red-400"
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
