
import React from 'react';

const Chip: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="bg-white text-dark-text text-sm font-medium px-4 py-2 rounded-full shadow-md dark:bg-slate-700 dark:text-dark-text-primary dark:shadow-slate-900/50">
    {children}
  </span>
);

const ServiceAreas: React.FC = () => {
  const areas = [
    "Miami", "Miami Beach", "Coral Gables", "Kendall", "Doral",
    "Hialeah", "North Miami", "Aventura", "Homestead",
    "Miami Shores", "Coconut Grove", "Brickell"
  ];

  return (
    <section id="areas" className="py-12 md:py-16 bg-accent-blue dark:bg-dark-bg">
      <div className="container mx-auto px-5">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-left mb-6">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-blue dark:text-blue-300 mb-4">Serving Miami & South Florida Communities</h2>
              <p className="text-base text-grey-text dark:text-dark-text-secondary">
                White Glove Roofing proudly services homeowners, HOAs, property managers, and businesses throughout Miami-Dade County and nearby South Florida cities.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {areas.map(area => <Chip key={area}>{area}</Chip>)}
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-xl dark:bg-dark-card dark:shadow-slate-900/50">
            <strong className="text-lg text-primary-blue dark:text-blue-300">Commercial & Multi-Family Roofing</strong>
            <p className="mt-2 mb-4 text-sm text-grey-text dark:text-dark-text-secondary">In addition to residential roofing, we partner with:</p>
            <ul className="space-y-1.5 text-sm list-none text-dark-text dark:text-dark-text-secondary">
              <li className="flex items-start gap-2"><span className="text-primary-blue dark:text-blue-400">✓</span> HOAs and condominium associations</li>
              <li className="flex items-start gap-2"><span className="text-primary-blue dark:text-blue-400">✓</span> Apartment and multi-family property owners</li>
              <li className="flex items-start gap-2"><span className="text-primary-blue dark:text-blue-400">✓</span> Retail centers and office buildings</li>
              <li className="flex items-start gap-2"><span className="text-primary-blue dark:text-blue-400">✓</span> Warehouses and light industrial facilities</li>
            </ul>
            <p className="mt-4 text-xs text-grey-text dark:text-dark-text-secondary/80">
              Need a reliable roofer for your Miami portfolio? Ask about our ongoing maintenance plans.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceAreas;