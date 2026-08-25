import React from 'react';
import { FadeIn } from '../components/FadeIn';
import { AnimatedText } from '../components/AnimatedText';
import { ContactButton } from '../components/ContactButton';

export const AboutSection: React.FC = () => {
  const aboutText =
    "Hi, SHUBHAM is here, for the past 1 year I learned about AI and AI automation. Now, I help business owners with AI make more sales and build audience. We help them to rank on Google in top 5 and generate traffic to their website.";

  return (
    <section
      id="about"
      className="relative min-h-screen w-full flex flex-col justify-center items-center px-5 sm:px-8 md:px-10 py-20 bg-[#0C0C0C] overflow-hidden"
    >
      {/* Top-Left Floating Moon Icon */}
      <div className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] pointer-events-none select-none z-0">
        <FadeIn delay={0.1} x={-80} y={0} duration={0.9}>
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png"
            alt="3D Moon Decor"
            className="w-[120px] sm:w-[160px] md:w-[210px] h-auto object-contain drop-shadow-xl"
            loading="lazy"
          />
        </FadeIn>
      </div>

      {/* Bottom-Left Floating 3D Object */}
      <div className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] pointer-events-none select-none z-0">
        <FadeIn delay={0.25} x={-80} y={0} duration={0.9}>
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png"
            alt="3D Glass Sphere Decor"
            className="w-[100px] sm:w-[140px] md:w-[180px] h-auto object-contain drop-shadow-xl"
            loading="lazy"
          />
        </FadeIn>
      </div>

      {/* Top-Right Floating Lego Icon */}
      <div className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] pointer-events-none select-none z-0">
        <FadeIn delay={0.15} x={80} y={0} duration={0.9}>
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png"
            alt="3D Lego Decor"
            className="w-[120px] sm:w-[160px] md:w-[210px] h-auto object-contain drop-shadow-xl"
            loading="lazy"
          />
        </FadeIn>
      </div>

      {/* Bottom-Right Floating 3D Group */}
      <div className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] pointer-events-none select-none z-0">
        <FadeIn delay={0.3} x={80} y={0} duration={0.9}>
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png"
            alt="3D Group Decor"
            className="w-[130px] sm:w-[170px] md:w-[220px] h-auto object-contain drop-shadow-xl"
            loading="lazy"
          />
        </FadeIn>
      </div>

      {/* Main Centered Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
        {/* Section Heading */}
        <FadeIn delay={0} y={40} duration={0.8}>
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            About me
          </h2>
        </FadeIn>

        {/* Gap between heading & text */}
        <div className="h-10 sm:h-14 md:h-16" />

        {/* Character-by-Character Animated Text */}
        <div className="max-w-[560px] px-2">
          <AnimatedText
            text={aboutText}
            className="text-[#D7E2EA] font-medium leading-relaxed"
          />
        </div>

        {/* Gap between text & contact button */}
        <div className="h-16 sm:h-20 md:h-24" />

        {/* Contact Button */}
        <FadeIn delay={0.2} y={20} duration={0.7}>
          <ContactButton href="#contact" />
        </FadeIn>
      </div>
    </section>
  );
};
