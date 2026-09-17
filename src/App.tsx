import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

import { Home } from './pages/Home';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { Portfolio } from './pages/Portfolio';
import { ProjectDetails } from './pages/ProjectDetails';
import { Process } from './pages/Process';
import { Testimonials } from './pages/Testimonials';
import { FAQ } from './pages/FAQ';
import { Contact } from './pages/Contact';
import { NotFound } from './pages/NotFound';

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-[#080d1a] text-slate-100 selection:bg-blue-600 selection:text-white">
        <ScrollToTop />
        <Navbar />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/portfolio/:slug" element={<ProjectDetails />} />
            <Route path="/process" element={<Process />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
        <FloatingWhatsApp />
      </div>
    </BrowserRouter>
  );
}
