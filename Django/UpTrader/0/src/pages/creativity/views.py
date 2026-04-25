# Developer && Owner: МогучийДД (MoguchiyDD)
# LICENSE: MIT License which is located in the text file LICENSE
#
# Goal: URL Page for CREATIVITY
# Result: Ready URL Page for CREATIVITY
#
# Past Modification: Editing The ALL FUNCTIONS (RESULT)
# Last Modification: Editing The «subjects» FUNCTION (TITLE)
# Modification Date: 2024.03.07, 12:04 PM
#
# Create Date: 2024.03.05, 01:23 PM


from django.core.handlers.wsgi import WSGIRequest
from django.shortcuts import render
from django.http import HttpResponse


_TITLES = {
    "creativity": "Творчество",
    "paintings":  "Живописи",
    "subjects":   "Субъекты",
    "objects":    "Объекты",
    "sculptures": "Скульптуры",
}


def _page(request: WSGIRequest, tab: str) -> HttpResponse:
    return render(request, "pages/page.html", {"title": _TITLES[tab], "tab": tab})


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
    return _page(request, "creativity")

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
    return _page(request, "paintings")


def subjects(request: WSGIRequest) -> HttpResponse:
    """
    The «subjects» TAB from The MENU

    ---
    PARAMETERS:
    - request: WSGIRequest -> Request to URL page
    ---
    RESULT: Response with DATA for HTML
    """
    return _page(request, "subjects")


def objects(request: WSGIRequest) -> HttpResponse:
    """
    The «objects» TAB from The MENU

    ---
    PARAMETERS:
    - request: WSGIRequest -> Request to URL page
    ---
    RESULT: Response with DATA for HTML
    """
    return _page(request, "objects")

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
    return _page(request, "sculptures")

# ------------------------------------
