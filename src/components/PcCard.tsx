
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Cpu, HardDrive, Monitor, Zap } from "lucide-react";

interface PcCardProps {
  pc: {
    id: string;
    name: string;
    price: string | number;
    description: string;
    specs: string[];
    highlight: boolean;
    highlight_text?: string;
    highlight_color?: string;
    image?: string;
  };
  hoveredId: string | null;
  borderColors: {[key: string]: string};
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  variant?: 'mobile' | 'desktop';
}

export const PcCard = ({ 
  pc, 
  hoveredId, 
  borderColors, 
  onMouseEnter, 
  onMouseLeave, 
  variant = 'desktop' 
}: PcCardProps) => {
  const navigate = useNavigate();
  const isMobile = variant === 'mobile';

  const formatPrice = (price: string | number) => {
    if (typeof price === 'string') return price;
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const getHighlightColorClass = (color: string = 'cyan') => {
    const colorMap: {[key: string]: string} = {
      cyan: 'border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.6)]',
      pink: 'border-pink-400 shadow-[0_0_20px_rgba(236,72,153,0.6)]',
      green: 'border-green-400 shadow-[0_0_20px_rgba(34,197,94,0.6)]',
      red: 'border-red-400 shadow-[0_0_20px_rgba(239,68,68,0.6)]',
      purple: 'border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.6)]',
      yellow: 'border-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.6)]',
      blue: 'border-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.6)]',
    };
    return colorMap[color] || colorMap.cyan;
  };

  const getHighlightBadgeColor = (color: string = 'cyan') => {
    const colorMap: {[key: string]: string} = {
      cyan: 'from-cyan-400 to-blue-500 border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.6)]',
      pink: 'from-pink-400 to-purple-500 border-pink-400 shadow-[0_0_15px_rgba(236,72,153,0.6)]',
      green: 'from-green-400 to-emerald-500 border-green-400 shadow-[0_0_15px_rgba(34,197,94,0.6)]',
      red: 'from-red-400 to-rose-500 border-red-400 shadow-[0_0_15px_rgba(239,68,68,0.6)]',
      purple: 'from-purple-400 to-violet-500 border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.6)]',
      yellow: 'from-yellow-400 to-orange-500 border-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.6)]',
      blue: 'from-blue-400 to-indigo-500 border-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.6)]',
    };
    return colorMap[color] || colorMap.cyan;
  };

  return (
    <Card
      className={`relative bg-gray-900/80 backdrop-blur-sm border-2 transition-all duration-500 ${
        isMobile ? 'hover:scale-[1.02] h-auto' : 'hover:scale-105 h-[520px]'
      } floating-animation ${
        pc.highlight 
          ? getHighlightColorClass(pc.highlight_color)
          : hoveredId === pc.id 
            ? borderColors[pc.id] || 'border-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.3)]'
            : 'border-gray-700'
      } ${
        hoveredId !== null && hoveredId !== pc.id 
          ? 'opacity-30 scale-95' 
          : 'opacity-100'
      } flex flex-col`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {pc.highlight && pc.highlight_text && (
        <div className={`absolute ${isMobile ? '-top-3' : '-top-4'} left-1/2 transform -translate-x-1/2 z-20`}>
          <span className={`bg-gradient-to-r ${getHighlightBadgeColor(pc.highlight_color)} ${
            isMobile ? 'px-3 py-1 text-xs' : 'px-4 py-2 text-sm'
          } rounded-full font-bold border-2`}>
            {pc.highlight_text}
          </span>
        </div>
      )}
      
      {/* PC Image - Corrigido para cobrir 100% sem aumentar o quadro */}
      <div className={`relative ${isMobile ? 'h-32' : 'h-40'} overflow-hidden rounded-t-lg mt-2 mx-2 flex-shrink-0`}>
        <img 
          src={pc.image || "/lovable-uploads/f8260b15-2b51-400a-8d32-6242095a4419.png"} 
          alt={pc.name}
          className="w-full h-full object-cover"
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent"></div>
      </div>
      
      <CardHeader className={`${isMobile ? 'pb-2' : 'pb-3'} flex-shrink-0`}>
        <CardTitle className={`${isMobile ? 'text-sm' : 'text-lg'} font-bold text-cyan-400`}>
          {pc.name}
        </CardTitle>
        <CardDescription className={`text-gray-300 ${isMobile ? 'text-xs' : 'text-sm'} ${!isMobile ? 'h-10 overflow-hidden' : ''}`}>
          {pc.description}
        </CardDescription>
        <div className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold text-white`}>
          {formatPrice(pc.price)}
        </div>
      </CardHeader>
      
      <CardContent className="pt-0 flex-1 flex flex-col justify-between">
        <div className={`space-y-${isMobile ? '1' : '2'} ${isMobile ? 'mb-0' : 'mb-3'}`}>
          {pc.specs.map((spec, index) => (
            <div key={index} className={`flex items-center text-gray-300 ${isMobile ? 'text-xs' : 'text-sm'}`}>
              {index === 0 && <Cpu className="mr-2 h-3 w-3 text-cyan-400 flex-shrink-0" />}
              {index === 1 && <Zap className="mr-2 h-3 w-3 text-cyan-400 flex-shrink-0" />}
              {index === 2 && <HardDrive className="mr-2 h-3 w-3 text-cyan-400 flex-shrink-0" />}
              {index === 3 && <Monitor className="mr-2 h-3 w-3 text-cyan-400 flex-shrink-0" />}
              <span className={isMobile ? 'truncate' : ''}>{spec}</span>
            </div>
          ))}
        </div>
        
        <Button 
          onClick={() => navigate(`/pc/${pc.id}`)}
          className={`w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 border border-cyan-400 transition-all duration-300 ${isMobile ? 'text-xs py-2' : 'text-sm py-2'} mt-auto`}
        >
          QUERO ESTE PC
        </Button>
      </CardContent>
    </Card>
  );
};
