import p5 from "p5";

export function createSketch(size: number) {
  type Rect = {
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;
    dilution: number;
  };
  let coloredRects: Rect[] = [];
  const jitter = 10;

  return function sketch(p5: p5) {
    p5.setup = () => {
      p5.createCanvas(size, size);
      p5.background(p5.color("#ED874C"));
      coloredRects = initRects();
    };

    p5.mouseDragged = () => {
      let startPoint = { x: p5.pmouseX, y: p5.pmouseY };
      let endPoint = { x: p5.mouseX, y: p5.mouseY };

      coloredRects.forEach((coloredRect) => {
        if (
          pointInRect(endPoint, coloredRect) &&
          pointInRect(startPoint, coloredRect)
        ) {
          for (let i = 0; i < p5.frameRate(); i++) {
            let { red, green, blue, alpha } = diluteColor(coloredRect);
            let { startX, startY, endX, endY } = jitterStroke();

            p5.strokeWeight(p5.random(2, 30));
            p5.stroke(red, green, blue, alpha);
            p5.line(startX, startY, endX, endY);
          }
        }
      });
      return false;
    };

    const jitterStroke = function (): {
      startX: number;
      startY: number;
      endX: number;
      endY: number;
    } {
      let startX = p5.pmouseX + p5.random(-jitter, jitter);
      let startY = p5.pmouseY + p5.random(-jitter, jitter);
      let endX = p5.mouseX + p5.random(-jitter, jitter);
      let endY = p5.mouseY + p5.random(-jitter, jitter);
      return { startX, startY, endX, endY };
    };

    const diluteColor = function (coloredRect: Rect): {
      red: number;
      green: number;
      blue: number;
      alpha: number;
    } {
      let baseColor = p5.color(coloredRect.color);
      let dilutionAmount = coloredRect.dilution;
      let red = p5.red(baseColor) + (255 - p5.red(baseColor)) * dilutionAmount;
      let green =
        p5.green(baseColor) + (255 - p5.green(baseColor)) * dilutionAmount;
      let blue =
        p5.blue(baseColor) + (255 - p5.blue(baseColor)) * dilutionAmount;

      let alpha = p5.random(100, 180);
      return { red, green, blue, alpha };
    };

    const pointInRect = function (point, rect): boolean {
      return (
        point.x >= rect.x &&
        point.x <= rect.x + rect.width &&
        point.y >= rect.y &&
        point.y <= rect.y + rect.height
      );
    };

    const initRects = function (): any[] {
      let yellowRect: Rect = {
        x: 40,
        y: 0,
        width: size - 2 * 40,
        height: (3 / 8) * size,
        color: "#F8C035",
        dilution: 0.15,
      };
      let redRect: Rect = {
        x: 40,
        y: 0.5 * size,
        width: size - 2 * 40,
        height: 0.55 * size,
        color: "#ED622B",
        dilution: 0.05,
      };

      return [yellowRect, redRect];
    };
  };
}
