
import { ProductPageBackground } from "@/components/ProductPageBackground";
import { PcsHeader } from "@/components/PcsHeader";
import { PcsMobileGrid } from "@/components/PcsMobileGrid";
import { PcsDesktopCarousel } from "@/components/PcsDesktopCarousel";
import { PcsFooter } from "@/components/PcsFooter";
import { useState, useEffect } from "react";
import { pcsData } from "@/data/pcsData";

const PcsPage = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [borderColors, setBorderColors] = useState<{[key: number]: string}>({});

  const colors = [
    'border-green-400 shadow-[0_0_30px_rgba(34,197,94,0.3)]',
    'border-pink-400 shadow-[0_0_30px_rgba(236,72,153,0.3)]',
    'border-red-400 shadow-[0_0_30px_rgba(248,113,113,0.3)]',
    'border-blue-400 shadow-[0_0_30px_rgba(96,165,250,0.3)]',
    'border-purple-400 shadow-[0_0_30px_rgba(168,85,247,0.3)]',
    'border-yellow-400 shadow-[0_0_30px_rgba(251,191,36,0.3)]',
    'border-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.3)]',
    'border-orange-400 shadow-[0_0_30px_rgba(251,146,60,0.3)]'
  ];

  useEffect(() => {
    const newBorderColors: {[key: number]: string} = {};
    pcsData.forEach(pc => {
      newBorderColors[pc.id] = colors[Math.floor(Math.random() * colors.length)];
    });
    setBorderColors(newBorderColors);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden flex flex-col">
      {/* Product Page Background */}
      <ProductPageBackground />

      {/* Header */}
      <PcsHeader />

      {/* PCs Content */}
      <main className="relative z-10 px-4 py-8 flex-1 flex items-center">
        <div className="max-w-6xl mx-auto w-full">
          {/* Mobile Grid Layout */}
          <PcsMobileGrid 
            pcs={pcsData}
            hoveredId={hoveredId}
            borderColors={borderColors}
            setHoveredId={setHoveredId}
          />

          {/* Desktop Carousel */}
          <PcsDesktopCarousel 
            pcs={pcsData}
            hoveredId={hoveredId}
            borderColors={borderColors}
            setHoveredId={setHoveredId}
          />
        </div>
      </main>

      {/* Footer */}
      <PcsFooter />

      <style>
        {`
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
        `}
      </style>
    </div>
  );
};

export default PcsPage;
