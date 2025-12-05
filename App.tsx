
import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import WhyChooseUs from './components/WhyChooseUs';
import RoofTypes from './components/RoofTypes';
import Gallery from './components/Gallery';
import ServiceAreas from './components/ServiceAreas';
import Testimonials from './components/Testimonials';
import FaqCta from './components/FaqCta';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('');
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    // Check for saved theme in localStorage or default to false (light mode)
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  useEffect(() => {
    // Apply/remove the 'dark' class to the html element
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    // Save theme preference to localStorage
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // For the top, scroll to the very top of the document
      if (id === 'top') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const sectionIds = ['services', 'why-us', 'roof-types', 'gallery', 'areas', 'testimonials', 'faq'];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { 
        rootMargin: '-40% 0px -60% 0px',
        threshold: 0 
      }
    );

    sectionIds.forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      sectionIds.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, []);


  return (
    <div className="bg-grey-light text-dark-text font-sans leading-relaxed dark:bg-dark-bg dark:text-dark-text-primary transition-colors duration-300">
      <Header onScrollTo={handleScrollTo} activeSection={activeSection} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main>
        <Hero onScrollTo={handleScrollTo} />
        <Services />
        <WhyChooseUs onScrollTo={handleScrollTo} />
        <RoofTypes />
        <Gallery />
        <ServiceAreas />
        <Testimonials />
        <FaqCta onScrollTo={handleScrollTo} />
      </main>
      <Footer onScrollTo={handleScrollTo} />
    </div>
  );
};

export default App;
