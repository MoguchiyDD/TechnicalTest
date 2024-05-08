# NodeJS/GREEN API
**BackEnd**. Through the 1st microservice, a request for execution is sent to the 2nd microservice. The 2nd microservice sends the processed response to the 1st microservice. Request: 19. Response: 38

The project was created and tested on the **Linux Ubuntu 22.04 Wayland** OS

![](result.gif)

## Information
<div id="information" align="left">
  <a href="https://github.com/MoguchiyDD" target="_blank">
    <img alt="Developer, Owner and Author" src="https://img.shields.io/badge/Developer,%20Owner%20and%20Author-МогучийДД%20(MoguchiyDD)-FF4F1E?style=for-the-badge" />
  </a>
  <a href="../../../LICENSE" target="_blank">
    <img alt="MIT License" src="https://img.shields.io/badge/License-MIT%20License-6A1B9A?style=for-the-badge" />
  </a>
  <img alt="Started & Finished" src="https://img.shields.io/badge/Started%20&%20Finished-2023.12.11%20/%202023.12.13-F9A825?style=for-the-badge" />
  <a href="https://hub.docker.com/_/rabbitmq" target="_blank">
    <img alt="Docker Compose RabbitMQ" src="https://img.shields.io/badge/Docker%20Compose-RabbitMQ%20v3.10.7--management-2E7D32?style=for-the-badge" />
  </a>
</div>

## URL Addresses
- https://localhost:443/anyNumber : The «*send.ts*» FILE sends the REQUEST to **RabbitMQ**, and the «*receive.ts*» FILE works with the REQUEST in **RabbitMQ** and sends the RESPONSE to **HTTPS**.
  - anyNumber : Any Number, e.g. 1

## Installed
<div id="installed" align="left">
  <a href="https://www.npmjs.com/package/@types/node" target="_blank">
    <img alt="npm @types/node" src="https://img.shields.io/badge/npm-@types/node-FAFAFA?style=for-the-badge" />
  </a>
  <a href="https://www.npmjs.com/package/@types/typescript" target="_blank">
    <img alt="npm @types/typescript" src="https://img.shields.io/badge/npm-@types/typescript-FAFAFA?style=for-the-badge" />
  </a>
  <a href="https://www.npmjs.com/package/typescript" target="_blank">
    <img alt="npm typescript" src="https://img.shields.io/badge/npm-typescript-FAFAFA?style=for-the-badge" />
  </a>
  <a href="https://www.npmjs.com/package/@types/dotenv" target="_blank">
    <img alt="npm @types/dotenv" src="https://img.shields.io/badge/npm-@types/dotenv-FAFAFA?style=for-the-badge" />
  </a>
  <a href="https://www.npmjs.com/package/dotenv" target="_blank">
    <img alt="npm dotenv" src="https://img.shields.io/badge/npm-dotenv-FAFAFA?style=for-the-badge" />
  </a>
  <a href="https://www.npmjs.com/package/@types/express" target="_blank">
    <img alt="npm @types/express" src="https://img.shields.io/badge/npm-@types/express-FAFAFA?style=for-the-badge" />
  </a>
  <a href="https://www.npmjs.com/package/express" target="_blank">
    <img alt="npm express" src="https://img.shields.io/badge/npm-express-FAFAFA?style=for-the-badge" />
  </a>
  <a href="https://www.npmjs.com/package/@types/amqplib" target="_blank">
    <img alt="npm @types/amqplib" src="https://img.shields.io/badge/npm-@types/amqplib-FAFAFA?style=for-the-badge" />
  </a>
  <a href="https://www.npmjs.com/package/amqplib" target="_blank">
    <img alt="npm amqplib" src="https://img.shields.io/badge/npm-amqplib-FAFAFA?style=for-the-badge" />
  </a>
</div>

## OpenSSL
```Bash
$ openssl req -x509 -newkey rsa:2048 -keyout ssl/keytmp.pem -out ssl/cert.pem -days 365
$ openssl rsa -in keytmp.pem -out ssl/key.pem
```

## Commands
```Bash
# Installs all *Docker Containers* from *Docker Compose*
$ npm run doc:up

# Stops and Removes all *Docker Containers* from *Docker Compose*
$ npm run doc:rm

# Build TypeScript
$ npm run build

# Build TypeScript + Start Node
$ npm run start
```
