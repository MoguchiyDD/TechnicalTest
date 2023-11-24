# NestJS

### Read The **NestJS-README.md** file

The project was created and tested on the **Linux Ubuntu 22.04 Wayland** OS

## Information
- Developer, Owner and Author: [МогучийДД (MoguchiyDD)](https://github.com/MoguchiyDD)
- Package: **yarn**
- Docker Compose: **PostgreSQl V13**, **Redis Latest**
- License: [MIT License](../../../LICENSE)

## Installed

```Bash
# Install Prisma
$ yarn add -D prisma
$ yarn add @prisma/client
$ npx prisma init

# Install argon2
$ yarn add argon2

# Install config
$ yarn add @nestjs/config

# Install Bull
$ npm install --save @nestjs/bull bull

# Install class-validator and class-transformer
$ npm i --save class-validator class-transformer
```


## Commands

```Bash
# Push DB
$ yarn prisma:db:push

# Migrate Deploy
$ yarn prisma:db:deploy

# Up Docker Compose DB
$ yarn db:up

# Remove Docker Compose DB
$ yarn db:rm

# Restart Docker Compose DB (db:rm + db:up + sleep + prisma:db:deploy + prisma:db:push)
$ yarn db:reboot

# Up Docker Compose Redis
$ yarn redis:up

# Remove Docker Compose Redis
$ yarn redis:rm

# Restart Docker Compose Redis (redis:rm + redis:up)
$ yarn redis:reboot

# Restart Docker Compose: DB and Redis
$ yarn all:reboot
```
