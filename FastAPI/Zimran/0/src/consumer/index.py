# GRIAN | МогучийДД (MoguchiyDD)
# https://github.com/MoguchiyDD/TechnicalTest/


from asyncio import Future, run, sleep
from aio_pika import abc, exceptions, connect_robust
from aioredis import from_url
from json import loads, dumps

import tracemalloc
tracemalloc.start()

from pathlib import Path
from sys import path

path.append(str(Path(__file__).resolve().parent.parent))

from config import CREDENTIALS as credentials
from config import QUEUE_TEXT, REDIS_TIME, REDIS_URL


async def __mode_text(id: str) -> None:
    redis = from_url(REDIS_URL)

    data = await redis.get(id)
    if data:
        data = loads(data)
        data = dumps({
            "status": "OK",
            "data": {"text": data["data"]["text"][::-1]}
        })

        await redis.delete(id)
        await redis.set(id, data, REDIS_TIME)

    await redis.close()


async def process_message(message: abc.AbstractIncomingMessage) -> None:
    async with message.process():
        body = message.body.decode("utf-8")
        mode, id = body.split(",", 1)

        if mode == "text":
            await __mode_text(id)

        print(f"[consumer] Processed '{mode}' to queue")
        await sleep(1)


async def main() -> None:
    try:
        conn = await connect_robust(credentials)
        print("[consumer] Connection connected")
    except exceptions.CONNECTION_EXCEPTIONS as e:
        await sleep(3)
        return await main()

    channel = await conn.channel()
    print("[consumer] Channel connected")

    queue = await channel.declare_queue(QUEUE_TEXT)
    await queue.consume(process_message)

    try:
        await Future()
    finally:
        await conn.close()


if __name__ == "__main__":
    run(main())
