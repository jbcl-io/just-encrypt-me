import {
  derivationIterations,
  derivationMethod,
  encryptionLength,
  encryptionMethod,
  hashMethod,
} from '../settings';
import { passwordToCryptoKey } from './passwordToCryptoKey';
import { base64ToUint8Array, crypto } from './utils';

export interface DeriveKeyOptions {
  iterations?: number;
}

export async function deriveKey(password: string, seed: string, options?: DeriveKeyOptions) {
  const iterations =
    typeof options?.iterations === 'undefined' ? derivationIterations : Number(options.iterations);

  if (iterations < 500000) {
    throw 'iteration count must be 500,000 or more';
  }

  const seedBuffer = base64ToUint8Array(seed);
  const baseKey = await passwordToCryptoKey(password);

  return await crypto.subtle.deriveKey(
    {
      name: derivationMethod,
      salt: seedBuffer,
      iterations,
      hash: { name: hashMethod },
    },
    baseKey,
    { name: encryptionMethod, length: encryptionLength },
    false,
    ['encrypt', 'decrypt'],
  );
}
