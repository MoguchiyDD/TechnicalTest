# Developer && Owner: МогучийДД (MoguchiyDD)
# LICENSE: MIT License which is located in the text file LICENSE
#
# Goal: Launch Working SOFTWARE
# Result: Opens The Finished SOFTWARE in The ACTIVE WINDOW
#
# Past Modification: Editing The «MainWindow» CLASS (SIZE)
# Last Modification: Refactoring — removed __str_val wrapper
# Modification Date: 2024.02.09, 02:39 AM
#
# Create Date: 2024.02.04, 01:34 PM


from kivymd.app import MDApp
from kivy.config import Config
from kivy.core.window import Window
from kivy.uix.screenmanager import ScreenManager
from kivy.uix.boxlayout import BoxLayout
from kivy.utils import get_color_from_hex

from models.header.header import HeaderScreen
from models.content.content import ContentScreen

from models.values import StringsValues

from os import path

colors = {
    "Gray": {
        "200": "#424242",
        "500": "#424242",
        "700": "#424242"
    },
    "Dark": {
        "StatusBar": "E0E0E0",  # Light
        "AppBar": "#202020",  # Dark
        "Background": "#424242",  # Dark Gray
        "CardsDialogs": "#FFFFFF",  # White
        "FlatButtonDown": "#CCCCCC"  # Dark Light
    }
}


# ------------ SOFTWARE ------------

class MainWindow(MDApp):
    """
    The MAIN CLASS that Runs The All SOFTWARE
    """

    def build(self):
        self.theme_cls.theme_style = "Dark"
        self.theme_cls.colors = colors
        self.theme_cls.primary_palette = "Gray"

        self.basedir = path.dirname(__file__)
        self.str_val = StringsValues(self.basedir)

        self.active_win = self.str_val.string_values("menu_installation")

        self.__window()

        layout = BoxLayout(
            orientation="vertical",
            padding=[5, 5, 5, 5]
        )

        return self.__content(layout)

    def __window(self) -> None:
        self.title = self.str_val.string_values("app_title")
        Config.set("graphics", "resizable", "0")

        Window.clearcolor = get_color_from_hex("#424242")
        Window.size = (960, 568)
        Window.left = int(Window.center[0] / 2)
        Window.top = int(Window.center[1] / 2)

    def __content(self, layout: BoxLayout) -> BoxLayout:
        sm = ScreenManager()

        header = HeaderScreen("header", self.basedir, self.active_win)
        ContentScreen("content", self.basedir, sm, header)

        layout.add_widget(header)
        layout.add_widget(sm)

        return layout

# ----------------------------------


if __name__ == "__main__":
    MainWindow().run()
