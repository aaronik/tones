# Tones

A simple, serverless musical sequencer.

All state is saved in the URL, so to save your instrument, just copy your unique URL.

### Developing:
* `npm install`
* run `npm run dev`, open up `localhost:8080` and all the good webpack dev server stuff gets happenin'.
  Start changing files and :boom: there you'll see the changes in your browser.

### Releasing:
* Nav to master branch, run `npm run release` and the script should take care of all the rest.

### Terminlogy:
* A "tone" is a single clickable square. It's also the data structure the square represents.
* The "matrix" is all around us. Jkizzle it's the whole collection of tones.

#### TODO
* Add multiplayer functionality
* Make back button either undo or go to the actual last page
* Add slot range indicator (select how many slots to play)
* Make animation for play triangle turning into stop square, back
* Add color changes for instruments in tracks, matrix -- maybe just matrix, mini matrix
* Add drag n drop track re-ordering
* Main matrix to have playback bar when tracks are playing and that instrument instance is triggered
* get karma online (get it to work with es6)
* Add many more scales
* Add a drum kit
* Add copy track
