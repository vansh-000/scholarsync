import formidable from 'formidable';
import fs from 'fs';
import { promisify } from 'util';
import { parsePDF, parseDOCX, extractResumeData } from '@/lib/utils/parseResume';
import { MAX_FILE_SIZE, isValidFileType } from '@/lib/middleware/validateFile';

export const config = {
  api: {
    bodyParser: false,
  },
};

const unlink = promisify(fs.unlink);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const form = formidable({
      uploadDir: './tmp',
      keepExtensions: true,
      maxFileSize: MAX_FILE_SIZE,
      filter: ({ mimetype }) => isValidFileType(mimetype || ''),
    });

    const [fields, files] = await form.parse(req);
    const file = files.resume?.[0];

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    if (!isValidFileType(file.mimetype)) {
      await unlink(file.filepath);
      return res
        .status(400)
        .json({ error: 'Invalid file type. Only PDF and DOCX files are allowed.' });
    }

    let parsedData;
    try {
      parsedData =
        file.mimetype === 'application/pdf'
          ? await parsePDF(file.filepath)
          : await parseDOCX(file.filepath);
    } catch (parseError) {
      await unlink(file.filepath);
      return res.status(500).json({ error: 'Failed to parse resume file' });
    }

    await unlink(file.filepath);

    const structuredData = extractResumeData(parsedData.text);

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
    res.status(500).json({ error: 'Internal server error' });
  }
}
