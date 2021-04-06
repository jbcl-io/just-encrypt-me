import { Buffer } from 'buffer';

let _crypto;
if (!globalThis.crypto) {
  _crypto = require('isomorphic-webcrypto');
}

export const buffer = Buffer;
export const crypto = globalThis.crypto || (_crypto as Crypto);

export const stringToUint8Array = (payload: string): Uint8Array => {
  return buffer.from(payload, 'utf8').valueOf();
};

export const base64ToUint8Array = (payload: string): Uint8Array => {
  return buffer.from(payload, 'base64').valueOf();
};

export const bufferToBase64 = (payload: Uint8Array | ArrayBuffer): string => {
  return buffer.from(payload).toString('base64');
};
