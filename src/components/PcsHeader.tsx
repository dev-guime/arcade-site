
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export const PcsHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="relative z-10 border-b border-gray-800 px-4 py-3">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Button
          onClick={() => navigate('/')}
          variant="ghost"
          className="text-cyan-400 hover:text-cyan-300 hover:bg-gray-900 text-sm md:text-base"
        >
          <ArrowLeft className="mr-2 h-3 w-3 md:h-4 md:w-4" />
          Voltar
        </Button>
        <h1 className="text-lg md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent text-center">
          NOSSOS PC'S GAMER
        </h1>
        <div className="w-16 md:w-20"></div>
      </div>
    </header>
  );
};
