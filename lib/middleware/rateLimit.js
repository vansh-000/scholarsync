import { RateLimiterMemory } from 'rate-limiter-flexible';

const rateLimiter = new RateLimiterMemory({
  points: 10,
  duration: 60,
});

export default async function applyRateLimit(req, res) {
  try {
    await rateLimiter.consume(req.headers['x-forwarded-for'] || req.connection.remoteAddress);
  } catch (err) {
    res.status(429).json({ error: 'Too many requests' });
    throw new Error('Rate limit exceeded');
  }
}
