# Developer && Owner: МогучийДД (MoguchiyDD)
# LICENSE: MIT License which is located in the text file LICENSE
#
# Goal: URL Page for CREATIVITY
# Result: Ready URL Page for CREATIVITY
#
# Past Modification: Editing The ALL FUNCTIONS (RESULT)
# Last Modification: Adding DOCUMENTATION
# Modification Date: 2024.03.06, 05:51 PM
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
    tab = "Творчество"

    context = {
        "title": tab
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
    tab = "Живописи"

    context = {
        "title": tab
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
    tab = "Скульптуры"

    context = {
        "title": tab
    }
    return render(request, f"pages/{ PAGE }/{ template }", context)

# ------------------------------------
