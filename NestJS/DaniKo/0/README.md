# NestJS

### Read The **NestJS-README.md** file

## Information
- Developer, Owner and Author: [МогучийДД (MoguchiyDD)](https://github.com/MoguchiyDD)
- Package: **npm**
- Docker Compose: **mongo:4.4-focal**, **mongo-express:latest**, **redis:latest**
- License: [MIT License](../../../LICENSE)

## URL Addresses
- http://localhost:3000/api : **whatsapp-web.js**
- http://localhost:5173 : **React Flow** → Button&nbsp;
<span style="padding:7px 5px 0px;background:#EEE;border:1px solid #EEE;border-radius:7px"><svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="#000000" xmlns="http://www.w3.org/2000/svg"><path d="M1.20308 1.04312C1.00481 0.954998 0.772341 1.0048 0.627577 1.16641C0.482813 1.32802 0.458794 1.56455 0.568117 1.75196L3.92115 7.50002L0.568117 13.2481C0.458794 13.4355 0.482813 13.672 0.627577 13.8336C0.772341 13.9952 1.00481 14.045 1.20308 13.9569L14.7031 7.95693C14.8836 7.87668 15 7.69762 15 7.50002C15 7.30243 14.8836 7.12337 14.7031 7.04312L1.20308 1.04312ZM4.84553 7.10002L2.21234 2.586L13.2689 7.50002L2.21234 12.414L4.84552 7.90002H9C9.22092 7.90002 9.4 7.72094 9.4 7.50002C9.4 7.27911 9.22092 7.10002 9 7.10002H4.84553Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg></span>&nbsp;&nbsp;opens http://localhost:3000/api

## Indicative colors in a React Flow diagram
- <span style="color:#FFFF8D">/обозначения-команд-для-**whatsapp-web.js**</span>
- <span style="color:#80D8FF">вопросы-от-**whatsapp-web.js**</span>
- <span style="color:#FF9E80"><ответ-от-пользователя-для-**whatsapp-web.js**></span>
- <span style="color:#B388FF">конец-диалога-в-**whatsapp-web.js**</span>

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
