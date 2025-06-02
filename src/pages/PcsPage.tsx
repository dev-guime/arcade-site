
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Cpu, HardDrive, Monitor, Zap } from "lucide-react";
import { ProductPageBackground } from "@/components/ProductPageBackground";
import { useState } from "react";

const PcsPage = () => {
  const navigate = useNavigate();
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const pcs = [
    {
      id: 1,
      name: "GAMER ENTRY",
      price: "R$ 2.499",
      description: "Perfeito para jogos em 1080p",
      specs: ["Ryzen 5 4600G", "16GB DDR4", "SSD 480GB", "GTX 1660 Super"],
      highlight: false
    },
    {
      id: 2,
      name: "GAMER PRO",
      price: "R$ 3.799",
      description: "Alta performance para jogos em 1440p",
      specs: ["Ryzen 5 5600X", "16GB DDR4", "SSD 1TB", "RTX 3060 Ti"],
      highlight: true
    },
    {
      id: 3,
      name: "CREATOR BEAST",
      price: "R$ 5.299",
      description: "Máximo desempenho para criação e jogos 4K",
      specs: ["Ryzen 7 5800X", "32GB DDR4", "SSD 1TB + HDD 2TB", "RTX 4070"],
      highlight: false
    },
    {
      id: 4,
      name: "OFFICE POWER",
      price: "R$ 1.899",
      description: "Ideal para trabalho e estudos",
      specs: ["Ryzen 5 5600G", "16GB DDR4", "SSD 512GB", "Radeon Vega 7"],
      highlight: false
    },
    {
      id: 5,
      name: "GAMER ULTRA",
      price: "R$ 6.999",
      description: "Performance extrema para competições",
      specs: ["Ryzen 7 7700X", "32GB DDR5", "SSD 2TB", "RTX 4080"],
      highlight: false
    },
    {
      id: 6,
      name: "STREAMER SETUP",
      price: "R$ 4.599",
      description: "Perfeito para streaming e criação de conteúdo",
      specs: ["Ryzen 7 5700X", "32GB DDR4", "SSD 1TB", "RTX 3070"],
      highlight: false
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Product Page Background */}
      <ProductPageBackground />

      {/* Header */}
      <header className="relative z-10 border-b border-gray-800 px-4 py-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Button
            onClick={() => navigate('/')}
            variant="ghost"
            className="text-cyan-400 hover:text-cyan-300 hover:bg-gray-900"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            NOSSOS PC'S GAMER
          </h1>
          <div className="w-20"></div>
        </div>
      </header>

      {/* PCs Carousel */}
      <main className="relative z-10 px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <Carousel className="w-full">
            <CarouselContent className="-ml-2 md:-ml-4">
              {pcs.map((pc) => (
                <CarouselItem key={pc.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card
                    className={`relative bg-gray-900/80 backdrop-blur-sm border-2 transition-all duration-500 hover:scale-105 hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] floating-animation ${
                      pc.highlight 
                        ? 'border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.4)]' 
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
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-20">
                        <span className="bg-gradient-to-r from-cyan-400 to-purple-500 px-4 py-1 rounded-full text-sm font-bold">
                          MAIS VENDIDO
                        </span>
                      </div>
                    )}
                    
                    {/* PC Image */}
                    <div className="relative h-48 overflow-hidden rounded-t-lg">
                      <img 
                        src="/lovable-uploads/f8260b15-2b51-400a-8d32-6242095a4419.png" 
                        alt={pc.name}
                        className="w-full h-full object-cover object-center"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
                    </div>
                    
                    <CardHeader>
                      <CardTitle className="text-2xl font-bold text-cyan-400">
                        {pc.name}
                      </CardTitle>
                      <CardDescription className="text-gray-300">
                        {pc.description}
                      </CardDescription>
                      <div className="text-3xl font-bold text-white">
                        {pc.price}
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="space-y-3 mb-6">
                        {pc.specs.map((spec, index) => (
                          <div key={index} className="flex items-center text-gray-300">
                            {index === 0 && <Cpu className="mr-2 h-4 w-4 text-cyan-400" />}
                            {index === 1 && <Zap className="mr-2 h-4 w-4 text-cyan-400" />}
                            {index === 2 && <HardDrive className="mr-2 h-4 w-4 text-cyan-400" />}
                            {index === 3 && <Monitor className="mr-2 h-4 w-4 text-cyan-400" />}
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
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="text-cyan-400 border-cyan-400 hover:bg-cyan-400 hover:text-black" />
            <CarouselNext className="text-cyan-400 border-cyan-400 hover:bg-cyan-400 hover:text-black" />
          </Carousel>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-gray-800 px-4 py-8">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">
            <span className="text-cyan-400 font-semibold">Retirada local</span> em Londrina-PR • 
            <span className="text-purple-400 font-semibold"> Envio seguro</span> via Sedex para todo Brasil
          </p>
        </div>
      </footer>

      <style>
        {`
          @keyframes floating {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-10px);
            }
          }
          .floating-animation {
            animation: floating 3s ease-in-out infinite;
          }
          .floating-animation:nth-child(2) {
            animation-delay: 0.5s;
          }
          .floating-animation:nth-child(3) {
            animation-delay: 1s;
          }
        `}
      </style>
    </div>
  );
};

export default PcsPage;
