import { bufferToBase64, crypto } from './utils';

export function generateSeed() {
  const uint8arr = crypto.getRandomValues(new Uint8Array(16));
  return bufferToBase64(uint8arr);
}
