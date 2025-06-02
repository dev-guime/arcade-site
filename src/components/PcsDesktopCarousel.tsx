
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { PcCard } from "@/components/PcCard";

interface PcsDesktopCarouselProps {
  pcs: Array<{
    id: number;
    name: string;
    price: string;
    description: string;
    specs: string[];
    highlight: boolean;
  }>;
  hoveredId: number | null;
  borderColors: {[key: number]: string};
  setHoveredId: (id: number | null) => void;
}

export const PcsDesktopCarousel = ({ pcs, hoveredId, borderColors, setHoveredId }: PcsDesktopCarouselProps) => {
  return (
    <div className="hidden md:block relative px-24 py-12">
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
              <PcCard
                pc={pc}
                hoveredId={hoveredId}
                borderColors={borderColors}
                onMouseEnter={() => setHoveredId(pc.id)}
                onMouseLeave={() => setHoveredId(null)}
                variant="desktop"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="text-white bg-gradient-to-r from-cyan-500 to-purple-600 border-2 border-cyan-400 hover:from-cyan-400 hover:to-purple-500 hover:border-purple-400 -left-12 w-10 h-10 shadow-[0_0_20px_rgba(34,211,238,0.5)] transition-all duration-300" />
        <CarouselNext className="text-white bg-gradient-to-r from-cyan-500 to-purple-600 border-2 border-cyan-400 hover:from-cyan-400 hover:to-purple-500 hover:border-purple-400 -right-12 w-10 h-10 shadow-[0_0_20px_rgba(34,211,238,0.5)] transition-all duration-300" />
      </Carousel>
    </div>
  );
};
