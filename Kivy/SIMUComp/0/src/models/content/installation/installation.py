# Developer && Owner: МогучийДД (MoguchiyDD)
# LICENSE: MIT License which is located in the text file LICENSE
#
# Goal: Create a CONTENT TEMPLATE with Ready-Made Working Filling
# Result: Providing a CONTENT TEMPLATE
#
# Past Modification: Editing The «ContentInstallationScreen» CLASS (SLIDER)
# Last Modification: Editing The «ContentInstallationScreen» CLASS (PRE ENTER)
# Modification Date: 2024.02.09, 01:07 AM
#
# Create Date: 2024.02.06, 10:05 PM


from kivy.clock import Clock
from kivy.lang import Builder
from kivy.uix.screenmanager import Screen
from kivymd.uix.slider.slider import MDSlider

from models.values import StringsValues

from time import strftime, localtime
from os import path

basedir = path.dirname(__file__)
Builder.load_file(path.join(basedir + "/installation.kv"))


# ------------ CONTENT : INSTALLATION ------------

class ContentInstallationScreen(Screen):
    """
    Content Template (INSTALLATION)

    ---
    PARAMETERS:
    - name: str -> Title The «ContentInstallationScreen» CLASS
    - basedir: str -> Directory COMPONENT of a PATHNAME
    - header: Screen -> Reference to SOFTWARE HEADER
    """

    def __init__(self, name: str, basedir: str, header: Screen) -> None:
        super(ContentInstallationScreen, self).__init__()
        self.name = name
        self.header = header

        self.str_val = StringsValues(basedir)
        self.activate = self.__str_val("menu_installation")

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
        Generates a CONTENT TEMPLATE : INSTALLATION
        """

        def update_date(*_):
            """
            Updates The DATE with TIME
            """

            _input.text = strftime("%d-%m-%Y %H:%M:%S", localtime())

        # TITLE
        activate = self.ids["content_installation_activate_title"]
        activate.text = self.__str_val("menu_installation")

        # DateTime
        _input = self.ids["content_installation_datetime_input"]
        Clock.schedule_interval(update_date, 1)

        # SOUND
        sound_slider = self.ids["content_installation_sound_slider"]
        sound_slider.bind(value=self.get_from_sound_slider_value)
        self.sound_slider_value = self.ids[
            "content_installation_sound_slider_value"
        ]
        self.sound_slider_value.text = str(int(sound_slider.value))

        # DETECTOR : INCLINE
        detector_incline_slider = self.ids[
            "content_installation_detector_incline_slider"
        ]
        detector_incline_slider.bind(
            value=self.get_from_detector_incline_slider_value
        )
        self.detector_incline_slider_value = self.ids[
            "content_installation_detector_incline_slider_value"
        ]
        self.detector_incline_slider_value.text = str(
            int(detector_incline_slider.value)
        )

        # DETECTOR : IMPACT
        detector_impact_slider = self.ids[
            "content_installation_detector_impact_slider"
        ]
        detector_impact_slider.bind(
            value=self.get_from_detector_impact_slider_value
        )
        self.detector_impact_slider_value = self.ids[
            "content_installation_detector_impact_slider_value"
        ]
        self.detector_impact_slider_value.text = str(
            int(detector_impact_slider.value)
        )

    def on_pre_enter(self) -> None:
        """
        After ACTIVATING The Change of TAB in The MENU,
        this CLASS is ACTIVATED Before Starting
        """

        activate = self.__str_val("header_title") + " " + self.activate
        self.header.title.text = activate

    def get_from_sound_slider_value(
        self, slider: MDSlider, value: float
    ) -> None:
        """
        Displays The Selected VALUE from SLIDER in The INTERFACE for SOUND

        ---
        PARAMETERS:
        - slider: MDSlider -> Reference to «MDSlider»
        - value: float -> Value from «slider»
        """

        self.sound_slider_value.text = str(int(value))

    def get_from_detector_incline_slider_value(
        self, slider: MDSlider, value: float
    ) -> None:
        """
        Displays The Selected VALUE from SLIDER in The INTERFACE for
        DETECTOR INCLINE
        ---
        PARAMETERS:
        - slider: MDSlider -> Reference to «MDSlider»
        - value: float -> Value from «slider»
        """

        self.detector_incline_slider_value.text = str(int(value))

    def get_from_detector_impact_slider_value(
        self, slider: MDSlider, value: float
    ) -> None:
        """
        Displays The Selected VALUE from SLIDER in The INTERFACE for
        DETECTOR IMPACT
        ---
        PARAMETERS:
        - slider: MDSlider -> Reference to «MDSlider»
        - value: float -> Value from «slider»
        """

        self.detector_impact_slider_value.text = str(int(value))


# ------------------------------------------------
