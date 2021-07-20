import {
  DERIVATION_ITERATIONS,
  DERIVATION_METHOD,
  ENCRYPTION_LENGTH,
  ENCRYPTION_METHOD,
  HASH_METHOD,
} from '../constants';
import { passwordToCryptoKey } from './passwordToCryptoKey';
import { base64ToUint8Array, crypto } from './utils';

export interface DeriveKeyOptions {
  iterations?: number;
}

export async function deriveKey(password: string, seed: string, options?: DeriveKeyOptions) {
  const iterations =
    typeof options?.iterations === 'undefined' ? DERIVATION_ITERATIONS : Number(options.iterations);

  if (iterations < 500000) {
    throw 'iteration count must be 500,000 or more';
  }

  const seedBuffer = base64ToUint8Array(seed);
  const baseKey = await passwordToCryptoKey(password);

  return await crypto.subtle.deriveKey(
    {
      name: DERIVATION_METHOD,
      salt: seedBuffer,
      iterations,
      hash: { name: HASH_METHOD },
    },
    baseKey,
    { name: ENCRYPTION_METHOD, length: ENCRYPTION_LENGTH },
    false,
    ['encrypt', 'decrypt'],
  );
}
