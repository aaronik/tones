# Tones

Serverless multiplayer musical instrument, built on canvas

## Releasing:
* Nav to master branch, run `npm run release` and the script should take care of all the rest.

## Terminlogy:
* A "tone" is a single clickable square. It's also the data structure the square represents.
* The "matrix" is all around us. Jkizzle it's the whole collection of tones.

## Design decisions:
* Use classic inheritance patterns or shoot for a more functional approach when structuring
  the tone data? I've opted to go for the functional approach. Practically this'll look like
  having a tone data structure like:

  {
    points[]: an array of coordinates for each point
    fillStyle: hex color
  }

  Pros, cons:
  + easy to throw a filter on it and make some effects without changing any data.
    Functional is good.
  + easy to create a system for identify which tone the mouse is on
  - harder to animate other things like a circle or text. I figure I'll have some
    items that do have a `draw()` function for more complex animations. The entity
    in charge of drawing each item will check for it first before doing its own thing
    with the `points[]` array.

#### TODO
* Get minified in production, unminified in dev
* Add timer, show columns chiming
* Add sound, single instrument
* Add multiple instruments
* Add multiplayer functionality
