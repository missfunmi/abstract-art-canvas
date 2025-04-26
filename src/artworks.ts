import p5 from "p5";

export interface Artwork {
  id: string; // used for filename/sketch file
  artistName: string;
  artworkTitle: string;
  year: string;
  image: string; // image file name
  sketchFile: () => Promise<{ createSketch: () => (p: p5) => void }>;
}

export const artworks: Artwork[] = [
  {
    id: "albers",
    artistName: "Josef Albers",
    artworkTitle: "Homage to the Square",
    year: "1950",
    image: "albers.jpg",
    sketchFile: () => import("./sketches/albers"),
  },
  {
    id: "mondrian",
    artistName: "Piet Mondrian",
    artworkTitle: "Composition II with Red, Blue, and Yellow",
    year: "1930",
    image: "mondrian.jpg",
    sketchFile: () => import("./sketches/mondrian"),
  }
]
