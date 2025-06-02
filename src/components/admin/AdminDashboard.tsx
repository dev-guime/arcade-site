
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Computer, Gamepad2, TrendingUp, Package, BarChart3, PieChart } from "lucide-react";
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
      color: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-500/10 to-cyan-500/10",
    },
    {
      title: "Total de Periféricos", 
      value: totalPerifericos,
      icon: Gamepad2,
      color: "from-purple-500 to-pink-500",
      bgColor: "from-purple-500/10 to-pink-500/10",
    },
    {
      title: "Total de Produtos",
      value: totalPcs + totalPerifericos,
      icon: Package,
      color: "from-emerald-500 to-teal-500",
      bgColor: "from-emerald-500/10 to-teal-500/10",
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Dashboard
        </h1>
        <div className="flex items-center space-x-2 text-slate-400">
          <BarChart3 className="w-5 h-5" />
          <span className="text-sm">Visão Geral</span>
        </div>
      </div>

      {/* Estatísticas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 hover:border-slate-600/50 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <div>
                <CardTitle className="text-sm font-medium text-slate-300 mb-1">
                  {stat.title}
                </CardTitle>
                <div className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                  {stat.value}
                </div>
              </div>
              <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.bgColor} border border-slate-700/30`}>
                <stat.icon className={`h-6 w-6 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`} />
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>

      {/* Visão Detalhada */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* PCs por Linha */}
        <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
          <CardHeader className="pb-4">
            <CardTitle className="text-blue-400 flex items-center gap-2 text-lg font-semibold">
              <Computer className="w-5 h-5" />
              PCs por Linha
              <PieChart className="w-4 h-4 ml-auto text-slate-500" />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-slate-700/30 rounded-lg border border-slate-600/30 hover:bg-slate-700/50 transition-colors">
              <span className="text-slate-200 text-sm font-medium">Linha Essencial</span>
              <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-xs font-semibold px-2 py-1">
                {pcsByLine.essencial}
              </Badge>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-700/30 rounded-lg border border-slate-600/30 hover:bg-slate-700/50 transition-colors">
              <span className="text-slate-200 text-sm font-medium">Linha Performance</span>
              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs font-semibold px-2 py-1">
                {pcsByLine.performance}
              </Badge>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-700/30 rounded-lg border border-slate-600/30 hover:bg-slate-700/50 transition-colors">
              <span className="text-slate-200 text-sm font-medium">Linha Avançada</span>
              <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 text-xs font-semibold px-2 py-1">
                {pcsByLine.avancada}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Periféricos por Categoria */}
        <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
          <CardHeader className="pb-4">
            <CardTitle className="text-purple-400 flex items-center gap-2 text-lg font-semibold">
              <Gamepad2 className="w-5 h-5" />
              Periféricos por Categoria
              <BarChart3 className="w-4 h-4 ml-auto text-slate-500" />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-slate-700/30 rounded-lg border border-slate-600/30 hover:bg-slate-700/50 transition-colors">
              <span className="text-slate-200 text-sm font-medium">Áudio</span>
              <Badge className="bg-pink-500/20 text-pink-400 border-pink-500/30 text-xs font-semibold px-2 py-1">
                {perifericosByCategory.audio}
              </Badge>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-700/30 rounded-lg border border-slate-600/30 hover:bg-slate-700/50 transition-colors">
              <span className="text-slate-200 text-sm font-medium">Controles</span>
              <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 text-xs font-semibold px-2 py-1">
                {perifericosByCategory.controles}
              </Badge>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-700/30 rounded-lg border border-slate-600/30 hover:bg-slate-700/50 transition-colors">
              <span className="text-slate-200 text-sm font-medium">Vídeo</span>
              <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30 text-xs font-semibold px-2 py-1">
                {perifericosByCategory.video}
              </Badge>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-700/30 rounded-lg border border-slate-600/30 hover:bg-slate-700/50 transition-colors">
              <span className="text-slate-200 text-sm font-medium">Setup</span>
              <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 text-xs font-semibold px-2 py-1">
                {perifericosByCategory.setup}
              </Badge>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-700/30 rounded-lg border border-slate-600/30 hover:bg-slate-700/50 transition-colors">
              <span className="text-slate-200 text-sm font-medium">Combos</span>
              <Badge className="bg-indigo-500/20 text-indigo-400 border-indigo-500/30 text-xs font-semibold px-2 py-1">
                {perifericosByCategory.combos}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
