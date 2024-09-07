# Developer && Owner: МогучийДД (MoguchiyDD)
# LICENSE: MIT License which is located in the text file LICENSE
#
# Goal: Create a CONTENT TEMPLATE with Ready-Made Working Filling
# Result: Providing a CONTENT TEMPLATE
#
# Past Modification: Editing The «ContentAboutScreen» CLASS (BASEDIR)
# Last Modification: Editing The «ContentAboutScreen» CLASS (PRE ENTER)
# Modification Date: 2024.02.09, 01:05 AM
#
# Create Date: 2024.02.06, 10:18 PM


from kivy.lang import Builder
from kivy.uix.screenmanager import Screen

from models.values import StringsValues

from os import path

basedir = path.dirname(__file__)
Builder.load_file(path.join(basedir + "/about.kv"))


# ------------ CONTENT : About ------------

class ContentAboutScreen(Screen):
    """
    Content Template (ABOUT)

    ---
    PARAMETERS:
    - name: str -> Title The «ContentAboutScreen» CLASS
    - basedir: str -> Directory COMPONENT of a PATHNAME
    - header: Screen -> Reference to SOFTWARE HEADER
    """

    def __init__(self, name: str, basedir: str, header: Screen) -> None:
        super(ContentAboutScreen, self).__init__()
        self.name = name
        self.header = header

        self.str_val = StringsValues(basedir)
        self.activate = self.__str_val("menu_about")

        self.__page()

    def __str_val(self, name: str) -> str:
        """
        From The FILE "src/values/string.sml" it produces The RESULT through
        The ATTRIBUTE "name"
        ---
        PARAMETERS:
        - name: str -> ATTRIBUTE with The NAME
        """

        xml = self.str_val.string_values(name)
        return xml

    def __page(self) -> None:
        """
        Generates a CONTENT TEMPLATE : ABOUT
        """

        activate = self.ids["content_about_activate_title"]
        activate.text = self.__str_val("menu_about")

    def on_pre_enter(self) -> None:
        """
        After ACTIVATING The Change of TAB in The MENU,
        this CLASS is ACTIVATED Before Starting
        """

        activate = self.__str_val("header_title") + " " + self.activate
        self.header.title.text = activate

# -----------------------------------------
