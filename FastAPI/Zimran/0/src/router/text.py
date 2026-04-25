# GRIAN | МогучийДД (MoguchiyDD)
# https://github.com/MoguchiyDD/TechnicalTest/


from fastapi import APIRouter, HTTPException, Request, status
from uuid import uuid4
from json import loads, dumps
from asyncio import sleep

from schema.text import TextSchema
from producer import send_to_queue
from config import REDIS_TIME, REDIS_TIMEOUT, REDIS_SLEEP


router = APIRouter()


@router.get("/")
async def root(request: Request, body: TextSchema):
    redis = request.app.state.redis
    channel = request.app.state.rabbitmq_channel

    __uuid = str(uuid4())
    await redis.set(__uuid, dumps({"status": "processing", "data": dict(body)}), REDIS_TIME)
    await send_to_queue(channel, "text", __uuid)

    result = None
    elapsed = 0
    while elapsed <= REDIS_TIMEOUT:
        await sleep(REDIS_SLEEP)
        elapsed += REDIS_SLEEP

        raw = await redis.get(__uuid)
        if raw is None:
            break
        candidate = loads(raw)
        if candidate["status"] == "OK":
            result = candidate
            break

    if result is None:
        raise HTTPException(
            status_code=status.HTTP_408_REQUEST_TIMEOUT,
            detail="timeout"
        )

    return result
