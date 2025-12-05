import React from 'react';

interface FaqCtaProps {
  onScrollTo: (id: string) => void;
}

const FaqItem: React.FC<{ q: string; a: string }> = ({ q, a }) => (
  <div className="bg-white rounded-xl p-4 shadow-md dark:bg-dark-card dark:shadow-slate-900/50">
    <h3 className="font-bold text-primary-blue dark:text-blue-300">{q}</h3>
    <p className="text-sm text-grey-text mt-1 dark:text-dark-text-secondary">{a}</p>
  </div>
);

const FaqCta: React.FC<FaqCtaProps> = ({ onScrollTo }) => {
  const faqs = [
    {
      q: "How long does a roof replacement take in Miami?",
      a: "Most residential roof replacements take 2–5 days, depending on roof size, material, weather, and permitting. We provide a detailed schedule before work begins."
    },
    {
      q: "Do you help with storm damage insurance claims?",
      a: "Yes. We can document storm damage with photos and estimates to support your insurance claim and coordinate with your adjuster as needed."
    },
    {
      q: "What roofing materials work best for Miami’s climate?",
      a: "Miami roofs should handle intense sun, heat, and storms. Architectural shingles, concrete/clay tile, and metal roofing are all excellent options we can discuss."
    },
    {
      q: "Are your roofs installed to meet Florida Building Code?",
      a: "Absolutely. All of our installations follow current Florida Building Code and local Miami-Dade requirements, including wind-mitigation practices."
    }
  ];

  return (
    <section id="faq" className="py-12 md:py-16 bg-accent-blue dark:bg-dark-bg">
      <div className="container mx-auto px-5">
        <div className="grid lg:grid-cols-[1.3fr,1fr] gap-12 items-start">
          <div>
            <div className="text-left mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-blue dark:text-blue-300 mb-4">Miami Roofing FAQ</h2>
              <p className="text-base text-grey-text dark:text-dark-text-secondary">
                Common questions from homeowners planning roof repairs or replacements in the South Florida area.
              </p>
            </div>
            <div className="space-y-4">
              {faqs.map(faq => <FaqItem key={faq.q} {...faq} />)}
            </div>
          </div>
          <aside className="sticky top-28 bg-primary-blue text-white rounded-2xl p-6 shadow-2xl dark:shadow-slate-900/50 dark:bg-dark-card dark:border dark:border-slate-700">
            <h3 className="text-2xl font-bold mb-2 dark:text-blue-200">Ready for a Roof Built for Miami Weather?</h3>
            <p className="text-sm text-blue-200 mb-4 dark:text-dark-text-secondary">
              Whether you’re seeing the first signs of a leak or planning a full replacement, we're here to help protect your home.
            </p>
            <ul className="text-sm space-y-2 mb-5 dark:text-dark-text-secondary">
              <li className="flex items-center gap-2"><span className="text-blue-200 dark:text-blue-400">✓</span> Free, no-pressure inspections</li>
              <li className="flex items-center gap-2"><span className="text-blue-200 dark:text-blue-400">✓</span> Clear, written estimates</li>
              <li className="flex items-center gap-2"><span className="text-blue-200 dark:text-blue-400">✓</span> Quality materials & warranties</li>
            </ul>
            <button onClick={() => onScrollTo('quote-form')} className="w-full bg-white text-primary-blue font-bold py-2.5 px-6 rounded-full shadow-lg transition-all duration-300 ease-in-out hover:bg-blue-100 hover:-translate-y-0.5 transform dark:bg-blue-300 dark:hover:bg-white">
              Request My Free Estimate
            </button>
            <p className="mt-3 text-xs text-center text-blue-200 dark:text-dark-text-secondary">
              Prefer to talk now? Call us at <a href="tel:+13059287663" className="font-bold underline hover:text-white dark:text-blue-300 dark:hover:text-blue-200">(305) 928-7663</a>.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default FaqCta;