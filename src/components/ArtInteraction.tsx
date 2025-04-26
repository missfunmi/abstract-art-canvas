import { useEffect, useRef, useState } from "react";
import p5 from "p5";
import { CANVAS_SIZE } from "../constants";
import { Artwork } from "../artworks";

interface ArtInteractionProps {
  artwork: Artwork;
}

export default function ArtInteraction({ artwork }: ArtInteractionProps) {
  const canvasRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let canvas: p5 | null = null;
    artwork.sketchFile().then(({ createSketch }) => {
      canvas = new p5(createSketch(), canvasRef.current!);
    });

    return () => {
      if (canvas) canvas.remove();
    };
  }, [artwork]);

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="text-center text-xl font-semibold text-blue-700">
        {artwork.artworkTitle} — {artwork.artistName}, {artwork.year}
      </div>

      <div className="flex flex-row gap-8 justify-center items-start">
        {/* Reference Image */}
        <div
          className="border-4 border-gray-300 rounded-2xl shadow-md flex-1 overflow-hidden aspect-square"
          style={{ width: CANVAS_SIZE, height: CANVAS_SIZE }}
        >
          <img
            src={`/img/${artwork.image}`}
            alt={artwork.artworkTitle}
            className="object-cover w-full h-full"
          />
        </div>

        {/* P5.js Canvas */}
        <div
          className="border-4 border-gray-300 rounded-2xl shadow-md flex-1 overflow-hidden aspect-square"
          style={{ width: CANVAS_SIZE, height: CANVAS_SIZE }}
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
