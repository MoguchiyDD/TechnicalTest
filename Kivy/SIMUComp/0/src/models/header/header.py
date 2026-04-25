# Developer && Owner: МогучийДД (MoguchiyDD)
# LICENSE: MIT License which is located in the text file LICENSE
#
# Goal: Create a HEADER TEMPLATE with Ready-Made Working Filling
# Result: Providing a HEADER TEMPLATE
#
# Past Modification: Editing The «HeaderScreen» CLASS (IMG)
# Last Modification: Refactoring — removed __str_val wrapper
# Modification Date: 2024.02.09, 02:54 AM
#
# Create Date: 2024.02.04, 03:25 PM


from kivy.clock import Clock
from kivy.lang import Builder
from kivy.uix.screenmanager import Screen

from models.values import StringsValues
from .rectangle_progress_bar import RectangleProgressBar

from time import strftime, localtime
from os import path

Builder.load_file(path.join(path.dirname(__file__), "header.kv"))


# ------------ HEADER ------------

class HeaderScreen(Screen):
    """
    Header Template

    ---
    PARAMETERS:
    - name: str -> Title The «HeaderScreen» CLASS
    - basedir: str -> Directory COMPONENT of a PATHNAME
    - active: str -> Active WINDOW
    """

    def __init__(self, name: str, basedir: str, active: str) -> None:
        super(HeaderScreen, self).__init__()
        self.name = name
        self.active = active

        self.basedir = basedir
        self.str_val = StringsValues(self.basedir)

        self.__page()

    def __page(self) -> None:
        """
        Generates a HEADER TEMPLATE
        """

        def update_date(*_):
            self.date.text = strftime("%d-%m-%Y %H:%M:%S", localtime())

        def animate_progress(*_):
            if progress.value < 100:
                progress.set_value(progress.value + 1)
            else:
                progress.set_value(0)

        self.title = self.ids["header_title"]
        self.title.text = (
            self.str_val.string_values("header_title") + " " + self.active
        )

        progress = self.ids["header_progress"]
        Clock.schedule_interval(animate_progress, 0.3)

        self.date = self.ids["header_datetime"]
        Clock.schedule_interval(update_date, 1)

        image = self.ids["header_logo"]
        image.source = path.join(path.dirname(__file__), "logo.png")

# --------------------------------
