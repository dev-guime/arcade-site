
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
    <div className="min-h-screen bg-gray-900">
      <SidebarProvider>
        <div className="flex w-full min-h-screen">
          <Sidebar className="border-r border-gray-700">
            <div className="bg-gray-900 h-full">
              <SidebarHeader className="p-6 border-b border-gray-700">
                <div className="flex items-center space-x-3">
                  <img 
                    src="/lovable-uploads/4f4e5f19-8048-4f7d-8fc2-3e63fab60673.png" 
                    alt="Logo" 
                    className="w-8 h-8"
                  />
                  <h2 className="text-xl font-bold text-white">Admin Panel</h2>
                </div>
              </SidebarHeader>
              
              <SidebarContent className="p-4">
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton
                        onClick={() => onTabChange(item.id)}
                        isActive={activeTab === item.id}
                        className={`w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800 ${
                          activeTab === item.id ? 'bg-cyan-500/20 text-cyan-400 border-r-2 border-cyan-400' : ''
                        }`}
                      >
                        <item.icon className="w-5 h-5" />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
                
                <div className="mt-auto pt-6">
                  <Button
                    onClick={logout}
                    variant="outline"
                    className="w-full border-red-500 text-red-400 hover:bg-red-500/20 hover:text-red-300 bg-transparent"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sair
                  </Button>
                </div>
              </SidebarContent>
            </div>
          </Sidebar>
          
          <main className="flex-1 bg-gray-900 p-6">
            {children}
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
};
