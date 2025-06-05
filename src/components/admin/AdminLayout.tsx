
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { LogOut, BarChart3, Computer, Gamepad2, Package, ArrowLeft, Menu, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";

interface AdminLayoutProps {
  children: ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const AdminLayout = ({ children, activeTab, onTabChange }: AdminLayoutProps) => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const handleTabChange = (tabId: string) => {
    onTabChange(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700/50 bg-slate-800/50 backdrop-blur-sm">
        <div className="px-4 lg:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 lg:space-x-4">
              <Button
                onClick={() => navigate('/')}
                variant="ghost"
                className="text-slate-400 hover:text-slate-300 hover:bg-slate-700/50 p-2"
              >
                <ArrowLeft className="h-4 w-4 mr-1 lg:mr-2" />
                <span className="hidden sm:inline">Voltar ao Site</span>
              </Button>
              <h1 className="text-lg lg:text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                <span className="hidden sm:inline">Painel Administrativo</span>
                <span className="sm:hidden">Admin</span>
              </h1>
            </div>
            
            <div className="flex items-center space-x-2">
              {/* Mobile menu button */}
              <Button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                variant="ghost"
                className="lg:hidden text-slate-400 hover:text-slate-300 hover:bg-slate-700/50 p-2"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
              
              <Button
                onClick={handleLogout}
                variant="outline"
                className="border-red-500/50 text-red-400 hover:bg-red-500/20 hover:border-red-400 bg-transparent p-2 lg:px-4"
              >
                <LogOut className="h-4 w-4 mr-0 lg:mr-2" />
                <span className="hidden lg:inline">Sair</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <nav className="lg:hidden border-b border-slate-700/50 bg-slate-800/50 backdrop-blur-sm">
          <div className="px-4 py-2">
            <div className="grid grid-cols-1 gap-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <Button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    variant="ghost"
                    className={`justify-start px-4 py-3 transition-all ${
                      activeTab === tab.id
                        ? "bg-blue-500/20 text-blue-400 border-l-2 border-blue-400"
                        : "text-slate-400 hover:text-slate-300 hover:bg-slate-700/20"
                    }`}
                  >
                    <Icon className="mr-3 h-4 w-4" />
                    {tab.label}
                  </Button>
                );
              })}
            </div>
          </div>
        </nav>
      )}

      {/* Desktop Navigation Tabs */}
      <nav className="hidden lg:block border-b border-slate-700/50 bg-slate-800/30 backdrop-blur-sm">
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
      <main className="flex-1 p-2 lg:p-6">
        <Card className="bg-slate-800/30 backdrop-blur-sm border-slate-700/50 min-h-[calc(100vh-180px)] lg:min-h-[calc(100vh-200px)]">
          {children}
        </Card>
      </main>
    </div>
  );
};
