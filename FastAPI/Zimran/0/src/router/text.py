# GRIAN | МогучийДД (MoguchiyDD)
# https://github.com/MoguchiyDD/TechnicalTest/


from fastapi import APIRouter, HTTPException, status
from aioredis import from_url
from uuid import uuid4
from json import loads, dumps
from time import perf_counter

from schema.text import TextSchema

from pathlib import Path
from sys import path

path.append(str(Path(__file__).resolve().parent.parent))

from producer import send_to_queue
from config import REDIS_TIME, REDIS_URL, REDIS_TIMEOUT, REDIS_SLEEP


router = APIRouter()


@router.get("/")
async def root(data: TextSchema):
    __uuid = str(uuid4())
    __rdt = dumps({
        "status": "processing",
        "data": dict(data)
    })

    redis = from_url(REDIS_URL)
    await redis.set(__uuid, __rdt, REDIS_TIME)

    await send_to_queue("text", __uuid)

    __start, __end = perf_counter(), perf_counter()
    while int(__end - __start) <= REDIS_TIMEOUT:
        if int(__end - __start) >= REDIS_SLEEP:
            data = await redis.get(__uuid)
            if data:
                data = loads(data)
                if data["status"] == "OK":
                    break
                else:
                    data = None
            else:
                break
        __end = perf_counter()

    if data is None:
        await redis.close()
        raise HTTPException(
            status_code=status.HTTP_408_REQUEST_TIMEOUT,
            detail="timeout"
        )

    await redis.close()
    return HTTPException(status_code=status.HTTP_200_OK, detail=data)
