import p5 from "p5";

export interface Artwork {
  id: string;
  artistName: string;
  artworkTitle: string;
  year: string;
  image: string;
  sketchFile: () => Promise<{
    createSketch: (size: number) => (p5: p5) => void;
  }>;
}

export const artworks: Artwork[] = [
  {
    id: "mondrian",
    artistName: "Piet Mondrian",
    artworkTitle: "Composition with Red, Blue, and Yellow",
    year: "1930",
    image: "mondrian.jpg",
    sketchFile: () => import("./sketches/mondrian"),
  },
  {
    id: "albers",
    artistName: "Josef Albers",
    artworkTitle: "Homage to the Square",
    year: "1950",
    image: "albers.jpg",
    sketchFile: () => import("./sketches/albers"),
  },
  {
    id: "rothko",
    artistName: "Mark Rothko",
    artworkTitle: "Orange and Yellow",
    year: "1956",
    image: "rothko.jpg",
    sketchFile: () => import("./sketches/rothko"),
  },
];
