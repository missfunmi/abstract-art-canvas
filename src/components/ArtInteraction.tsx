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
      <div className="text-center text-xl font-semibold text-blue-700 px-4">
        {artwork.artworkTitle} — {artwork.artistName}, {artwork.year}
      </div>

      <div className="flex flex-col md:flex-row justify-center gap-6 p-2 items-center">
        {/* Reference Image */}
        <div
          className="border-4 border-gray-300 rounded-2xl shadow-md flex-1 overflow-hidden w-[min(90vw,400px)] aspect-square"
        >
          <img
            src={`/img/${artwork.image}`}
            alt={artwork.artworkTitle}
            className="object-cover w-full h-full"
          />
        </div>

        {/* P5.js Canvas */}
        <div
          className="border-4 border-gray-300 rounded-2xl shadow-md flex-1 overflow-hidden w-[min(90vw,400px)] aspect-square"
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
