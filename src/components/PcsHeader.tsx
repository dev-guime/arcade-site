
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const PcsHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="relative z-20 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between">
          <Button
            onClick={() => navigate("/")}
            variant="ghost"
            className="text-white hover:bg-white/10 flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden md:inline">Voltar ao Início</span>
            <span className="md:hidden">Voltar</span>
          </Button>
          
          <h1 className="text-2xl md:text-4xl font-bold text-center">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Nossos PCs
            </span>
          </h1>
          
          <div className="w-20"></div>
        </div>
      </div>
    </header>
  );
};
