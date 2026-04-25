# Developer && Owner: МогучийДД (MoguchiyDD)
# LICENSE: MIT License which is located in the text file LICENSE
#
# Goal: Create a CONTENT TEMPLATE with Ready-Made Working Filling
# Result: Providing a CONTENT TEMPLATE
#
# Past Modification: Editing The «ContentLicensesScreen» CLASS (PRE ENTER)
# Last Modification: Refactoring — BaseContentScreen
# Modification Date: 2024.02.09, 01:07 AM
#
# Create Date: 2024.02.06, 10:12 PM


from kivy.lang import Builder
from kivy.uix.screenmanager import Screen

from models.content.base_screen import BaseContentScreen

from os import path

basedir = path.dirname(__file__)
Builder.load_file(path.join(basedir, "licenses.kv"))


# ------------ CONTENT : LICENSES ------------

class ContentLicensesScreen(BaseContentScreen):
    """
    Content Template (LICENSES)

    ---
    PARAMETERS:
    - name: str -> Title The «ContentLicensesScreen» CLASS
    - basedir: str -> Directory COMPONENT of a PATHNAME
    - header: Screen -> Reference to SOFTWARE HEADER
    """

    def __init__(self, name: str, basedir: str, header: Screen) -> None:
        super(ContentLicensesScreen, self).__init__(
            name, basedir, header, "menu_licenses"
        )

# --------------------------------------------
