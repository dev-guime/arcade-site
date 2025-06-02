
import { Toaster } from "@/components/ui/toaster";
import Index from "@/pages/Index";
import PcsPage from "@/pages/PcsPage";
import PcDetailPage from "@/pages/PcDetailPage";
import PerifericosPage from "@/pages/PerifericosPage";
import LoginPage from "@/pages/LoginPage";
import NotFound from "@/pages/NotFound";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminPanel from "@/pages/AdminPanel";
import { ProductsProvider } from "@/contexts/ProductsContext";
import { AuthProvider } from "@/contexts/AuthContext";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <ProductsProvider>
            <Toaster />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/pcs" element={<PcsPage />} />
                <Route path="/pc/:id" element={<PcDetailPage />} />
                <Route path="/perifericos" element={<PerifericosPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/admin" element={<AdminPanel />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </ProductsProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
