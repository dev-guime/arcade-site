import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Headphones, Keyboard, Mouse, Gamepad2, Monitor, Speaker, Webcam, MousePointer, Mic, Camera, Volume2, Cpu } from "lucide-react";
import { ProductPageBackground } from "@/components/ProductPageBackground";
import { useState } from "react";

const PerifericosPage = () => {
  const navigate = useNavigate();
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const perifericos = {
    combos: [
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
        name: "COMBO STREAMER",
        price: "R$ 459",
        description: "Kit completo para streaming",
        specs: ["Microfone USB", "Webcam 4K", "Headset Pro", "Iluminação RGB"],
        highlight: false
      }
    ],
    audio: [
      {
        id: 3,
        name: "HEADSET PRO",
        price: "R$ 199",
        description: "Audio premium para jogos",
        specs: ["Drivers 50mm", "Microfone Removível", "Almofadas Confortáveis", "Cabo 2m"],
        highlight: false
      },
      {
        id: 4,
        name: "CAIXA DE SOM RGB",
        price: "R$ 179",
        description: "Som potente com efeitos RGB",
        specs: ["40W RMS", "Bluetooth 5.0", "RGB Sincronizado", "Controle remoto"],
        highlight: false
      },
      {
        id: 5,
        name: "MICROFONE STREAM",
        price: "R$ 359",
        description: "Microfone profissional para streaming",
        specs: ["Condensador", "USB plug & play", "Padrão cardioide", "Braço articulado"],
        highlight: false
      }
    ],
    controles: [
      {
        id: 6,
        name: "TECLADO MECÂNICO",
        price: "R$ 249",
        description: "Switch azul com RGB",
        specs: ["Switch Outemu Blue", "RGB Individual", "Anti-Ghosting", "Cabo USB-C"],
        highlight: false
      },
      {
        id: 7,
        name: "MOUSE GAMER PRO",
        price: "R$ 149",
        description: "Precisão máxima para FPS",
        specs: ["12000 DPI", "8 Botões", "RGB Customizável", "Sensor Óptico"],
        highlight: false
      },
      {
        id: 8,
        name: "CONTROLE WIRELESS",
        price: "R$ 189",
        description: "Controle sem fio para PC",
        specs: ["Bluetooth 5.0", "Vibração dual", "40h bateria", "RGB personalizável"],
        highlight: false
      },
      {
        id: 9,
        name: "MOUSEPAD XXL",
        price: "R$ 79",
        description: "Mousepad grande com bordas costuradas",
        specs: ["90x40cm", "Base antiderrapante", "Bordas costuradas", "Superfície lisa"],
        highlight: false
      }
    ],
    video: [
      {
        id: 10,
        name: "MONITOR 24' 144HZ",
        price: "R$ 899",
        description: "Monitor gamer com alta taxa de atualização",
        specs: ["24 polegadas", "144Hz", "1ms", "FreeSync"],
        highlight: false
      },
      {
        id: 11,
        name: "WEBCAM 4K",
        price: "R$ 299",
        description: "Webcam profissional para streaming",
        specs: ["4K 30fps", "Autofoco", "Microfone integrado", "USB 3.0"],
        highlight: false
      },
      {
        id: 12,
        name: "MONITOR ULTRAWIDE",
        price: "R$ 1.599",
        description: "Monitor ultrawide 34' curvo",
        specs: ["34 polegadas", "100Hz", "1440p", "Curvo"],
        highlight: false
      }
    ],
    setup: [
      {
        id: 13,
        name: "KIT ILUMINAÇÃO",
        price: "R$ 129",
        description: "Kit RGB para setup gamer",
        specs: ["Fita LED 5m", "Controle remoto", "16 milhões cores", "Sincronização"],
        highlight: false
      },
      {
        id: 14,
        name: "COOLER RGB",
        price: "R$ 89",
        description: "Cooler com iluminação RGB",
        specs: ["120mm", "RGB ajustável", "Baixo ruído", "PWM"],
        highlight: false
      },
      {
        id: 15,
        name: "SUPORTE MONITOR",
        price: "R$ 159",
        description: "Suporte articulado para monitor",
        specs: ["Até 32 polegadas", "Rotação 360°", "Altura ajustável", "Base robusta"],
        highlight: false
      }
    ]
  };

  const getIcon = (name: string) => {
    if (name.includes("COMBO")) return <Gamepad2 className="w-16 h-16 text-pink-400" />;
    if (name.includes("HEADSET") || name.includes("CAIXA") || name.includes("MICROFONE")) return <Headphones className="w-16 h-16 text-pink-400" />;
    if (name.includes("TECLADO")) return <Keyboard className="w-16 h-16 text-pink-400" />;
    if (name.includes("MOUSE") && !name.includes("MOUSEPAD")) return <Mouse className="w-16 h-16 text-pink-400" />;
    if (name.includes("CONTROLE")) return <Gamepad2 className="w-16 h-16 text-pink-400" />;
    if (name.includes("MONITOR")) return <Monitor className="w-16 h-16 text-pink-400" />;
    if (name.includes("WEBCAM")) return <Camera className="w-16 h-16 text-pink-400" />;
    if (name.includes("MOUSEPAD")) return <MousePointer className="w-16 h-16 text-pink-400" />;
    if (name.includes("KIT") || name.includes("COOLER") || name.includes("SUPORTE")) return <Cpu className="w-16 h-16 text-pink-400" />;
    return <Gamepad2 className="w-16 h-16 text-pink-400" />;
  };

  const renderProducts = (products: any[]) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
      {products.map((item) => (
        <Card
          key={item.id}
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
          <div className="relative h-48 bg-gradient-to-br from-gray-800 to-gray-700 flex items-center justify-center rounded-t-lg mt-2 mx-2">
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
              {item.specs.map((spec: string, index: number) => (
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
  );

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

      {/* Periféricos Tabs */}
      <main className="relative z-10 px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <Tabs defaultValue="combos" className="w-full">
            <TabsList className="grid w-full grid-cols-5 bg-gray-900/50 border border-gray-700 mb-8">
              <TabsTrigger value="combos" className="data-[state=active]:bg-pink-400 data-[state=active]:text-black">
                Combos
              </TabsTrigger>
              <TabsTrigger value="audio" className="data-[state=active]:bg-pink-400 data-[state=active]:text-black">
                Áudio
              </TabsTrigger>
              <TabsTrigger value="controles" className="data-[state=active]:bg-pink-400 data-[state=active]:text-black">
                Controles
              </TabsTrigger>
              <TabsTrigger value="video" className="data-[state=active]:bg-pink-400 data-[state=active]:text-black">
                Vídeo
              </TabsTrigger>
              <TabsTrigger value="setup" className="data-[state=active]:bg-pink-400 data-[state=active]:text-black">
                Setup
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="combos">{renderProducts(perifericos.combos)}</TabsContent>
            <TabsContent value="audio">{renderProducts(perifericos.audio)}</TabsContent>
            <TabsContent value="controles">{renderProducts(perifericos.controles)}</TabsContent>
            <TabsContent value="video">{renderProducts(perifericos.video)}</TabsContent>
            <TabsContent value="setup">{renderProducts(perifericos.setup)}</TabsContent>
          </Tabs>
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
