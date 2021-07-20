import { ENCRYPTION_METHOD } from '../constants';
import { deriveKey } from './deriveKey';
import { base64ToUint8Array, buffer, bufferToBase64, crypto, stringToUint8Array } from './utils';

export async function encrypt(payload: string, password: string, seed: string) {
  const key = await deriveKey(password, seed);
  return encryptWithKey(payload, key, seed);
}

export async function encryptWithKey(payload: string, key: CryptoKey, seed: string) {
  const seedBuffer = base64ToUint8Array(seed);
  const payloadBuffer = stringToUint8Array(payload);

  const encryptedData = await crypto.subtle.encrypt(
    {
      name: ENCRYPTION_METHOD,
      iv: seedBuffer,
    },
    key,
    payloadBuffer,
  );

  return {
    base64: () => bufferToBase64(encryptedData),
    buffer: () => buffer.from(encryptedData),
  };
}
