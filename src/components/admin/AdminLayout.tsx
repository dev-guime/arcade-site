
import { ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { 
  Computer, 
  Package, 
  BarChart3, 
  LogOut, 
  Menu,
  X,
  Home,
  Gamepad2
} from "lucide-react";

interface AdminLayoutProps {
  children: ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const AdminLayout = ({ children, activeTab, onTabChange }: AdminLayoutProps) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleGoHome = () => {
    navigate("/");
  };

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "pcs", label: "PCs", icon: Computer },
    { id: "perifericos", label: "Periféricos", icon: Gamepad2 },
    { id: "examples", label: "Exemplos", icon: Package },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Mobile Header */}
      <div className="md:hidden bg-slate-800/50 backdrop-blur-sm border-b border-slate-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMobileMenu}
              className="text-white"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
            <h1 className="text-lg font-bold text-white">Admin Panel</h1>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleGoHome}
            className="text-white"
          >
            <Home className="w-5 h-5" />
          </Button>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="mt-4 space-y-2 pb-4 border-t border-slate-700 pt-4">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? "default" : "ghost"}
                  onClick={() => {
                    onTabChange(tab.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full justify-start ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                      : "text-slate-300 hover:text-white hover:bg-slate-700"
                  }`}
                >
                  <Icon className="w-4 h-4 mr-3" />
                  {tab.label}
                </Button>
              );
            })}
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-500/20"
            >
              <LogOut className="w-4 h-4 mr-3" />
              Sair
            </Button>
          </div>
        )}
      </div>

      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden md:block w-64 bg-slate-800/50 backdrop-blur-sm border-r border-slate-700 min-h-screen">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                <Computer className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Admin Panel</h1>
                <Badge variant="outline" className="text-green-400 border-green-400">
                  Dashboard
                </Badge>
              </div>
            </div>

            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <Button
                    key={tab.id}
                    variant={activeTab === tab.id ? "default" : "ghost"}
                    onClick={() => onTabChange(tab.id)}
                    className={`w-full justify-start ${
                      activeTab === tab.id
                        ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg"
                        : "text-slate-300 hover:text-white hover:bg-slate-700"
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-3" />
                    {tab.label}
                  </Button>
                );
              })}
            </nav>

            <div className="absolute bottom-6 left-6 right-6">
              <div className="space-y-3">
                <Button
                  variant="ghost"
                  onClick={handleGoHome}
                  className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-700"
                >
                  <Home className="w-4 h-4 mr-3" />
                  Ir para o Site
                </Button>
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-500/20"
                >
                  <LogOut className="w-4 h-4 mr-3" />
                  Sair
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-h-screen">
          <div className="h-full overflow-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
