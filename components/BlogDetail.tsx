import React, { useEffect, useState } from 'react';

type Article = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  tags: string[];
  image: string;
  metaDescription: string;
  keywords: string;
};

type BlogDetailProps = {
  slug: string;
  onBackClick: () => void;
  onArticleClick: (slug: string) => void;
};

const BlogDetail: React.FC<BlogDetailProps> = ({ slug, onBackClick, onArticleClick }) => {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);

  useEffect(() => {
    if (!slug) return;

    fetch(`/api/articles?slug=${slug}`)
      .then(res => res.json())
      .then((data: Article) => {
        setArticle(data);
        // Update page title and meta
        document.title = `${data.title} | White Glove Roofing`;
        // Fetch related articles by tag
        if (data.tags.length > 0) {
          fetch(`/api/articles?tag=${data.tags[0]}&limit=3`)
            .then(res => res.json())
            .then((related: Article[]) => {
              setRelatedArticles(related.filter(a => a.slug !== slug));
            });
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load article:', err);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <section className="py-12 md:py-16 bg-white dark:bg-dark-bg">
        <div className="container mx-auto px-5 text-center">
          <p className="text-grey-text dark:text-dark-text-secondary">Loading article...</p>
        </div>
      </section>
    );
  }

  if (!article) {
    return (
      <section className="py-12 md:py-16 bg-white dark:bg-dark-bg">
        <div className="container mx-auto px-5 text-center">
          <h2 className="text-2xl font-bold text-primary-blue dark:text-blue-300 mb-4">
            Article Not Found
          </h2>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onBackClick();
            }}
            className="text-primary-blue font-semibold hover:underline dark:text-blue-400 cursor-pointer"
          >
            ← Back to Blog
          </a>
        </div>
      </section>
    );
  }

  return (
    <>
      <article className="py-12 md:py-16 bg-white dark:bg-dark-bg">
        <div className="container mx-auto px-5 max-w-3xl">
          {/* Breadcrumb */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onBackClick();
            }}
            className="text-primary-blue font-semibold hover:underline mb-6 inline-block dark:text-blue-400 cursor-pointer"
          >
            ← Back to Blog
          </a>

          {/* Hero Image */}
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-96 object-cover rounded-lg mb-8 shadow-lg"
          />

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-grey-text dark:text-dark-text-secondary">
            <span className="font-semibold text-primary-blue dark:text-blue-300 uppercase">
              {article.category}
            </span>
            <span>{new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            <span>By {article.author}</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-dark-text mb-6 dark:text-dark-text-primary">
            {article.title}
          </h1>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {article.tags.map(tag => (
              <span
                key={tag}
                className="inline-block px-3 py-1 text-xs bg-blue-100 text-primary-blue rounded-full dark:bg-slate-700 dark:text-blue-300"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none dark:prose-invert mb-12">
            {article.content.split('\n').map((paragraph, idx) => {
              if (paragraph.startsWith('##')) {
                return (
                  <h2 key={idx} className="text-2xl font-bold text-dark-text mt-8 mb-4 dark:text-dark-text-primary">
                    {paragraph.replace('## ', '')}
                  </h2>
                );
              }
              if (paragraph.startsWith('###')) {
                return (
                  <h3 key={idx} className="text-xl font-bold text-primary-blue mt-6 mb-3 dark:text-blue-300">
                    {paragraph.replace('### ', '')}
                  </h3>
                );
              }
              if (paragraph.startsWith('-')) {
                return (
                  <li key={idx} className="ml-6 text-base text-grey-text dark:text-dark-text-secondary">
                    {paragraph.replace('- ', '')}
                  </li>
                );
              }
              if (paragraph.trim()) {
                return (
                  <p key={idx} className="text-base text-grey-text mb-4 dark:text-dark-text-secondary">
                    {paragraph}
                  </p>
                );
              }
              return null;
            })}
          </div>

          {/* Author Bio */}
          <div className="bg-grey-light p-6 rounded-lg mb-12 dark:bg-dark-card">
            <p className="text-sm text-grey-text dark:text-dark-text-secondary">
              <strong className="text-dark-text dark:text-dark-text-primary">About the Author:</strong> {article.author} is a roofing expert at White Glove Roofing with years of experience serving Miami homeowners.
            </p>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="py-12 bg-grey-light dark:bg-dark-bg/50">
          <div className="container mx-auto px-5">
            <h2 className="text-3xl font-bold text-primary-blue dark:text-blue-300 mb-8 text-center">
              Related Articles
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedArticles.map(relArticle => (
                <div
                  key={relArticle.id}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow dark:bg-dark-card"
                >
                  <img
                    src={relArticle.image}
                    alt={relArticle.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-dark-text mb-2 dark:text-dark-text-primary">
                      {relArticle.title}
                    </h3>
                    <p className="text-sm text-grey-text mb-3 dark:text-dark-text-secondary">
                      {relArticle.excerpt}
                    </p>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        onArticleClick(relArticle.slug);
                      }}
                      className="text-primary-blue font-semibold hover:underline dark:text-blue-400 cursor-pointer"
                    >
                      Read More →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default BlogDetail;
