import { encryptionMethod } from '../settings';
import { deriveKey } from './deriveKey';
import { base64ToUint8Array, buffer, bufferToBase64, crypto } from './utils';

export async function decrypt(payload: string | Buffer, password: string, seed: string) {
  const key = await deriveKey(password, seed);
  return decryptWithKey(payload, key, seed);
}

export async function decryptWithKey(payload: string | Buffer, key: CryptoKey, seed: string) {
  const seedBuffer = base64ToUint8Array(seed);
  const payloadBuffer = typeof payload === 'string' ? base64ToUint8Array(payload) : payload;

  const data = await crypto.subtle.decrypt(
    {
      name: encryptionMethod,
      iv: seedBuffer,
    },
    key,
    payloadBuffer,
  );

  return {
    string: () => buffer.from(data).toString(),
    base64: () => bufferToBase64(data),
    buffer: () => buffer.from(data),
  };
}
