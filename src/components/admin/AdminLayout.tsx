
import { ReactNode } from "react";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem, 
  SidebarProvider 
} from "@/components/ui/sidebar";
import { Computer, Gamepad2, LogOut, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

interface AdminLayoutProps {
  children: ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const AdminLayout = ({ children, activeTab, onTabChange }: AdminLayoutProps) => {
  const { logout } = useAuth();

  const menuItems = [
    {
      id: "dashboard",
      title: "Dashboard",
      icon: User,
    },
    {
      id: "pcs",
      title: "Gerenciar PCs",
      icon: Computer,
    },
    {
      id: "perifericos",
      title: "Gerenciar Periféricos",
      icon: Gamepad2,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <SidebarProvider>
        <div className="flex w-full min-h-screen">
          <Sidebar className="border-r border-slate-700/50">
            <div className="bg-slate-900/95 backdrop-blur-sm h-full border-r border-slate-700/30">
              <SidebarHeader className="p-6 border-b border-slate-700/50">
                <div className="flex items-center space-x-3">
                  <img 
                    src="/lovable-uploads/4f4e5f19-8048-4f7d-8fc2-3e63fab60673.png" 
                    alt="Logo" 
                    className="w-8 h-8"
                  />
                  <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Admin Panel
                  </h2>
                </div>
              </SidebarHeader>
              
              <SidebarContent className="p-4">
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton
                        onClick={() => onTabChange(item.id)}
                        isActive={activeTab === item.id}
                        className={`w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all duration-200 rounded-lg mb-2 ${
                          activeTab === item.id 
                            ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 border-l-4 border-blue-400 shadow-lg' 
                            : 'hover:shadow-md'
                        }`}
                      >
                        <item.icon className="w-5 h-5" />
                        <span className="font-medium">{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
                
                <div className="mt-auto pt-6">
                  <Button
                    onClick={logout}
                    variant="outline"
                    className="w-full border-red-500/50 text-red-400 hover:bg-red-500/20 hover:text-red-300 bg-slate-800/50 backdrop-blur-sm transition-all duration-200"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sair
                  </Button>
                </div>
              </SidebarContent>
            </div>
          </Sidebar>
          
          <main className="flex-1 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6 overflow-hidden">
            <div className="bg-slate-900/30 backdrop-blur-xl rounded-2xl border border-slate-700/30 shadow-2xl h-full overflow-auto">
              {children}
            </div>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
};
