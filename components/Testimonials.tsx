
import React from 'react';

const TestimonialCard: React.FC<{
  quote: string;
  author: string;
  location: string;
}> = ({ quote, author, location }) => (
  <article className="bg-grey-light rounded-2xl p-6 shadow-md h-full flex flex-col dark:bg-dark-card dark:shadow-slate-900/50">
    <p className="text-base text-dark-text flex-grow dark:text-dark-text-primary">“{quote}”</p>
    <div className="mt-4 pt-4 border-t border-blue-200/50 dark:border-slate-700 flex justify-between items-center text-sm">
      <span className="font-bold text-primary-blue dark:text-blue-300">{author} <span className="text-grey-text font-normal dark:text-dark-text-secondary">• {location}</span></span>
      <span className="text-yellow-500">★★★★★</span>
    </div>
  </article>
);

const Testimonials: React.FC = () => {
  const testimonialsData = [
    {
      quote: "From the first inspection to the final clean-up, the process was smooth and professional. They replaced our old shingle roof with a beautiful new tile system that passed inspection easily. Highly recommend!",
      author: "Ana R.",
      location: "Coral Gables"
    },
    {
      quote: "We had storm damage after a summer thunderstorm. White Glove Roofing was on site quickly, tarped the roof, and helped us navigate the insurance claim. The new roof looks great and we feel ready for hurricane season.",
      author: "Marcus T.",
      location: "Kendall"
    },
    {
      quote: "As a property manager with several buildings in Miami Beach, I appreciate how organized and responsive their team is. Their maintenance plan has helped us catch issues early and reduce emergency calls.",
      author: "Elena G.",
      location: "Miami Beach"
    }
  ];

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-white dark:bg-dark-bg">
      <div className="container mx-auto px-5">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-blue dark:text-blue-300 mb-4">What Miami Homeowners Are Saying</h2>
          <p className="text-base text-grey-text dark:text-dark-text-secondary">
            Our customers choose us for transparent communication, clean job sites, and roofs designed to handle Miami’s unique climate.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonialsData.map(testimonial => <TestimonialCard key={testimonial.author} {...testimonial} />)}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;