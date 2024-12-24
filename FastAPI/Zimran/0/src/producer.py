# GRIAN | МогучийДД (MoguchiyDD)
# https://github.com/MoguchiyDD/TechnicalTest/


from aio_pika import Message, connect_robust

from pathlib import Path
from sys import path

path.append(str(Path(__file__).resolve().parent.parent))

from config import CREDENTIALS as credentials
from config import QUEUE_TEXT


async def send_to_queue(mode: str, id: str) -> None:
    conn = await connect_robust(credentials)
    print("[producer] Connection connected")

    async with conn:
        channel = await conn.channel()
        print("[producer] Channel connected")

        await channel.declare_queue(QUEUE_TEXT)
        await channel.default_exchange.publish(
            Message(body=f"{mode},{id}".encode("utf-8")),
            routing_key=QUEUE_TEXT
        )

        print(f"[producer] Sent '{mode}' to queue")
