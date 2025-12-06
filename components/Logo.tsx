
import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'full';
}

const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const imageClasses = size === 'sm' ? 'w-10 h-10' : size === 'lg' ? 'w-16 h-16' : size === 'full' ? 'w-20 h-20' : 'w-12 h-12';
  const titleClasses = size === 'sm' ? 'text-base' : size === 'lg' ? 'text-2xl sm:text-3xl' : size === 'full' ? 'text-3xl sm:text-4xl' : 'text-lg sm:text-xl';
  const subtitleClasses = size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-lg sm:text-xl' : size === 'full' ? 'text-xl sm:text-2xl' : 'text-base sm:text-lg';
  const wrapperClasses = size === 'sm' ? 'gap-2' : size === 'lg' ? 'gap-4' : size === 'full' ? 'gap-5' : 'gap-3';

  return (
    <div className={`flex items-center ${wrapperClasses} ${className}`}>
      <div className={`flex-shrink-0 ${imageClasses}`}>
        <img src="/images/wgr logo enhanced.png" alt="White Glove Roofing Logo" className="rounded-md shadow-sm w-full h-full object-cover" />
      </div>
      <div className="text-left leading-tight">
        <span className={`font-extrabold tracking-wider uppercase ${titleClasses}`}>White Glove Roofing</span>
        <span className={`block font-semibold tracking-widest uppercase text-blue-300 ${subtitleClasses}`}>Inc.</span>
      </div>
    </div>
  );
};

export default Logo;
