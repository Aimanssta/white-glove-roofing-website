const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

// Resolve reviews.json path robustly (works locally and on Vercel serverless)
const DATA_PATH_CANDIDATES = [
  path.join(__dirname, '..', 'public', 'data', 'reviews.json'),
  path.join(process.cwd(), 'public', 'data', 'reviews.json'),
  path.join(__dirname, '..', '..', 'public', 'data', 'reviews.json')
];

function resolveDataPath() {
  for (const p of DATA_PATH_CANDIDATES) {
    try {
      if (fs.existsSync(p)) return p;
    } catch (e) {
      // ignore
    }
  }
  // fallback to first candidate
  return DATA_PATH_CANDIDATES[0];
}

async function getFileFromGitHub(githubRepo, githubToken) {
  const url = `https://api.github.com/repos/${githubRepo}/contents/public/data/reviews.json?ref=main`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${githubToken}`,
      'User-Agent': 'white-glove-roofing-website'
    }
  });
  if (!res.ok) throw new Error(`GitHub fetch failed: ${res.status}`);
  return res.json();
}

async function updateFileOnGitHub(githubRepo, githubToken, contentBase64, sha, message) {
  const url = `https://api.github.com/repos/${githubRepo}/contents/public/data/reviews.json`;
  const body = {
    message: message || 'Update reviews.json via API',
    content: contentBase64,
    branch: 'main',
    sha
  };
  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${githubToken}`,
      'User-Agent': 'white-glove-roofing-website',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GitHub update failed: ${res.status} ${text}`);
  }
  return res.json();
}

module.exports = async (req, res) => {
  try {
    if (req.method === 'GET') {
      // Serve the local file (fast, read-only). Try several candidate paths to be robust on Vercel.
      const DATA_PATH = resolveDataPath();
      const raw = fs.readFileSync(DATA_PATH, 'utf8');
      res.setHeader('Content-Type', 'application/json');
      return res.status(200).send(raw);
    }

    // For POST and DELETE we require an admin token and GitHub setup
    const adminToken = process.env.API_ADMIN_TOKEN;
    const githubToken = process.env.GITHUB_TOKEN;
    const githubRepo = process.env.GITHUB_REPO; // e.g. Aimanssta/white-glove-roofing-website

    const authHeader = req.headers['authorization'] || '';
    if (!adminToken || !authHeader || authHeader !== `Bearer ${adminToken}`) {
      return res.status(401).json({ error: 'Unauthorized. Set API_ADMIN_TOKEN and provide Authorization: Bearer <token>' });
    }
    if (!githubToken || !githubRepo) {
      return res.status(500).json({ error: 'Server not configured: missing GITHUB_TOKEN or GITHUB_REPO env variables' });
    }

    // Fetch file from GitHub to get the latest sha and content
    const fileInfo = await getFileFromGitHub(githubRepo, githubToken);
    const sha = fileInfo.sha;
    const content = Buffer.from(fileInfo.content, 'base64').toString('utf8');
    const reviews = JSON.parse(content);

    if (req.method === 'POST') {
      // Add a review
      const newReview = req.body;
      if (!newReview || !newReview.author || !newReview.text) {
        return res.status(400).json({ error: 'Missing review author or text' });
      }
      reviews.unshift(newReview); // add to top
      const newContent = JSON.stringify(reviews, null, 2);
      const newBase64 = Buffer.from(newContent, 'utf8').toString('base64');
      const result = await updateFileOnGitHub(githubRepo, githubToken, newBase64, sha, `Add review by ${newReview.author}`);
      return res.status(200).json({ ok: true, result });
    }

    if (req.method === 'DELETE') {
      // Expect body { author, date } to identify review
      const { author, date } = req.body || {};
      if (!author) return res.status(400).json({ error: 'Provide author to delete' });
      const filtered = reviews.filter(r => !(r.author === author && (!date || r.date === date)));
      if (filtered.length === reviews.length) return res.status(404).json({ error: 'Review not found' });
      const newContent = JSON.stringify(filtered, null, 2);
      const newBase64 = Buffer.from(newContent, 'utf8').toString('base64');
      const result = await updateFileOnGitHub(githubRepo, githubToken, newBase64, sha, `Remove review by ${author}`);
      return res.status(200).json({ ok: true, result });
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: String(err) });
  }
};
