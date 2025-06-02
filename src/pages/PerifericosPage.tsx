
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Headphones, Keyboard, Mouse, Gamepad2 } from "lucide-react";
import { ProductPageBackground } from "@/components/ProductPageBackground";

const PerifericosPage = () => {
  const navigate = useNavigate();

  const perifericos = [
    {
      id: 1,
      name: "COMBO GAMER RGB",
      price: "R$ 299",
      description: "Teclado + Mouse + Headset com RGB",
      specs: ["Teclado Mecânico RGB", "Mouse 6400 DPI", "Headset 7.1", "Mousepad Grande"],
      highlight: true
    },
    {
      id: 2,
      name: "HEADSET PRO",
      price: "R$ 199",
      description: "Audio premium para jogos",
      specs: ["Drivers 50mm", "Microfone Removível", "Almofadas Confortáveis", "Cabo 2m"],
      highlight: false
    },
    {
      id: 3,
      name: "TECLADO MECÂNICO",
      price: "R$ 249",
      description: "Switch azul com RGB",
      specs: ["Switch Outemu Blue", "RGB Individual", "Anti-Ghosting", "Cabo USB-C"],
      highlight: false
    },
    {
      id: 4,
      name: "MOUSE GAMER PRO",
      price: "R$ 149",
      description: "Precisão máxima para FPS",
      specs: ["12000 DPI", "8 Botões", "RGB Customizável", "Sensor Óptico"],
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
            className="text-pink-400 hover:text-pink-300 hover:bg-gray-900"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-pink-400 to-orange-500 bg-clip-text text-transparent">
            NOSSOS PERIFÉRICOS
          </h1>
          <div className="w-20"></div>
        </div>
      </header>

      {/* Periféricos Grid */}
      <main className="relative z-10 px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8">
            {perifericos.map((item) => (
              <Card
                key={item.id}
                className={`relative bg-gray-900/80 backdrop-blur-sm border-2 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(236,72,153,0.3)] ${
                  item.highlight 
                    ? 'border-pink-400 shadow-[0_0_20px_rgba(236,72,153,0.4)]' 
                    : 'border-gray-700 hover:border-pink-400'
                } floating-animation`}
              >
                {item.highlight && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-pink-400 to-orange-500 px-4 py-1 rounded-full text-sm font-bold">
                      MAIS VENDIDO
                    </span>
                  </div>
                )}
                
                {/* Placeholder Image */}
                <div className="relative h-40 bg-gradient-to-br from-gray-800 to-gray-700 flex items-center justify-center rounded-t-lg">
                  {item.name.includes("COMBO") && <Gamepad2 className="w-16 h-16 text-pink-400" />}
                  {item.name.includes("HEADSET") && <Headphones className="w-16 h-16 text-pink-400" />}
                  {item.name.includes("TECLADO") && <Keyboard className="w-16 h-16 text-pink-400" />}
                  {item.name.includes("MOUSE") && <Mouse className="w-16 h-16 text-pink-400" />}
                </div>
                
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-pink-400">
                    {item.name}
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    {item.description}
                  </CardDescription>
                  <div className="text-2xl font-bold text-white">
                    {item.price}
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-2 mb-6">
                    {item.specs.map((spec, index) => (
                      <div key={index} className="flex items-center text-gray-300 text-sm">
                        <div className="w-2 h-2 bg-pink-400 rounded-full mr-2"></div>
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    onClick={() => window.open('https://wa.me/5543984273723', '_blank')}
                    className="w-full bg-gradient-to-r from-pink-500 to-orange-600 hover:from-pink-400 hover:to-orange-500 border border-pink-400 transition-all duration-300"
                  >
                    QUERO ESTE
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-gray-800 px-4 py-8">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">
            <span className="text-pink-400 font-semibold">Retirada local</span> em Londrina-PR • 
            <span className="text-orange-400 font-semibold"> Envio seguro</span> via Sedex para todo Brasil
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

export default PerifericosPage;
