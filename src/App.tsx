import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ServicesPage from "./pages/ServicesPage";
import AboutPage from "./pages/AboutPage";
import CaseStudiesPage from "./pages/CaseStudiesPage";
import CaseStudyDetailPage from "./pages/CaseStudyDetailPage";
import BlogPage from "./pages/BlogPage";
import BlogDetailPage from "./pages/BlogDetailPage";
import EventsPage from "./pages/EventsPage";
import TrackTracePage from "./pages/TrackTracePage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";
import WhatsAppButton from "./components/WhatsAppButton";
import Internship from "./pages/Internship";



// Admin 
import PrivateRoute from "./pages/admin/PrivateRoute";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminLogin from "./pages/admin/AdminLogin";
import Dashboard from "./pages/admin/Dashboard";
import Services from "./pages/admin/Services";
import Service_manage from "./pages/admin/Service_manage";
import Blog from "./pages/admin/Blog";
import Blog_manage from "./pages/admin/Blog_manage";
import CaseStudies from "./pages/admin/CaseStudies";
import CaseStudies_manage from "./pages/admin/CaseStudies_manage";
import InternshipAdmin from "./pages/admin/Internship";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/case-study" element={<CaseStudiesPage />} />
          <Route path="/case-study/:slug" element={<CaseStudyDetailPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogDetailPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/track-trace" element={<TrackTracePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/internship" element={<Internship />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}

          {/* Admin login */}
          <Route path="/admin" element={<AdminLogin />} />

          <Route element={<PrivateRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/services" element={<Services />} />
              <Route path="/admin/services/add" element={<Service_manage />} />
              <Route path="/admin/services/edit/:id" element={<Service_manage />} />
              <Route path="/admin/blog" element={<Blog />} />
              <Route path="/admin/blog/add" element={<Blog_manage />} />
              <Route path="/admin/blog/edit/:id" element={<Blog_manage />} />
              <Route path="/admin/case-studies" element={<CaseStudies />} />
              <Route path="/admin/case-studies/add" element={<CaseStudies_manage />} />
              <Route path="/admin/case-studies/edit/:id" element={<CaseStudies_manage />} />
              <Route path="/admin/internship" element={<InternshipAdmin />} />
            </Route>
          </Route>

          {/* catch all */}
          <Route path="*" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <WhatsAppButton />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
