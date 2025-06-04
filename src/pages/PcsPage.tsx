
import { useState, useEffect } from "react";
import { PcsHeader } from "@/components/PcsHeader";
import { PcsDesktopCarousel } from "@/components/PcsDesktopCarousel";
import { PcsMobileGrid } from "@/components/PcsMobileGrid";
import { PcsFooter } from "@/components/PcsFooter";
import { ProductPageBackground } from "@/components/ProductPageBackground";
import { useProducts } from "@/contexts/ProductsContext";

const PcsPage = () => {
  const { pcs, loading } = useProducts();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [borderColors, setBorderColors] = useState<{[key: string]: string}>({});

  const colors = [
    'border-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.3)]',
    'border-purple-400 shadow-[0_0_30px_rgba(168,85,247,0.3)]',
    'border-pink-400 shadow-[0_0_30px_rgba(236,72,153,0.3)]',
    'border-yellow-400 shadow-[0_0_30px_rgba(250,204,21,0.3)]',
    'border-green-400 shadow-[0_0_30px_rgba(34,197,94,0.3)]',
    'border-red-400 shadow-[0_0_30px_rgba(239,68,68,0.3)]',
    'border-blue-400 shadow-[0_0_30px_rgba(59,130,246,0.3)]',
  ];

  useEffect(() => {
    const newBorderColors: {[key: string]: string} = {};
    pcs.forEach((pc, index) => {
      newBorderColors[pc.id] = colors[index % colors.length];
    });
    setBorderColors(newBorderColors);
  }, [pcs]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-400"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative overflow-x-hidden">
      <ProductPageBackground />
      
      <div className="relative z-10">
        <PcsHeader />
        
        <main className="px-4 md:px-0">
          {/* Desktop Carousel */}
          <PcsDesktopCarousel 
            pcs={pcs}
            hoveredId={hoveredId}
            borderColors={borderColors}
            setHoveredId={setHoveredId}
          />
          
          {/* Mobile Grid */}
          <div className="md:hidden max-w-sm mx-auto py-8">
            <PcsMobileGrid 
              pcs={pcs}
              hoveredId={hoveredId}
              borderColors={borderColors}
              setHoveredId={setHoveredId}
            />
          </div>
        </main>
        
        <PcsFooter />
      </div>
    </div>
  );
};

export default PcsPage;
