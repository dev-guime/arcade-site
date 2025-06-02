
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Headphones, Keyboard, Mouse, Gamepad2, Monitor, Speaker, Webcam, MousePointer, Mic, Camera, Volume2 } from "lucide-react";
import { ProductPageBackground } from "@/components/ProductPageBackground";
import { useState } from "react";

const PerifericosPage = () => {
  const navigate = useNavigate();
  const [hoveredId, setHoveredId] = useState<number | null>(null);

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
    },
    {
      id: 5,
      name: "MONITOR 24' 144HZ",
      price: "R$ 899",
      description: "Monitor gamer com alta taxa de atualização",
      specs: ["24 polegadas", "144Hz", "1ms", "FreeSync"],
      highlight: false
    },
    {
      id: 6,
      name: "WEBCAM 4K",
      price: "R$ 299",
      description: "Webcam profissional para streaming",
      specs: ["4K 30fps", "Autofoco", "Microfone integrado", "USB 3.0"],
      highlight: false
    },
    {
      id: 7,
      name: "CAIXA DE SOM RGB",
      price: "R$ 179",
      description: "Som potente com efeitos RGB",
      specs: ["40W RMS", "Bluetooth 5.0", "RGB Sincronizado", "Controle remoto"],
      highlight: false
    },
    {
      id: 8,
      name: "MOUSEPAD XXL",
      price: "R$ 79",
      description: "Mousepad grande com bordas costuradas",
      specs: ["90x40cm", "Base antiderrapante", "Bordas costuradas", "Superfície lisa"],
      highlight: false
    },
    {
      id: 9,
      name: "MICROFONE STREAM",
      price: "R$ 359",
      description: "Microfone profissional para streaming",
      specs: ["Condensador", "USB plug & play", "Padrão cardioide", "Braço articulado"],
      highlight: false
    },
    {
      id: 10,
      name: "CONTROLE WIRELESS",
      price: "R$ 189",
      description: "Controle sem fio para PC",
      specs: ["Bluetooth 5.0", "Vibração dual", "40h bateria", "RGB personalizável"],
      highlight: false
    },
    {
      id: 11,
      name: "MONITOR ULTRAWIDE",
      price: "R$ 1.599",
      description: "Monitor ultrawide 34' curvo",
      specs: ["34 polegadas", "100Hz", "1440p", "Curvo"],
      highlight: false
    },
    {
      id: 12,
      name: "KIT ILUMINAÇÃO",
      price: "R$ 129",
      description: "Kit RGB para setup gamer",
      specs: ["Fita LED 5m", "Controle remoto", "16 milhões cores", "Sincronização"],
      highlight: false
    },
    {
      id: 13,
      name: "COOLER RGB",
      price: "R$ 89",
      description: "Cooler com iluminação RGB",
      specs: ["120mm", "RGB ajustável", "Baixo ruído", "PWM"],
      highlight: false
    }
  ];

  const getIcon = (name: string) => {
    if (name.includes("COMBO")) return <Gamepad2 className="w-16 h-16 text-pink-400" />;
    if (name.includes("HEADSET")) return <Headphones className="w-16 h-16 text-pink-400" />;
    if (name.includes("TECLADO")) return <Keyboard className="w-16 h-16 text-pink-400" />;
    if (name.includes("MOUSE") && !name.includes("MOUSEPAD")) return <Mouse className="w-16 h-16 text-pink-400" />;
    if (name.includes("MONITOR")) return <Monitor className="w-16 h-16 text-pink-400" />;
    if (name.includes("WEBCAM")) return <Camera className="w-16 h-16 text-pink-400" />;
    if (name.includes("CAIXA")) return <Speaker className="w-16 h-16 text-pink-400" />;
    if (name.includes("MOUSEPAD")) return <MousePointer className="w-16 h-16 text-pink-400" />;
    if (name.includes("MICROFONE")) return <Mic className="w-16 h-16 text-pink-400" />;
    if (name.includes("CONTROLE")) return <Gamepad2 className="w-16 h-16 text-pink-400" />;
    if (name.includes("KIT")) return <Volume2 className="w-16 h-16 text-pink-400" />;
    return <Gamepad2 className="w-16 h-16 text-pink-400" />;
  };

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

      {/* Periféricos Carousel */}
      <main className="relative z-10 px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <Carousel className="w-full">
            <CarouselContent className="-ml-2 md:-ml-4">
              {perifericos.map((item) => (
                <CarouselItem key={item.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                  <Card
                    className={`relative bg-gray-900/80 backdrop-blur-sm border-2 transition-all duration-500 hover:scale-105 hover:shadow-[0_0_30px_rgba(236,72,153,0.3)] floating-animation ${
                      item.highlight 
                        ? 'border-pink-400 shadow-[0_0_20px_rgba(236,72,153,0.6)]' 
                        : 'border-gray-700 hover:border-pink-400'
                    } ${
                      hoveredId !== null && hoveredId !== item.id 
                        ? 'opacity-30 scale-95' 
                        : 'opacity-100'
                    }`}
                    onMouseEnter={() => setHoveredId(item.id)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    {item.highlight && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                        <span className="bg-gradient-to-r from-pink-400 to-orange-500 px-4 py-2 rounded-full text-sm font-bold border-2 border-pink-400 shadow-[0_0_15px_rgba(236,72,153,0.6)]">
                          MAIS VENDIDO
                        </span>
                      </div>
                    )}
                    
                    {/* Placeholder Image */}
                    <div className="relative h-40 bg-gradient-to-br from-gray-800 to-gray-700 flex items-center justify-center rounded-t-lg mt-2">
                      {getIcon(item.name)}
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
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="text-pink-400 border-pink-400 hover:bg-pink-400 hover:text-black -left-12" />
            <CarouselNext className="text-pink-400 border-pink-400 hover:bg-pink-400 hover:text-black -right-12" />
          </Carousel>
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
