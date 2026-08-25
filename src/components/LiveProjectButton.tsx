import React from 'react';

interface LiveProjectButtonProps {
  href?: string;
  onClick?: () => void;
  className?: string;
  label?: string;
}

export const LiveProjectButton: React.FC<LiveProjectButtonProps> = ({
  href,
  onClick,
  className = '',
  label = 'Live Project',
}) => {
  const content = (
    <span
      className={`inline-flex items-center justify-center rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest text-sm sm:text-base px-8 py-3 sm:px-10 sm:py-3.5 transition-all duration-300 hover:bg-[#D7E2EA]/10 active:scale-95 cursor-pointer select-none ${className}`}
    >
      {label}
    </span>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" onClick={onClick} className="inline-block text-decoration-none">
        {content}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className="bg-transparent border-0 p-0">
      {content}
    </button>
  );
};
