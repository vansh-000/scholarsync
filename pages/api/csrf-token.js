import { generateCSRFToken } from '@/lib/middleware/csrf';

export default async function handler(req, res) {
  const secret = process.env.CSRF_SECRET || 'default-secret';

  const token = generateCSRFToken(secret);

  res.status(200).json({ csrfToken: token });
}