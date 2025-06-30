import axios from 'axios';

export async function getCSRFToken() {
  const res = await axios.get('/api/csrf-token');
  return res.data.csrfToken;
}