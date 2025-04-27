// Source image: https://www.piet-mondrian.org/composition-ii-in-red-blue-and-yellow.jsp

import p5 from "p5";
import { CANVAS_SIZE_MOBILE } from "../constants";

export function createSketch(size: number) {
  let mondrianBlack;
  let mondrianWhite;

  let canvasSize = size;
  let gridSize = 10;
  let lineThickness = size === CANVAS_SIZE_MOBILE ? 8 : 10;

  type Line = {
    start: number;
    thickness: number;
  };
  let verticalLineXPositions: Line[] = [];
  let horizontalLineYPositions: Line[] = [];

  type Rect = {
    startX: number;
    startY: number;
    width: number;
    height: number;
    color: any;
  };
  let coloredRects: Rect[] = [];

  let pen = { x: -1, y: -1, isDrawing: false };
  let isDrawingVertical = false;
  let isDrawingHorizontal = false;

  return function sketch(p5: p5) {
    p5.setup = function () {
      p5.createCanvas(canvasSize, canvasSize);
      mondrianBlack = p5.color("#0c1810");
      mondrianWhite = p5.color("#e6e6e6");
      p5.background(mondrianWhite);
      coloredRects = initRects();

      // nextButton = p5.createButton("Next >>");
      // // nextButton.style("background-color", "#333");
      // // nextButton.style("color", "#fff");
      // // nextButton.style("border-radius", "8px");
      // // nextButton.style("padding", "10px 20px");
      // nextButton.class("next-button");
      // // nextButton.position(0,0);
      // nextButton.position((2 * p5.width)+ 300, p5.height + 60);
      // nextButton.mousePressed(handleNext);
      // nextButton.touchEnded(handleNext);

      // previousButton = p5.createButton("<< Prev");
      // // previousButton.style("background-color", "#333");
      // // previousButton.style("color", "#fff");
      // // previousButton.style("border-radius", "8px");
      // // previousButton.style("padding", "10px 20px");
      // previousButton.position(p5.width / 2 - 75, p5.height + 60);
      // previousButton.class("previous-button");
      // previousButton.mousePressed(handlePrevious);
      // previousButton.touchEnded(handlePrevious);
    };

    p5.doubleClicked = function () {
      colorRectInClickArea();
      return false;
    };

    p5.mousePressed = function () {
      if (!pen.isDrawing) {
        pen.x = p5.mouseX;
        pen.y = p5.mouseY;
      }
      pen.isDrawing = true;
      if (pen.x <= 0 || pen.x >= canvasSize) {
        isDrawingHorizontal = true;
        isDrawingVertical = false;
      } else if (pen.y <= 0 || pen.y >= canvasSize) {
        isDrawingHorizontal = false;
        isDrawingVertical = true;
      }
      return false;
    };

    p5.mouseReleased = function () {
      // reset pen state when the mouse is released after dragging
      pen = { x: -1, y: -1, isDrawing: false };
      return false;
    };

    p5.mouseDragged = function () {
      let prevX = p5.pmouseX;
      let prevY = p5.pmouseY;
      let currX = p5.mouseX;
      let currY = p5.mouseY;
      p5.stroke(mondrianBlack);
      if (isDrawingHorizontal) {
        const closest = horizontalLineYPositions.find(
          (line) => p5.abs(line.start - pen.y) <= 50
        );
        if (closest) {
          p5.strokeWeight(closest.thickness);
          p5.line(prevX, closest.start, currX, closest.start);
        }
      } else if (isDrawingVertical) {
        const closest = verticalLineXPositions.find(
          (line) => p5.abs(line.start - pen.x) <= 80
        );
        if (closest) {
          p5.strokeWeight(closest.thickness);
          p5.line(closest.start, prevY, closest.start, currY);
        }
      }
      return false;
    };

    const colorRectInClickArea = function () {
      let clickPoint = { x: p5.mouseX, y: p5.mouseY };

      coloredRects.forEach((coloredRect) => {
        if (
          clickPoint.x > coloredRect.startX &&
          clickPoint.x < coloredRect.startX + coloredRect.width &&
          clickPoint.y > coloredRect.startY &&
          clickPoint.y < coloredRect.startY + coloredRect.height
        ) {
          p5.noStroke();
          p5.fill(coloredRect.color);
          p5.rect(
            coloredRect.startX,
            coloredRect.startY,
            coloredRect.width,
            coloredRect.height
          );
        }
      });
    };

    const initRects = function (): any[] {
      verticalLineXPositions = [
        { start: canvasSize / (gridSize / 2), thickness: lineThickness },
        { start: (9 * canvasSize) / gridSize, thickness: lineThickness },
      ];
      horizontalLineYPositions = [
        {
          start: (3.3 * canvasSize) / gridSize,
          thickness: 1.3 * lineThickness,
        },
        { start: (7.3 * canvasSize) / gridSize, thickness: lineThickness },
        {
          start: (17.3 * canvasSize) / (2 * gridSize),
          thickness: 1.3 * lineThickness,
        },
      ];
      let redRect: Rect = {
        startX:
          verticalLineXPositions[0].start +
          verticalLineXPositions[0].thickness / 2,
        startY: 0,
        width:
          canvasSize -
          verticalLineXPositions[0].start -
          verticalLineXPositions[0].thickness / 2,
        height:
          horizontalLineYPositions[1].start -
          horizontalLineYPositions[1].thickness / 2,
        color: p5.color("#d04035"),
      };
      let blueRect: Rect = {
        startX: 0,
        startY:
          horizontalLineYPositions[1].start +
          horizontalLineYPositions[1].thickness / 2,
        width:
          verticalLineXPositions[0].start -
          verticalLineXPositions[0].thickness / 2,
        height:
          canvasSize -
          horizontalLineYPositions[1].start -
          horizontalLineYPositions[1].thickness / 2,
        color: p5.color("#265c9b"),
      };
      let yellowRect: Rect = {
        startX:
          verticalLineXPositions[1].start +
          verticalLineXPositions[1].thickness / 2,
        startY:
          horizontalLineYPositions[2].start +
          horizontalLineYPositions[2].thickness / 2,
        width:
          canvasSize -
          verticalLineXPositions[1].start -
          verticalLineXPositions[1].thickness / 2,
        height:
          canvasSize -
          horizontalLineYPositions[2].start -
          horizontalLineYPositions[2].thickness / 2,
        color: p5.color("#eadc80"),
      };
      let whiteRect: Rect = {
        startX:
          verticalLineXPositions[0].start +
          verticalLineXPositions[0].thickness / 2,
        startY:
          horizontalLineYPositions[1].start +
          horizontalLineYPositions[1].thickness / 2,
        width:
          verticalLineXPositions[1].start -
          verticalLineXPositions[1].thickness / 2 -
          verticalLineXPositions[0].start -
          verticalLineXPositions[0].thickness / 2,
        height:
          canvasSize -
          horizontalLineYPositions[1].start -
          horizontalLineYPositions[1].thickness / 2,
        color: mondrianWhite,
      };

      return [redRect, blueRect, yellowRect, whiteRect];
    };
  };
}
