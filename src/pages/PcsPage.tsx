
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

const PcsPage = () => {
  const navigate = useNavigate();
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  // Separar PCs por categoria baseado no preço
  const pcsCategories = {
    essencial: pcsData.filter(pc => {
      const price = parseInt(pc.price.replace('R$ ', '').replace('.', ''));
      return price <= 2500;
    }),
    performance: pcsData.filter(pc => {
      const price = parseInt(pc.price.replace('R$ ', '').replace('.', ''));
      return price > 2500 && price <= 5000;
    }),
    avancada: pcsData.filter(pc => {
      const price = parseInt(pc.price.replace('R$ ', '').replace('.', ''));
      return price > 5000;
    })
  };

  const renderProducts = (products: any[]) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
      {products.map((pc) => (
        <Card
          key={pc.id}
          className={`relative bg-gray-900/80 backdrop-blur-sm border-2 transition-all duration-500 hover:scale-105 hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] floating-animation ${
            pc.highlight 
              ? 'border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.6)]' 
              : 'border-gray-700 hover:border-cyan-400'
          } ${
            hoveredId !== null && hoveredId !== pc.id 
              ? 'opacity-30 scale-95' 
              : 'opacity-100'
          }`}
          onMouseEnter={() => setHoveredId(pc.id)}
          onMouseLeave={() => setHoveredId(null)}
        >
          {pc.highlight && (
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 px-4 py-2 rounded-full text-sm font-bold border-2 border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.6)]">
                MAIS VENDIDO
              </span>
            </div>
          )}
          
          {/* PC Image */}
          <div className="relative h-48 overflow-hidden rounded-t-lg mt-2 mx-2">
            <img 
              src="/lovable-uploads/f8260b15-2b51-400a-8d32-6242095a4419.png" 
              alt={pc.name}
              className="w-full h-full object-contain bg-gray-800 p-2"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent"></div>
          </div>
          
          <CardHeader>
            <CardTitle className="text-xl font-bold text-cyan-400">
              {pc.name}
            </CardTitle>
            <CardDescription className="text-gray-300">
              {pc.description}
            </CardDescription>
            <div className="text-2xl font-bold text-white">
              {pc.price}
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-2 mb-6">
              {pc.specs.map((spec: string, index: number) => (
                <div key={index} className="flex items-center text-gray-300 text-sm">
                  {index === 0 && <Cpu className="mr-2 h-3 w-3 text-cyan-400 flex-shrink-0" />}
                  {index === 1 && <Zap className="mr-2 h-3 w-3 text-cyan-400 flex-shrink-0" />}
                  {index === 2 && <HardDrive className="mr-2 h-3 w-3 text-cyan-400 flex-shrink-0" />}
                  {index === 3 && <Monitor className="mr-2 h-3 w-3 text-cyan-400 flex-shrink-0" />}
                  <span>{spec}</span>
                </div>
              ))}
            </div>
            
            <Button 
              onClick={() => navigate(`/pc/${pc.id}`)}
              className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 border border-cyan-400 transition-all duration-300"
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
      <main className="relative z-10 px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <Tabs defaultValue="essencial" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-gray-900/50 border border-gray-700 mb-8">
              <TabsTrigger value="essencial" className="data-[state=active]:bg-cyan-400 data-[state=active]:text-black">
                Linha Essencial
              </TabsTrigger>
              <TabsTrigger value="performance" className="data-[state=active]:bg-cyan-400 data-[state=active]:text-black">
                Linha Performance
              </TabsTrigger>
              <TabsTrigger value="avancada" className="data-[state=active]:bg-cyan-400 data-[state=active]:text-black">
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
        `}
      </style>
    </div>
  );
};

export default PcsPage;
