
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const SoldPcsCarousel = () => {
  const soldPcs = [
    {
      id: 1,
      name: "GAMER DESTROYER",
      customer: "João - São Paulo",
      description: "Entregue em janeiro de 2024",
      specs: ["RTX 4070", "Ryzen 7 5800X", "32GB DDR4", "SSD 2TB"],
      image: "/lovable-uploads/f8260b15-2b51-400a-8d32-6242095a4419.png"
    },
    {
      id: 2,
      name: "CREATOR SUPREME",
      customer: "Maria - Rio de Janeiro",
      description: "Entregue em dezembro de 2023",
      specs: ["RTX 4080", "Ryzen 9 5900X", "64GB DDR4", "SSD 4TB"],
      image: "/lovable-uploads/f8260b15-2b51-400a-8d32-6242095a4419.png"
    },
    {
      id: 3,
      name: "GAMER ULTRA MAX",
      customer: "Pedro - Curitiba",
      description: "Entregue em novembro de 2023",
      specs: ["RTX 4090", "Ryzen 9 7900X", "64GB DDR5", "SSD 8TB"],
      image: "/lovable-uploads/f8260b15-2b51-400a-8d32-6242095a4419.png"
    },
    {
      id: 4,
      name: "STREAMER PRO",
      customer: "Ana - Brasília",
      description: "Entregue em outubro de 2023",
      specs: ["RTX 3080", "Ryzen 7 5700X", "32GB DDR4", "SSD 2TB"],
      image: "/lovable-uploads/f8260b15-2b51-400a-8d32-6242095a4419.png"
    },
    {
      id: 5,
      name: "OFFICE PREMIUM",
      customer: "Carlos - Londrina",
      description: "Entregue em setembro de 2023",
      specs: ["RTX 3060", "Ryzen 5 5600X", "16GB DDR4", "SSD 1TB"],
      image: "/lovable-uploads/f8260b15-2b51-400a-8d32-6242095a4419.png"
    }
  ];

  return (
    <section className="relative z-10 py-8 md:py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-bold text-center mb-8 md:mb-12">
          <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            PCs Já Entregues
          </span>
        </h2>
        
        {/* Mobile Horizontal Scroll */}
        <div className="block md:hidden">
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex space-x-4 pb-4">
              {soldPcs.map((pc) => (
                <Card key={pc.id} className="w-72 flex-none bg-gray-900/80 backdrop-blur-sm border border-gray-700 hover:border-cyan-400 transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]">
                  <div className="relative h-48 overflow-hidden rounded-t-lg">
                    <img 
                      src={pc.image} 
                      alt={pc.name}
                      className="w-full h-full object-contain bg-gray-800 p-2"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent"></div>
                    <Badge className="absolute top-4 right-4 bg-green-500 hover:bg-green-600 text-white font-bold text-xs">
                      ENTREGUE
                    </Badge>
                  </div>
                  
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-bold text-cyan-400">
                      {pc.name}
                    </CardTitle>
                    <CardDescription className="text-gray-300 text-sm">
                      Cliente: {pc.customer}
                    </CardDescription>
                    <p className="text-xs text-gray-400">{pc.description}</p>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="space-y-1">
                      {pc.specs.map((spec, index) => (
                        <div key={index} className="flex items-center text-gray-300 text-xs">
                          <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-2 flex-shrink-0"></div>
                          <span className="truncate">{spec}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <ScrollBar orientation="horizontal" className="bg-gray-700" />
          </ScrollArea>
          <div className="text-center mt-4">
            <p className="text-gray-400 text-sm flex items-center justify-center gap-2">
              <ChevronLeft className="w-4 h-4" />
              Deslize para ver mais
              <ChevronRight className="w-4 h-4" />
            </p>
          </div>
        </div>
        
        {/* Desktop Carousel */}
        <div className="hidden md:block relative">
          <Carousel 
            className="w-full"
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {soldPcs.map((pc) => (
                <CarouselItem key={pc.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="bg-gray-900/80 backdrop-blur-sm border border-gray-700 hover:border-cyan-400 transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]">
                    <div className="relative h-60 overflow-hidden rounded-t-lg">
                      <img 
                        src={pc.image} 
                        alt={pc.name}
                        className="w-full h-full object-contain bg-gray-800 p-4"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent"></div>
                      <Badge className="absolute top-4 right-4 bg-green-500 hover:bg-green-600 text-white font-bold">
                        ENTREGUE
                      </Badge>
                    </div>
                    
                    <CardHeader>
                      <CardTitle className="text-xl font-bold text-cyan-400">
                        {pc.name}
                      </CardTitle>
                      <CardDescription className="text-gray-300">
                        Cliente: {pc.customer}
                      </CardDescription>
                      <p className="text-sm text-gray-400">{pc.description}</p>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="space-y-2">
                        {pc.specs.map((spec, index) => (
                          <div key={index} className="flex items-center text-gray-300 text-sm">
                            <div className="w-2 h-2 bg-cyan-400 rounded-full mr-2"></div>
                            <span>{spec}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="text-white bg-gradient-to-r from-cyan-500 to-purple-600 border-2 border-cyan-400 hover:from-cyan-400 hover:to-purple-500 hover:border-purple-400 -left-16 w-12 h-12 shadow-[0_0_20px_rgba(34,211,238,0.5)] transition-all duration-300" />
            <CarouselNext className="text-white bg-gradient-to-r from-cyan-500 to-purple-600 border-2 border-cyan-400 hover:from-cyan-400 hover:to-purple-500 hover:border-purple-400 -right-16 w-12 h-12 shadow-[0_0_20px_rgba(34,211,238,0.5)] transition-all duration-300" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};
