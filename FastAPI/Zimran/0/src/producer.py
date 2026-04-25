# GRIAN | МогучийДД (MoguchiyDD)
# https://github.com/MoguchiyDD/TechnicalTest/


from aio_pika import Message, Channel

from config import QUEUE_TEXT


async def send_to_queue(channel: Channel, mode: str, id: str) -> None:
    await channel.declare_queue(QUEUE_TEXT)
    await channel.default_exchange.publish(
        Message(body=f"{mode},{id}".encode("utf-8")),
        routing_key=QUEUE_TEXT
    )
    print(f"[producer] Sent '{mode}' to queue")
