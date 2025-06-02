
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Cpu, HardDrive, Monitor, Zap, MessageCircle, Shield, Award, Truck } from "lucide-react";
import { ProductPageBackground } from "@/components/ProductPageBackground";

const PcDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/5543984273723', '_blank');
  };

  const pcs = [
    {
      id: 1,
      name: "GAMER ENTRY",
      price: "R$ 2.499",
      description: "Perfeito para jogos em 1080p",
      fullDescription: "PC ideal para quem está começando no mundo gamer. Com componentes selecionados para oferecer a melhor experiência em jogos 1080p com configurações altas. Perfeito para títulos como Valorant, CS2, League of Legends e muito mais!",
      specs: ["Ryzen 5 4600G", "16GB DDR4 3200MHz", "SSD 480GB Kingston", "GTX 1660 Super 6GB"],
      detailedSpecs: [
        "Processador AMD Ryzen 5 4600G 6-core/12-threads",
        "Memória RAM 16GB DDR4 3200MHz (2x8GB)",
        "Armazenamento SSD 480GB Kingston NV2",
        "Placa de Vídeo GTX 1660 Super 6GB GDDR6",
        "Placa-mãe B450M compatível",
        "Fonte 500W 80+ Bronze",
        "Gabinete Gamer com RGB"
      ]
    },
    {
      id: 2,
      name: "GAMER PRO",
      price: "R$ 3.799",
      description: "Alta performance para jogos em 1440p",
      fullDescription: "Nossa configuração mais popular! PC com excelente custo-benefício para jogos em 1440p e trabalhos de produtividade. Roda qualquer jogo atual em configurações altas/ultra com ótimo desempenho.",
      specs: ["Ryzen 5 5600X", "16GB DDR4 3200MHz", "SSD 1TB", "RTX 3060 Ti 8GB"],
      detailedSpecs: [
        "Processador AMD Ryzen 5 5600X 6-core/12-threads",
        "Memória RAM 16GB DDR4 3200MHz (2x8GB)",
        "Armazenamento SSD 1TB NVMe",
        "Placa de Vídeo RTX 3060 Ti 8GB GDDR6",
        "Placa-mãe B550M com WiFi",
        "Fonte 650W 80+ Gold",
        "Gabinete Gamer RGB Premium"
      ]
    },
    {
      id: 3,
      name: "CREATOR BEAST",
      price: "R$ 5.299",
      description: "Máximo desempenho para criação e jogos 4K",
      fullDescription: "A besta suprema! PC de alta performance para criadores de conteúdo, streamers e gamers exigentes. Perfeito para jogos 4K, edição de vídeo 4K, streaming e workstation profissional.",
      specs: ["Ryzen 7 5800X", "32GB DDR4", "SSD 1TB + HDD 2TB", "RTX 4070 12GB"],
      detailedSpecs: [
        "Processador AMD Ryzen 7 5800X 8-core/16-threads",
        "Memória RAM 32GB DDR4 3200MHz (2x16GB)",
        "SSD 1TB NVMe + HDD 2TB 7200RPM",
        "Placa de Vídeo RTX 4070 12GB GDDR6X",
        "Placa-mãe X570 com WiFi 6",
        "Fonte 750W 80+ Gold Modular",
        "Gabinete Full Tower RGB Premium"
      ]
    }
  ];

  const currentPc = pcs.find(pc => pc.id === parseInt(id || '1')) || pcs[0];

  // Reordered carousel images - last image is now first
  const carouselImages = [
    "/lovable-uploads/f8260b15-2b51-400a-8d32-6242095a4419.png",
    "/lovable-uploads/b63993e7-3962-4d10-9055-952ee2c0d607.png",
    "/lovable-uploads/24481fb9-70f0-4920-a3ef-371d05e6006b.png"
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Product Page Background */}
      <ProductPageBackground />

      {/* Header */}
      <header className="relative z-10 border-b border-gray-800 px-4 py-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Button
            onClick={() => navigate('/pcs')}
            variant="ghost"
            className="text-cyan-400 hover:text-cyan-300 hover:bg-gray-900"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar aos PCs
          </Button>
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            {currentPc.name}
          </h1>
          <div className="w-20"></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Column - Carousel */}
            <div className="space-y-6">
              <Carousel className="w-full">
                <CarouselContent>
                  {carouselImages.map((image, index) => (
                    <CarouselItem key={index}>
                      <div className="aspect-square rounded-lg overflow-hidden bg-gray-900/80 backdrop-blur-sm border border-gray-700">
                        <img
                          src={image}
                          alt={`${currentPc.name} - Vista ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="text-cyan-400 border-cyan-400 hover:bg-cyan-400/10" />
                <CarouselNext className="text-cyan-400 border-cyan-400 hover:bg-cyan-400/10" />
              </Carousel>
              
              {/* Quick Benefits */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-900/50 backdrop-blur-sm rounded-lg border border-gray-700">
                  <Shield className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-300">Garantia Total</p>
                </div>
                <div className="text-center p-4 bg-gray-900/50 backdrop-blur-sm rounded-lg border border-gray-700">
                  <Award className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-300">Testado 100%</p>
                </div>
                <div className="text-center p-4 bg-gray-900/50 backdrop-blur-sm rounded-lg border border-gray-700">
                  <Truck className="w-8 h-8 text-pink-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-300">Envio Seguro</p>
                </div>
              </div>
            </div>

            {/* Right Column - Details */}
            <div className="space-y-6">
              <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-700">
                <CardHeader>
                  <CardTitle className="text-3xl font-bold text-cyan-400">
                    {currentPc.name}
                  </CardTitle>
                  <CardDescription className="text-lg text-gray-300">
                    {currentPc.description}
                  </CardDescription>
                  <div className="text-4xl font-bold text-white">
                    {currentPc.price}
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-cyan-400 mb-3">Descrição</h3>
                    <p className="text-gray-300 leading-relaxed">
                      {currentPc.fullDescription}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-cyan-400 mb-3">Especificações Técnicas</h3>
                    <div className="space-y-3">
                      {currentPc.detailedSpecs.map((spec, index) => (
                        <div key={index} className="flex items-start text-gray-300">
                          <div className="mr-3 mt-1">
                            {index === 0 && <Cpu className="h-4 w-4 text-cyan-400" />}
                            {index === 1 && <Zap className="h-4 w-4 text-purple-400" />}
                            {index === 2 && <HardDrive className="h-4 w-4 text-pink-400" />}
                            {index === 3 && <Monitor className="h-4 w-4 text-green-400" />}
                            {index > 3 && <div className="w-2 h-2 bg-cyan-400 rounded-full mt-1.5"></div>}
                          </div>
                          <span className="flex-1">{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4 pt-4">
                    <Button 
                      onClick={handleWhatsAppClick}
                      className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-lg py-6 transition-all duration-300 transform hover:scale-105"
                    >
                      <MessageCircle className="mr-2 h-5 w-5" />
                      COMPRAR VIA WHATSAPP
                    </Button>
                    
                    <Button 
                      onClick={handleWhatsAppClick}
                      variant="outline"
                      className="w-full border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 text-lg py-6"
                    >
                      DÚVIDAS E SUPORTE
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-gray-800 px-4 py-8 mt-12">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">
            <span className="text-cyan-400 font-semibold">Retirada local</span> em Londrina-PR • 
            <span className="text-purple-400 font-semibold"> Envio seguro</span> via Sedex para todo Brasil
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PcDetailPage;
