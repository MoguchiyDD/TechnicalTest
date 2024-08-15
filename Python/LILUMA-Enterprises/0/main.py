# МогучийДД (MoguchiyDD)
# 2024.08.14, 04:45 PM
# main.py

from asyncio import run

from aiogram import Bot, Dispatcher
from aiogram.types import BotCommand
from aiogram.client.default import DefaultBotProperties
from aiogram.enums import ParseMode

from handlers import start, append, graphic

from logging import basicConfig, INFO
from dotenv import load_dotenv

from os import getenv
from sys import stdout

load_dotenv()

TOKEN = getenv("BOT_TOKEN")
dp = Dispatcher()


async def set_default_commands(bot: Bot) -> None:
    """
    Creating a Menu

    ---
    bot: Bot -> Bot
    """

    await bot.set_my_commands([
        BotCommand(
            command="start",
            description="Запустить бота"
        ),
        BotCommand(
            command="append",
            description="Добавить годовой отчёт по компании"
        ),
        BotCommand(
            command="graphic",
            description="Отобразить данные компании в виде графика"
        )
    ])


async def main() -> None:
    """
    Important the function (main run)
    """

    bot = Bot(
        token=TOKEN,
        default=DefaultBotProperties(parse_mode=ParseMode.HTML)
    )

    dp.include_routers(
        start.router,
        append.router,
        graphic.router
    )

    await bot.delete_webhook()
    await set_default_commands(bot)
    await dp.start_polling(bot, skip_updates=True)


if __name__ == "__main__":
    basicConfig(level=INFO, stream=stdout)
    run(main())
