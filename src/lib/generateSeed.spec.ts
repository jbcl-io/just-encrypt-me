import test from 'ava';
import { generateSeed } from '..';

test('generate seed', async (t) => {
  const seed = generateSeed();
  t.truthy(seed);
});
