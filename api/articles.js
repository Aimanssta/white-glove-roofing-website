const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(__dirname, '..', 'public', 'data', 'articles.json');

module.exports = async (req, res) => {
  try {
    const raw = fs.readFileSync(DATA_PATH, 'utf8');
    const articles = JSON.parse(raw);

    // GET /api/articles?slug=article-slug (single article)
    if (req.query.slug) {
      const article = articles.find(a => a.slug === req.query.slug);
      if (!article) {
        return res.status(404).json({ error: 'Article not found' });
      }
      return res.status(200).json(article);
    }

    // GET /api/articles?tag=tag-name (filter by tag)
    if (req.query.tag) {
      const filtered = articles.filter(a => a.tags.includes(req.query.tag));
      return res.status(200).json(filtered);
    }

    // GET /api/articles?category=category-name (filter by category)
    if (req.query.category) {
      const filtered = articles.filter(a => a.category === req.query.category);
      return res.status(200).json(filtered);
    }

    // GET /api/articles (all articles, optionally sorted)
    const sortBy = req.query.sortBy || 'date'; // 'date', 'title'
    const sortOrder = req.query.sortOrder || 'desc'; // 'asc', 'desc'
    const limit = parseInt(req.query.limit) || 0; // 0 = no limit

    let sorted = [...articles];
    if (sortBy === 'date') {
      sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortBy === 'title') {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    }

    if (sortOrder === 'asc') sorted.reverse();
    if (limit > 0) sorted = sorted.slice(0, limit);

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(sorted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: String(err) });
  }
};
