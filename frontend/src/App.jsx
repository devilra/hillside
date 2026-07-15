import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import WhatsAppButton from './components/WhatsAppButton';
import Footer from './components/Footer';
import SmoothScroll from './components/SmoothScroll';

import Home from './home/Home';
import About from './pages/About';
import PropertyDetailPage from './pages/PropertyDetailPage';
import ContactUsPage from './pages/ContactUs';

import Login from './pages/Login';
import Dashboard from './dashboard/Dashboard';

function AppContent() {
  const location = useLocation();
  // Check if current page is admin auth or admin dashboard
  const isAdminPage = location.pathname === "/login" || location.pathname.startsWith("/dashboard");

  return (
    <div className="min-h-screen">
      {/* Hide public preloader and header on admin console */}
      {!isAdminPage && <Preloader />}
      {!isAdminPage && <Navbar />}

      {/* Page Routing */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUsPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Project Pages */}
        <Route path="/centre-park" element={<PropertyDetailPage />} />
        <Route path="/purva-panorama" element={<PropertyDetailPage />} />
        <Route path="/hubtown-seasons-ecuador" element={<PropertyDetailPage />} />
        <Route path="/:slug" element={<PropertyDetailPage />} />
      </Routes>

      {/* Hide public WhatsApp chat and footer on admin console */}
      {!isAdminPage && <WhatsAppButton />}
      {!isAdminPage && <Footer />}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <SmoothScroll>
        <AppContent />
      </SmoothScroll>
    </BrowserRouter>
  );
}

export default App;