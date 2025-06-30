import { promisify } from 'util';
import fs from 'fs';
import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';

const readFile = promisify(fs.readFile);

async function parsePDF(filePath) {
  const buffer = await readFile(filePath);
  return await pdfParse(buffer);
}

async function parseDOCX(filePath) {
  const buffer = await readFile(filePath);
  const result = await mammoth.extractRawText({ buffer });
  return { text: result.value };
}
export const extractText = async (filePath, mimetype) => {
  try {
    if (mimetype === 'application/pdf') {
      const pdfData = await parsePDF(filePath);
      return pdfData.text;
    } else if (mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      const docxData = await parseDOCX(filePath);
      return docxData.text;
    } else {
      throw new Error('Unsupported file type');
    }
  } catch (error) {
    console.error('Text extraction error:', error);
    throw error;
  }
};

export function extractResumeData(text) {
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
  const phoneRegex = /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g;
  const nameRegex = /^([A-Z][a-z]+\s+[A-Z][a-z]+)/m;

  const emails = text.match(emailRegex) || [];
  const phones = text.match(phoneRegex) || [];
  const nameMatch = text.match(nameRegex);

  const skillsKeywords = [
    'JavaScript', 'Python', 'Java', 'C++', 'C#', 'React', 'Node.js', 'Angular', 
    'Vue.js', 'HTML', 'CSS', 'SQL', 'MongoDB', 'PostgreSQL', 'Docker', 'AWS', 
    'Machine Learning', 'Data Science', 'TensorFlow', 'PyTorch', 'Git', 'Linux',
    'Kubernetes', 'DevOps', 'CI/CD', 'REST API', 'GraphQL', 'TypeScript'
  ];

  const skills = skillsKeywords.filter(skill => 
    text.toLowerCase().includes(skill.toLowerCase())
  );

  const educationPatterns = [
    /(?:Bachelor|Master|PhD|B\.S\.|M\.S\.|Ph\.D\.).*(?:Computer Science|Engineering|Mathematics|Physics|Chemistry|Biology)/gi,
    /(?:University|College|Institute).*(?:\d{4})/gi
  ];

  const education = [];
  educationPatterns.forEach(pattern => {
    const matches = text.match(pattern);
    if (matches) education.push(...matches);
  });

  const experiencePatterns = [
    /(?:Software Engineer|Developer|Analyst|Manager|Intern).*(?:\d{4})/gi,
    /(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec).*\d{4}.*(?:Present|Current|\d{4})/gi
  ];

  const workExperience = [];
  experiencePatterns.forEach(pattern => {
    const matches = text.match(pattern);
    if (matches) workExperience.push(...matches);
  });

  return {
    personalInfo: {
      name: nameMatch ? nameMatch[1] : '',
      email: emails[0] || '',
      phone: phones[0] || '',
    },
    skills: [...new Set(skills)],
    education: [...new Set(education)],
    workExperience: [...new Set(workExperience)],
    rawText: text,
  };
}
