
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { SocialIcons } from "@/components/SocialIcons";
import { BenefitsSection } from "@/components/BenefitsSection";
import { TechBackground } from "@/components/TechBackground";
import { MessageCircle } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/5543984273723', '_blank');
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Tech Background */}
      <TechBackground />
      
      {/* Social Icons - Floating */}
      <SocialIcons />
      
      {/* Header */}
      <header className="relative z-10 text-center pt-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Logo/Brand */}
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4 tracking-wider">
            NEON<span className="text-lime-400">TECH</span>
          </h1>
          
          {/* Slogan */}
          <p className="text-xl md:text-2xl text-gray-300 mb-12 font-light tracking-wide">
            Potência e desempenho, <span className="text-cyan-400">sem enrolação.</span>
          </p>
        </div>
      </header>

      {/* Main CTA Section */}
      <section className="relative z-10 text-center py-16 px-4">
        <div className="max-w-2xl mx-auto space-y-6">
          <Button
            onClick={() => navigate('/pcs')}
            className="group relative px-12 py-6 text-xl font-bold bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 border-2 border-cyan-400 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(34,211,238,0.6)]"
          >
            <span className="relative z-10">VEJA NOSSOS PC'S</span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-700 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-lg"></div>
          </Button>
          
          <Button
            onClick={handleWhatsAppClick}
            className="group relative px-12 py-6 text-xl font-bold bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 border-2 border-green-400 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(34,197,94,0.6)] flex items-center justify-center gap-3"
          >
            <MessageCircle className="w-6 h-6" />
            <span className="relative z-10">FALE CONOSCO</span>
            <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-700 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-lg"></div>
          </Button>
        </div>
      </section>

      {/* Benefits Section */}
      <BenefitsSection />

      {/* Footer */}
      <footer className="relative z-10 py-8 px-4 border-t border-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center space-x-6 mb-4">
            <SocialIcons variant="footer" />
          </div>
          <p className="text-gray-400 text-lg">
            Seja você <span className="text-cyan-400">gamer</span>, <span className="text-purple-400">editor</span> ou <span className="text-pink-400">estudante</span> — temos a máquina ideal pra você.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
