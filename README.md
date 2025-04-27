# (Famous) Abstract Art Canvas 🧑‍🎨
<a href='https://www.recurse.com/scout/click?t=c7bc9ba4cb3e6725e05e413f16f8c5a3' title='Made with love at the Recurse Center'><img src='https://cloud.githubusercontent.com/assets/2883345/11325206/336ea5f4-9150-11e5-9e90-d86ad31993d8.png' height='20px'/></a>

[![Netlify Status](https://api.netlify.com/api/v1/badges/2fa22975-7994-4851-9049-bd026a72ef4b/deploy-status)](https://app.netlify.com/sites/abstract-art-canvas/deploys)

You, too, can be a 20th century abstract artist for a day! Tap, click, or drag to recreate famous abstract artwork from the mid-20th century.

> ⏳ This project is a **Work in Progress**.

---

## Art pieces in the gallery
| | Artist | Artwork | Year | Paint Style | User Interaction | p5js.org | codepen.io |
|-|--------|---------|------|-------------|------------------|----------|-----------|
|✅| Josef Albers | [Homage to the Square](https://www.wikiart.org/en/josef-albers/all-works#!/%23filterName:Series_homage-to-the-square,resultType:masonry#filterName:Series_homage-to-the-square,resultType:masonry) | 1950 - 1976 | Abstract Color Study / Minimalism | Draw squares on the canvas, then tap to cycle through color palettes | [link](https://editor.p5js.org/missfunmi/sketches/0LwZpwGOa) | [link](https://codepen.io/missfunmi/pen/wBBJXJE) |
|✅| Piet Mondrian | [Composition II in Red, Blue, and Yellow](https://www.wikiart.org/en/piet-mondrian/composition-with-red-blue-and-yellow-1930) | 1930 | De Stijl / Neoplasticism | Draw black grid lines, then tap to fill in the colors | [link](https://editor.p5js.org/missfunmi/sketches/hTcvq_5kc) | [link](https://codepen.io/missfunmi/pen/raaeLeX) |
|👉| Mark Rothko | [Orange and Yellow](https://www.wikiart.org/en/mark-rothko/orange-and-yellow) | 1956 | Color Field Painting | Click or tap reveals subtle color transitions; fade between emotions with soft transitions | tbd | tbd |
|⏳| Ellsworth Kelly | [Colors for a Large Wall](https://www.wikiart.org/en/ellsworth-kelly/colors-for-a-large-wall-1951) | 1951 | Hard-Edge Abstraction | Shuffle tiles or drag-and-drop to create new arrangements. | tbd | tbd |
|⏳| Wassily Kandinsky | [Composition VIII](https://www.wikiart.org/en/wassily-kandinsky/composition-viii-1923) | 1923 | Abstract / Geometric Art | User clicks to add shapes and lines that play tones | tbd | tbd |


# Running the app locally
## First time install
```bash
brew install pnpm   # uses Homebrew to install pnpm, if needed
pnpm install        # install dependencies
```

## To run the app,
```bash
pnpm run dev
```
Then open http://localhost:5173/ in a browser

I use [localhost.run](https://localhost.run/) to open a tunnel to my mobile device for testing:

```bash
# In a separate bash terminal, I run:
ssh -o ServerAliveInterval=60 -R 80:localhost:5173 localhost.run
```
