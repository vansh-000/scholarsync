import { scrapeScholarProfile } from '@/lib/utils/scholarScraper';
import cors from '@/lib/middleware/cors';
import applyRateLimit from '@/lib/middleware/rateLimit';
import { verifyCSRFToken } from '@/lib/middleware/csrf';

export const config = {
  api: {
    bodyParser: true,
  },
};

export default async function handler(req, res) {
  await cors(req, res);
  await applyRateLimit(req, res);

  const secret = process.env.CSRF_SECRET || 'default-secret';
  const csrfToken = req.headers['x-csrf-token'];

  if (!csrfToken || !verifyCSRFToken(secret, csrfToken)) {
    return res.status(403).json({ error: 'Invalid CSRF token' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { scholarUrl } = req.body;
  console.log('Received Scholar URL:', scholarUrl);

  if (!scholarUrl) {
    return res.status(400).json({ error: 'Google Scholar URL is required' });
  }

  const scholarUrlPattern = /^https:\/\/scholar\.google\.[a-z.]+\/citations\?user=[\w-]+/;
  if (!scholarUrlPattern.test(scholarUrl)) {
    console.error('Invalid Scholar URL format:', scholarUrl);
    return res.status(400).json({ error: 'Invalid Google Scholar URL format' });
  }

  try {
    const profileData = await scrapeScholarProfile(scholarUrl);

    res.status(200).json({
      success: true,
      data: profileData,
      scrapedAt: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Scholar scraping error:', error);

    if (error.response?.status === 403) {
      return res.status(403).json({ error: 'Access denied. Google Scholar may be blocking requests.' });
    }

    if (error.response?.status === 404) {
      return res.status(404).json({ error: 'Scholar profile not found' });
    }

    res.status(500).json({ error: 'Failed to fetch Scholar profile data' });
  }
}
