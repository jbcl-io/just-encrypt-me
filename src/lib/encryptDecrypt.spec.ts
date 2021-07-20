import test from 'ava';
import { decrypt, decryptWithKey, deriveKey, encrypt, encryptWithKey, generateSeed } from '..';

test('encrypt/decrypt with password', async (t) => {
  const text = 'Hello, World!';

  const password = 'pass123';
  const seed = generateSeed();

  const encrypted = await encrypt(text, password, seed);

  t.truthy(encrypted.base64());
  t.truthy(encrypted.buffer());

  // decrypt base64
  const decryptedBase64 = await decrypt(encrypted.base64(), password, seed);

  t.deepEqual(decryptedBase64.string(), text);
  t.truthy(decryptedBase64.base64());
  t.truthy(decryptedBase64.buffer());

  // decrypt buffer
  const decryptedBuffer = await decrypt(encrypted.buffer(), password, seed);

  t.deepEqual(decryptedBuffer.string(), text);
  t.truthy(decryptedBuffer.base64());
  t.truthy(decryptedBuffer.buffer());
});

test('encrypt/decrypt with key', async (t) => {
  const text = 'Hello, World!';

  const passwordSeed = generateSeed();
  const encryptionSeed = generateSeed();

  const key = await deriveKey('pass123', passwordSeed);

  const encrypted = await encryptWithKey(text, key, encryptionSeed);
  const base64 = encrypted.base64();
  const buffer = encrypted.buffer();

  t.truthy(encrypted);
  t.truthy(base64);
  t.truthy(buffer);

  const decrypted = await decryptWithKey(buffer, key, encryptionSeed);

  t.deepEqual(decrypted.string(), text);
});
