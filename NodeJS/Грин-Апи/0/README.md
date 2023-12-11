# NodeJS

## Information
- Developer, Owner and Author: [МогучийДД (MoguchiyDD)](https://github.com/MoguchiyDD)
- Started & Finished : from **2023.12.11** to **until now**
- Package: **npm**
- Date of creation of the key and certificate: **2023.12.11, ~10:22 PM**
- License: [MIT License](../../../LICENSE)

## Installed
- @types/node
- @types/typescript typescript
- @types/express express

## OpenSSL
```Bash
$ openssl req -x509 -newkey rsa:2048 -keyout OpenSSL/keytmp.pem -out OpenSSL/cert.pem -days 365
$ openssl rsa -in keytmp.pem -out OpenSSL/key.pem
```

## Commands
```Bash
# Build TypeScript
$ npm run build

# Build TypeScript + Start Node
$ npm run start
```
