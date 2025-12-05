
import React from 'react';

interface WhyChooseUsProps {
  onScrollTo: (id: string) => void;
}

const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ onScrollTo }) => {
  return (
    <section id="why-us" className="py-16 md:py-24 bg-gradient-to-br from-primary-blue via-blue-800 to-primary-blue text-white dark:from-primary-blue/90 dark:via-blue-900/90 dark:to-dark-bg">
      <div className="container mx-auto px-5">
        <div className="grid lg:grid-cols-[1.15fr,1fr] gap-12 items-center">
          <div>
            <div className="text-left mb-6">
              <h2 className="text-3xl md:text-4xl font-bold text-blue-100 mb-4">Why Miami Homeowners Trust White Glove Roofing</h2>
              <p className="text-base text-blue-200/90">
                We combine high-end craftsmanship with concierge-level service, so your roofing project feels organized, transparent, and stress-free — from estimate to final inspection.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-x-6 gap-y-5 text-sm">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full border-2 border-blue-300 bg-white/10 flex items-center justify-center font-bold">01</div>
                <div>
                  <strong className="block">Florida-Licensed &amp; Insured</strong>
                  Fully compliant with Florida Building Code and Miami-Dade requirements for your protection.
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full border-2 border-blue-300 bg-white/10 flex items-center justify-center font-bold">02</div>
                <div>
                  <strong className="block">Hurricane-Grade Installations</strong>
                  Engineered for high winds and driving rain common during South Florida storms.
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full border-2 border-blue-300 bg-white/10 flex items-center justify-center font-bold">03</div>
                <div>
                  <strong className="block">White Glove Project Management</strong>
                  Clear communication, clean job sites, and a dedicated project manager.
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full border-2 border-blue-300 bg-white/10 flex items-center justify-center font-bold">04</div>
                <div>
                  <strong className="block">Local, Miami-Based Team</strong>
                  We live and work in Miami and know what roofs need to survive our coastal climate.
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-8 text-center">
              <div className="bg-white/10 border border-white/20 rounded-xl p-3">
                <div className="text-2xl font-bold">15+</div>
                <span className="text-xs text-blue-200">Years Florida Experience</span>
              </div>
              <div className="bg-white/10 border border-white/20 rounded-xl p-3">
                <div className="text-2xl font-bold">1,000+</div>
                <span className="text-xs text-blue-200">Roofs Repaired & Replaced</span>
              </div>
              <div className="bg-white/10 border border-white/20 rounded-xl p-3 col-span-2 lg:col-span-1">
                <div className="text-2xl font-bold">4.9★</div>
                <span className="text-xs text-blue-200">Average Customer Rating</span>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4 text-center text-sm">
                <div className="bg-white text-primary-blue rounded-full p-3 shadow-lg dark:bg-slate-200"><strong className="block">Florida Certified</strong><span className="text-xs text-grey-text">Licensed & Insured</span></div>
                <div className="bg-white text-primary-blue rounded-full p-3 shadow-lg dark:bg-slate-200"><strong className="block">Miami-Dade Compliant</strong><span className="text-xs text-grey-text">Built to Local Standards</span></div>
                <div className="bg-white text-primary-blue rounded-full p-3 shadow-lg dark:bg-slate-200"><strong className="block">Wind-Mitigation Pros</strong><span className="text-xs text-grey-text">Lower Insurance Premiums</span></div>
                <div className="bg-white text-primary-blue rounded-full p-3 shadow-lg dark:bg-slate-200"><strong className="block">White Glove Clean-Up</strong><span className="text-xs text-grey-text">Magnetic Nail Sweep</span></div>
            </div>
            <p className="text-base text-blue-200/90">
              Considering a new roof or major repair in Miami? Schedule a free roof consultation today and explore options that fit your home, HOA requirements, and budget.
            </p>
            <button onClick={() => onScrollTo('quote-form')} className="w-full bg-white text-primary-blue font-bold py-3 px-6 rounded-full shadow-2xl transition-all duration-300 ease-in-out hover:shadow-blue-200/50 hover:-translate-y-1 transform dark:bg-blue-200 dark:hover:bg-white">
              Schedule My Free Consultation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;