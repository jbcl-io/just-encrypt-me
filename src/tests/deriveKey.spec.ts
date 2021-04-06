import test from 'ava';
import { deriveKey, generateSeed } from '..';

test('derive key', async (t) => {
  const password = 'somestrongpassword';
  const seed = generateSeed();

  const key = await deriveKey(password, seed);

  t.truthy(key);
});

test('derive key with iteration count below minimum', async (t) => {
  const password = 'somestrongpassword';
  const seed = generateSeed();

  try {
    await deriveKey(password, seed, {
      iterations: 499000,
    });

    t.fail();
  } catch (_e) {
    t.pass();
  }
});
