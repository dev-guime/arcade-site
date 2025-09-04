import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ComputerManagement } from "./ComputerManagement";
import { SoldComputersManagement } from "./SoldComputersManagement";
import { ExpensesManagement } from "./ExpensesManagement";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, LogOut } from "lucide-react";

export const NewAdminPanel = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/")}
              className="text-gray-400 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao Site
            </Button>
            <h1 className="text-2xl font-bold">Painel Administrativo - Arena X</h1>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="text-gray-400 hover:text-white"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        <Tabs defaultValue="computers" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-gray-800">
            <TabsTrigger value="computers" className="data-[state=active]:bg-purple-600">
              Cadastro de Computadores
            </TabsTrigger>
            <TabsTrigger value="portfolio" className="data-[state=active]:bg-purple-600">
              Portfólio de Vendidos
            </TabsTrigger>
            <TabsTrigger value="expenses" className="data-[state=active]:bg-purple-600">
              Gastos Mensais
            </TabsTrigger>
          </TabsList>

          <TabsContent value="computers">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Gerenciar Computadores</CardTitle>
                <CardDescription className="text-gray-400">
                  Cadastre novos computadores, edite especificações e gerencie o estoque.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ComputerManagement />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="portfolio">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Portfólio de Computadores Vendidos</CardTitle>
                <CardDescription className="text-gray-400">
                  Adicione computadores vendidos ao portfólio para exibir na página principal.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SoldComputersManagement />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="expenses">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Gestão de Gastos Mensais</CardTitle>
                <CardDescription className="text-gray-400">
                  Registre e acompanhe todos os gastos mensais da empresa.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ExpensesManagement />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};