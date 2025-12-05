import React, { useEffect, useState } from 'react';

type Review = {
  author: string;
  date?: string;
  rating?: number;
  text: string;
  ownerReply?: string;
  source?: string;
  profileImage?: string;
};

  const TestimonialCard: React.FC<Review> = ({ author, date, rating = 5, text, profileImage }) => (
  <article className="bg-grey-light rounded-2xl p-6 shadow-md h-full flex flex-col dark:bg-dark-card dark:shadow-slate-900/50">
    <p className="text-base text-dark-text flex-grow dark:text-dark-text-primary">"{text}"</p>
    <div className="mt-4 pt-4 border-t border-blue-200/50 dark:border-slate-700 flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm gap-3">
      <div className="flex items-center gap-3">
        {profileImage && (
          <img
            src={profileImage}
            alt={author}
            className="w-10 h-10 rounded-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = 'https://via.placeholder.com/40';
            }}
          />
        )}
        <div>
          <span className="font-bold text-primary-blue dark:text-blue-300 block">{author}</span>
          {date && <span className="text-grey-text font-normal dark:text-dark-text-secondary text-xs">{date}</span>}
        </div>
      </div>
      <div className="text-yellow-500">{Array.from({ length: rating }).map((_, i) => '★').join('')}</div>
    </div>
  </article>
);

const Testimonials: React.FC = () => {
  const [testimonialsData, setTestimonialsData] = useState<Review[]>([]);

  useEffect(() => {
    // Prefer the static public file so production doesn't depend on serverless function auth.
    fetch('/data/reviews.json')
      .then((res) => {
        if (!res.ok) throw new Error('No static reviews file');
        return res.json();
      })
      .then((data: Review[]) => setTestimonialsData(data))
      .catch(() => {
        // If the static file isn't available, fall back to the API endpoint.
        fetch('/api/reviews')
          .then((res) => res.json())
          .then((data: Review[]) => setTestimonialsData(data))
          .catch(() => {
            // fallback sample
            setTestimonialsData([
              { author: 'Ana R.', date: 'Miami', text: 'Great work, very professional.' },
            ]);
          });
      });
  }, []);

  return (
    <section id="testimonials" className="py-12 md:py-16 bg-white dark:bg-dark-bg">
      <div className="container mx-auto px-5">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-blue dark:text-blue-300 mb-4">What Customers Are Saying</h2>
          <p className="text-base text-grey-text dark:text-dark-text-secondary">
            Real reviews from recent customers. We take pride in transparent communication, clean job sites, and durable roofing work.
          </p>
        </div>
        {/* Avatar stack + total count */}
        {testimonialsData.length > 0 && (
          <div className="mb-6 flex items-center justify-center gap-4">
            <div className="flex -space-x-3">
              {Array.from(
                new Map(
                  testimonialsData
                    .map((t) => t.profileImage)
                    .filter((u): u is string => !!u)
                    .map((url) => [url, url])
                ).values()
              )
                .slice(0, 8)
                .map((url, i) => (
                  <img
                    key={url}
                    src={url}
                    alt={`Reviewer ${i + 1}`}
                    className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-900 object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = 'https://via.placeholder.com/40';
                    }}
                  />
                ))}
              {testimonialsData.filter((t) => !!t.profileImage).length > 8 && (
                <div className="w-10 h-10 flex items-center justify-center bg-gray-200 dark:bg-slate-800 text-sm rounded-full border-2 border-white dark:border-slate-900 text-gray-700 dark:text-gray-200">
                  +{testimonialsData.filter((t) => !!t.profileImage).length - 8}
                </div>
              )}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">{testimonialsData.length} customer reviews</div>
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonialsData.map((testimonial, idx) => (
            <TestimonialCard key={`${testimonial.author}-${idx}`} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
