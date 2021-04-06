import { crypto, stringToUint8Array } from './utils';

export async function passwordToCryptoKey(password: string) {
  return await crypto.subtle.importKey(
    'raw',
    stringToUint8Array(password),
    { name: 'PBKDF2' },
    false,
    ['deriveKey', 'deriveBits'],
  );
}
