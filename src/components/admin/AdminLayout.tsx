
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { LogOut, BarChart3, Computer, Gamepad2, Package, ArrowLeft } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface AdminLayoutProps {
  children: ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const AdminLayout = ({ children, activeTab, onTabChange }: AdminLayoutProps) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "pcs", label: "Gerenciar PCs", icon: Computer },
    { id: "perifericos", label: "Gerenciar Periféricos", icon: Gamepad2 },
    { id: "examples", label: "Gerenciar Exemplos", icon: Package },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700/50 bg-slate-800/50 backdrop-blur-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => navigate('/')}
                variant="ghost"
                className="text-slate-400 hover:text-slate-300 hover:bg-slate-700/50"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar ao Site
              </Button>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Painel Administrativo
              </h1>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-red-500/50 text-red-400 hover:bg-red-500/20 hover:border-red-400 bg-transparent"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="border-b border-slate-700/50 bg-slate-800/30 backdrop-blur-sm">
        <div className="px-6">
          <div className="flex space-x-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <Button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  variant="ghost"
                  className={`px-6 py-4 rounded-none border-b-2 transition-all ${
                    activeTab === tab.id
                      ? "border-blue-400 text-blue-400 bg-slate-700/30"
                      : "border-transparent text-slate-400 hover:text-slate-300 hover:bg-slate-700/20"
                  }`}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {tab.label}
                </Button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        <Card className="m-6 bg-slate-800/30 backdrop-blur-sm border-slate-700/50 min-h-[calc(100vh-200px)]">
          {children}
        </Card>
      </main>
    </div>
  );
};
