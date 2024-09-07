# Developer && Owner: МогучийДД (MoguchiyDD)
# LICENSE: MIT License which is located in the text file LICENSE
#
# Goal: Redesigning The «ProgressBar» CLASS
# Result: The New «ProgressBar» CLASSES
#
# Past Modification: Editing The «RectangleProgressBar» CLASS (COLOR)
# Last Modification: Editing The «RectangleProgressBar» CLASS (POSITION)
# Modification Date: 2024.02.09, 02:37 AM
#
# Create Date: 2024.02.06, 01:06 AM


from kivy.core.text import Label as CoreLabel
from kivy.graphics import Color, RoundedRectangle, Rectangle
from kivy.uix.progressbar import ProgressBar


# ------------ Progress Bar ------------

class RectangleProgressBar(ProgressBar):
    """
    Redesigning The «ProgressBar» CLASS

    ---
    FUNCTIONS:
    - draw() -> None : Draws 1 PROGRESS BAR
    - refresh_text() -> None : Rendering TEXT
    - set_value(value: int) -> None : Sets a NEW VALUE (Udates
    The TEXT and Redraws The PROGRESS BAR)
    """

    def __init__(self, **kwargs):
        super(RectangleProgressBar, self).__init__(**kwargs)
        self.thickness = 17

        self.label = CoreLabel(text="0%", font_size=self.thickness)
        self.label.bold = True

        self.texture_size = None
        self.refresh_text()

        self.draw()

    def draw(self) -> None:
        """
        Draws 1 PROGRESS BAR
        """

        with self.canvas:
            self.canvas.clear()

            value = self.value_normalized
            _pos = (380, -2)
            _size = (200, 25)
            _radius = [(3, 3), (3, 3), (3, 3), (3, 3)]

            # % : POS X
            _pos_x_per_0 = (_size[0] - 8) / 2
            _pos_x_per_1 = _pos_x_per_0 - (self.texture_size[0] / 2)
            __pos_x_per = _pos_x_per_1 + (_pos[0] + 4)

            # % : POS Y
            _pos_y_per_0 = (_size[1] - 8) / 2
            _pos_y_per_1 = _pos_y_per_0 - (self.texture_size[1] / 2)
            __pos_y_per = _pos_y_per_1 + (_pos[1] + 4)

            # Border
            Color(0.129, 0.129, 0.129, 1)  # 212121
            RoundedRectangle(pos=_pos, size=_size, radius=_radius)

            # Empty
            Color(0.980, 0.980, 0.980, 0.980)  # FAFAFA
            RoundedRectangle(
                pos=(_pos[0] + 2, _pos[1] + 2),
                size=(_size[0] - 4, _size[1] - 4),
                radius=_radius
            )

            # Progress
            Color(0.129, 0.588, 0.952, 1)  # 2196f3
            RoundedRectangle(
                pos=((_pos[0] + 4), (_pos[1] + 4)),
                size=(
                    (0.001 if value == 0 else value * (_size[0] - 8)),
                    (_size[1] - 8)
                ),
                radius=_radius
            )

            # %
            Color(0.129, 0.129, 0.129, 1)  # 212121
            Rectangle(
                texture=self.label.texture,
                pos=(__pos_x_per, __pos_y_per),
                size=self.texture_size
            )

    def refresh_text(self) -> None:
        """
        Rendering TEXT
        """

        self.label.refresh()
        self.texture_size = list(self.label.texture.size)

    def set_value(self, value: int) -> None:
        """
        Sets a NEW VALUE (Udates The TEXT and Redraws The PROGRESS BAR)

        ---
        PARAMETERS:
        - value: int -> VALUE for TEXT (%)
        """

        self.value = value
        self.label.text = str(int(self.value_normalized * 100)) + "%"
        self.refresh_text()
        self.draw()

# --------------------------------------
