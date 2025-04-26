import { useState } from "react";
import ArtInteraction from "./components/ArtInteraction";
import { artworks } from "./artworks";

function App() {
  const [index, setIndex] = useState(0);
  const artwork = artworks[index];

  const handleNext = () => {
    if (index < artworks.length - 1) {
      setIndex(index + 1);
    }
  };

  const handlePrevious = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 p-8">
      <ArtInteraction artwork={artwork} />

      <div className="flex gap-4">
        {index > 0 && (
          <button
            onClick={handlePrevious}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Previous
          </button>
        )}
        {index < artworks.length - 1 && (
          <button
            onClick={handleNext}
            className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
