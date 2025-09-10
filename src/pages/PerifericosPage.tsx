
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Headphones, Keyboard, Mouse, Gamepad2, Monitor, Speaker, Webcam, MousePointer, Mic, Camera, Volume2, Cpu } from "lucide-react";
import { ProductPageBackground } from "@/components/ProductPageBackground";
import { useState } from "react";
import { useProducts } from "@/contexts/ProductsContext";

const PerifericosPage = () => {
  const navigate = useNavigate();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const { perifericos, loading } = useProducts();

  // Separar periféricos por categoria
  const perifericosCategories = {
    combos: perifericos.filter(p => p.category === 'combo'),
    audio: perifericos.filter(p => p.category === 'audio'),
    controles: perifericos.filter(p => p.category === 'controle'),
    video: perifericos.filter(p => p.category === 'video'),
    setup: perifericos.filter(p => p.category === 'setup')
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const getIcon = (category: string) => {
    switch (category) {
      case 'combo': return <Gamepad2 className="w-16 h-16 text-pink-400" />;
      case 'audio': return <Headphones className="w-16 h-16 text-pink-400" />;
      case 'controle': return <Mouse className="w-16 h-16 text-pink-400" />;
      case 'video': return <Monitor className="w-16 h-16 text-pink-400" />;
      case 'setup': return <Cpu className="w-16 h-16 text-pink-400" />;
      default: return <Gamepad2 className="w-16 h-16 text-pink-400" />;
    }
  };

  const renderProducts = (products: any[]) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
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
          {item.highlight && item.highlight_text && (
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
              <span className="bg-gradient-to-r from-pink-400 to-orange-500 px-4 py-2 rounded-full text-sm font-bold border-2 border-pink-400 shadow-[0_0_15px_rgba(236,72,153,0.6)]">
                {item.highlight_text}
              </span>
            </div>
          )}
          
          {/* Image or Icon */}
          <div className="relative h-56 md:h-64 overflow-hidden rounded-t-lg mt-2 mx-2 flex items-center justify-center">
            {item.image ? (
              <img 
                src={item.image} 
                alt={item.name}
                className="w-full h-full object-cover"
                style={{ objectFit: 'cover', objectPosition: 'center' }}
              />
            ) : (
              <div className="bg-gradient-to-br from-gray-800 to-gray-700 w-full h-full flex items-center justify-center">
                {getIcon(item.category)}
              </div>
            )}
          </div>
          
          <CardHeader>
            <CardTitle className="text-xl font-bold text-pink-400">
              {item.name}
            </CardTitle>
            <CardDescription className="text-gray-300">
              {item.description}
            </CardDescription>
            <div className="text-2xl font-bold text-white">
              {formatPrice(item.price)}
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-2 mb-6">
              {item.specs && item.specs.map((spec: string, index: number) => (
                <div key={index} className="flex items-center text-gray-300 text-sm">
                  <div className="w-2 h-2 bg-pink-400 rounded-full mr-2"></div>
                  <span>{spec}</span>
                </div>
              ))}
            </div>
            
            <Button 
              onClick={() => window.open('https://wa.me/5543988176106', '_blank')}
              className="w-full bg-gradient-to-r from-pink-500 to-orange-600 hover:from-pink-400 hover:to-orange-500 border border-pink-400 transition-all duration-300"
            >
              QUERO ESTE
            </Button>
          </CardContent>
        </Card>
      ))}
      
      {products.length === 0 && !loading && (
        <div className="col-span-full text-center py-12 text-gray-400">
          <p className="text-lg">Nenhum periférico cadastrado nesta categoria ainda.</p>
        </div>
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white relative overflow-hidden flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-pink-400 mx-auto mb-4"></div>
          <p className="text-pink-400">Carregando periféricos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
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
                Combos ({perifericosCategories.combos.length})
              </TabsTrigger>
              <TabsTrigger value="audio" className="data-[state=active]:bg-pink-400 data-[state=active]:text-black">
                Áudio ({perifericosCategories.audio.length})
              </TabsTrigger>
              <TabsTrigger value="controles" className="data-[state=active]:bg-pink-400 data-[state=active]:text-black">
                Controles ({perifericosCategories.controles.length})
              </TabsTrigger>
              <TabsTrigger value="video" className="data-[state=active]:bg-pink-400 data-[state=active]:text-black">
                Vídeo ({perifericosCategories.video.length})
              </TabsTrigger>
              <TabsTrigger value="setup" className="data-[state=active]:bg-pink-400 data-[state=active]:text-black">
                Setup ({perifericosCategories.setup.length})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="combos">{renderProducts(perifericosCategories.combos)}</TabsContent>
            <TabsContent value="audio">{renderProducts(perifericosCategories.audio)}</TabsContent>
            <TabsContent value="controles">{renderProducts(perifericosCategories.controles)}</TabsContent>
            <TabsContent value="video">{renderProducts(perifericosCategories.video)}</TabsContent>
            <TabsContent value="setup">{renderProducts(perifericosCategories.setup)}</TabsContent>
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
        `}
      </style>
    </div>
  );
};

export default PerifericosPage;
