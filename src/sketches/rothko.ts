import p5 from "p5";
import * as brush from "p5.brush";

export function createSketch(size: number) {
  return function sketch(p5: p5) {
    p5.setup = function () {
      p5.createCanvas(size, size);
      p5.background(p5.color("#fff"));
    };

    p5.mousePressed = function () {
      return false;
    };

    p5.mouseReleased = function () {
      return false;
    };

    p5.mouseDragged = function () {
      let currX = p5.mouseX;
      let currY = p5.mouseY;
      return false;
    };
  }
}
