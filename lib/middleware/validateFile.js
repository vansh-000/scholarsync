export const ALLOWED_TYPES = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
];
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export const isValidFileType = (mimetype) => {
  return ALLOWED_TYPES.includes(mimetype);
}
