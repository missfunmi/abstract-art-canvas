// Original inspiration: https://editor.p5js.org/kwertyops/sketches/V7RIjyVpd

import p5 from "p5";

export function createSketch(size: number) {
  let brush = { fromX: 0, fromY: 0, toX: 0, toY: 0 };
  let seed: number;
  let colors = [];
  return function sketch(p5: p5) {
    p5.setup = function () {
      let canvasSize = size;
      colors = [
        p5.color("#70704A"),
        p5.color("#736A61"),
        p5.color("#F5C66E"),
        p5.color("#F2E5C2"),
        p5.color("#D75A22"),
        p5.color("#EB3D00"),
      ];

      p5.createCanvas(canvasSize, canvasSize);

      let backgroundColor = colors[p5.floor(p5.random(colors.length))];
      p5.background(backgroundColor);

      seed = p5.random(1000);
    };

    p5.draw = function () {
      brush.fromX += (p5.mouseX - brush.fromX)/12;
      brush.fromY += (p5.mouseY - brush.fromY)/12;
      if (p5.frameCount > 40) {
        drizzle();
      }
      brush.toX = brush.fromX;
      brush.toY = brush.fromY;
    };

    p5.mouseMoved = function () {
      if (p5.frameCount % 7 == 0) {
        splatter(p5.mouseX, p5.mouseY);
        stipple(p5.mouseX, p5.mouseY);
      }
    };

    const splatter = function (x, y) {
      x += p5.random(-15, 15);
      y += p5.random(-15, 15);

      let mx = 10 * p5.movedX;
      let my = 10 * p5.movedY;

      let color: p5.Color = colors[p5.floor(p5.random(colors.length))];

      for (let i = 0; i < 80; i++) {
        seed += 0.01;

        let splatterX = x + mx * (0.5 - p5.noise(seed + i));
        let splatterY = y + my * (0.5 - p5.noise(seed + 2 * i));
        let splatterSize = 150 / p5.dist(x, y, splatterX, splatterY);
        if (splatterSize > 20) {
          splatterSize = 20;
        }

        let alpha = 255 - splatterSize * 5;
        color.setAlpha(alpha);

        p5.noStroke();
        p5.fill(color);
        p5.ellipse(splatterX, splatterY, splatterSize);

        seed += 0.01;
      }
    };

    const stipple = function (x, y) {
      p5.noStroke();
      p5.fill(0);
      p5.ellipse(
        x + p5.random(-30, 30),
        y + p5.random(-30, 30),
        p5.random(3, 12)
      );
      p5.ellipse(
        x + p5.random(-30, 30),
        y + p5.random(-30, 30),
        p5.random(3, 12)
      );
    };

    const drizzle = function() {
      let strokeWeight = 1 + 30/p5.dist(brush.toX, brush.toY, brush.fromX, brush.fromY);
      strokeWeight = p5.min(15, strokeWeight);
      p5.strokeWeight(strokeWeight);
      p5.stroke(0);
      p5.line(brush.toX, brush.toY, brush.fromX, brush.fromY);
    };
  };
}
