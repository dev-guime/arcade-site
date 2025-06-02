
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Computer, Gamepad2, TrendingUp, Package } from "lucide-react";
import { useProducts } from "@/contexts/ProductsContext";

export const AdminDashboard = () => {
  const { pcs, perifericos } = useProducts();
  
  const totalPcs = pcs.length;
  const totalPerifericos = perifericos.length;
  
  const pcsByLine = {
    essencial: pcs.filter(pc => pc.category === "Linha Essencial").length,
    performance: pcs.filter(pc => pc.category === "Linha Performance").length,
    avancada: pcs.filter(pc => pc.category === "Linha Avançada").length,
  };

  const perifericosByCategory = {
    audio: perifericos.filter(p => p.category === "Áudio").length,
    controles: perifericos.filter(p => p.category === "Controles").length,
    video: perifericos.filter(p => p.category === "Vídeo").length,
    setup: perifericos.filter(p => p.category === "Setup").length,
    combos: perifericos.filter(p => p.category === "Combos").length,
  };

  const stats = [
    {
      title: "Total de PCs",
      value: totalPcs,
      icon: Computer,
      color: "cyan",
    },
    {
      title: "Total de Periféricos", 
      value: totalPerifericos,
      icon: Gamepad2,
      color: "pink",
    },
    {
      title: "Total de Produtos",
      value: totalPcs + totalPerifericos,
      icon: Package,
      color: "purple",
    }
  ];

  return (
    <div className="space-y-4">
      {/* Estatísticas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-gray-300">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 text-${stat.color}-400`} />
            </CardHeader>
            <CardContent className="pb-3">
              <div className={`text-xl font-bold text-${stat.color}-400`}>
                {stat.value}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Visão Detalhada */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* PCs por Linha */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-cyan-400 flex items-center gap-2 text-lg">
              <Computer className="w-5 h-5" />
              PCs por Linha
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center p-2 bg-gray-700/50 rounded">
              <span className="text-white text-sm">Linha Essencial</span>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                {pcsByLine.essencial} produtos
              </Badge>
            </div>
            <div className="flex justify-between items-center p-2 bg-gray-700/50 rounded">
              <span className="text-white text-sm">Linha Performance</span>
              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">
                {pcsByLine.performance} produtos
              </Badge>
            </div>
            <div className="flex justify-between items-center p-2 bg-gray-700/50 rounded">
              <span className="text-white text-sm">Linha Avançada</span>
              <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 text-xs">
                {pcsByLine.avancada} produtos
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Periféricos por Categoria */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-pink-400 flex items-center gap-2 text-lg">
              <Gamepad2 className="w-5 h-5" />
              Periféricos por Categoria
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center p-2 bg-gray-700/50 rounded">
              <span className="text-white text-sm">Áudio</span>
              <Badge className="bg-pink-500/20 text-pink-400 border-pink-500/30 text-xs">
                {perifericosByCategory.audio} produtos
              </Badge>
            </div>
            <div className="flex justify-between items-center p-2 bg-gray-700/50 rounded">
              <span className="text-white text-sm">Controles</span>
              <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 text-xs">
                {perifericosByCategory.controles} produtos
              </Badge>
            </div>
            <div className="flex justify-between items-center p-2 bg-gray-700/50 rounded">
              <span className="text-white text-sm">Vídeo</span>
              <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30 text-xs">
                {perifericosByCategory.video} produtos
              </Badge>
            </div>
            <div className="flex justify-between items-center p-2 bg-gray-700/50 rounded">
              <span className="text-white text-sm">Setup</span>
              <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 text-xs">
                {perifericosByCategory.setup} produtos
              </Badge>
            </div>
            <div className="flex justify-between items-center p-2 bg-gray-700/50 rounded">
              <span className="text-white text-sm">Combos</span>
              <Badge className="bg-indigo-500/20 text-indigo-400 border-indigo-500/30 text-xs">
                {perifericosByCategory.combos} produtos
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
