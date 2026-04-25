# Developer && Owner: МогучийДД (MoguchiyDD)
# LICENSE: MIT License which is located in the text file LICENSE
#
# Goal: Create a CONTENT TEMPLATE with Ready-Made Working Filling
# Result: Providing a CONTENT TEMPLATE
#
# Past Modification: Editing The «ContentInstallationScreen» CLASS (PRE ENTER)
# Last Modification: Refactoring — BaseContentScreen, unified slider callbacks
# Modification Date: 2024.02.09, 01:07 AM
#
# Create Date: 2024.02.06, 10:05 PM


from kivy.clock import Clock
from kivy.lang import Builder
from kivy.uix.screenmanager import Screen
from kivymd.uix.slider.slider import MDSlider

from models.content.base_screen import BaseContentScreen

from time import strftime, localtime
from os import path

basedir = path.dirname(__file__)
Builder.load_file(path.join(basedir, "installation.kv"))


# ------------ CONTENT : INSTALLATION ------------

class ContentInstallationScreen(BaseContentScreen):
    """
    Content Template (INSTALLATION)

    ---
    PARAMETERS:
    - name: str -> Title The «ContentInstallationScreen» CLASS
    - basedir: str -> Directory COMPONENT of a PATHNAME
    - header: Screen -> Reference to SOFTWARE HEADER
    """

    def __init__(self, name: str, basedir: str, header: Screen) -> None:
        super(ContentInstallationScreen, self).__init__(
            name, basedir, header, "menu_installation"
        )

    def _setup_page(self) -> None:
        super()._setup_page()

        def update_date(*_):
            _input.text = strftime("%d-%m-%Y %H:%M:%S", localtime())

        _input = self.ids["content_installation_datetime_input"]
        Clock.schedule_interval(update_date, 1)

        slider_pairs = [
            (
                "content_installation_sound_slider",
                "content_installation_sound_slider_value"
            ),
            (
                "content_installation_detector_incline_slider",
                "content_installation_detector_incline_slider_value"
            ),
            (
                "content_installation_detector_impact_slider",
                "content_installation_detector_impact_slider_value"
            ),
        ]
        for slider_id, value_id in slider_pairs:
            slider = self.ids[slider_id]
            label = self.ids[value_id]
            label.text = str(int(slider.value))
            slider.bind(
                value=lambda _, v, lbl=label: self._update_slider_label(lbl, v)
            )

    def _update_slider_label(self, label, value: float) -> None:
        label.text = str(int(value))

# ------------------------------------------------
