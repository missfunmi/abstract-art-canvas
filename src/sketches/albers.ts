// Source image: https://www.incollect.com/listings/fine-art/prints/josef-albers-original-homage-to-the-square-serigraphs-by-josef-albers-417718

import p5 from "p5";
import { CANVAS_SIZE_MOBILE } from "../constants";

/**
 *  ----------------------------
 * | base square (canvas)       |
 * |   ----------------------   |
 * |  | square 3             |  |
 * |  |   ----------------   |  |
 * |  |  | square 2       |  |  |
 * |  |  |   ----------   |  |  |
 * |  |  |  | square 1 |  |  |  |
 * |  |  |   ----------   |  |  |
 * |  |   ----------------   |  |
 * |   ----------------------   |
 *  ----------------------------
 */
export function createSketch(size: number) {
  let canvasSize = size;
  let gridSize = 10;
  let yOffset = size === CANVAS_SIZE_MOBILE ? 35 : 60;

  type Square = {
    startX: number;
    startY: number;
    size: number;
    color: any;
    isDrawn: boolean;
  };

  let allColorSets = [];
  let activeColorSet: Square[] = [];
  let activeSquare;

  type Point = {
    x: number;
    y: number;
  };
  let dragPath: Point[] = [];

  return function sketch(p5: p5) {
    p5.setup = function () {
      p5.createCanvas(canvasSize, canvasSize);
      allColorSets = initColorSets();
      activeColorSet = p5.random(allColorSets);
      p5.background(activeColorSet[0].color);
    };

    p5.mousePressed = function () {
      activeSquare = activeColorSet.find((square) => !square.isDrawn);
      if (!activeSquare) {
        switchColorPalettes();
      } else {
        dragPath.push({
          x: p5.mouseX,
          y: p5.mouseY,
        });
      }
      return false;
    };

    p5.mouseReleased = function () {
      dragPath.push({
        x: p5.mouseX,
        y: p5.mouseY,
      });

      let minX = Math.min(...dragPath.map((p) => p.x));
      let maxX = Math.max(...dragPath.map((p) => p.x));
      let minY = Math.min(...dragPath.map((p) => p.y));
      let maxY = Math.max(...dragPath.map((p) => p.y));

      let width = maxX - minX;
      let height = maxY - minY;
      let aspectRatio = width / height;

      if (aspectRatio > 0.8 && aspectRatio < 1.25) {
        let corners = 0;

        let angleThreshold = 30;
        let distanceThreshold = 10;
        let turningPoints = [dragPath[0]];

        for (let i = 1; i < dragPath.length - 1; i++) {
          let a = turningPoints[turningPoints.length - 1];
          let b = dragPath[i];
          let c = dragPath[i + 1];

          // Skip if too close to last accepted turning point or to next point
          if (p5.dist(a.x, a.y, b.x, b.y) < distanceThreshold) continue;
          if (p5.dist(b.x, b.y, c.x, c.y) < distanceThreshold) continue;

          let v1 = p5.createVector(b.x - a.x, b.y - a.y);
          let v2 = p5.createVector(c.x - b.x, c.y - b.y);

          let angle = p5.degrees(v1.angleBetween(v2));

          if (p5.abs(angle) > angleThreshold) {
            turningPoints.push(b);
          }
        }

        turningPoints.push(dragPath[dragPath.length - 1]); // include the final point
        corners = turningPoints.length - 2; // subtract start and end points

        if (corners >= 3 && corners <= 5) {
          console.log("✅ congratulations, you drew a square lol");

          // redraw everything that was drawn already to replace the line the user drew
          for (const key in activeColorSet) {
            let square = activeColorSet[key];
            if (square.isDrawn) {
              p5.noStroke();
              p5.fill(square.color);
              p5.rect(square.startX, square.startY, square.size);
            }
          }

          // then draw the next square on top of it on the canvas
          p5.noStroke();
          p5.fill(activeSquare.color);
          p5.rect(activeSquare.startX, activeSquare.startY, activeSquare.size);

          activeSquare.isDrawn = true;
        } else {
          console.log("❌ that was not a square, # of corners:", corners);

          // redraw everything that was drawn already to replace the line the user drew
          for (const key in activeColorSet) {
            let square = activeColorSet[key];
            if (square.isDrawn) {
              p5.noStroke();
              p5.fill(square.color);
              p5.rect(square.startX, square.startY, square.size);
            }
          }
        }
      } else {
        // redraw everything that was drawn already to replace the line the user drew
        for (const key in activeColorSet) {
          let square = activeColorSet[key];
          if (square.isDrawn) {
            p5.noStroke();
            p5.fill(square.color);
            p5.rect(square.startX, square.startY, square.size);
          }
        }
      }

      // reset drag path for next draw attempt
      dragPath = [];

      return false;
    };

    p5.mouseDragged = function () {
      if (activeSquare) p5.stroke(activeSquare.color);
      p5.line(p5.pmouseX, p5.pmouseY, p5.mouseX, p5.mouseY);

      dragPath.push({
        x: p5.mouseX,
        y: p5.mouseY,
      });
      return false;
    };

    const switchColorPalettes = function () {
      // only activate after all squares are drawn
      activeSquare = activeColorSet.find((square) => !square.isDrawn);
      if (activeSquare) {
        return false;
      }
      // get random color from activeColorSet -- only move on if a new color set is returned
      let previousColorSet = activeColorSet;
      activeColorSet = p5.random(allColorSets);
      while (previousColorSet[0].color == activeColorSet[0].color) {
        activeColorSet = p5.random(allColorSets);
      }

      // then draw entire canvas with random selection of colors and set drawn = true for each one
      for (const key in activeColorSet) {
        let square = activeColorSet[key];
        p5.noStroke();
        p5.fill(square.color);
        p5.rect(square.startX, square.startY, square.size);
        square.isDrawn = true;
      }

      return false;
    };

    const initColorSets = function (): Square[][] {
      let set1 = [
        squareBase({ color: p5.color("#53AFA2") }),
        squareThree({ color: p5.color("#898795") }),
        squareTwo({ color: p5.color("#717082") }),
        squareOne({ color: p5.color("#35333C") }),
      ];

      let set2 = [
        squareBase({ color: p5.color("#DA3F43") }),
        squareThree({ color: p5.color("#E05B4C") }),
        squareTwo({ color: p5.color("#E85541") }),
        squareOne({ color: p5.color("#F2674A") }),
      ];

      let set3 = [
        squareBase({ color: p5.color("#FFA447") }),
        squareThree({ color: p5.color("#F6B300") }),
        squareTwo({ color: p5.color("#FFD69E") }),
        squareOne({ color: p5.color("#FFE502") }),
      ];

      let set4 = [
        squareBase({ color: p5.color("#FE955B") }),
        squareThree({ color: p5.color("#DC735D") }),
        squareTwo({ color: p5.color("#2D6A62") }),
        squareOne({ color: p5.color("#28A0F6") }),
      ];

      let set5 = [
        squareBase({ color: p5.color("#7F7F8B") }),
        squareThree({ color: p5.color("#9DA0B3") }),
        squareTwo({ color: p5.color("#55B53A") }),
        squareOne({ color: p5.color("#01ABA8") }),
      ];

      let set6 = [
        squareBase({ color: p5.color("#E5A402") }),
        squareThree({ color: p5.color("#D95F6C") }),
        squareTwo({ color: p5.color("#BF4166") }),
        squareOne({ color: p5.color("#ED8B34") }),
      ];

      let set7 = [
        squareBase({ color: p5.color("#AB655E") }),
        squareThree({ color: p5.color("#C2695B") }),
        squareTwo({ color: p5.color("#F4645B") }),
        squareOne({ color: p5.color("#FE745A") }),
      ];

      let set8 = [
        squareBase({ color: p5.color("#FCD402") }),
        squareThree({ color: p5.color("#FED700") }),
        squareTwo({ color: p5.color("#FFDE77") }),
        squareOne({ color: p5.color("#E5E3EE") }),
      ];

      let set9 = [
        squareBase({ color: p5.color("#46ACAE") }),
        squareThree({ color: p5.color("#764447") }),
        squareTwo({ color: p5.color("#CF5560") }),
        squareOne({ color: p5.color("#049CF0") }),
      ];

      return [set1, set2, set3, set4, set5, set6, set7, set8, set9];
    };

    const squareBase = function (overrides: Partial<Square> = {}): Square {
      return {
        startX: 0,
        startY: 0,
        size: canvasSize,
        isDrawn: true,
        color: p5.color("#fff"),
        ...overrides,
      };
    };

    const squareThree = function (overrides: Partial<Square> = {}): Square {
      return {
        startX: canvasSize / gridSize,
        startY: yOffset,
        size: canvasSize - (2 * canvasSize) / gridSize, // must always be canvasSize - (2*startX)
        isDrawn: false,
        color: p5.color("#fff"),
        ...overrides,
      };
    };

    const squareTwo = function (overrides: Partial<Square> = {}): Square {
      return {
        startX: (2 * canvasSize) / gridSize,
        startY: 2 * yOffset,
        size: canvasSize - 2 * ((2 * canvasSize) / gridSize), // must always be canvasSize - (2*startX)
        isDrawn: false,
        color: p5.color("#fff"),
        ...overrides,
      };
    };

    const squareOne = function (overrides: Partial<Square> = {}): Square {
      return {
        startX: (3 * canvasSize) / gridSize,
        startY: 3 * yOffset,
        size: canvasSize - 2 * ((3 * canvasSize) / gridSize), // must always be canvasSize - (2*startX)
        isDrawn: false,
        color: p5.color("#fff"),
        ...overrides,
      };
    };
  };
}
