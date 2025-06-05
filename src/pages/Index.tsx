import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { SocialIcons } from "@/components/SocialIcons";
import { BenefitsSection } from "@/components/BenefitsSection";
import { SoldPcsCarousel } from "@/components/SoldPcsCarousel";
import { TechBackground } from "@/components/TechBackground";
import { MessageCircle, Gamepad2 } from "lucide-react";
const Index = () => {
  const navigate = useNavigate();
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/5543984273723', '_blank');
  };
  return <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Tech Background */}
      <TechBackground />
      
      {/* Social Icons - Floating on desktop, sidebar on mobile */}
      <SocialIcons />
      
      {/* Header */}
      <header className="relative z-10 text-center pt-8 md:pt-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Logo - Floating Animation */}
          <div className="mb-6 md:mb-8 flex justify-center">
            <img src="/lovable-uploads/04d45766-a7e4-47c9-8c45-1e09419819f5.png" alt="Arcade Games Logo" className="w-32 h-32 md:w-48 md:h-48 floating-logo object-cover" />
          </div>
          
          {/* Improved Slogan with Mental Triggers */}
          <p className="text-lg md:text-xl text-gray-300 mb-8 md:mb-12 font-light tracking-wide px-4">
            <span className="text-cyan-400 font-semibold">Performance extrema</span> que você merece, 
            <br className="hidden md:block" />
            <span className="text-purple-400 font-semibold">preços justos</span> que cabem no seu bolso.
          </p>
        </div>
      </header>

      {/* Mobile Social Icons - Visible without click */}
      <div className="relative z-10 mb-6 md:hidden">
        <SocialIcons variant="mobile-visible" />
      </div>

      {/* Main CTA Section */}
      <section className="relative z-10 text-center py-8 md:py-16 px-4">
        <div className="max-w-2xl mx-auto space-y-4 md:space-y-6">
          <Button onClick={() => navigate('/pcs')} className="group relative w-full md:w-auto px-8 md:px-12 py-4 md:py-6 text-lg md:text-xl font-bold bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 border-2 border-cyan-400 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(34,211,238,0.6)] button-pulse">
            <span className="relative z-10">VEJA NOSSOS PC'S</span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-700 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-lg"></div>
          </Button>
          
          <Button onClick={() => navigate('/perifericos')} className="group relative w-full md:w-auto px-8 md:px-12 py-4 md:py-6 text-lg md:text-xl font-bold bg-gradient-to-r from-pink-500 to-orange-600 hover:from-pink-400 hover:to-orange-500 border-2 border-pink-400 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(236,72,153,0.6)] button-pulse flex items-center justify-center gap-3">
            <Gamepad2 className="w-5 h-5 md:w-6 md:h-6" />
            <span className="relative z-10">VEJA NOSSOS PERIFÉRICOS</span>
            <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-orange-700 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-lg"></div>
          </Button>
          
          <Button onClick={handleWhatsAppClick} className="group relative w-full md:w-auto px-8 md:px-12 py-4 md:py-6 text-lg md:text-xl font-bold bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 border-2 border-green-400 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(34,197,94,0.6)] flex items-center justify-center gap-3 button-pulse">
            <MessageCircle className="w-5 h-5 md:w-6 md:h-6" />
            <span className="relative z-10">FALE CONOSCO</span>
            <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-700 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-lg"></div>
          </Button>
        </div>
      </section>

      {/* Benefits Section */}
      <BenefitsSection />

      {/* Sold PCs Carousel */}
      <SoldPcsCarousel />

      {/* Footer */}
      <footer className="relative z-10 py-6 md:py-8 px-4 border-t border-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center space-x-6 mb-4 md:hidden">
            <SocialIcons variant="footer" />
          </div>
          <p className="text-gray-400 text-base md:text-lg">
            <span className="block md:inline">
              <span className="text-rose-500">Retirada local</span> em Londrina-PR ou 
            </span>
            <span className="block md:inline">
              <span className="text-purple-400"> envio seguro</span> via Sedex para todo Brasil
            </span>
            <br className="hidden md:block" />
            <span className="block mt-2 md:mt-0">
              Seja você <span className="text-cyan-400">gamer</span>, <span className="text-purple-400">editor</span> ou <span className="text-pink-400">estudante</span> — temos a máquina ideal pra você.
            </span>
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
              transform: translateY(-15px);
            }
          }
          
          @keyframes subtle-pulse {
            0%, 100% {
              box-shadow: 0 0 5px rgba(34, 211, 238, 0.3);
            }
            50% {
              box-shadow: 0 0 15px rgba(34, 211, 238, 0.5);
            }
          }
          
          .floating-logo {
            animation: floating 3s ease-in-out infinite;
          }
          
          .button-pulse {
            animation: subtle-pulse 2s ease-in-out infinite;
          }
        `}
      </style>
    </div>;
};
export default Index;