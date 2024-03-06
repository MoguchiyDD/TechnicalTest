# NestJS/DEMETRA-SYSTEMS
### Read The **NestJS-README.md** file
**BackEnd**. Creation of user registration and authorization. After 10 seconds the user's status is updated. If the user is in the cache, then the data is taken from there without using the database. Get the current IP address of the computer.

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
  <img alt="Started & Finished" src="https://img.shields.io/badge/Started%20&%20Finished-2023.11.23%20/%202023.11.26-F9A825?style=for-the-badge" />
  <a href="https://hub.docker.com/_/postgres" target="_blank">
    <img alt="Docker Compose PostgreSQL" src="https://img.shields.io/badge/Docker%20Compose-PostgreSQL%20v13-2E7D32?style=for-the-badge" />
  </a>
  <a href="https://hub.docker.com/_/adminer" target="_blank">
    <img alt="Docker Compose adminer" src="https://img.shields.io/badge/Docker%20Compose-adminer%20latest-2E7D32?style=for-the-badge" />
  </a>
  <a href="https://hub.docker.com/_/redis" target="_blank">
    <img alt="Docker Compose Redis" src="https://img.shields.io/badge/Docker%20Compose-Redis%20latest-2E7D32?style=for-the-badge" />
  </a>
</div>

## URL Addresses
- http://localhost:3000 : **Axios** + **Proxy Server**
- http://localhost:3000/users/all : List **all USERS** from **TypeORM**
- http://localhost:3000/users/get-user-by-id?id=any-number : **Searches** for **USER** by **ID**
- http://localhost:3000/users/signup : **Register** an **ACCOUNT**
- http://localhost:3000/users/signin : **Login** to your **ACCOUNT**
- http://localhost:3000/users/signout?id=any-number : **Signing out** of your **ACCOUNT**

## Installed
<div id="installed" align="left">
  <a href="https://www.npmjs.com/package/@nestjs/config" target="_blank">
    <img alt="npm @nestjs/config" src="https://img.shields.io/badge/npm-@nestjs/config-FAFAFA?style=for-the-badge" />
  </a>
  <a href="https://www.npmjs.com/package/@nestjs/bull" target="_blank">
    <img alt="npm @nestjs/bull" src="https://img.shields.io/badge/npm-@nestjs/bull-FAFAFA?style=for-the-badge" />
  </a>
  <a href="https://www.npmjs.com/package/bull" target="_blank">
    <img alt="npm bull" src="https://img.shields.io/badge/npm-bull-FAFAFA?style=for-the-badge" />
  </a>
  <a href="https://www.npmjs.com/package/@nestjs/typeorm" target="_blank">
    <img alt="npm @nestjs/typeorm" src="https://img.shields.io/badge/npm-@nestjs/typeorm-FAFAFA?style=for-the-badge" />
  </a>
  <a href="https://www.npmjs.com/package/typeorm" target="_blank">
    <img alt="npm typeorm" src="https://img.shields.io/badge/npm-typeorm-FAFAFA?style=for-the-badge" />
  </a>
  <a href="https://www.npmjs.com/package/pg" target="_blank">
    <img alt="npm pg" src="https://img.shields.io/badge/npm-pg-FAFAFA?style=for-the-badge" />
  </a>
  <a href="https://www.npmjs.com/package/@nestjs/axios" target="_blank">
    <img alt="npm @nestjs/axios" src="https://img.shields.io/badge/npm-@nestjs/axios-FAFAFA?style=for-the-badge" />
  </a>
  <a href="https://www.npmjs.com/package/axios" target="_blank">
    <img alt="npm axios" src="https://img.shields.io/badge/npm-axios-FAFAFA?style=for-the-badge" />
  </a>
  <a href="https://www.npmjs.com/package/@nestjs/cache-manager" target="_blank">
    <img alt="npm @nestjs/cache-manager" src="https://img.shields.io/badge/npm-@nestjs/cache--manager-FAFAFA?style=for-the-badge" />
  </a>
  <a href="https://www.npmjs.com/package/class-validator" target="_blank">
    <img alt="npm class-validator" src="https://img.shields.io/badge/npm-class--validator-FAFAFA?style=for-the-badge" />
  </a>
  <a href="https://www.npmjs.com/package/class-transformer" target="_blank">
    <img alt="npm class-transformer" src="https://img.shields.io/badge/npm-class--transformer-FAFAFA?style=for-the-badge" />
  </a>
  <a href="https://www.npmjs.com/package/cache-manager-redis-store" target="_blank">
    <img alt="npm cache-manager-redis-store" src="https://img.shields.io/badge/npm-cache--manager--redis--store-FAFAFA?style=for-the-badge" />
  </a>
  <a href="https://www.npmjs.com/package/argon2" target="_blank">
    <img alt="npm argon2" src="https://img.shields.io/badge/npm-argon2-FAFAFA?style=for-the-badge" />
  </a>
</div>

## Commands
```Bash
# Installs all *Docker Containers* from *Docker Compose*
$ yarn doc:up

# Stops and Removes all *Docker Containers* from *Docker Compose*
$ yarn doc:rm
```
