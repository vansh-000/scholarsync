import Tokens from 'csrf';

const tokens = new Tokens();

export function generateCSRFToken(secret) {
  return tokens.create(secret);
}

export function verifyCSRFToken(secret, token) {
  return tokens.verify(secret, token);
}
