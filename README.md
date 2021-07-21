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

- ✨  Simplified encrypt/decrypt API while still following best security practices.
- 🚀  Works in browsers, web workers, node and electron. _React Native not tested._
- 🔑  _Asymmetric encryption coming soon._

## Install

```
yarn add just-encrypt-me
```

or with npm

```
npm install just-encrypt-me
```

## Usage

### Encrypt text 🔐

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

Save the `seed` and `base64` or `buffer` to your database for later decryption. `password` is the only sensitive info here so you can save the `seed` in plaintext.

### Decrypt text 🔓

```js
import { decrypt } from 'just-encrypt-me';

// decrypt from a base64 string
const decrypted = decrypt(base64, password, seed);
console.log(decrypted.string()); // Hello, World!

// or decrypt from buffer
const decrypted = decrypt(buffer, password, seed);
console.log(decrypted.string()); // Hello, World!
```

## Other cool things you can do 🤩

### Hash a message

This is a one way hash meaning it's impossible to reverse the hashed value.

```js
import { hash } from 'just-encrypt-me';

const hashed = hash('some message');
console.log(hashed); // 6yAa9arw1gYp09KmHkZs/A/ttRet2DHsrFI14dqpY9Y=
```

### Derive key from password

At some point you may want to encrypt multiple items without using the plaintext password every single time, or you may want to use different `seed`s for each item. For that you can derive a key from the plaintext password and use the key for all encryption/decryption.

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

Here, we're using 2 separate `seed`s for the password and text encryption. You will need to save both in your database for later decryption. Again, `password` is the only sensitive info here so you can save `seed` and `seed2` in plaintext.

`key` is a [CryptoKey](https://developer.mozilla.org/en-US/docs/Web/API/CryptoKey) object. Don't save this to your database, it's not safe. Instead, you should generate this whenever needed.

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

## Minimal, therefore Opinionated

The goal for this library is to provide devs an easy to use encryption API, so I've only provided the methods that are industry standard with pretty secure defaults.

- Has only 1 type of symmetric encryption mode (`AES-GCM-256`) from the Web Crypto API (based on best practices and imo)
- Password key derivation will do 500,000 iterations by default (minimum, can set higher, but not lower)
- Has only 1 hash method (`SHA256`)
- Expects UTF-8 everywhere input
- Nonce, salt and IV are all simply referred to as "seed" in all function arguments. Avoids confusion. Simplifies the library.

_If you need to use other types of encryption mode or tweak any other settings, this library is not what you're looking for._

## Maintainers

- Jeff Bocala — [@jeffbocala](https://twitter.com/jeffbocala), [https://jeffbocala.com](https://jeffbocala.com)

## License

This project is licensed under the terms of the **MIT** license.
