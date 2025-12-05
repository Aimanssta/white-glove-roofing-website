import React from 'react';

const ServiceCard: React.FC<{
  label: string;
  title: string;
  description: string;
  items: string[];
  footnote: string;
  imageUrl: string;
}> = ({ label, title, description, items, footnote, imageUrl }) => (
  <article className="bg-grey-light rounded-2xl shadow-lg overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-2 dark:bg-dark-card dark:shadow-slate-900/50">
    <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
    <div className="p-5 flex flex-col flex-grow">
      <div className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">{label}</div>
      <h3 className="text-lg font-bold my-1 text-dark-text dark:text-dark-text-primary">{title}</h3>
      <p className="text-sm text-grey-text dark:text-dark-text-secondary">{description}</p>
      <ul className="mt-4 space-y-1.5 text-sm list-none text-grey-text dark:text-dark-text-secondary">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-2">
            <span className="text-primary-blue font-bold mt-0.5 dark:text-blue-400">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <div className="mt-auto pt-4 text-xs text-grey-text dark:text-dark-text-secondary/80">{footnote}</div>
    </div>
  </article>
);

const Services: React.FC = () => {
  const servicesData = [
    {
      label: "Roof Repair",
      title: "Roof Leak & Storm Damage Repair",
      description: "Fast, precise roof repairs that stop leaks before they become major interior damage — with materials rated for Florida’s sun, salt air, and heavy rain.",
      items: ["Leak detection & targeted repairs", "Hurricane & tropical storm damage fixes", "Shingle, tile, and flat roof repairs", "Emergency tarping & temporary protection"],
      footnote: "Ideal for isolated issues, minor storm damage, and extending the life of your existing roof.",
      imageUrl: "/images/roof-shingles-installation-hialeah-fl.webp"
    },
    {
      label: "Roof Replacement",
      title: "Full Roof Replacement & Re-Roofing",
      description: "Upgrade to a Miami-ready roofing system that meets or exceeds Florida Building Code and is designed to stand up to coastal storms and high UV exposure.",
      items: ["Architectural shingles, tile, metal & flat systems", "Wind-mitigation fastening & underlayments", "Energy-efficient, heat-reflective options", "Manufacturer-backed warranties available"],
      footnote: "Recommended for aging roofs, repeated leaks, or homeowners seeking higher wind ratings.",
      imageUrl: "/images/gallery-11.webp"
    },
    {
      label: "New Construction",
      title: "New Roof Installation",
      description: "Partner with us for new construction projects to ensure your new build is topped with a durable, code-compliant, and perfectly installed roofing system.",
      items: ["Collaboration with general contractors", "Blueprint analysis & material selection", "Code-compliant structural work", "Full system installation from decking to finishing"],
      footnote: "Perfect for new home builds, additions, and custom construction projects in Miami.",
      imageUrl: "/images/gallery-14.webp"
    },
    {
      label: "Maintenance",
      title: "Roof Inspections & Preventive Care",
      description: "Proactive roof maintenance plans designed for Florida’s climate help you catch issues early, protect warranties, and prepare for hurricane season.",
      items: ["Annual & pre-storm roof inspections", "Debris removal & drainage cleaning", "Sealant, flashing & penetration checks", "Photo documentation for insurance records"],
      footnote: "Great for HOAs, investors, and owners looking to protect property value in Miami’s market.",
      imageUrl: "/images/gallery-7.webp"
    },
  ];

  return (
    <section id="services" className="py-16 md:py-24 bg-white dark:bg-dark-bg">
      <div className="container mx-auto px-5">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-blue dark:text-blue-300 mb-4">Miami Roofing Services Tailored to Florida Weather</h2>
          <p className="text-base text-grey-text dark:text-dark-text-secondary">
            From small roof leaks to full roof replacements and new installations, White Glove Roofing provides professional, code-compliant solutions for homeowners and businesses.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {servicesData.map(service => <ServiceCard key={service.title} {...service} />)}
        </div>
      </div>
    </section>
  );
};

export default Services;