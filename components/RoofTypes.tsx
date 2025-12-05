
import React from 'react';

const RoofTypeCard: React.FC<{
  tag: string;
  title: string;
  description: string;
  features: string[];
}> = ({ tag, title, description, features }) => (
  <article className="bg-grey-light rounded-2xl p-5 shadow-md transition-shadow hover:shadow-xl dark:bg-dark-card dark:shadow-slate-900/50">
    <span className="inline-block bg-white border border-blue-200 text-grey-text text-xs font-semibold px-3 py-1 rounded-full mb-3 dark:bg-slate-700 dark:border-slate-600 dark:text-dark-text-secondary">
      {tag}
    </span>
    <h3 className="text-lg font-bold text-primary-blue mb-2 dark:text-blue-300">{title}</h3>
    <p className="text-sm text-grey-text mb-3 dark:text-dark-text-secondary">{description}</p>
    <ul className="text-sm space-y-1.5 dark:text-dark-text-secondary">
      {features.map((feature, index) => (
        <li key={index} className="flex items-start gap-2">
          <span className="text-primary-blue-light font-bold mt-0.5 dark:text-blue-400">•</span>
          <span>{feature}</span>
        </li>
      ))}
    </ul>
  </article>
);

const RoofTypes: React.FC = () => {
  const roofTypesData = [
    {
      tag: "Popular in Miami Suburbs",
      title: "Architectural Shingle Roofing",
      description: "A cost-effective, attractive choice with upgraded wind ratings and algae-resistant options for humid climates.",
      features: ["High-definition architectural shingles", "HOA-friendly color palettes", "Reinforced for high winds"]
    },
    {
      tag: "Classic South Florida Look",
      title: "Concrete & Clay Tile Roofing",
      description: "Timeless Mediterranean style with outstanding longevity and excellent performance in coastal environments.",
      features: ["Barrel, S-tile, and flat tile", "Durable underlayment systems", "Perfect for upscale neighborhoods"]
    },
    {
      tag: "Durable & Energy Efficient",
      title: "Metal Roofing Systems",
      description: "Sleek and modern, metal roofing reflects heat, resists corrosion, and offers superior wind ratings.",
      features: ["Standing seam & panel systems", "Cool roof coatings for savings", "Excellent for coastal properties"]
    },
    {
      tag: "Commercial & Flat Roofs",
      title: "Flat & Low-Slope Roofing",
      description: "Reliable, code-compliant solutions for commercial buildings, multi-family properties, and modern homes.",
      features: ["TPO & modified bitumen systems", "Drainage-focused design", "Maintenance programs available"]
    },
  ];

  return (
    <section id="roof-types" className="py-16 md:py-24 bg-white dark:bg-dark-bg">
      <div className="container mx-auto px-5">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-blue dark:text-blue-300 mb-4">Roofing Systems Built for Florida Homes</h2>
          <p className="text-base text-grey-text dark:text-dark-text-secondary">
            We install and service the most popular roofing materials used throughout Miami, balancing curb appeal, wind resistance, and long-term value.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {roofTypesData.map(roof => <RoofTypeCard key={roof.title} {...roof} />)}
        </div>
      </div>
    </section>
  );
};

export default RoofTypes;