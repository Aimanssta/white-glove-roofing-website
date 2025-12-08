
import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import WhyChooseUs from './components/WhyChooseUs';
// RoofTypes section repurposed to show blog list inside the home page
import Gallery from './components/Gallery';
import ServiceAreas from './components/ServiceAreas';
import Testimonials from './components/Testimonials';
import FaqCta from './components/FaqCta';
import Footer from './components/Footer';
import BlogList from './components/BlogList';
import BlogDetail from './components/BlogDetail';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('');
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [page, setPage] = useState<'home' | 'blog' | 'blog-detail'>('home');
  const [blogSlug, setBlogSlug] = useState<string>('');
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
    if (id === 'blog') {
      setPage('blog');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    const element = document.getElementById(id);
    if (!element) return;

    // Start transition overlay
    setIsTransitioning(true);

    // Short delay to allow overlay to fade in, then scroll
    setTimeout(() => {
      if (id === 'top') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }

      // Hide overlay after the scroll animation
      // duration chosen to match CSS transition (600ms)
      setTimeout(() => setIsTransitioning(false), 600);
    }, 120);
  };

  const handleBlogClick = (slug?: string) => {
    if (slug) {
      setPage('blog-detail');
      setBlogSlug(slug);
    } else {
      setPage('blog');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoHome = () => {
    setPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const sectionIds = ['services', 'why-us', 'blog', 'gallery', 'areas', 'testimonials', 'faq'];

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
    <div className="bg-grey-light text-dark-text font-sans leading-relaxed dark:bg-dark-bg dark:text-dark-text-primary transition-colors duration-300 scroll-smooth">
      <Header onScrollTo={handleScrollTo} activeSection={activeSection} darkMode={darkMode} toggleDarkMode={toggleDarkMode} onBlogClick={() => handleBlogClick()} />
      {/* Page transition overlay */}
      <div
        aria-hidden
        className={`fixed inset-0 pointer-events-none transition-opacity duration-500 ease-in-out ${isTransitioning ? 'opacity-100' : 'opacity-0'}`}
        style={{ background: darkMode ? 'rgba(3,7,18,0.6)' : 'rgba(255,255,255,0.85)', backdropFilter: 'blur(4px)' }}
      />
      {page === 'home' && (
        <main>
          <Hero onScrollTo={handleScrollTo} />
          <Services />
          <WhyChooseUs onScrollTo={handleScrollTo} />
          {/* Replaced Florida Roofs section with the Blog list */}
          <BlogList onArticleClick={handleBlogClick} onBackClick={handleGoHome} />
          <Gallery />
          <ServiceAreas />
          <Testimonials />
          <FaqCta onScrollTo={handleScrollTo} />
        </main>
      )}
      {page === 'blog' && <BlogList onArticleClick={handleBlogClick} onBackClick={handleGoHome} />}
      {page === 'blog-detail' && <BlogDetail slug={blogSlug} onBackClick={() => handleBlogClick()} onArticleClick={handleBlogClick} />}
      <Footer onScrollTo={handleScrollTo} onBlogClick={() => handleBlogClick()} />
    </div>
  );
};

export default App;
