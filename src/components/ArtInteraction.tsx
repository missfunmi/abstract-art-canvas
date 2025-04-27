import { useEffect, useRef, useState } from "react";
import p5 from "p5";
import { CANVAS_SIZE_DESKTOP, CANVAS_SIZE_MOBILE } from "../constants";
import { Artwork } from "../artworks";

interface ArtInteractionProps {
  artwork: Artwork;
}

function getCanvasSizeConstant() {
  if (typeof window !== "undefined") {
    return window.innerWidth < 768 ? CANVAS_SIZE_MOBILE : CANVAS_SIZE_DESKTOP;
  }
  return CANVAS_SIZE_DESKTOP;
}

export default function ArtInteraction({ artwork }: ArtInteractionProps) {
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const [canvasSize, setCanvasSize] = useState<number>(getCanvasSizeConstant());

  useEffect(() => {
    const size = getCanvasSizeConstant();
    setCanvasSize(size);

    let canvas: p5 | null = null;
    artwork.sketchFile().then(({ createSketch }) => {
      canvas = new p5(createSketch(size), canvasRef.current!);
    });

    return () => {
      if (canvas) canvas.remove();
    };
  }, [artwork]);

  return (
    <div className="flex flex-col items-center gap-6">
      <p className="font-body text-xs sm:text-2xl leading-snug sm:leading-relaxed text-red-600 underline underline-offset-2 text-center mb-0 sm:mb-4 w-full max-w-screen-md px-2">
        {artwork.artworkTitle} — {artwork.artistName}, {artwork.year}
      </p>

      <div className="flex flex-col md:flex-row justify-center gap-6 p-0 -m-4 sm:p-2 items-center">
        {/* Reference Image */}
        <div
          className="border-4 border-gray-300 rounded-xl shadow-md flex-1 overflow-hidden aspect-square"
          style={{
            width: `${canvasSize}px`,
            height: `${canvasSize}px`,
          }}
        >
          <img
            src={`/img/${artwork.image}`}
            alt={artwork.artworkTitle}
            className="object-cover w-full h-full"
          />
        </div>

        {/* P5.js Canvas */}
        <div
          className="border-4 border-gray-300 rounded-xl shadow-md overflow-hidden aspect-square"
          style={{
            width: `${canvasSize}px`,
            height: `${canvasSize}px`,
          }}
        >
          <div
            ref={canvasRef}
            id="p5-container"
            className="object-contain w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}
