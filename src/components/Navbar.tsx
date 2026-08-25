import React from 'react';
import { FadeIn } from './FadeIn';

export const Navbar: React.FC = () => {
  const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Price', href: '#services' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <FadeIn delay={0} y={-20} duration={0.7} className="w-full">
      <nav className="flex justify-between items-center w-full px-6 md:px-10 pt-6 md:pt-8">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] transition-opacity duration-200 hover:opacity-70"
          >
            {item.label}
          </a>
        ))}
      </nav>
    </FadeIn>
  );
};
