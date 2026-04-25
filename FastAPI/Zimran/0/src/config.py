# GRIAN | МогучийДД (MoguchiyDD)
# https://github.com/MoguchiyDD/TechnicalTest/

import os

# Redis
REDIS_HOST = os.environ.get("REDIS_HOST", "redis")
REDIS_TIME = 360  # 6 minutes
REDIS_URL = f"redis://{REDIS_HOST}"
REDIS_TIMEOUT = 30
REDIS_SLEEP = 3

# RabbitMQ
RABBITMQ_HOST = os.environ.get("RABBITMQ_HOST", "rabbitmq")
CREDENTIALS = f"amqp://rabbitmq:rabbitmq@{RABBITMQ_HOST}/"
QUEUE_TEXT = "text_queue"
