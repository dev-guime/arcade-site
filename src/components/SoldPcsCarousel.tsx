
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
    <section className="relative z-10 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">
          <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            PCs Já Entregues
          </span>
        </h2>
        
        <Carousel className="w-full">
          <CarouselContent className="-ml-2 md:-ml-4">
            {soldPcs.map((pc) => (
              <CarouselItem key={pc.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <Card className="bg-gray-900/80 backdrop-blur-sm border border-gray-700 hover:border-cyan-400 transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]">
                  <div className="relative h-48 overflow-hidden rounded-t-lg">
                    <img 
                      src={pc.image} 
                      alt={pc.name}
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
                    <Badge className="absolute top-2 right-2 bg-green-500 hover:bg-green-600">
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
          <CarouselPrevious className="text-cyan-400 border-cyan-400 hover:bg-cyan-400 hover:text-black" />
          <CarouselNext className="text-cyan-400 border-cyan-400 hover:bg-cyan-400 hover:text-black" />
        </Carousel>
      </div>
    </section>
  );
};
