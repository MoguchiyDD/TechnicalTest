# Developer && Owner: МогучийДД (MoguchiyDD)
# LICENSE: MIT License which is located in the text file LICENSE
#
# Goal: Parse XML Files
# Result: Returning The RESULT through an ATTRIBUTE with The NAME
#
# Past Modification: Correction of CODE from LOGICAL ERRORS
# Last Modification: Editing The «StringsValues» CLASS (DOCS)
# Modification Date: 2024.02.07, 12:43 PM
#
# Create Date: 2024.02.07, 12:39 PM


from xml.etree.ElementTree import parse
from os import path


# ------------ STRINGS ------------

class StringsValues:
    """
    Responsible for Taking STRINGS from The «src/values/strings.xml» FILE

    ---
    PARAMETERS:
    - basedir: str -> Directory COMPONENT of a PATHNAME
    ---
    FUNCTIONS:
    - string_values(attribute_name: str) -> str : From The FILE
    "src/values/string.sml" it produces The RESULT through The ATTRIBUTE "name"
    """

    def __init__(self, basedir: str) -> None:
        try:
            self.xml = parse(path.join(basedir, "values", "strings.xml"))
        except FileNotFoundError:
            self.xml = None
        except TypeError:
            self.xml = None

    def string_values(self, attribute_name: str) -> str:
        """
        From The FILE "src/values/string.sml" it produces The RESULT through
        The ATTRIBUTE "name"
        ---
        PARAMETERS:
        - attribute_name: str -> ATTRIBUTE with The NAME
        ---
        RESULT: "" || "..."
        """

        result = ""

        if self.xml is not None:
            resources = self.xml.getroot()
            for strings in resources:
                string = strings.find("[@name=\"" + attribute_name + "\"]")
                if string is not None:
                    text = string.text
                    if isinstance(text, str) is True:
                        result = text
                        break

        return result

# ---------------------------------
