<h1 align="center">just-encrypt-me</h1>
<p align="center">⚡️ A super simple encryption library.</p>
<p align="center">
  <img src="https://img.shields.io/github/package-json/v/slater-notes/just-encrypt-me" />
  <img src="https://img.shields.io/github/last-commit/slater-notes/just-encrypt-me" />
  <img src="https://img.shields.io/github/license/slater-notes/just-encrypt-me?color=blue" />
</p>

> **NOTE:** just-encrypt-me is still a pre-release project (v0.x.x). Please use at your own risk. If you find this project useful, please consider leaving a star so others can find it. Thanks!

## What?

This library takes a few of the best methods from the Web Crypto API and simplifies it to make encryption easier (with pretty good defaults based on best practices).

- ✨ Simplified encrypt/decrypt API while still following best security practices.
- 🚀 Works in browsers, web workers, node and electron. _React Native not tested._
- 🔑 _Asymmetric encryption coming soon._

## Install

```
npm install just-encrypt-me
```

or with yarn

```
yarn add just-encrypt-me
```

## Usage

### Encrypt text

```js
import { encrypt, generateSeed } from 'just-encrypt-me';

const password = 'somestrongpassword';
const seed = generateSeed();

const encrypted = await encrypt('Hello, World!', password, seed);

// export the base64 of the encrypted text
const base64 = encrypted.base64(); // 4AZS2rs2OZ4j5u9BM68TsMzXo1silVZ2UvRkiTE=

// or the buffer
const buffer = encrypted.buffer(); // <Buffer e0 06 52 ...>
```

Save the `seed` and `base64` or `buffer` to your database for later decryption. `password` is the only sensitive info here so you can save the `seed` in plain text.

### Decrypt text

```js
import { decrypt } from 'just-encrypt-me';

// decrypt from a base64 string
const decrypted = decrypt(base64, password, seed);
console.log(decrypted.string()); // Hello, World!

// or decrypt from buffer
const decrypted = decrypt(buffer, password, seed);
console.log(decrypted.string()); // Hello, World!
```

## Other cool things you can do

### Hash a message

```js
import { hash } from 'just-encrypt-me';

const hashed = hash('some message');
console.log(hashed); // 6yAa9arw1gYp09KmHkZs/A/ttRet2DHsrFI14dqpY9Y=
```

### Derive key from password

At some point you may want to encrypt multiple items without using the plain text password every time, or you may want to have different seeds for each items. For that you can derive a key from the plain text password and use the key for all encryption/decryption.

```js
import { deriveKey, generateSeed } from 'just-encrypt-me';

const password = 'somestrongpassword';
const seed = generateSeed();

const key = await deriveKey(password, seed);
```

### Encrypt text using a key

```js
import { encryptWithKey, generateSeed } from 'just-encrypt-me';

const seed2 = generateSeed();

const encrypted = await encryptWithKey('Hello, World!', key, seed2);
```

Here we are using 2 separate seeds for the password and text encryption. You will need to save both in your database for later decryption. Again, `password` is the only sensitive info here so you can save `seed` and `seed2` in plain text.

The `key` is a [CryptoKey](https://developer.mozilla.org/en-US/docs/Web/API/CryptoKey) object. Don't save this to your database, it may be unsafe. Instead, you should call the `deriveKey` method whenever needed.

### Decrypt text using a key

```js
import { decrypt } from 'just-encrypt-me';

// decrypt from a base64 string
const decrypted = decryptWithKey(base64, key, seed2);
console.log(decrypted.string()); // Hello, World!

// or decrypt from buffer
const decrypted = decryptWithKey(buffer, key, seed2);
console.log(decrypted.string()); // Hello, World!
```

## Documentation

_I'm still putting together a docs site. Watch this space.._

## Somewhat Opinionated

- Has only 1 type of symmetric encryption mode (`AES-GCM-256`) from the Web Crypto API (based on best practices and imo)
- Password key derivation will do 500,000 iterations by default (minimum, can set higher, but not lower)
- Has only 1 hash method (`SHA256`)
- Expects UTF-8 everywhere input
- Nonce, salt and IV are simply referred to as "seed" in all function arguments. Avoids confusion. Simplifies the library even further.

_If you need to use the other types of encryption mode or tweak any other settings, this library is not what you're looking for._

## Maintainers

- Jeff Bocala — [@jeffbocala](https://twitter.com/jeffbocala), [https://jeffbocala.com](https://jeffbocala.com)

## License

This project is licensed under the terms of the **MIT** license.
