
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Forecast from "./pages/Forecast";
import Inventory from "./pages/Inventory";
import Procurement from "./pages/Procurement";
import RouteAgent from "./pages/RouteAgent";
import NotFound from "./pages/NotFound";
import LeafletStyles from "./components/LeafletStyles";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LeafletStyles />
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="forecast" element={<Forecast />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="procurement" element={<Procurement />} />
            <Route path="routes" element={<RouteAgent />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
