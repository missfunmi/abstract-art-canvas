import { useEffect, useRef, useState } from "react";
import p5 from "p5";

// type SketchLoader = () => Promise<{ createSketch: () => (p: p5) => void }>;

const artists = ["albers", "mondrian"];

export default function ArtInteraction() {
  const [index, setIndex] = useState(0);
  const canvasRef = useRef<HTMLDivElement>(null);
  const p5Instance = useRef<p5 | null>(null);

  const loadSketch = async (artist: string) => {
    if (p5Instance.current) {
      p5Instance.current.remove();
      p5Instance.current = null;
    }

    const module = (await import(`../sketches/${artist}.ts`)) as {
      createSketch: () => (p: p5) => void;
    };
    const sketch = module.createSketch();

    if (canvasRef.current) {
      p5Instance.current = new p5(sketch, canvasRef.current);
    }
  };

  useEffect(() => {
    loadSketch(artists[index]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  const currentArtist = artists[index];

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="flex flex-row gap-6 w-full max-w-5xl">
        {/* Left side: image */}
        <div className="border-4 border-gray-300 rounded-2xl shadow-md flex-1 overflow-hidden aspect-square">
          <img
            src={`/artwork/${currentArtist}.jpg`}
            alt={`${currentArtist} artwork`}
            className="object-contain w-full h-full"
          />
        </div>

        {/* Right side: P5.js canvas */}
        <div className="border-4 border-gray-300 rounded-2xl shadow-md flex-1 overflow-hidden aspect-square">
          <div ref={canvasRef} id="p5-container" className="object-contain w-full h-full" />
        </div>
      </div>

      {/* Next or Previous button */}
      <div className="flex gap-4">
        {index > 0 && (
          <button
            onClick={() => setIndex(index - 1)}
            className="px-6 py-2 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition"
          >
            Previous
          </button>
        )}
        {index < artists.length - 1 && (
          <button
            onClick={() => setIndex(index + 1)}
            className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}
