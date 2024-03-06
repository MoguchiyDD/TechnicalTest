# Developer && Owner: МогучийДД (MoguchiyDD)
# LICENSE: MIT License which is located in the text file LICENSE
#
# Goal: URL Page for HOME
# Result: Ready URL Page for HOME
#
# Past Modification: Adding DOCUMENTATION
# Last Modification: Editing The ALL FUNCTIONS (RESULT)
# Modification Date: 2024.03.06, 10:29 PM
#
# Create Date: 2024.03.05, 12:38 PM


from django.core.handlers.wsgi import WSGIRequest
from django.shortcuts import render
from django.http import HttpResponse


PAGE = "home"


# ------------ HOME ------------

def index(request: WSGIRequest) -> HttpResponse:
    """
    The «home» TAB from The MENU

    ---
    PARAMETERS:
    - request: WSGIRequest -> Request to URL page
    ---
    RESULT: Response with DATA for HTML
    """

    template = "index.html"
    title = "Дом"
    tab = "home"

    context = {
        "title": title,
        "tab": tab
    }
    return render(request, f"pages/{ PAGE }/{ template }", context)

# ------------------------------
