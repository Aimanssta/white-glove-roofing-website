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

type BlogListProps = {
  onArticleClick: (slug: string) => void;
  onBackClick?: () => void;
};

const BlogList: React.FC<BlogListProps> = ({ onArticleClick, onBackClick }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [allTags, setAllTags] = useState<string[]>([]);

  useEffect(() => {
    // Update page title and meta
    document.title = 'Blog | White Glove Roofing';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', 'Read expert articles about roof maintenance, repairs, and tips for Miami homeowners.');

    fetch('/api/articles')
      .then(res => res.json())
      .then((data: Article[]) => {
        setArticles(data);
        setFilteredArticles(data);
        const tags = Array.from(new Set(data.flatMap(a => a.tags)));
        setAllTags(tags as string[]);
      })
      .catch(err => console.error('Failed to load articles:', err));
  }, []);

  const handleTagClick = (tag: string) => {
    if (selectedTag === tag) {
      setSelectedTag(null);
      setFilteredArticles(articles);
    } else {
      setSelectedTag(tag);
      setFilteredArticles(articles.filter(a => a.tags.includes(tag)));
    }
  };

  return (
    <section id="blog" className="py-12 md:py-16 bg-white dark:bg-dark-bg">
      <div className="container mx-auto px-5">
        {onBackClick && (
          <div className="mb-8">
            <button
              onClick={onBackClick}
              className="inline-flex items-center gap-2 text-primary-blue font-semibold hover:underline dark:text-blue-300 transition-colors"
            >
              ← Back to Home
            </button>
          </div>
        )}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-blue dark:text-blue-300 mb-4">
            Roofing Tips & Insights
          </h1>
          <p className="text-lg text-grey-text dark:text-dark-text-secondary">
            Expert articles on roof maintenance, repairs, and home improvement tips for Miami homeowners.
          </p>
        </div>

        {/* Tag Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => {
              setSelectedTag(null);
              setFilteredArticles(articles);
            }}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
              selectedTag === null
                ? 'bg-primary-blue text-white dark:bg-blue-400'
                : 'bg-grey-light text-grey-text hover:bg-blue-100 dark:bg-dark-card dark:text-dark-text-secondary'
            }`}
          >
            All Articles
          </button>
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                selectedTag === tag
                  ? 'bg-primary-blue text-white dark:bg-blue-400'
                  : 'bg-grey-light text-grey-text hover:bg-blue-100 dark:bg-dark-card dark:text-dark-text-secondary'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map(article => (
            <article
              key={article.id}
              className="bg-grey-light rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow dark:bg-dark-card"
            >
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-semibold text-primary-blue dark:text-blue-400 uppercase">
                    {article.category}
                  </span>
                  <span className="text-xs text-grey-text dark:text-dark-text-secondary">
                    {new Date(article.date).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-dark-text mb-2 dark:text-dark-text-primary">
                  {article.title}
                </h3>
                <p className="text-base text-grey-text mb-4 dark:text-dark-text-secondary">
                  {article.excerpt}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {article.tags.map(tag => (
                    <span
                      key={tag}
                      className="inline-block px-2 py-1 text-xs bg-blue-100 text-primary-blue rounded dark:bg-slate-700 dark:text-blue-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onArticleClick(article.slug);
                  }}
                  className="inline-block text-primary-blue font-semibold hover:underline dark:text-blue-400"
                >
                  Read More →
                </a>
              </div>
            </article>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-grey-text text-lg dark:text-dark-text-secondary">
              No articles found. Try a different filter.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogList;
