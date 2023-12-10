# NestJS

The project was created and tested on the **Linux Ubuntu 22.04 Wayland** OS

![](result.gif)

## Information
- Developer, Owner and Author: [МогучийДД (MoguchiyDD)](https://github.com/MoguchiyDD)
- Started & Finished : from **2023.12.05** to **2023.12.10**
- Package: **npm**
- Docker Compose: **mongo:4.4-focal**, **mongo-express:latest**, **redis:latest**
- License: [MIT License](../../../LICENSE)

## URL Addresses
- http://localhost:3000/api : **whatsapp-web.js**
- http://localhost:5173 : **React Flow** → Button&nbsp;&nbsp;![](images/btn_whatsapp-web.js.svg)&nbsp;&nbsp;opens http://localhost:3000/api

## Indicative colors in a React Flow diagram
- ![](images/commands_whatsapp-web.js.svg)
- ![](images/questions_whatsapp-web.js.svg)
- ![](images/answers_whatsapp-web.js.svg)
- ![](images/ends_whatsapp-web.js.svg)

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
- vite@latest → **React**

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
```
