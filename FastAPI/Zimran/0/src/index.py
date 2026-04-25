# GRIAN | МогучийДД (MoguchiyDD)
# https://github.com/MoguchiyDD/TechnicalTest/


from contextlib import asynccontextmanager
from fastapi import FastAPI
from redis.asyncio import from_url
from aio_pika import connect_robust

from config import REDIS_URL, CREDENTIALS
from router.text import router as text_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    app.state.redis = from_url(REDIS_URL, decode_responses=False)
    app.state.rabbitmq = await connect_robust(CREDENTIALS)
    app.state.rabbitmq_channel = await app.state.rabbitmq.channel()
    print("[api] Redis and RabbitMQ connections established")

    yield

    await app.state.redis.aclose()
    await app.state.rabbitmq_channel.close()
    await app.state.rabbitmq.close()
    print("[api] Connections closed")


app = FastAPI(lifespan=lifespan)
app.include_router(text_router, prefix="/api/text", tags=["text"])
