# Developer && Owner: МогучийДД (MoguchiyDD)
# LICENSE: MIT License which is located in the text file LICENSE
#
# Goal: Base Class for All CONTENT SCREENS
# Result: Providing a Shared CONTENT SCREEN TEMPLATE
#
# Create Date: 2024.02.09


from kivy.uix.screenmanager import Screen

from models.values import StringsValues


# ------------ CONTENT : BASE ------------

class BaseContentScreen(Screen):
    """
    Base Class for All Content Screens

    ---
    PARAMETERS:
    - name: str -> Screen name (also used to derive the activate_title widget id)
    - basedir: str -> Directory COMPONENT of a PATHNAME
    - header: Screen -> Reference to SOFTWARE HEADER
    - menu_key: str -> Key into strings.xml for this screen's menu label
    """

    def __init__(
        self, name: str, basedir: str, header: Screen, menu_key: str
    ) -> None:
        super(BaseContentScreen, self).__init__()
        self.name = name
        self.header = header
        self.str_val = StringsValues(basedir)
        self.activate = self.str_val.string_values(menu_key)
        self._setup_page()

    def _str_val(self, key: str) -> str:
        return self.str_val.string_values(key)

    def _setup_page(self) -> None:
        self.ids[self.name + "_activate_title"].text = self.activate

    def on_pre_enter(self) -> None:
        prefix = self._str_val("header_title")
        self.header.title.text = prefix + " " + self.activate

# ----------------------------------------
