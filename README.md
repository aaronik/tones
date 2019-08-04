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
* Main matrix to have playback bar when tracks are playing
* Make back button undo
* Add slot range indicator (select how many slots to play)
* Consider starting with all slots selected
* Make animation for play triangle turning into stop square, back
* Add visual indicator for options selected in track
* Add drag n drop track re-ordering
* get unit tests working
* Add many more scales
* Add a drum kit
* Add copy track
* Add ability to save
* Add multiplayer functionality
