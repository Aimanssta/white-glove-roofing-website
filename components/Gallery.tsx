
import React, { useState } from 'react';

const galleryImages = [
  { src: '/images/gallery-1.webp', category: 'replacement', alt: 'Roof replacement project' },
  { src: '/images/gallery-2.webp', category: 'repair', alt: 'Roof repair project' },
  { src: '/images/gallery-3.webp', category: 'commercial', alt: 'Commercial roof project' },
  { src: '/images/gallery-4.webp', category: 'replacement', alt: 'Roof replacement project' },
  { src: '/images/gallery-5.webp', category: 'repair', alt: 'Roof repair project' },
  { src: '/images/gallery-6.webp', category: 'replacement', alt: 'Roof replacement project' },
  { src: '/images/gallery-7.webp', category: 'commercial', alt: 'Commercial roof project' },
  { src: '/images/gallery-8.webp', category: 'replacement', alt: 'Roof replacement project' },
  { src: '/images/gallery-9.webp', category: 'repair', alt: 'Roof repair project' },
  { src: '/images/gallery-10.webp', category: 'commercial', alt: 'Commercial roof project' },
  { src: '/images/gallery-11.webp', category: 'replacement', alt: 'Roof replacement project' },
  { src: '/images/gallery-12.webp', category: 'repair', alt: 'Roof repair project' },
  { src: '/images/gallery-13.webp', category: 'replacement', alt: 'Roof replacement project' },
  { src: '/images/gallery-14.webp', category: 'commercial', alt: 'Commercial roof project' },
  { src: '/images/gallery-15.webp', category: 'repair', alt: 'Roof repair project' },
  { src: '/images/gallery-16.webp', category: 'replacement', alt: 'Roof replacement project' },
  { src: '/images/gallery-17.webp', category: 'commercial', alt: 'Commercial roof project' },
  { src: '/images/gallery-18.webp', category: 'repair', alt: 'Roof repair project' },
  { src: '/images/gallery-19.webp', category: 'replacement', alt: 'Roof replacement project' },
  { src: '/images/gallery-20.webp', category: 'commercial', alt: 'Commercial roof project' },
];

const FilterButton: React.FC<{ label: string; isActive: boolean; onClick: () => void; }> = ({ label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 ${
      isActive
        ? 'bg-primary-blue text-white shadow-md dark:bg-blue-400 dark:text-dark-bg'
        : 'bg-white text-grey-text hover:bg-blue-100 dark:bg-dark-card dark:text-dark-text-secondary dark:hover:bg-slate-600'
    }`}
  >
    {label}
  </button>
);


const Gallery: React.FC = () => {
  const [filter, setFilter] = useState('all');

  const filteredImages = filter === 'all'
    ? galleryImages
    : galleryImages.filter(image => image.category === filter);

  return (
    <section id="gallery" className="py-12 md:py-16 bg-grey-light dark:bg-dark-bg/50">
      <div className="container mx-auto px-5">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-blue dark:text-blue-300 mb-4">Our Work Showcase</h2>
          <p className="text-base text-grey-text dark:text-dark-text-secondary">
            A look at some of the high-quality roof repairs, replacements, and commercial projects we've completed across Miami.
          </p>
        </div>

        <div className="flex justify-center flex-wrap gap-3 mb-8">
          <FilterButton label="All" isActive={filter === 'all'} onClick={() => setFilter('all')} />
          <FilterButton label="Replacements" isActive={filter === 'replacement'} onClick={() => setFilter('replacement')} />
          <FilterButton label="Repairs" isActive={filter === 'repair'} onClick={() => setFilter('repair')} />
          <FilterButton label="Commercial" isActive={filter === 'commercial'} onClick={() => setFilter('commercial')} />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredImages.map((image, index) => (
            <div key={index} className="overflow-hidden rounded-lg shadow-lg group">
              <img 
                src={image.src} 
                alt={image.alt}
                className="w-full h-full object-cover aspect-square transform group-hover:scale-110 transition-transform duration-300 ease-in-out" 
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
