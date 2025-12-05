// SEO and meta tag utilities
export interface MetaTags {
  title: string;
  description: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  author?: string;
  publishedDate?: string;
  canonicalUrl?: string;
}

export const updateMetaTags = (tags: MetaTags) => {
  // Update title
  document.title = tags.title;

  // Update or create meta tags
  const updateMeta = (name: string, content: string, isProperty = false) => {
    let element = document.querySelector(
      isProperty
        ? `meta[property="${name}"]`
        : `meta[name="${name}"]`
    ) as HTMLMetaElement;
    if (!element) {
      element = document.createElement('meta');
      isProperty ? element.setAttribute('property', name) : element.setAttribute('name', name);
      document.head.appendChild(element);
    }
    element.content = content;
  };

  updateMeta('description', tags.description);
  if (tags.keywords) updateMeta('keywords', tags.keywords);
  if (tags.author) updateMeta('author', tags.author);

  // Open Graph
  if (tags.ogTitle) updateMeta('og:title', tags.ogTitle, true);
  if (tags.ogDescription) updateMeta('og:description', tags.ogDescription, true);
  if (tags.ogImage) updateMeta('og:image', tags.ogImage, true);
  if (tags.ogUrl) updateMeta('og:url', tags.ogUrl, true);
  updateMeta('og:type', 'article', true);

  // Twitter Card
  if (tags.twitterCard) updateMeta('twitter:card', tags.twitterCard);
  if (tags.twitterTitle) updateMeta('twitter:title', tags.twitterTitle);
  if (tags.twitterDescription) updateMeta('twitter:description', tags.twitterDescription);
  if (tags.twitterImage) updateMeta('twitter:image', tags.twitterImage);

  // Published date
  if (tags.publishedDate) updateMeta('article:published_time', tags.publishedDate, true);

  // Canonical URL
  if (tags.canonicalUrl) {
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = tags.canonicalUrl;
  }
};

export const getArticleMetaTags = (article: any, baseUrl = 'https://white-glove-roofing-website.vercel.app'): MetaTags => {
  const articleUrl = `${baseUrl}/blog/${article.slug}`;
  return {
    title: `${article.title} | White Glove Roofing`,
    description: article.metaDescription || article.excerpt,
    keywords: article.keywords,
    ogTitle: article.title,
    ogDescription: article.excerpt,
    ogImage: `${baseUrl}${article.image}`,
    ogUrl: articleUrl,
    twitterCard: 'summary_large_image',
    twitterTitle: article.title,
    twitterDescription: article.excerpt,
    twitterImage: `${baseUrl}${article.image}`,
    author: article.author,
    publishedDate: article.date,
    canonicalUrl: articleUrl
  };
};
