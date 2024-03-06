# Developer && Owner: МогучийДД (MoguchiyDD)
# LICENSE: MIT License which is located in the text file LICENSE
#
# Goal: URL Page for CREATIVITY
# Result: Ready URL Page for CREATIVITY
#
# Past Modification: Editing The ALL FUNCTIONS (RESULT)
# Last Modification: Editing The «subjects» FUNCTION (TITLE)
# Modification Date: 2024.03.07, 12:04 ФM
#
# Create Date: 2024.03.05, 01:23 PM


from django.core.handlers.wsgi import WSGIRequest
from django.shortcuts import render
from django.http import HttpResponse


PAGE = "creativity"


# ------------ CREATIVITY ------------

def index(request: WSGIRequest) -> HttpResponse:
    """
    The «creativity» TAB from The MENU

    ---
    PARAMETERS:
    - request: WSGIRequest -> Request to URL page
    ---
    RESULT: Response with DATA for HTML
    """

    template = "index.html"
    title = "Творчество"
    tab = "creativity"

    context = {
        "title": title,
        "tab": tab
    }
    return render(request, f"pages/{ PAGE }/{ template }", context)

# ------------------------------------


# ------------ PAINTINGS -------------

def paintings(request: WSGIRequest) -> HttpResponse:
    """
    The «paintings» TAB from The MENU

    ---
    PARAMETERS:
    - request: WSGIRequest -> Request to URL page
    ---
    RESULT: Response with DATA for HTML
    """

    template = "paintings.html"
    title = "Живописи"
    tab = "paintings"

    context = {
        "title": title,
        "tab": tab
    }
    return render(request, f"pages/{ PAGE }/{ template }", context)


def subjects(request: WSGIRequest) -> HttpResponse:
    """
    The «subjects» TAB from The MENU

    ---
    PARAMETERS:
    - request: WSGIRequest -> Request to URL page
    ---
    RESULT: Response with DATA for HTML
    """

    template = "paintings.html"
    title = "Субъекты"
    tab = "subjects"

    context = {
        "title": title,
        "tab": tab
    }
    return render(request, f"pages/{ PAGE }/{ template }", context)


def objects(request: WSGIRequest) -> HttpResponse:
    """
    The «objects» TAB from The MENU

    ---
    PARAMETERS:
    - request: WSGIRequest -> Request to URL page
    ---
    RESULT: Response with DATA for HTML
    """

    template = "paintings.html"
    title = "Объекты"
    tab = "objects"

    context = {
        "title": title,
        "tab": tab
    }
    return render(request, f"pages/{ PAGE }/{ template }", context)

# ------------------------------------


# ------------ SCULPTURES -------------

def sculptures(request: WSGIRequest) -> HttpResponse:
    """
    The «sculptures» TAB from The MENU

    ---
    PARAMETERS:
    - request: WSGIRequest -> Request to URL page
    ---
    RESULT: Response with DATA for HTML
    """

    template = "sculptures.html"
    title = "Скульптуры"
    tab = "sculptures"

    context = {
        "title": title,
        "tab": tab
    }
    return render(request, f"pages/{ PAGE }/{ template }", context)

# ------------------------------------
