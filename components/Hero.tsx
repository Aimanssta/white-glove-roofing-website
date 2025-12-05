
import React, { useState } from 'react';

interface HeroProps {
  onScrollTo: (id: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onScrollTo }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    service: '',
    details: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you! Your request has been submitted.');
    setFormData({ name: '', phone: '', email: '', city: '', service: '', details: '' });
  };
  
  return (
    <section id="top" className="relative text-white py-16 md:py-20 lg:py-24 bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('/images/newly-insyalled-roof-tiles-hialeah-fl.webp')", backgroundAttachment: 'fixed' }}>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-blue-800/75 to-black/80 dark:from-blue-900/80 dark:via-blue-800/90 dark:to-primary-blue/95"></div>
      <div className="container mx-auto px-5 relative">
        <div className="grid lg:grid-cols-[1.3fr,1fr] gap-10 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm py-1.5 px-4 border border-white/30 rounded-full text-sm mb-4">
              <span className="py-0.5 px-2.5 rounded-full bg-primary-blue/90 font-semibold text-xs">Miami Roofing Experts</span>
              Hurricane-ready roofs for South Florida homes
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-3 text-shadow-lg">
              Premium <span className="text-blue-100">Roofing in Miami, FL</span><br />
              With White Glove Service.
            </h1>
            <p className="text-lg max-w-xl mx-auto lg:mx-0 mb-5 text-blue-100/90">
              White Glove Roofing is a local, licensed Miami roofing contractor specializing in long-lasting roof repairs, replacements, and maintenance tailored to Florida’s climate.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-3 mb-6 text-sm">
              <span className="flex items-center gap-2">✓ Licensed &amp; insured</span>
              <span className="flex items-center gap-2">✓ Hurricane-grade installations</span>
              <span className="flex items-center gap-2">✓ Tile, shingle, metal &amp; flat roof experts</span>
            </div>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-4">
              <button onClick={() => onScrollTo('quote-form')} className="bg-white text-primary-blue font-bold py-3 px-6 rounded-full shadow-2xl transition-all duration-300 ease-in-out hover:shadow-blue-200/50 hover:-translate-y-1 transform dark:bg-blue-200 dark:hover:bg-white">
                Get a Free Roof Estimate
              </button>
              <button onClick={() => onScrollTo('services')} className="bg-transparent text-white border-2 border-white rounded-full font-bold py-3 px-6 transition-all duration-300 ease-in-out hover:bg-white hover:text-primary-blue transform hover:-translate-y-1">
                View Roofing Services
              </button>
            </div>
          </div>

          <aside id="quote-form" className="bg-white rounded-2xl p-6 shadow-2xl text-dark-text dark:bg-dark-card dark:text-dark-text-primary">
            <h2 className="text-xl font-bold mb-1">Request Your Free Roof Inspection</h2>
            <p className="text-sm text-grey-text mb-4 dark:text-dark-text-secondary">
              A Miami roofing specialist will contact you to schedule a no-obligation inspection.
            </p>
            <form onSubmit={handleSubmit}>
              <div className="grid sm:grid-cols-2 gap-x-4 gap-y-3">
                <div>
                  <label htmlFor="name" className="text-xs font-semibold">Full Name *</label>
                  <input id="name" name="name" type="text" placeholder="John Doe" value={formData.name} onChange={handleInputChange} required className="w-full bg-slate-100 border-slate-300 rounded-full py-2 px-4 text-sm focus:ring-primary-blue-light focus:border-primary-blue-light dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400" />
                </div>
                <div>
                  <label htmlFor="phone" className="text-xs font-semibold">Phone *</label>
                  <input id="phone" name="phone" type="tel" placeholder="(305) 928-7663" value={formData.phone} onChange={handleInputChange} required className="w-full bg-slate-100 border-slate-300 rounded-full py-2 px-4 text-sm focus:ring-primary-blue-light focus:border-primary-blue-light dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400" />
                </div>
                <div>
                  <label htmlFor="email" className="text-xs font-semibold">Email *</label>
                  <input id="email" name="email" type="email" placeholder="you@email.com" value={formData.email} onChange={handleInputChange} required className="w-full bg-slate-100 border-slate-300 rounded-full py-2 px-4 text-sm focus:ring-primary-blue-light focus:border-primary-blue-light dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400" />
                </div>
                <div>
                  <label htmlFor="city" className="text-xs font-semibold">City *</label>
                  <input id="city" name="city" type="text" placeholder="Miami, FL" value={formData.city} onChange={handleInputChange} required className="w-full bg-slate-100 border-slate-300 rounded-full py-2 px-4 text-sm focus:ring-primary-blue-light focus:border-primary-blue-light dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400" />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="service" className="text-xs font-semibold">What do you need help with? *</label>
                  <select id="service" name="service" required value={formData.service} onChange={handleInputChange} className="w-full bg-slate-100 border-slate-300 rounded-full py-2 px-4 text-sm focus:ring-primary-blue-light focus:border-primary-blue-light dark:bg-slate-700 dark:border-slate-600">
                    <option value="">Select a service</option>
                    <option>Roof inspection</option>
                    <option>Roof repair</option>
                    <option>Roof replacement</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="details" className="text-xs font-semibold">Project Details</label>
                  <textarea id="details" name="details" placeholder="Tell us about your roof..." value={formData.details} onChange={handleInputChange} className="w-full bg-slate-100 border-slate-300 rounded-xl py-2 px-4 text-sm h-20 resize-none focus:ring-primary-blue-light focus:border-primary-blue-light dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400"></textarea>
                </div>
              </div>
              <button type="submit" className="w-full mt-3 bg-primary-blue hover:bg-primary-blue-light text-white font-bold py-2.5 px-4 rounded-full transition-colors duration-300">Submit My Request</button>
              <p className="mt-2 text-xs text-center text-gray-500 dark:text-slate-400">
                Your information is kept private and secure.
              </p>
            </form>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default Hero;