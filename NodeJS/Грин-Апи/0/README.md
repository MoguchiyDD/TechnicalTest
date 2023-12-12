# NodeJS
The project was created and tested on the **Linux Ubuntu 22.04 Wayland** OS

## Information
- Developer, Owner and Author: [МогучийДД (MoguchiyDD)](https://github.com/MoguchiyDD)
- Started & Finished : from **2023.12.11** to **2023.12.12 / until now**
- Package: **npm**
- Date of creation of the key and certificate: **2023.12.11, ~10:22 PM**
- Docker Compose: **rabbitmq:3.10.7-management**
- License: [MIT License](../../../LICENSE)

## URL Addresses
- https://localhost:443/anyNumber : The «*send.ts*» FILE sends the REQUEST to **RabbitMQ**, and the «*receive.ts*» FILE works with the REQUEST in **RabbitMQ** and sends the RESPONSE to **HTTPS**.
  - anyNumber : Any Number, e.g. 1

## Installed
- @types/node
- @types/typescript typescript
- @types/dotenv dotenv
- @types/express express
- @types/amqplib amqplib

## OpenSSL
```Bash
$ openssl req -x509 -newkey rsa:2048 -keyout OpenSSL/keytmp.pem -out OpenSSL/cert.pem -days 365
$ openssl rsa -in keytmp.pem -out OpenSSL/key.pem
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
