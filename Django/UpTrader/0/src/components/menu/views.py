# Developer && Owner: МогучийДД (MoguchiyDD)
# LICENSE: MIT License which is located in the text file LICENSE
#
# Goal: Custom Template for MENU
# Result: Ready Custom Template for MENU
#
# Past Modification: Editing The «queue» and «is_queue» FUNCTIONS (SUBMENU)
# Last Modification: Adding DOCUMENTATION
# Modification Date: 2024.03.06, 06:18 PM
#
# Create Date: 2024.03.05, 12:38 PM


from django import template
from django.template.context import RequestContext
from .models import Menu


register = template.Library()
ul_queue = []  # for SUBMENU


# ------------------- DRAW MENU --------------------

@register.inclusion_tag("components/menu/menu.html", takes_context=True)
def draw_menu(context: RequestContext, menu_type: str, current: str):
    """
    New TEMPLATE TAG for MENU

    ---
    PARAMETERS:
    - context: RequestContext -> DEFAULT DATA from New TEMPLATE
    - menu_type: str -> TYPE for «Menu» DATA TABLE
    - current: str -> CURRENT TAB for «Menu» DATA TABLE
    ---
    RESULT: { "current": current.lower(), "menu": «Menu» DATA TABLE }
    """

    menu = Menu.objects.filter(
        menu_type__menu_type=menu_type
    ).order_by("level")

    for m in menu:
        if m.slug == current.lower():
            m.status = True
        else:
            m.status = False
        m.save()

    result = {
        "current": current.lower(),
        "menu": menu
    }
    return result

# --------------------------------------------------


# ------------ MENU DRAWING ASSISTANTSt ------------

@register.filter(name="previous")
def previous(menu: list[Menu], index: int) -> str:
    """
    Returns The PREVIOUS ITERATION of The «Menu» DATA TABLE

    ---
    PARAMETERS:
    - menu: list[Menu] -> LIST from «Menu» DATA TABLE
    - index: int -> INDEX for The «menu» VARIABLE
    ---
    RESULT: 1 PARENT from MENU
    """

    try:
        result = menu[index - 1]
    except:
        result = menu[0]

    return result.parent


@register.filter(name="parents")
def parents(menu: list[Menu], index: int) -> list[str]:
    """
    Returns 1 LIST of PARENTS from The «Menu» DATA TABLE

    ---
    PARAMETERS:
    - menu: list[Menu] -> LIST from «Menu» DATA TABLE
    - index: int -> INDEX for The «menu» VARIABLE
    ---
    RESULT: PARENTS from MENU
    """

    parents = []

    len_menu = len(menu)
    for m in range(index, len_menu):
        if menu[m].parent is not None:
            parents.append(menu[m])
        else:
            break

    return parents


@register.filter(name="is_queue")
def is_queue(_: int) -> list[bool]:
    """
    Returns 1 LIST of «False» for a SUBMENU

    ---
    PARAMETERS:
    - _: int -> ANY NUMBER
    ---
    RESULT: LIST with «False»
    """

    global ul_queue
    is_new_ul = [False for _ in range(len(ul_queue)) if len(ul_queue) >= 1]
    return is_new_ul


@register.filter(name="queue")
def queue(menu: list[Menu], index: int) -> list[bool | None]:
    """
    Returns 1 LIST of «None» | «False» | «True» for a SUBMENU

    ---
    PARAMETERS:
    - menu: list[Menu] -> LIST from «Menu» DATA TABLE
    - index: int -> INDEX for The «menu» VARIABLE
    ---
    RESULT: LIST with «None» | «False» | «True»
    """

    def append_ul_queue() -> list[bool]:
        """
        Adds a TEMPORARY STORAGE to The PARENT MENU and Returns
        1 LIST OF «True» RESPONSE for a SUBMENU
        ---
        RESULT: LIST with «None» | «False» | «True»
        """

        ul_queue.append(menu[index].parent)
        is_new_ul = [True]
        return is_new_ul

    global ul_queue
    is_new_ul = [None]
    if index == 0:
        ul_queue = []

    if len(ul_queue) >= 1:
        if ul_queue[-1] != menu[index].parent:
            dot = True
            try:
                q = ul_queue.index(menu[index].parent)
                is_new_ul = [False for _ in range(q+1, len(ul_queue))]
                del ul_queue[q+1:]
                dot = False
            except:
                pass

            if dot:
                is_new_ul = append_ul_queue()
    else:
        is_new_ul = append_ul_queue()

    return is_new_ul


# --------------------------------------------------
