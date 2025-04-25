import p5 from "p5";
// import { createSketch } from "./pollock";
// import { createSketch } from "./mondrian";
import { createSketch } from "./albers";

function main(rootElement: HTMLElement) {
  const canvasContainer = document.createElement("div");
  canvasContainer.className = "canvas-container";
  rootElement.appendChild(canvasContainer);

  new p5(createSketch(), canvasContainer);

  setTimeout(() => {
    const canvas = document.querySelector(".p5Canvas");
    if (canvas) {
      (canvas as any).style.margin = "0 auto";
      (canvas as any).style.display = "block";
    }
  }, 100);
}

const rootElement = document.getElementById("p5-root");
if (!rootElement) {
  throw new Error("Cannot find element root #p5-root");
}

main(rootElement);
