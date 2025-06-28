import { limiter, runMiddleware } from '@/lib/utils/rateLimit';
import { scrapeScholarProfile } from '@/lib/utils/scholarScraper';

export default async function handler(req, res) {
  try {
    await runMiddleware(req, res, limiter);
  } catch (error) {
    return res.status(429).json({ error: 'Rate limit exceeded' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { scholarUrl } = req.body;

  if (!scholarUrl) {
    return res.status(400).json({ error: 'Google Scholar URL is required' });
  }

  const scholarUrlPattern = /^https:\/\/scholar\.google\.com\/citations\?user=[\w-]+/;
  if (!scholarUrlPattern.test(scholarUrl)) {
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