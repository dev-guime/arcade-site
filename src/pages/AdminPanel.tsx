
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger
} from "@/components/ui/sidebar";
import { AdminPcForm } from "@/components/admin/AdminPcForm";
import { AdminPerifericosForm } from "@/components/admin/AdminPerifericosForm";
import { ProductList } from "@/components/admin/ProductList";
import { 
  Computer, 
  Gamepad2, 
  Settings, 
  BarChart3, 
  Users,
  Package,
  Home
} from "lucide-react";

const AdminPanel = () => {
  const [activeSection, setActiveSection] = useState<"pcs" | "perifericos">("pcs");

  const sidebarItems = [
    { title: "Dashboard", icon: Home, href: "#" },
    { title: "Produtos", icon: Package, href: "#", active: true },
    { title: "Vendas", icon: BarChart3, href: "#" },
    { title: "Clientes", icon: Users, href: "#" },
    { title: "Configurações", icon: Settings, href: "#" },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <SidebarProvider>
        <div className="flex w-full">
          {/* Sidebar */}
          <Sidebar className="border-r border-gray-800">
            <SidebarHeader className="border-b border-gray-800 p-6">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Computer className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                  Arcade Games
                </h1>
              </div>
              <p className="text-gray-400 text-sm mt-1">Painel Administrativo</p>
            </SidebarHeader>
            
            <SidebarContent className="p-4">
              <SidebarMenu>
                {sidebarItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      className={`w-full justify-start ${
                        item.active 
                          ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' 
                          : 'text-gray-300 hover:text-white hover:bg-gray-800'
                      }`}
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarContent>
          </Sidebar>

          {/* Main Content */}
          <main className="flex-1 overflow-auto">
            {/* Header */}
            <header className="border-b border-gray-800 p-6 flex items-center justify-between bg-gray-900/50">
              <div className="flex items-center space-x-4">
                <SidebarTrigger className="text-gray-400 hover:text-white" />
                <h2 className="text-2xl font-bold text-white">Gerenciamento de Produtos</h2>
              </div>
            </header>

            {/* Content */}
            <div className="p-6">
              {/* Section Toggle */}
              <Card className="bg-gray-900/50 border-gray-700 mb-6">
                <CardHeader>
                  <CardTitle className="text-white">Selecionar Categoria</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-4">
                    <Button
                      onClick={() => setActiveSection("pcs")}
                      variant={activeSection === "pcs" ? "default" : "outline"}
                      className={`${
                        activeSection === "pcs"
                          ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white'
                          : 'border-gray-600 text-gray-300 hover:text-white hover:border-cyan-400'
                      }`}
                    >
                      <Computer className="w-4 h-4 mr-2" />
                      PCs
                    </Button>
                    <Button
                      onClick={() => setActiveSection("perifericos")}
                      variant={activeSection === "perifericos" ? "default" : "outline"}
                      className={`${
                        activeSection === "perifericos"
                          ? 'bg-gradient-to-r from-pink-500 to-orange-600 text-white'
                          : 'border-gray-600 text-gray-300 hover:text-white hover:border-pink-400'
                      }`}
                    >
                      <Gamepad2 className="w-4 h-4 mr-2" />
                      Periféricos
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Content based on active section */}
              {activeSection === "pcs" && (
                <Tabs defaultValue="add" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 bg-gray-800 border border-gray-700">
                    <TabsTrigger value="add" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-black">
                      Adicionar PC
                    </TabsTrigger>
                    <TabsTrigger value="list" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-black">
                      Listar PCs
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="add">
                    <AdminPcForm />
                  </TabsContent>
                  
                  <TabsContent value="list">
                    <ProductList type="pcs" />
                  </TabsContent>
                </Tabs>
              )}

              {activeSection === "perifericos" && (
                <Tabs defaultValue="add" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 bg-gray-800 border border-gray-700">
                    <TabsTrigger value="add" className="data-[state=active]:bg-pink-500 data-[state=active]:text-black">
                      Adicionar Periférico
                    </TabsTrigger>
                    <TabsTrigger value="list" className="data-[state=active]:bg-pink-500 data-[state=active]:text-black">
                      Listar Periféricos
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="add">
                    <AdminPerifericosForm />
                  </TabsContent>
                  
                  <TabsContent value="list">
                    <ProductList type="perifericos" />
                  </TabsContent>
                </Tabs>
              )}
            </div>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default AdminPanel;
