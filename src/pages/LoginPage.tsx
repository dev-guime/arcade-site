
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Lock, Mail, ArrowLeft, UserPlus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn, signUp, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPassword = (password: string) => {
    return password.length >= 6;
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isValidEmail(email)) {
      toast({
        title: "Erro de validação",
        description: "Por favor, insira um email válido.",
        variant: "destructive",
      });
      return;
    }
    
    if (!isValidPassword(password)) {
      toast({
        title: "Erro de validação",
        description: "A senha deve ter pelo menos 6 caracteres.",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      const { error } = await signIn(email, password);
      
      if (error) {
        toast({
          title: "Erro no login",
          description: error.message || "Credenciais inválidas. Verifique seu email e senha.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Login realizado com sucesso!",
        description: "Bem-vindo ao painel administrativo.",
      });
      navigate("/admin");
    } catch (error) {
      toast({
        title: "Erro no login",
        description: "Ocorreu um erro inesperado. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isValidEmail(email)) {
      toast({
        title: "Erro de validação",
        description: "Por favor, insira um email válido.",
        variant: "destructive",
      });
      return;
    }
    
    if (!isValidPassword(password)) {
      toast({
        title: "Erro de validação",
        description: "A senha deve ter pelo menos 6 caracteres.",
        variant: "destructive",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Erro de validação",
        description: "As senhas não coincidem.",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      const { error } = await signUp(email, password);
      
      if (error) {
        if (error.message?.includes('already registered')) {
          toast({
            title: "Email já cadastrado",
            description: "Este email já está registrado. Faça login ou use outro email.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Erro no cadastro",
            description: error.message || "Erro ao criar conta. Tente novamente.",
            variant: "destructive",
          });
        }
        return;
      }

      toast({
        title: "Conta criada com sucesso!",
        description: "Verifique seu email para confirmar a conta e fazer login.",
      });
      
      // Switch to login tab after successful signup
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      toast({
        title: "Erro no cadastro",
        description: "Ocorreu um erro inesperado. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center">
        <div className="text-white text-lg">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10" />
      
      {/* Back to site button */}
      <Button
        variant="ghost"
        onClick={() => navigate("/")}
        className="absolute top-4 left-4 text-white hover:bg-white/10 z-20"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Voltar ao Site
      </Button>
      
      <Card className="w-full max-w-md bg-gray-900/80 border-gray-700 backdrop-blur-sm relative z-10">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <img 
              src="/lovable-uploads/logo.png" 
              alt="Logo" 
              className="w-20 h-20 object-contain"
              onError={(e) => {
                // Fallback to the other logo if main logo fails
                e.currentTarget.src = "/lovable-uploads/4f4e5f19-8048-4f7d-8fc2-3e63fab60673.png";
              }}
            />
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Painel Administrativo
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="signin" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 bg-gray-800 border-gray-600">
              <TabsTrigger value="signin" className="data-[state=active]:bg-purple-600 text-gray-300 data-[state=active]:text-white">
                Entrar
              </TabsTrigger>
              <TabsTrigger value="signup" className="data-[state=active]:bg-purple-600 text-gray-300 data-[state=active]:text-white">
                Cadastrar
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="signin">
              <form onSubmit={handleSignIn} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="signin-email" className="text-gray-300 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email
                  </Label>
                  <Input
                    id="signin-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
                    placeholder="seu@email.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signin-password" className="text-gray-300 flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Senha
                  </Label>
                  <Input
                    id="signin-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
                    placeholder="Digite sua senha"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-semibold py-2"
                >
                  {loading ? "Entrando..." : "Entrar"}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="signup">
              <form onSubmit={handleSignUp} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="signup-email" className="text-gray-300 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email
                  </Label>
                  <Input
                    id="signup-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
                    placeholder="seu@email.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-password" className="text-gray-300 flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Senha
                  </Label>
                  <Input
                    id="signup-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
                    placeholder="Mínimo 6 caracteres"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password" className="text-gray-300 flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Confirmar Senha
                  </Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
                    placeholder="Digite novamente a senha"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white font-semibold py-2"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  {loading ? "Criando Conta..." : "Criar Conta"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
