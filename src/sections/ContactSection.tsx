import React from 'react';
import { FadeIn } from '../components/FadeIn';
import { ContactButton } from '../components/ContactButton';
import { Mail, Phone, MapPin, ArrowUpRight, Github, Linkedin, Twitter } from 'lucide-react';

export const ContactSection: React.FC = () => {
  return (
    <footer
      id="contact"
      className="bg-[#0C0C0C] text-[#D7E2EA] border-t border-[#D7E2EA]/10 px-6 md:px-12 py-20 relative z-20"
    >
      <div className="max-w-5xl mx-auto flex flex-col gap-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 pb-12 border-b border-[#D7E2EA]/10">
          <div>
            <FadeIn delay={0} y={20}>
              <span className="text-xs uppercase tracking-widest text-[#D7E2EA]/50 font-medium">
                Let&apos;s Connect
              </span>
              <h2
                className="hero-heading font-black uppercase tracking-tight leading-none mt-2"
                style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)' }}
              >
                Let&apos;s Build Together
              </h2>
              <p className="text-[#D7E2EA]/70 max-w-lg mt-4 font-light text-base md:text-lg">
                Have a 3D vision, luxury e-commerce flagship, or custom interactive experience in mind? Let&apos;s turn it into an unforgettable digital masterpiece.
              </p>
            </FadeIn>
          </div>

          <FadeIn delay={0.2} y={20}>
            <ContactButton href="mailto:shubhamz9972@gmail.com" label="Get in Touch" />
          </FadeIn>
        </div>

        {/* Contact Info & Channels */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-sm">
          <div className="flex flex-col gap-2">
            <span className="text-xs uppercase tracking-widest text-[#D7E2EA]/50 flex items-center gap-2">
              <Mail className="w-3.5 h-3.5" /> Email
            </span>
            <a
              href="mailto:shubhamz9972@gmail.com"
              className="text-[#D7E2EA] hover:opacity-70 transition-opacity font-medium break-all"
            >
              shubhamz9972@gmail.com
            </a>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-xs uppercase tracking-widest text-[#D7E2EA]/50 flex items-center gap-2">
              <Phone className="w-3.5 h-3.5" /> WhatsApp / Direct
            </span>
            <a
              href="tel:+917889185797"
              className="text-[#D7E2EA] hover:opacity-70 transition-opacity font-medium"
            >
              +91 7889185797
            </a>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-xs uppercase tracking-widest text-[#D7E2EA]/50 flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5" /> Studio
            </span>
            <span className="text-[#D7E2EA] font-medium">San Francisco & Remote</span>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-xs uppercase tracking-widest text-[#D7E2EA]/50">Socials</span>
            <div className="flex items-center gap-4 text-[#D7E2EA]">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="hover:opacity-70 transition-opacity"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="hover:opacity-70 transition-opacity"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="hover:opacity-70 transition-opacity"
                aria-label="Twitter / X"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Live Showcases Sub-links */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 text-xs text-[#D7E2EA]/40">
          <div className="flex items-center gap-6">
            <a
              href="/elysian_clothing_store.html"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#D7E2EA] transition-colors flex items-center gap-1"
            >
              <span>Elysian Luxury Store</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
            <a
              href="/nocturne_bistro.html"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#D7E2EA] transition-colors flex items-center gap-1"
            >
              <span>Nocturne Bistro</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
            <a
              href="https://lumora-dental-eight.vercel.app/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#D7E2EA] transition-colors flex items-center gap-1"
            >
              <span>Lumora Dental</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>

          <p>© 2026 Shubh • 3D Creator & Creative Technologist. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
