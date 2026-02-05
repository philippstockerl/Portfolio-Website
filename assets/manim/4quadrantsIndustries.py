from manim import *

class QuadrantText(Scene):
    def construct(self):
        # Subtle axis lines (optional)
        x_axis = Line(LEFT * 6, RIGHT * 6, stroke_width=2, color=GRAY_A)
        y_axis = Line(DOWN * 3.5, UP * 3.5, stroke_width=2, color=GRAY_A)

        # Text blocks
        t1 = Text("Optimization", font_size=42)
        t2 = Text("Data Science", font_size=42)
        t3 = Text("Supply Chain & Operations Management", font_size=32)
        t4 = Text("Decision Support & ERP", font_size=36)

        # Position in quadrants
        t1.move_to(UP * 2 + LEFT * 3)
        t2.move_to(UP * 2 + RIGHT * 3)
        t3.move_to(DOWN * 2 + LEFT * 3)
        t4.move_to(DOWN * 2 + RIGHT * 3)

        #Slight line breaks for long text (optional)
        t3 = Text("Supply Chain &\nOperations Management", font_size=32, line_spacing=0.8)

        self.add(x_axis, y_axis, t1, t2, t3, t4)
