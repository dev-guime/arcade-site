
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Cpu, HardDrive, Monitor, Zap } from "lucide-react";
import { SocialIcons } from "@/components/SocialIcons";

const PcsPage = () => {
  const navigate = useNavigate();

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
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 px-4 py-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Button
            onClick={() => navigate('/')}
            variant="ghost"
            className="text-cyan-400 hover:text-cyan-300 hover:bg-gray-900"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            NOSSOS PC'S GAMER
          </h1>
          <div className="w-20"></div>
        </div>
      </header>

      {/* Social Icons */}
      <SocialIcons />

      {/* PCs Grid */}
      <main className="px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pcs.map((pc) => (
              <Card
                key={pc.id}
                className={`relative bg-gray-900 border-2 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] animate-pulse ${
                  pc.highlight 
                    ? 'border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.4)]' 
                    : 'border-gray-700 hover:border-cyan-400'
                } floating-animation`}
              >
                {pc.highlight && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
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
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 px-4 py-8">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">
            Entre em contato via WhatsApp para mais detalhes e montagem personalizada
          </p>
        </div>
      </footer>

      <style jsx>{`
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
      `}</style>
    </div>
  );
};

export default PcsPage;
