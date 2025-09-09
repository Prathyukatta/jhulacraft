import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import Products from "./pages/Products";
import ProductPreview from "./pages/Preview"; // ✅ Preview page
import NotFound from "./pages/NotFound";
import InquiryForm from "./pages/InquiryForm"; // Contact / Inquiry Form page
import { About } from "./pages/About"; // ✅ About page

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductPreview />} /> {/* ✅ Fixed here */}
          <Route path="/about" element={<About />} /> {/* ✅ About page */}
          <Route path="/contact" element={<InquiryForm />} /> {/* Contact page */}
          <Route path="*" element={<NotFound />} /> {/* Fallback */}
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
