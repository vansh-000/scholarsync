import limiter, { runMiddleware } from '@/lib/utils/rateLimit';
import { generateProjectSuggestions } from '@/lib/utils/generateSuggestions';

export default async function handler(req, res) {
  try {
    await runMiddleware(req, res, limiter);
  } catch (error) {
    return res.status(429).json({ error: 'Rate limit exceeded' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { resumeData, scholarData } = req.body;

  if (!resumeData && !scholarData) {
    return res.status(400).json({ error: 'Either resume or scholar data is required' });
  }

  try {
    const suggestions = await generateProjectSuggestions(resumeData, scholarData);
    res.status(200).json({
      success: true,
      data: suggestions,
      generatedAt: new Date().toISOString(),
    });
  } catch (err) {
    console.error('Suggestion generation error:', err);
    res.status(500).json({ error: 'Failed to generate project suggestions' });
  }
}
