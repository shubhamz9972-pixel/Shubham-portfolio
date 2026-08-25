import React from 'react';
import { HeroSection } from './sections/HeroSection';
import { MarqueeSection } from './sections/MarqueeSection';
import { AboutSection } from './sections/AboutSection';
import { ServicesSection } from './sections/ServicesSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { ContactSection } from './sections/ContactSection';
import { ChatBot } from './components/ChatBot';
import { SpeedInsights } from '@vercel/speed-insights/react';

export const App: React.FC = () => {
  return (
    <main className="bg-[#0C0C0C] min-h-screen text-[#D7E2EA] font-kanit overflow-x-clip selection:bg-[#B600A8]/30 selection:text-white">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Marquee Section */}
      <MarqueeSection />

      {/* 3. About Section */}
      <AboutSection />

      {/* 4. Services Section */}
      <ServicesSection />

      {/* 5. Projects Section */}
      <ProjectsSection />

      {/* Contact & Footer Section */}
      <ContactSection />

      {/* AI Chatbot Floating Widget */}
      <ChatBot />

      {/* Vercel Speed Insights */}
      <SpeedInsights />
    </main>
  );
};

export default App;
