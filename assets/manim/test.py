# manim_formulation.py
from manim import *

class Formulation(Scene):
    def construct(self):
        self.camera.background_color = WHITE

        eq_lines = [
            r"\min_{x\in\mathcal{U}} \max_{c\in\mathcal{U}} \sum_{i\in[n]} c_i x_i",
            r"= \min \sum_{i\in[n]} c_i x_i + \Gamma \pi + \sum_{i\in[n]} \rho_i",
            r"\text{s.t. } \pi + \rho_i \ge d_i x_i \quad \forall i\in[n]",
            r"x \in \mathcal{X}",
            r"\pi \ge 0",
            r"\rho_i \ge 0 \quad \forall i\in[n]"
        ]
        nums = ["(4.8)", "(4.9)", "(4.10)", "(4.11)", "(4.12)", "(4.13)"]

        eq_col = VGroup(*[MathTex(s) for s in eq_lines]).arrange(
            DOWN, aligned_edge=LEFT, buff=0.35
        )
        num_col = VGroup(*[Tex(n) for n in nums]).arrange(
            DOWN, aligned_edge=RIGHT, buff=0.35
        )

        num_col.next_to(eq_col, RIGHT, buff=1.2)
        num_col.align_to(eq_col, UP)

        block = VGroup(eq_col, num_col).scale(0.9)
        block.to_edge(LEFT, buff=0.8)

        for eq, num in zip(eq_col, num_col):
            self.play(Write(eq), FadeIn(num, shift=RIGHT * 0.2), run_time=0.6)
        self.wait(1)
