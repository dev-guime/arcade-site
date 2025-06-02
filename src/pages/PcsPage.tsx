
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Cpu, HardDrive, Monitor, Zap } from "lucide-react";
import { ProductPageBackground } from "@/components/ProductPageBackground";
import { useState, useEffect } from "react";

const PcsPage = () => {
  const navigate = useNavigate();
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [borderColors, setBorderColors] = useState<{[key: number]: string}>({});

  const colors = [
    'border-green-400 shadow-[0_0_30px_rgba(34,197,94,0.3)]',
    'border-pink-400 shadow-[0_0_30px_rgba(236,72,153,0.3)]',
    'border-red-400 shadow-[0_0_30px_rgba(248,113,113,0.3)]',
    'border-blue-400 shadow-[0_0_30px_rgba(96,165,250,0.3)]',
    'border-purple-400 shadow-[0_0_30px_rgba(168,85,247,0.3)]',
    'border-yellow-400 shadow-[0_0_30px_rgba(251,191,36,0.3)]',
    'border-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.3)]',
    'border-orange-400 shadow-[0_0_30px_rgba(251,146,60,0.3)]'
  ];

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
    },
    {
      id: 7,
      name: "WORKSTATION PRO",
      price: "R$ 8.999",
      description: "Potência máxima para profissionais",
      specs: ["Ryzen 9 5950X", "64GB DDR4", "SSD 4TB", "RTX 4090"],
      highlight: false
    },
    {
      id: 8,
      name: "GAMER COMPACT",
      price: "R$ 3.199",
      description: "Performance em tamanho compacto",
      specs: ["Ryzen 5 5600G", "16GB DDR4", "SSD 1TB", "RTX 3060"],
      highlight: false
    },
    {
      id: 9,
      name: "CREATOR STUDIO",
      price: "R$ 7.599",
      description: "Ideal para edição e renderização",
      specs: ["Ryzen 9 5900X", "64GB DDR4", "SSD 2TB + HDD 4TB", "RTX 4070 Ti"],
      highlight: false
    },
    {
      id: 10,
      name: "BUDGET GAMER",
      price: "R$ 1.999",
      description: "Entrada no mundo gamer",
      specs: ["Ryzen 3 4300G", "8GB DDR4", "SSD 480GB", "GTX 1650"],
      highlight: false
    },
    {
      id: 11,
      name: "ENTHUSIAST EXTREME",
      price: "R$ 12.999",
      description: "O máximo em tecnologia",
      specs: ["Ryzen 9 7950X", "128GB DDR5", "SSD 8TB", "RTX 4090 Ti"],
      highlight: false
    }
  ];

  useEffect(() => {
    const newBorderColors: {[key: number]: string} = {};
    pcs.forEach(pc => {
      newBorderColors[pc.id] = colors[Math.floor(Math.random() * colors.length)];
    });
    setBorderColors(newBorderColors);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Product Page Background */}
      <ProductPageBackground />

      {/* Header */}
      <header className="relative z-10 border-b border-gray-800 px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Button
            onClick={() => navigate('/')}
            variant="ghost"
            className="text-cyan-400 hover:text-cyan-300 hover:bg-gray-900 text-sm md:text-base"
          >
            <ArrowLeft className="mr-2 h-3 w-3 md:h-4 md:w-4" />
            Voltar
          </Button>
          <h1 className="text-lg md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent text-center">
            NOSSOS PC'S GAMER
          </h1>
          <div className="w-16 md:w-20"></div>
        </div>
      </header>

      {/* PCs Content */}
      <main className="relative z-10 px-4 py-4">
        <div className="max-w-6xl mx-auto">
          
          {/* Mobile Grid Layout */}
          <div className="block md:hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {pcs.map((pc) => (
                <Card
                  key={pc.id}
                  className={`relative bg-gray-900/80 backdrop-blur-sm border-2 transition-all duration-500 hover:scale-[1.02] floating-animation ${
                    pc.highlight 
                      ? 'border-pink-400 shadow-[0_0_20px_rgba(236,72,153,0.6)]' 
                      : hoveredId === pc.id 
                        ? borderColors[pc.id] || 'border-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.3)]'
                        : 'border-gray-700'
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
                      <span className="bg-gradient-to-r from-pink-400 to-purple-500 px-3 py-1 rounded-full text-xs font-bold border-2 border-pink-400 shadow-[0_0_15px_rgba(236,72,153,0.6)]">
                        MAIS VENDIDO
                      </span>
                    </div>
                  )}
                  
                  {/* PC Image */}
                  <div className="relative h-32 overflow-hidden rounded-t-lg mt-2">
                    <img 
                      src="/lovable-uploads/f8260b15-2b51-400a-8d32-6242095a4419.png" 
                      alt={pc.name}
                      className="w-full h-full object-contain bg-gray-800 p-2"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent"></div>
                  </div>
                  
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-bold text-cyan-400">
                      {pc.name}
                    </CardTitle>
                    <CardDescription className="text-gray-300 text-xs">
                      {pc.description}
                    </CardDescription>
                    <div className="text-lg font-bold text-white">
                      {pc.price}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0 space-y-2">
                    <div className="space-y-1">
                      {pc.specs.map((spec, index) => (
                        <div key={index} className="flex items-center text-gray-300 text-xs">
                          {index === 0 && <Cpu className="mr-2 h-3 w-3 text-cyan-400 flex-shrink-0" />}
                          {index === 1 && <Zap className="mr-2 h-3 w-3 text-cyan-400 flex-shrink-0" />}
                          {index === 2 && <HardDrive className="mr-2 h-3 w-3 text-cyan-400 flex-shrink-0" />}
                          {index === 3 && <Monitor className="mr-2 h-3 w-3 text-cyan-400 flex-shrink-0" />}
                          <span className="truncate">{spec}</span>
                        </div>
                      ))}
                    </div>
                    
                    <Button 
                      onClick={() => navigate(`/pc/${pc.id}`)}
                      className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 border border-cyan-400 transition-all duration-300 text-xs py-2"
                    >
                      QUERO ESTE PC
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Desktop Carousel */}
          <div className="hidden md:block relative px-16">
            <Carousel 
              className="w-full"
              opts={{
                align: "start",
                loop: true,
              }}
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {pcs.map((pc) => (
                  <CarouselItem key={pc.id} className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                    <Card
                      className={`relative bg-gray-900/80 backdrop-blur-sm border-2 transition-all duration-500 hover:scale-105 floating-animation ${
                        pc.highlight 
                          ? 'border-pink-400 shadow-[0_0_20px_rgba(236,72,153,0.6)]' 
                          : hoveredId === pc.id 
                            ? borderColors[pc.id] || 'border-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.3)]'
                            : 'border-gray-700'
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
                          <span className="bg-gradient-to-r from-pink-400 to-purple-500 px-4 py-2 rounded-full text-sm font-bold border-2 border-pink-400 shadow-[0_0_15px_rgba(236,72,153,0.6)]">
                            MAIS VENDIDO
                          </span>
                        </div>
                      )}
                      
                      {/* PC Image */}
                      <div className="relative h-40 overflow-hidden rounded-t-lg mt-2">
                        <img 
                          src="/lovable-uploads/f8260b15-2b51-400a-8d32-6242095a4419.png" 
                          alt={pc.name}
                          className="w-full h-full object-contain bg-gray-800 p-2"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent"></div>
                      </div>
                      
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg font-bold text-cyan-400">
                          {pc.name}
                        </CardTitle>
                        <CardDescription className="text-gray-300 text-sm">
                          {pc.description}
                        </CardDescription>
                        <div className="text-xl font-bold text-white">
                          {pc.price}
                        </div>
                      </CardHeader>
                      
                      <CardContent className="pt-0">
                        <div className="space-y-2 mb-3">
                          {pc.specs.map((spec, index) => (
                            <div key={index} className="flex items-center text-gray-300 text-sm">
                              {index === 0 && <Cpu className="mr-2 h-3 w-3 text-cyan-400" />}
                              {index === 1 && <Zap className="mr-2 h-3 w-3 text-cyan-400" />}
                              {index === 2 && <HardDrive className="mr-2 h-3 w-3 text-cyan-400" />}
                              {index === 3 && <Monitor className="mr-2 h-3 w-3 text-cyan-400" />}
                              <span>{spec}</span>
                            </div>
                          ))}
                        </div>
                        
                        <Button 
                          onClick={() => navigate(`/pc/${pc.id}`)}
                          className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 border border-cyan-400 transition-all duration-300 text-sm py-2"
                        >
                          QUERO ESTE PC
                        </Button>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="text-white bg-gradient-to-r from-cyan-500 to-purple-600 border-2 border-cyan-400 hover:from-cyan-400 hover:to-purple-500 hover:border-purple-400 -left-12 w-10 h-10 shadow-[0_0_20px_rgba(34,211,238,0.5)] transition-all duration-300" />
              <CarouselNext className="text-white bg-gradient-to-r from-cyan-500 to-purple-600 border-2 border-cyan-400 hover:from-cyan-400 hover:to-purple-500 hover:border-purple-400 -right-12 w-10 h-10 shadow-[0_0_20px_rgba(34,211,238,0.5)] transition-all duration-300" />
            </Carousel>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-gray-800 px-4 py-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400 text-sm md:text-base">
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
