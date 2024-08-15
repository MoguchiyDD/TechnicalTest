# МогучийДД (MoguchiyDD)
# 2024.08.15, 02:52 PM
# append.py

from aiogram import Router, F
from aiogram.types import (
    Message,
    CallbackQuery,
    InlineKeyboardMarkup,
    InlineKeyboardButton
)
from aiogram.filters import Command
from aiogram.fsm.state import StatesGroup, State
from aiogram.fsm.context import FSMContext

from data.database import DatabaseCompanies

router = Router()


def create_company_inline_keyboard() -> InlineKeyboardMarkup:
    """
    Buttons with company names
    """

    buttons = [
        [InlineKeyboardButton(text="Google", callback_data="acompany_Google")],
        [InlineKeyboardButton(text="Apple", callback_data="acompany_Apple")],
        [InlineKeyboardButton(
            text="Microsoft",
            callback_data="acompany_Microsoft"
        )],
        [InlineKeyboardButton(text="Amazon", callback_data="acompany_Amazon")]
    ]
    keyboard = InlineKeyboardMarkup(inline_keyboard=buttons)
    return keyboard


class CommandAppendStates(StatesGroup):
    waiting_for_company = State()
    waiting_for_year = State()
    waiting_for_revenue = State()
    waiting_for_expenses = State()
    waiting_for_profit = State()
    waiting_for_kpn = State()


@router.message(Command("append"))
async def command_append_handler(message: Message, state: FSMContext) -> None:
    """
    This handler receives messages with `/append` command
    """

    keyboard = create_company_inline_keyboard()
    await message.answer("Выберите компанию", reply_markup=keyboard)
    await state.set_state(CommandAppendStates.waiting_for_company)


@router.callback_query(F.data.startswith("acompany_"))
@router.message(CommandAppendStates.waiting_for_company)
async def save_company_name(
    callback_query: CallbackQuery,
    state: FSMContext
) -> None:
    """
    Getting a response about the company name
    """

    data = callback_query.data
    company = data.split("acompany_")[1]
    await state.update_data(company=company)
    await callback_query.message.answer(f"Доход компании «{company}»")
    await state.set_state(CommandAppendStates.waiting_for_revenue)


@router.message(CommandAppendStates.waiting_for_revenue)
async def save_revenue_company(message: Message, state: FSMContext) -> None:
    """
    Getting a response about the company's income
    """

    try:
        revenue = float(message.text)
        await state.update_data(revenue=revenue)

        __data = await state.get_data()
        company = __data.get("company")

        await message.answer(f"Расход компании «{company}»")
        await state.set_state(CommandAppendStates.waiting_for_expenses)
    except ValueError:
        await message.answer("Доход должен быть, например, 136.9")
        await state.clear()


@router.message(CommandAppendStates.waiting_for_expenses)
async def save_expenses_company(message: Message, state: FSMContext) -> None:
    """
    Getting a response about the company's expenses
    """

    try:
        expenses = float(message.text)
        await state.update_data(expenses=expenses)

        __data = await state.get_data()
        company = __data.get("company")

        await message.answer(f"Прибыль компании «{company}»")
        await state.set_state(CommandAppendStates.waiting_for_profit)
    except ValueError:
        await message.answer("Расход должен быть, например, 36.9")
        await state.clear()


@router.message(CommandAppendStates.waiting_for_profit)
async def save_profit_company(message: Message, state: FSMContext) -> None:
    """
    Getting a response about the company's profit
    """

    try:
        profit = float(message.text)
        await state.update_data(profit=profit)

        __data = await state.get_data()
        company = __data.get("company")

        await message.answer(f"КПН компании «{company}»")
        await state.set_state(CommandAppendStates.waiting_for_kpn)
    except ValueError:
        await message.answer("Прибыль должен быть, например, 6.9")
        await state.clear()


@router.message(CommandAppendStates.waiting_for_kpn)
async def save_kpn_company(message: Message, state: FSMContext) -> None:
    """
    Getting a response about the company's KPN
    """

    try:
        kpn = float(message.text)
        await state.update_data(kpn=kpn)

        __data = await state.get_data()
        company = __data.get("company")

        await message.answer(f"Год отчёта компании «{company}»")
        await state.set_state(CommandAppendStates.waiting_for_year)
    except ValueError:
        await message.answer("КПН должен быть, например, 0.9")
        await state.clear()


@router.message(CommandAppendStates.waiting_for_year)
async def save_year_company(message: Message, state: FSMContext) -> None:
    """
    Getting a response about the company's year
    """

    try:
        __data = await state.get_data()
        company = __data.get("company")
        revenue = __data.get("revenue")
        expenses = __data.get("expenses")
        profit = __data.get("profit")
        kpn = __data.get("kpn")
        year = int(message.text)

        db = DatabaseCompanies()
        db.db_connect()
        select_data = db.db_name_year_select_table(company, year)

        if len(select_data) >= 1:
            db.db_close()
            await message.answer("Такая компания уже имеется в системе")
        else:
            db.db_insert_data_into_table([
                (company, year, revenue, expenses, profit, kpn)
            ])
            db.db_close()
            await message.answer("Сохранено в Базе Данных")
        await state.clear()
    except ValueError:
        await message.answer("Год отчёта должен быть, например, 2023")
        await state.clear()
