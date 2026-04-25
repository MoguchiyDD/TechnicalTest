# GRIAN | МогучийДД (MoguchiyDD)
# https://github.com/MoguchiyDD/TechnicalTest/


from asyncio import Future, run, sleep
from aio_pika import abc, exceptions, connect_robust
from redis.asyncio import from_url
from json import loads, dumps

from config import CREDENTIALS as credentials
from config import QUEUE_TEXT, REDIS_TIME, REDIS_URL


async def __mode_text(redis, id: str) -> None:
    data = await redis.get(id)
    if data:
        data = loads(data)
        result = dumps({
            "status": "OK",
            "data": {"text": data["data"]["text"][::-1]}
        })
        await redis.delete(id)
        await redis.set(id, result, REDIS_TIME)


async def process_message(
    message: abc.AbstractIncomingMessage,
    redis,
) -> None:
    async with message.process():
        body = message.body.decode("utf-8")
        mode, id = body.split(",", 1)

        if mode == "text":
            await __mode_text(redis, id)

        print(f"[consumer] Processed '{mode}' to queue")


async def main() -> None:
    redis = from_url(REDIS_URL, decode_responses=False)

    while True:
        try:
            conn = await connect_robust(credentials)
            print("[consumer] Connection connected")
            break
        except exceptions.CONNECTION_EXCEPTIONS:
            print("[consumer] RabbitMQ not ready, retrying in 3s...")
            await sleep(3)

    channel = await conn.channel()
    print("[consumer] Channel connected")

    queue = await channel.declare_queue(QUEUE_TEXT)

    async def on_message(message: abc.AbstractIncomingMessage) -> None:
        await process_message(message, redis)

    await queue.consume(on_message)

    try:
        await Future()
    finally:
        await conn.close()
        await redis.aclose()


if __name__ == "__main__":
    run(main())
