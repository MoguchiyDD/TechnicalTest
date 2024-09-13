# МогучийДД (MoguchiyDD)
# 2024.08.15, 04:49 PM
# graphic.py

from aiogram import Router, F
from aiogram.types import (
    Message,
    CallbackQuery,
    InlineKeyboardButton,
    InlineKeyboardMarkup,
    BufferedInputFile
)
from aiogram.filters import Command
from aiogram.fsm.state import StatesGroup, State
from aiogram.fsm.context import FSMContext

from data.database import DatabaseCompanies

from matplotlib.pyplot import subplots, savefig, close
from matplotlib.ticker import FuncFormatter
from io import BytesIO

router = Router()


# ------------ KEYBOARD ------------

def create_company_inline_keyboard() -> InlineKeyboardMarkup:
    """
    Buttons with company names
    """

    buttons = [
        [InlineKeyboardButton(text="Google", callback_data="gcompany_Google")],
        [InlineKeyboardButton(text="Apple", callback_data="gcompany_Apple")],
        [InlineKeyboardButton(
            text="Microsoft",
            callback_data="gcompany_Microsoft"
        )],
        [InlineKeyboardButton(text="Amazon", callback_data="gcompany_Amazon")]
    ]
    keyboard = InlineKeyboardMarkup(inline_keyboard=buttons)
    return keyboard


def create_types_inline_keyboard() -> InlineKeyboardMarkup:
    """
    Buttons with types graphic
    """

    buttons = [
        [InlineKeyboardButton(text="Доход", callback_data="type_revenue")],
        [InlineKeyboardButton(text="Расход", callback_data="type_expenses")],
        [InlineKeyboardButton(text="Прибыль", callback_data="type_profit")],
        [InlineKeyboardButton(text="КПН", callback_data="type_kpn")]
    ]
    keyboard = InlineKeyboardMarkup(inline_keyboard=buttons)
    return keyboard

# ----------------------------------


# ------------ GRAPHIC -------------

def millions_formatter(y: float, _) -> str:
    """
    Format function to display values in millions

    ---
    PARAMETERS:
    - y: float -> Value
    - _: int -> Y-axis position
    ---
    RETURN: Number of million in text
    """

    return f"{y * 1e-6:.0f}M"


async def create_revenue_graph(company: str, type: str, name: str) -> BytesIO:
    """
    Creation of graphics

    ---
    - company: str -> Company name
    - type: str -> Type of field
    - name: str Name type of field
    ---
    RETURN: Bytes from graphic
    """

    db = DatabaseCompanies()
    db.db_connect()
    data = db.db_one_company_select_table(company, type)
    db.db_close()

    years, types = zip(*data) if data else ([], [])
    types = tuple([t * 1_000_000 for t in types])

    _, ax = subplots(figsize=(10, 5))
    ax.plot(years, types, label=name, marker="o")
    ax.set_title(f"{name} компании «{company}»")
    ax.set_xticks(years)
    ax.set_xlabel("Год")
    ax.set_ylabel(name)
    ax.grid(True)

    ax.yaxis.set_major_formatter(FuncFormatter(millions_formatter))

    buf = BytesIO()
    savefig(buf, format="png")
    buf.seek(0)
    close()

    return buf

# ----------------------------------


# ------------ COMMAND -------------

class CommandGraphicStates(StatesGroup):
    waiting_for_company = State()
    waiting_for_type = State()


@router.message(Command("graphic"))
async def send_graph(message: Message, state: FSMContext) -> None:
    keyboard = create_company_inline_keyboard()
    await message.answer("Выберите компанию", reply_markup=keyboard)
    await state.set_state(CommandGraphicStates.waiting_for_company)


@router.callback_query(F.data.startswith("gcompany_"))
@router.message(CommandGraphicStates.waiting_for_company)
async def save_company_name(
    callback_query: CallbackQuery,
    state: FSMContext
) -> None:
    """
    Getting a response about the company name
    """

    data = callback_query.data
    company = data.split("company_")[1]
    await state.update_data(company=company)

    await callback_query.answer(f"Вы выбрали {company}")

    keyboard = create_types_inline_keyboard()
    await callback_query.message.edit_text(
        "Выберите тип графики", reply_markup=keyboard
    )
    await state.set_state(CommandGraphicStates.waiting_for_type)


@router.callback_query(F.data.startswith("type_"))
@router.message(CommandGraphicStates.waiting_for_type)
async def save_company_name(
    callback_query: CallbackQuery,
    state: FSMContext
) -> None:
    """
    Getting a response about the company name
    """

    data = callback_query.data
    _type = data.split("type_")[1]

    name = ""
    if _type == "revenue":
        name = "Доход"
    elif _type == "expenses":
        name = "Расход"
    elif _type == "profit":
        name = "Прибыль"
    elif _type == "kpn":
        name = "КПН"

    await callback_query.answer(f"Вы выбрали {name}")

    __data = await state.get_data()
    company = __data.get("company")

    graph_buf = await create_revenue_graph(company, _type, name)
    graph_file = BufferedInputFile(
        graph_buf.getvalue(), filename=f"{company}_{_type}_graph.png"
    )

    await callback_query.message.delete()
    await callback_query.bot.send_photo(
        callback_query.message.chat.id,
        photo=graph_file,
        caption=f"График компании «{company}» за все отчётные периоды"
    )
    await state.clear()

# ----------------------------------
