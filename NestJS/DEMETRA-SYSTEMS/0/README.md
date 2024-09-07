# NestJS/DEMETRA SYSTEMS (1st)
**BackEnd**. User registration and authorization with status updated 10 seconds after logging into the account. If the user is in the cache, data is retrieved from there; otherwise, it is retrieved from the database. There is also a separate endpoint for obtaining the IP address from the proxy server, which is unrelated to the user processes

**Stack**: NestJS, TypeORM, Bull with Redis, Cache with Redis, Axios, Docker Compose

[API endpoint](./src/api.md)

![](result.gif)

## Information
<div id="information" align="left">
  <a href="https://github.com/MoguchiyDD" target="_blank">
    <img alt="Developer, Owner and Author" src="https://img.shields.io/badge/Developer,%20Owner%20and%20Author-МогучийДД%20(MoguchiyDD)-FF4F1E?style=for-the-badge" />
  </a>
  <a href="../../../LICENSE" target="_blank">
    <img alt="MIT License" src="https://img.shields.io/badge/License-MIT%20License-6A1B9A?style=for-the-badge" />
  </a>
  <img alt="Started & Finished" src="https://img.shields.io/badge/Date/Time-~3 Days-F9A825?style=for-the-badge" />
  <img alt="Language" src="https://img.shields.io/badge/Language-English-00897b?style=for-the-badge" />
  <a href="https://youtu.be/4eFVjsAiVXo" target="_blank">
    <img alt="YouTube" src="https://img.shields.io/badge/Result-YouTube-FF0000?style=for-the-badge" />
  </a>
</div>

## Steps before launch
```Bash
$ yarn install
$ yarn doc:up  # Docker Compose
$ yarn start
```
