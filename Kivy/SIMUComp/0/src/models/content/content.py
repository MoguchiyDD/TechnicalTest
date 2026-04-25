# Developer && Owner: МогучийДД (MoguchiyDD)
# LICENSE: MIT License which is located in the text file LICENSE
#
# Goal: Create a CONTENT TEMPLATE with Ready-Made Working Filling
# Result: Providing a CONTENT TEMPLATE
#
# Past Modification: Editing The «ContentScreen» CLASS (HEADER)
# Last Modification: Refactoring — data-driven loop for sub-screens
# Modification Date: 2024.02.09, 06:20 PM
#
# Create Date: 2024.02.07, 01:07 PM


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
    - name: str -> Title The «ContentScreen» CLASS
    - basedir: str -> Directory COMPONENT of a PATHNAME
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
        self._page()

    def _page(self) -> None:
        screen_configs = [
            (ContentInstallationScreen, "content_installation", "menu_installation"),
            (ContentUpdateScreen,       "content_update",       "menu_update"),
            (ContentLicensesScreen,     "content_licenses",     "menu_licenses"),
            (ContentNetworkScreen,      "content_network",      "menu_network"),
            (ContentBluetoothScreen,    "content_bluetooth",    "menu_bluetooth"),
            (ContentLogoutScreen,       "content_logout",       "menu_logout"),
            (ContentAboutScreen,        "content_about",        "menu_about"),
        ]
        for ScreenClass, screen_name, menu_key in screen_configs:
            screen = ScreenClass(screen_name, self.basedir, self.header)
            btn = screen.ids[screen_name + "_btn"]
            btn.text = self.str_val.string_values(menu_key)
            self.sm.add_widget(screen)

# ---------------------------------
