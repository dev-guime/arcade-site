
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
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { 
  Computer, 
  Gamepad2, 
  LayoutDashboard,
  Package
} from "lucide-react";

const AdminPanel = () => {
  const [activeSection, setActiveSection] = useState<"dashboard" | "pcs" | "perifericos">("dashboard");

  const sidebarItems = [
    { title: "Dashboard", icon: LayoutDashboard, section: "dashboard" },
    { title: "Produtos", icon: Package, section: "products" },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <SidebarProvider>
        <div className="flex w-full">
          {/* Sidebar */}
          <Sidebar className="border-r border-gray-800 bg-gray-900">
            <SidebarHeader className="border-b border-gray-800 p-6">
              <div className="flex items-center space-x-3">
                <img 
                  src="/lovable-uploads/f8260b15-2b51-400a-8d32-6242095a4419.png" 
                  alt="Arcade Games" 
                  className="w-10 h-10 object-contain"
                />
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                    Arcade Games
                  </h1>
                  <p className="text-gray-400 text-sm">Painel Administrativo</p>
                </div>
              </div>
            </SidebarHeader>
            
            <SidebarContent className="p-4 bg-gray-900">
              <SidebarMenu>
                {sidebarItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      onClick={() => setActiveSection(item.section === "products" ? "pcs" : item.section as any)}
                      className={`w-full justify-start ${
                        (activeSection === "dashboard" && item.section === "dashboard") || 
                        ((activeSection === "pcs" || activeSection === "perifericos") && item.section === "products")
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
          <main className="flex-1 overflow-auto bg-black">
            {/* Header */}
            <header className="border-b border-gray-800 p-6 flex items-center justify-between bg-gray-900/50">
              <div className="flex items-center space-x-4">
                <SidebarTrigger className="text-gray-400 hover:text-white" />
                <h2 className="text-2xl font-bold text-white">
                  {activeSection === "dashboard" ? "Dashboard" : "Gerenciamento de Produtos"}
                </h2>
              </div>
            </header>

            {/* Content */}
            <div className="p-6">
              {activeSection === "dashboard" && <AdminDashboard />}

              {activeSection !== "dashboard" && (
                <>
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
                              ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700'
                              : 'border-gray-600 text-gray-300 hover:text-white hover:border-cyan-400 hover:bg-cyan-500/10'
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
                              ? 'bg-gradient-to-r from-pink-500 to-orange-600 text-white hover:from-pink-600 hover:to-orange-700'
                              : 'border-gray-600 text-gray-300 hover:text-white hover:border-pink-400 hover:bg-pink-500/10'
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
                    <Tabs defaultValue="list" className="w-full">
                      <TabsList className="grid w-full grid-cols-2 bg-gray-800 border border-gray-700">
                        <TabsTrigger value="list" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-black">
                          Listar PCs
                        </TabsTrigger>
                        <TabsTrigger value="add" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-black">
                          Adicionar PC
                        </TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="list">
                        <ProductList type="pcs" />
                      </TabsContent>

                      <TabsContent value="add">
                        <AdminPcForm />
                      </TabsContent>
                    </Tabs>
                  )}

                  {activeSection === "perifericos" && (
                    <Tabs defaultValue="list" className="w-full">
                      <TabsList className="grid w-full grid-cols-2 bg-gray-800 border border-gray-700">
                        <TabsTrigger value="list" className="data-[state=active]:bg-pink-500 data-[state=active]:text-black">
                          Listar Periféricos
                        </TabsTrigger>
                        <TabsTrigger value="add" className="data-[state=active]:bg-pink-500 data-[state=active]:text-black">
                          Adicionar Periférico
                        </TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="list">
                        <ProductList type="perifericos" />
                      </TabsContent>

                      <TabsContent value="add">
                        <AdminPerifericosForm />
                      </TabsContent>
                    </Tabs>
                  )}
                </>
              )}
            </div>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default AdminPanel;
