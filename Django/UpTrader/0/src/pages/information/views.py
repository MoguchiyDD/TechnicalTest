# Developer && Owner: МогучийДД (MoguchiyDD)
# LICENSE: MIT License which is located in the text file LICENSE
#
# Goal: URL Page for INFORMATION
# Result: Ready URL Page for INFORMATION
#
# Past Modification: Adding DOCUMENTATION
# Last Modification: Editing The ALL FUNCTIONS (RESULT)
# Modification Date: 2024.03.06, 10:29 PM
#
# Create Date: 2024.03.05, 01:23 PM


from django.core.handlers.wsgi import WSGIRequest
from django.shortcuts import render
from django.http import HttpResponse


# ------------ INFORMATION ------------

def index(request: WSGIRequest) -> HttpResponse:
    """
    The «information» TAB from The MENU

    ---
    PARAMETERS:
    - request: WSGIRequest -> Request to URL page
    ---
    RESULT: Response with DATA for HTML
    """

    context = {
        "title": "Информация",
        "tab": "information"
    }
    return render(request, "pages/page.html", context)

# -------------------------------------
