import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import { extractText } from '@/lib/utils/parseResume';

export const config = {
  api: {
    bodyParser: false,
  },
};
export const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_TYPES = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

const isValidFileType = mimetype => ALLOWED_TYPES.includes(mimetype);

export default async function handler(req, res) {
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
