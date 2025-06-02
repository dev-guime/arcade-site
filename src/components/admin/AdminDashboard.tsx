
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Computer, Gamepad2, TrendingUp, Package } from "lucide-react";
import { pcsData } from "@/data/pcsData";

export const AdminDashboard = () => {
  // Contadores baseados nos dados reais
  const totalPcs = pcsData.length;
  const totalPerifericos = 8; // Baseado nos periféricos mostrados no site
  
  // Separar PCs por linha (convertendo string para number para comparação)
  const pcsByLine = {
    essencial: pcsData.filter(pc => parseFloat(pc.price.replace(/[^\d]/g, '')) <= 2500).length,
    performance: pcsData.filter(pc => {
      const price = parseFloat(pc.price.replace(/[^\d]/g, ''));
      return price > 2500 && price <= 5000;
    }).length,
    avancada: pcsData.filter(pc => parseFloat(pc.price.replace(/[^\d]/g, '')) > 5000).length,
  };

  const stats = [
    {
      title: "Total de PCs",
      value: totalPcs,
      icon: Computer,
      color: "cyan",
      change: "+2 este mês"
    },
    {
      title: "Total de Periféricos", 
      value: totalPerifericos,
      icon: Gamepad2,
      color: "pink",
      change: "+5 este mês"
    },
    {
      title: "Total de Produtos",
      value: totalPcs + totalPerifericos,
      icon: Package,
      color: "purple",
      change: "+7 este mês"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Estatísticas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="bg-gray-900/50 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 text-${stat.color}-400`} />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold text-${stat.color}-400`}>
                {stat.value}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Visão Detalhada */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* PCs por Linha */}
        <Card className="bg-gray-900/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-cyan-400 flex items-center gap-2">
              <Computer className="w-5 h-5" />
              PCs por Linha
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg">
              <span className="text-white">Linha Essencial</span>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                {pcsByLine.essencial} produtos
              </Badge>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg">
              <span className="text-white">Linha Performance</span>
              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                {pcsByLine.performance} produtos
              </Badge>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg">
              <span className="text-white">Linha Avançada</span>
              <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                {pcsByLine.avancada} produtos
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Periféricos por Categoria */}
        <Card className="bg-gray-900/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-pink-400 flex items-center gap-2">
              <Gamepad2 className="w-5 h-5" />
              Periféricos por Categoria
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg">
              <span className="text-white">Áudio</span>
              <Badge className="bg-pink-500/20 text-pink-400 border-pink-500/30">
                2 produtos
              </Badge>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg">
              <span className="text-white">Controles</span>
              <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">
                2 produtos
              </Badge>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg">
              <span className="text-white">Vídeo</span>
              <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30">
                2 produtos
              </Badge>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg">
              <span className="text-white">Setup</span>
              <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                2 produtos
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
