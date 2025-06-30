import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import { unlink } from 'fs/promises';
import { extractResumeData, extractText } from '@/lib/utils/parseResume';
import cors from '@/lib/middleware/cors';
import applyRateLimit from '@/lib/middleware/rateLimit';
import { verifyCSRFToken } from '@/lib/middleware/csrf';
import { isValidFileType, MAX_FILE_SIZE } from '@/lib/middleware/validateFile';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {

  await cors(req, res);
  await applyRateLimit(req, res);
  const secret = process.env.CSRF_SECRET || 'default-secret';
  const csrfToken = req.headers['x-csrf-token'];

  if (!verifyCSRFToken(secret, csrfToken)) {
    return res.status(403).json({ error: 'Invalid CSRF token' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const tmpDir = path.join(process.cwd(), 'tmp');
    if (!fs.existsSync(tmpDir)) {
      fs.mkdirSync(tmpDir, { recursive: true });
    }

    const form = formidable({
      uploadDir: tmpDir,
      keepExtensions: true,
      maxFileSize: MAX_FILE_SIZE,
    });

    const [fields, files] = await form.parse(req);
    const file = files.resume?.[0];

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    if (!isValidFileType(file.mimetype)) {
      await unlink(file.filepath);
      return res.status(400).json({
        error: 'Invalid file type. Only PDF and DOCX files are allowed.',
      });
    }

    let extractedText;
    try {
      extractedText = await extractText(file.filepath, file.mimetype);
    } catch (parseError) {
      console.error('Parse error:', parseError);
      await unlink(file.filepath);
      return res.status(500).json({ error: 'Failed to parse resume file' });
    }

    await unlink(file.filepath);
    const structuredData = extractResumeData(extractedText);

    console.log('Structured Data:', structuredData);

    res.status(200).json({
      success: true,
      data: structuredData,
      metadata: {
        fileName: file.originalFilename,
        fileSize: file.size,
        fileType: file.mimetype,
        parsedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('Resume upload error:', error);
    res.status(500).json({
      error: 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
}
