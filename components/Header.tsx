
import React from 'react';
import Logo from './Logo';

interface HeaderProps {
  onScrollTo: (id: string) => void;
  activeSection: string;
  darkMode: boolean;
  toggleDarkMode: () => void;
  onBlogClick?: () => void;
}

const NavLink: React.FC<{ id: string; onScrollTo: (id: string) => void; children: React.ReactNode, isActive: boolean }> = ({ id, onScrollTo, children, isActive }) => (
  <li>
    <button
      onClick={() => onScrollTo(id)}
      className="relative pb-1 group transition-colors duration-200"
      aria-current={isActive ? 'page' : undefined}
    >
      <span className={isActive ? 'text-white font-semibold' : 'text-blue-100/90 group-hover:text-white'}>
        {children}
      </span>
      <span className={`absolute left-0 bottom-0 block h-0.5 bg-accent-blue transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
    </button>
  </li>
);

const ThemeToggleButton: React.FC<{ darkMode: boolean; toggle: () => void; }> = ({ darkMode, toggle }) => (
  <button onClick={toggle} aria-label="Toggle dark mode" className="w-8 h-8 flex items-center justify-center rounded-full text-blue-200 hover:bg-white/10 transition-colors">
    {darkMode ? (
      // Sun Icon (smaller)
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 14.95l.707-.707a1 1 0 011.414 1.414l-.707.707a1 1 0 01-1.414-1.414zM2 11a1 1 0 100-2H1a1 1 0 100 2h1zM4.343 5.657a1 1 0 011.414 0l.707.707a1 1 0 01-1.414 1.414l-.707-.707a1 1 0 010-1.414z" clipRule="evenodd" />
      </svg>
    ) : (
      // Moon Icon (smaller)
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
      </svg>
    )}
  </button>
);


const Header: React.FC<HeaderProps> = ({ onScrollTo, activeSection, darkMode, toggleDarkMode, onBlogClick }) => {
  const navItems = [
    { id: 'services', label: 'Services' },
    { id: 'why-us', label: 'Why Us' },
    { id: 'gallery', label: 'Our Work' },
    { id: 'areas', label: 'Service Areas' },
    { id: 'testimonials', label: 'Reviews' },
    { id: 'faq', label: 'FAQ' },
    { id: 'blog', label: 'Blog' },
  ];
  
  return (
    <header className="sticky top-0 z-50 bg-primary-blue/95 backdrop-blur-md shadow-2xl dark:bg-dark-bg/95 dark:shadow-slate-900/50">
      <div className="container mx-auto px-5">
        <div className="hidden sm:flex justify-end items-center text-xs text-blue-200 py-1 gap-3">
          <span>Licensed &amp; Insured Florida Roofing Contractor</span>
          <span>Emergency Storm Response • 24/7</span>
        </div>
        <div className="flex items-center justify-between py-1 sm:py-2">
          <button onClick={() => onScrollTo('top')} className="text-white">
            <Logo size="lg" />
          </button>
          <nav>
            <ul className="hidden lg:flex gap-6 list-none text-sm">
              {navItems.map(item => (
                item.id === 'blog' ? (
                  <li key={item.id}>
                    <button
                      onClick={() => onBlogClick?.()}
                      className="relative pb-1 group transition-colors duration-200"
                      aria-current={activeSection === item.id ? 'page' : undefined}
                    >
                      <span className={activeSection === item.id ? 'text-white font-semibold' : 'text-blue-100/90 group-hover:text-white'}>
                        {item.label}
                      </span>
                      <span className={`absolute left-0 bottom-0 block h-0.5 bg-accent-blue transition-all duration-300 ${activeSection === item.id ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                    </button>
                  </li>
                ) : (
                  <NavLink key={item.id} id={item.id} onScrollTo={onScrollTo} isActive={activeSection === item.id}>
                    {item.label}
                  </NavLink>
                )
              ))}
            </ul>
          </nav>
          <div className="flex gap-2 items-center">
            <a href="tel:+13059287663" className="hidden md:inline text-sm text-blue-200 font-medium hover:text-white transition-colors">(305) 928-7663</a>
            <ThemeToggleButton darkMode={darkMode} toggle={toggleDarkMode} />
            <button onClick={() => onScrollTo('quote-form')} className="bg-transparent text-blue-100 border border-blue-300/80 rounded-full px-3 py-1 text-sm font-semibold transition-all duration-200 ease-in-out hover:bg-accent-blue hover:text-primary-blue hover:shadow-lg hover:-translate-y-0.5 dark:border-blue-300/50 dark:hover:bg-blue-200">
              Free Estimate
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
