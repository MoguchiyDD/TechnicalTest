# FastAPI/Zimran (1st) | #16
**BackEnd**. The request is sent to FastAPI, where the data is stored in Redis and a message with a command and UUID is generated for RabbitMQ. The RabbitMQ consumer receives this message, retrieves the data from Redis using the UUID, processes it, and saves it back to Redis. FastAPI waits for the processing result for up to 30 seconds by checking the data in Redis. If the processing is successful, a status of 200 is returned. If the time limit is exceeded, a status of 408 is sent. An asynchronous approach is used for all processes.

**Stack**: Asynchronous, FastAPI, Redis, RabbitMQ, Docker

[API endpoint](./API.md)

![](result.gif)

## Information
<div id="information" align="left">
  <a href="https://github.com/MoguchiyDD" target="_blank">
    <img alt="Developer, Owner and Author" src="https://img.shields.io/badge/Developer,%20Owner%20and%20Author-МогучийДД%20(MoguchiyDD)-FF4F1E?style=for-the-badge" />
  </a>
  <a href="../../../LICENSE" target="_blank">
    <img alt="MIT License" src="https://img.shields.io/badge/License-MIT%20License-6A1B9A?style=for-the-badge" />
  </a>
  <img alt="Date/Time" src="https://img.shields.io/badge/Date/Time-~2 Days-F9A825?style=for-the-badge" />
  <img alt="Language" src="https://img.shields.io/badge/Language-English-00897b?style=for-the-badge" />
  <a href="https://youtu.be/hLqqkCG4OAo" target="_blank">
    <img alt="YouTube" src="https://img.shields.io/badge/Result-YouTube-FF0000?style=for-the-badge" />
  </a>
</div>

## Steps before launch
```bash
$ docker compose up --build
```
