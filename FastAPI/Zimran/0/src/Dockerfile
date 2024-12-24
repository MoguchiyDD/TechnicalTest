FROM python:3.10

WORKDIR /usr/app

COPY /router /usr/app/router
COPY /schema /usr/app/schema
COPY config.py /usr/app/config.py
COPY producer.py /usr/app/producer.py
COPY index.py /usr/app/index.py

RUN pip install --upgrade pip
RUN pip install fastapi fastapi[standard] uvicorn aioredis aio-pika

CMD ["uvicorn", "index:app", "--host", "0.0.0.0", "--port", "8000"]
