# NestJS

### Read The **NestJS-README.md** file

## Information
- Developer, Owner and Author: [МогучийДД (MoguchiyDD)](https://github.com/MoguchiyDD)
- Package: **npm**
- Docker Compose: **mongo:4.4-focal**, **mongo-express:latest**, **redis:latest**
- License: [MIT License](../../../LICENSE)

## URL Addresses
- http://localhost:3000 : **whatsapp-web.js**

## Installed *main folder*
- turbo

## Installed */apps/api*
- @nestjs/serve-static
- @nestjs/config
- @nestjs/mongoose mongoose
- @nestjs/cache-manager cache-manager
- cache-manager-redis-store
- whatsapp-web.js
- qrcode-terminal

## Installed */apps/client*
- vite@latest -> **React**


## Commands

```Bash
# Installs all *Docker Containers* from *Docker Compose*
$ npm run doc:up

# Stops and Removes all *Docker Containers* from *Docker Compose*
$ npm run doc:rm

# Runs NestJS and React from Turbo (+ Docker Compose: rm && up)
$ npm run dev

# Build from Turbo (NestJS + React)
$ npm run build

# React inside NestJS -> ERROR [MongooseModule] Unable to connect to the database. Retrying (...)
$ npm run start
```
