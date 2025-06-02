import { ProductPageBackground } from "@/components/ProductPageBackground";
import { PcsHeader } from "@/components/PcsHeader";
import { PcsFooter } from "@/components/PcsFooter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { Cpu, HardDrive, Monitor, Zap } from "lucide-react";
import { useState } from "react";
import { pcsData } from "@/data/pcsData";
import { useProducts } from "@/contexts/ProductsContext";

const PcsPage = () => {
  const navigate = useNavigate();
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const { pcs } = useProducts();

  // Combinar dados do arquivo com dados do contexto
  const allPcs = [...pcsData, ...pcs];

  // Separar PCs por categoria baseado no preço
  const pcsCategories = {
    essencial: allPcs.filter(pc => {
      const price = typeof pc.price === 'string' ? 
        parseInt(pc.price.replace('R$ ', '').replace('.', '')) : 
        pc.price;
      return price <= 2500;
    }),
    performance: allPcs.filter(pc => {
      const price = typeof pc.price === 'string' ? 
        parseInt(pc.price.replace('R$ ', '').replace('.', '')) : 
        pc.price;
      return price > 2500 && price <= 5000;
    }),
    avancada: allPcs.filter(pc => {
      const price = typeof pc.price === 'string' ? 
        parseInt(pc.price.replace('R$ ', '').replace('.', '')) : 
        pc.price;
      return price > 5000;
    })
  };

  const formatPrice = (price: string | number) => {
    if (typeof price === 'string') return price;
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const renderProducts = (products: any[]) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto">
      {products.map((pc) => (
        <Card
          key={pc.id}
          className={`relative bg-gray-900/80 backdrop-blur-sm border-2 transition-all duration-500 hover:scale-[1.02] md:hover:scale-105 hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] floating-animation ${
            pc.highlight 
              ? 'border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.6)]' 
              : 'border-gray-700 hover:border-cyan-400'
          } ${
            hoveredId !== null && hoveredId !== pc.id 
              ? 'opacity-30 scale-95' 
              : 'opacity-100'
          } flex flex-col h-full`}
          onMouseEnter={() => setHoveredId(pc.id)}
          onMouseLeave={() => setHoveredId(null)}
        >
          {pc.highlight && pc.highlight_text && (
            <div className="absolute -top-3 md:-top-4 left-1/2 transform -translate-x-1/2 z-20">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 px-2 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-bold border-2 border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.6)]">
                {pc.highlight_text}
              </span>
            </div>
          )}
          
          {/* PC Image */}
          <div className="relative h-32 md:h-48 overflow-hidden rounded-t-lg mt-2 mx-2 flex-shrink-0">
            <img 
              src={pc.image || "/lovable-uploads/f8260b15-2b51-400a-8d32-6242095a4419.png"} 
              alt={pc.name}
              className="w-full h-full object-contain bg-gray-800 p-2"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent"></div>
          </div>
          
          <CardHeader className="pb-2 md:pb-3 flex-shrink-0">
            <CardTitle className="text-sm md:text-xl font-bold text-cyan-400 leading-tight">
              {pc.name}
            </CardTitle>
            <CardDescription className="text-gray-300 text-xs md:text-sm line-clamp-2 md:line-clamp-none">
              {pc.description}
            </CardDescription>
            <div className="text-lg md:text-2xl font-bold text-white">
              {formatPrice(pc.price)}
            </div>
          </CardHeader>
          
          <CardContent className="pt-0 flex-1 flex flex-col">
            <div className="space-y-1 md:space-y-2 mb-3 md:mb-6 flex-1">
              {pc.specs && pc.specs.slice(0, 4).map((spec: string, index: number) => (
                <div key={index} className="flex items-center text-gray-300 text-xs md:text-sm">
                  {index === 0 && <Cpu className="mr-2 h-3 w-3 text-cyan-400 flex-shrink-0" />}
                  {index === 1 && <Zap className="mr-2 h-3 w-3 text-cyan-400 flex-shrink-0" />}
                  {index === 2 && <HardDrive className="mr-2 h-3 w-3 text-cyan-400 flex-shrink-0" />}
                  {index === 3 && <Monitor className="mr-2 h-3 w-3 text-cyan-400 flex-shrink-0" />}
                  <span className="line-clamp-1">{spec}</span>
                </div>
              ))}
            </div>
            
            <Button 
              onClick={() => navigate(`/pc/${pc.id}`)}
              className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 border border-cyan-400 transition-all duration-300 text-xs md:text-sm py-2 md:py-3 mt-auto"
            >
              QUERO ESTE PC
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Product Page Background */}
      <ProductPageBackground />

      {/* Header */}
      <PcsHeader />

      {/* PCs Tabs */}
      <main className="relative z-10 px-2 md:px-4 py-6 md:py-12">
        <div className="max-w-7xl mx-auto">
          <Tabs defaultValue="essencial" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-gray-900/50 border border-gray-700 mb-6 md:mb-8 h-auto">
              <TabsTrigger 
                value="essencial" 
                className="data-[state=active]:bg-cyan-400 data-[state=active]:text-black text-xs md:text-sm px-2 py-2 md:py-3"
              >
                Linha Essencial
              </TabsTrigger>
              <TabsTrigger 
                value="performance" 
                className="data-[state=active]:bg-cyan-400 data-[state=active]:text-black text-xs md:text-sm px-2 py-2 md:py-3"
              >
                Linha Performance
              </TabsTrigger>
              <TabsTrigger 
                value="avancada" 
                className="data-[state=active]:bg-cyan-400 data-[state=active]:text-black text-xs md:text-sm px-2 py-2 md:py-3"
              >
                Linha Avançada
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="essencial">{renderProducts(pcsCategories.essencial)}</TabsContent>
            <TabsContent value="performance">{renderProducts(pcsCategories.performance)}</TabsContent>
            <TabsContent value="avancada">{renderProducts(pcsCategories.avancada)}</TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Footer */}
      <PcsFooter />

      <style>
        {`
          @keyframes floating {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-8px);
            }
          }
          .floating-animation {
            animation: floating 3s ease-in-out infinite;
          }
          .floating-animation:nth-child(1) {
            animation-delay: 0s;
          }
          .floating-animation:nth-child(2) {
            animation-delay: 0.3s;
          }
          .floating-animation:nth-child(3) {
            animation-delay: 0.6s;
          }
          .floating-animation:nth-child(4) {
            animation-delay: 0.9s;
          }
          .line-clamp-1 {
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        `}
      </style>
    </div>
  );
};

export default PcsPage;
