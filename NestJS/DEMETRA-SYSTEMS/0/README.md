# NestJS

### Read The **NestJS-README.md** file

The project was created and tested on the **Linux Ubuntu 22.04 Wayland** OS

![](result.gif)

## Information
- Developer, Owner and Author: [МогучийДД (MoguchiyDD)](https://github.com/MoguchiyDD)
- Package: **yarn**
- Docker Compose: **PostgreSQl V13**, **Adminer Latest**, **Redis Latest**
- License: [MIT License](../../../LICENSE)

## URL Addresses
- http://localhost:3000 : **Axios** + **Proxy Server**
- http://localhost:3000/users/all : List **all USERS** from **TypeORM**
- http://localhost:3000/users/get-user-by-id?id=any-number : **Searches** for **USER** by **ID**
- http://localhost:3000/users/signup : **Register** an **ACCOUNT**
- http://localhost:3000/users/signin : **Login** to your **ACCOUNT**
- http://localhost:3000/users/signout?id=any-number : **Signing out** of your **ACCOUNT**

## Installed
- @nestjs/config
- @nestjs/bull bull
- @nestjs/typeorm typeorm pg
- @nestjs/axios axios
- @nestjs/cache-manager cache-manager
- class-validator class-transformer
- cache-manager-redis-store
- argon2

## Commands

```Bash
# Installs all *Docker Containers* from *Docker Compose*
$ yarn doc:up

# Stops and Removes all *Docker Containers* from *Docker Compose*
$ yarn doc:rm
```
