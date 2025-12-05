
import React, { useEffect, useState } from 'react';

type Review = {
  author: string;
  date?: string;
  rating?: number;
  text: string;
  ownerReply?: string;
  source?: string;
};

const TestimonialCard: React.FC<Review> = ({ author, date, rating = 5, text, ownerReply }) => (
  <article className="bg-grey-light rounded-2xl p-6 shadow-md h-full flex flex-col dark:bg-dark-card dark:shadow-slate-900/50">
    <p className="text-base text-dark-text flex-grow dark:text-dark-text-primary">“{text}”</p>
    {ownerReply && (
      <div className="mt-3 p-3 bg-white/60 rounded text-sm text-grey-text dark:bg-slate-800 dark:text-dark-text-secondary">
        <strong className="text-primary-blue">Owner reply:</strong> {ownerReply}
      </div>
    )}
    <div className="mt-4 pt-4 border-t border-blue-200/50 dark:border-slate-700 flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm gap-2">
      <div>
        <span className="font-bold text-primary-blue dark:text-blue-300">{author}</span>
        {date && <span className="text-grey-text font-normal dark:text-dark-text-secondary"> • {date}</span>}
      </div>
      <div className="text-yellow-500">{Array.from({ length: rating }).map((_, i) => '★').join('')}</div>
    </div>
  </article>
);

const Testimonials: React.FC = () => {
  const [testimonialsData, setTestimonialsData] = useState<Review[]>([]);

  useEffect(() => {
    fetch('/data/reviews.json')
      .then(res => res.json())
      .then((data: Review[]) => setTestimonialsData(data))
      .catch(() => {
        // fallback to a small default set if fetch fails
        setTestimonialsData([
          { author: 'Ana R.', date: 'Miami', text: 'Great work, very professional.' }
        ]);
      });
  }, []);

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-white dark:bg-dark-bg">
      <div className="container mx-auto px-5">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-blue dark:text-blue-300 mb-4">What Customers Are Saying</h2>
          <p className="text-base text-grey-text dark:text-dark-text-secondary">
            Real reviews from recent customers. We take pride in transparent communication, clean job sites, and durable roofing work.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonialsData.map((testimonial, idx) => <TestimonialCard key={`${testimonial.author}-${idx}`} {...testimonial} />)}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;