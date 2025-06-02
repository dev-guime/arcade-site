import { Toaster } from "@/components/ui/toaster";
import Index from "@/pages";
import PcsPage from "@/pages/PcsPage";
import PcDetailPage from "@/pages/PcDetailPage";
import PerifericosPage from "@/pages/PerifericosPage";
import NotFound from "@/pages/NotFound";
import { QueryClient } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminPanel from "@/pages/AdminPanel";

function App() {
  return (
    <QueryClient>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/pcs" element={<PcsPage />} />
            <Route path="/pc/:id" element={<PcDetailPage />} />
            <Route path="/perifericos" element={<PerifericosPage />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClient>
  );
}

export default App;
