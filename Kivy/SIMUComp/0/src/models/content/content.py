# Developer && Owner: МогучийДД (MoguchiyDD)
# LICENSE: MIT License which is located in the text file LICENSE
#
# Goal: Create a CONTENT TEMPLATE with Ready-Made Working Filling
# Result: Providing a CONTENT TEMPLATE
#
# Past Modification: Editing The «ContentScreen» CLASS (BASEDIR)
# Last Modification: Editing The «ContentScreen» CLASS (HEADER)
# Modification Date: 2024.02.09, 03:28 AM
#
# Create Date: 2024.02.07, 01:07 PM


from kivy.lang import Builder
from kivy.uix.screenmanager import ScreenManager, Screen

from models.content.installation.installation import ContentInstallationScreen
from models.content.update.update import ContentUpdateScreen
from models.content.licenses.licenses import ContentLicensesScreen
from models.content.network.network import ContentNetworkScreen
from models.content.bluetooth.bluetooth import ContentBluetoothScreen
from models.content.logout.logout import ContentLogoutScreen
from models.content.about.about import ContentAboutScreen

from models.values import StringsValues


# ------------ CONTENT ------------

class ContentScreen(Screen):
    """
    Content Template

    ---
    PARAMETERS:
    - basedir: str -> Directory COMPONENT of a PATHNAME
    - name: str -> Title The «ContentScreen» CLASS
    - sm: ScreenManager -> Reference to MANAGER for SCREENS
    - header: Screen -> Reference to SOFTWARE HEADER
    """

    def __init__(
        self, name: str, basedir: str,
        sm: ScreenManager, header: Screen
    ) -> None:
        super(ContentScreen, self).__init__()
        self.name = name
        self.header = header

        self.basedir = basedir
        self.str_val = StringsValues(self.basedir)

        self.sm = sm

        self.layout = ScreenManager()
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
        Generates a CONTENT TEMPLATE
        """

        installation = ContentInstallationScreen(
            "content_installation", self.basedir, self.header
        )
        self.btn_installation = installation.ids["content_installation_btn"]
        self.btn_installation.text = self.__str_val("menu_installation")
        self.sm.add_widget(installation)

        update = ContentUpdateScreen(
            "content_update", self.basedir, self.header
        )
        self.btn_update = update.ids["content_update_btn"]
        self.btn_update.text = self.__str_val("menu_update")
        self.sm.add_widget(update)

        licenses = ContentLicensesScreen(
            "content_licenses", self.basedir, self.header
        )
        self.btn_licenses = licenses.ids["content_licenses_btn"]
        self.btn_licenses.text = self.__str_val("menu_licenses")
        self.sm.add_widget(licenses)

        network = ContentNetworkScreen(
            "content_network", self.basedir, self.header
        )
        self.btn_network = network.ids["content_network_btn"]
        self.btn_network.text = self.__str_val("menu_network")
        self.sm.add_widget(network)

        bluetooth = ContentBluetoothScreen(
            "content_bluetooth", self.basedir, self.header
        )
        self.btn_bluetooth = bluetooth.ids["content_bluetooth_btn"]
        self.btn_bluetooth.text = self.__str_val("menu_bluetooth")
        self.sm.add_widget(bluetooth)

        logout = ContentLogoutScreen(
            "content_logout", self.basedir, self.header
        )
        self.btn_logout = logout.ids["content_logout_btn"]
        self.btn_logout.text = self.__str_val("menu_logout")
        self.sm.add_widget(logout)

        about = ContentAboutScreen("content_about", self.basedir, self.header)
        self.btn_about = about.ids["content_about_btn"]
        self.btn_about.text = self.__str_val("menu_about")
        self.sm.add_widget(about)

# ---------------------------------
