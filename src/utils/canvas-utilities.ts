import p5 from 'p5';

export function getCanvasSize(containerId = 'p5-container', fallbackSize = 400): number {
  const parentEl = document.getElementById(containerId);
  if (parentEl) {
    const rect = parentEl.getBoundingClientRect();
    console.log("parent rect: ", rect);
    return Math.floor(Math.min(rect.width, rect.height));
  }
  return fallbackSize;
}
