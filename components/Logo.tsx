
import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md';
}

const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const wrapperClasses = size === 'sm' ? 'gap-2' : 'gap-3';
  const svgClasses = size === 'sm' ? 'w-10 h-10' : 'w-12 h-12';
  const titleClasses = size === 'sm' ? 'text-base' : 'text-lg sm:text-xl';
  const subtitleClasses = size === 'sm' ? 'text-sm' : 'text-base sm:text-lg';

  return (
    <div className={`flex items-center ${wrapperClasses} ${className}`}>
      <div className={`flex-shrink-0 ${svgClasses}`}>
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="rounded-md shadow-sm w-full h-full">
          <rect width="48" height="48" fill="#0B4F9C"/>
          <path d="M0 48C14.3333 32.3333 26.6667 29.3333 41 33.5V48H0Z" fill="black"/>
          <path d="M0 48C16 34 29.3333 32.3333 46 36.5L44.5 48H0Z" fill="url(#paint0_linear_logo)"/>
          <text fill="white" xmlSpace="preserve" style={{whiteSpace: "pre"}} fontFamily="system-ui, sans-serif" fontSize="18" fontWeight="bold" letterSpacing="0.05em">
            <tspan x="5" y="27">WGR</tspan>
          </text>
          <defs>
            <linearGradient id="paint0_linear_logo" x1="0" y1="48" x2="46" y2="36.5" gradientUnits="userSpaceOnUse">
              <stop stopColor="white"/>
              <stop offset="1" stopColor="#E0E0E0"/>
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="text-left leading-tight">
        <span className={`font-extrabold tracking-wider uppercase ${titleClasses}`}>White Glove Roofing</span>
        <span className={`block font-semibold tracking-widest uppercase text-blue-300 ${subtitleClasses}`}>Inc.</span>
      </div>
    </div>
  );
};

export default Logo;
