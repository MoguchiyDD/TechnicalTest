FROM python:3.10

WORKDIR /usr/app

COPY ../config.py /usr/app/config.py
COPY consumer/index.py /usr/app/index.py

RUN pip install --upgrade pip
RUN pip install aioredis aio-pika

CMD ["python", "index.py"]
