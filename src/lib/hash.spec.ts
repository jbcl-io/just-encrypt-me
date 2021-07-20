import test from 'ava';
import { hash } from '..';

test('hash text', async (t) => {
  const plaintext = 'hash me';
  const hashed = await hash(plaintext);

  t.truthy(hashed);
});
