
import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { initScrollbarHiding } from "@/lib/hideScrollbars";

const queryClient = new QueryClient();

const App = () => {
useEffect(() => {
    // Initialize scrollbar hiding for iframes and modals
    const cleanup = initScrollbarHiding();

    // 2. Direct Global Injection for the current document
    const style = document.createElement('style');
    style.textContent = `
      /* Hide scrollbars for everyone and everything */
      html, body, #root {
        scrollbar-width: none !important;
        -ms-overflow-style: none !important;
        overflow: -moz-scrollbars-none;
      }
      ::-webkit-scrollbar {
        display: none !important;
        width: 0 !important;
        height: 0 !important;
      }
    `;
    document.head.appendChild(style);
    
    return cleanup;
  }, []);

  return (
  
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
