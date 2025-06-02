
import { Check, Shield, Wrench, DollarSign, Settings, Headphones, Truck } from "lucide-react";

export const BenefitsSection = () => {
  const benefits = [{
    icon: <Wrench className="w-6 h-6" />,
    text: "Suporte completo para instalação e atualização de drivers"
  }, {
    icon: <Shield className="w-6 h-6" />,
    text: "Garantia de funcionamento 100% testado"
  }, {
    icon: <DollarSign className="w-6 h-6" />,
    text: "Preço acessível, direto com quem monta — sem taxas absurdas"
  }, {
    icon: <Settings className="w-6 h-6" />,
    text: "Configurações otimizadas para jogos e produtividade"
  }, {
    icon: <Headphones className="w-6 h-6" />,
    text: "Atendimento personalizado e honesto via WhatsApp"
  }, {
    icon: <Truck className="w-6 h-6" />,
    text: "Montagem local em Londrina-PR ou envio seguro via Sedex para todo o Brasil"
  }];

  return (
    <section className="relative z-10 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <h2 className="text-4xl font-bold text-center mb-12">
          <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Por que escolher a gente?
          </span>
        </h2>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="flex items-center space-x-4 p-4 bg-gray-900/50 border border-gray-700 backdrop-blur-sm hover:border-cyan-400 transition-all duration-300 hover:shadow-[0_0_15px_rgba(34,211,238,0.2)] rounded-lg"
            >
              <div className="text-cyan-400 flex-shrink-0">
                {benefit.icon}
              </div>
              <p className="text-gray-200 font-medium text-left">
                {benefit.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
