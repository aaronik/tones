# Tones

Serverless multiplayer musical instrument

### Developing:
* run `npm run dev`, open up `localhost:8080` and all the good webpack dev server stuff gets happenin'.
  Start changing files and :boom: there you'll see the changes in your browser.

### Releasing:
* Nav to master branch, run `npm run release` and the script should take care of all the rest.

### Terminlogy:
* A "tone" is a single clickable square. It's also the data structure the square represents.
* The "matrix" is all around us. Jkizzle it's the whole collection of tones.

#### TODO
* get eslint into webpack dev thing somehow
* Add timer, show columns chiming
* Add sound, single instrument
* Add multiple instruments
* Add multiplayer functionality
