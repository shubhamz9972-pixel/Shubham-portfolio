import React from 'react';
import { Navbar } from '../components/Navbar';
import { ContactButton } from '../components/ContactButton';
import { Magnet } from '../components/Magnet';
import { FadeIn } from '../components/FadeIn';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative h-screen w-full flex flex-col justify-between overflow-x-clip bg-[#0C0C0C]">
      {/* Top Navbar */}
      <Navbar />

      {/* Center Absolute Magnetic Portrait */}
      <div className="absolute left-1/2 -translate-x-1/2 z-10 top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0 pointer-events-auto">
        <FadeIn delay={0.6} y={30} duration={0.8}>
          <Magnet
            padding={150}
            strength={3}
            activeTransition="transform 0.3s ease-out"
            inactiveTransition="transform 0.6s ease-in-out"
          >
            <img
              src="https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png"
              alt="Shubh 3D Creator Portrait"
              className="w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px] h-auto object-contain select-none pointer-events-none drop-shadow-2xl"
              loading="eager"
            />
          </Magnet>
        </FadeIn>
      </div>

      {/* Massive Hero Heading */}
      <div className="w-full overflow-hidden text-center z-0 mt-6 sm:mt-4 md:-mt-5 select-none">
        <FadeIn delay={0.15} y={40} duration={0.8}>
          <h1 className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-[14vw] sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw]">
            Hi, i&apos;m shubh
          </h1>
        </FadeIn>
      </div>

      {/* Bottom Bar */}
      <div className="flex justify-between items-end w-full px-6 md:px-10 pb-7 sm:pb-8 md:pb-10 z-20">
        <FadeIn delay={0.35} y={20} duration={0.7}>
          <p
            className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-[160px] sm:max-w-[220px] md:max-w-[260px]"
            style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
          >
            a 3d creator driven by crafting striking and unforgettable projects
          </p>
        </FadeIn>

        <FadeIn delay={0.5} y={20} duration={0.7}>
          <ContactButton href="#contact" />
        </FadeIn>
      </div>
    </section>
  );
};
