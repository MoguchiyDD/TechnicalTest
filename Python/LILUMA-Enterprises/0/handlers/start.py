# МогучийДД (MoguchiyDD)
# 2024.08.15, 02:15 PM
# start.py

from aiogram import Router, html
from aiogram.types import Message
from aiogram.filters import Command

router = Router()


# ------------ COMMAND ------------

@router.message(Command("start"))
async def command_start_handler(message: Message) -> None:
    """
    This handler receives messages with `/start` command
    """

    __user_name = html.bold(message.from_user.full_name)
    __append = html.bold("добавить")
    __get_info = html.bold("вывести информацию")
    __menu = html.bold("меню")

    text = f"Привет, {__user_name}!\nЯ могу {__append} или {__get_info} "
    text += f"об компании в виде графика. Вы можете в моём {__menu} найти "
    text += "доступные команды."
    await message.answer(text)

# ---------------------------------
