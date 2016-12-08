# Tones

Serverless multiplayer musical instrument, built on canvas

### Developing:
* run `npm run dev`, open up `localhost:8080` and all the good webpack dev server stuff gets happenin'.
  Start changing files and :boom: there you'll see the changes in your browser.

### Releasing:
* Nav to master branch, run `npm run release` and the script should take care of all the rest.

### Terminlogy:
* A "tone" is a single clickable square. It's also the data structure the square represents.
* The "matrix" is all around us. Jkizzle it's the whole collection of tones.

### Architecture decisions:
* Use classic inheritance patterns or shoot for a more functional approach when structuring
  the tone data? I've opted to go for the functional approach. Practically this'll look like
  having a tone data structure like:

  ```
  {
    points[]: an array of coordinates for each point
    fillStyle: hex color
  }
  ```

  Pros, cons:
  + easy to throw a filter on it and make some effects without changing any data.
    Functional is good.
  + easy to create a system for identify which tone the mouse is on
  - harder to animate other things like a circle or text. I figure I'll have some
    items that do have a `draw()` function for more complex animations. The entity
    in charge of drawing each item will check for it first before doing its own thing
    with the `points[]` array.

* How to identify which tone the mouse is over:

  To do this I created a pixel -> tone mapping. The data structure is a single nested object, a 2d hash.
  Once the tones are created, the mapper goes through them, calculates a coordinate for every pixel within it,
  and creates the object. The key for the first layer of the object is the x coordinate, and the second layer's
  key is the y coordinate. This makes for lightning fast lookup times at the cost of memory and initial build
  time, both of which are negligible on modern devices even given a set of tones larger than would ever be used.

#### TODO
* get eslint into webpack dev thing somehow
* Fix release script adding last release commit to each release
* Add timer, show columns chiming
* Add sound, single instrument
* Add multiple instruments
* Add multiplayer functionality
