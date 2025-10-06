import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";

// Pages
import Login from "./pages/Login";
import NewUser from "./pages/NewUser";
import Home from "./pages/Home";
import Weather from "./pages/Weather";
import CropRecommendation from "./pages/CropRecommendation";
import Market from "./pages/Market";
import Support from "./pages/Support";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import SoilHealth from "./pages/SoilHealth";
import LanguageSettings from "./pages/LanguageSettings";
import Forum from "./pages/Forum";
import ForumCreate from "./pages/ForumCreate";

// Chatbot
import Chatbot from "./components/Chatbot";

const queryClient = new QueryClient();

// ✅ Layout wrapper to safely use useLocation
function AppLayout() {
  const location = useLocation();

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/new" element={<NewUser />} />

        {/* Forum */}
        <Route path="/forum/create" element={<ForumCreate />} />
        <Route path="/forum" element={<Forum />} />

        <Route path="/home" element={<Home />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/recommendation" element={<CropRecommendation />} />
        <Route path="/market" element={<Market />} />
        <Route path="/soil" element={<SoilHealth />} />
        <Route path="/support" element={<Support />} />
        <Route path="/language" element={<LanguageSettings />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="*" element={<NotFound />} />
      </Routes>


      {/* 👇 Only show chatbot after login */}
      {location.pathname !== "/" && location.pathname !== "/new" && <Chatbot />}
    </>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppLayout />
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}
