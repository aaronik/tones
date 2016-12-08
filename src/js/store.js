//
// application state's home
//

export default class Store {
  constructor: () => {
    this._activeTones = [];
  },

  // Ok, having a fast interval is going to cost a lot of CPU cycles.
  // For efficiency, we may actually want to trigger a draw only when
  // something actually changes. That might favor using the store approach
  // then. Though hover effects will probably look like a fast paced recursive
  // setTimeout call. Hover is mouse events, mouse events is desktop..
  //
  // ok the plan here would be: when a tone is put through the filter
  // attached to this store, it'd be duplicated, then modified if it's
  // active, hovered, etc. Only prob with this is it's gonna mean
  // a shit load of object creation. Since we're going for efficiency here,
  // it might actually be a lot better to actually modify the tones.
  // TODO write about this decision in readme.
  //
  // Choices:
  // 1) Draw Loop
  //    - No streams: B/c of frequency of draws, we may not want to copy objects
  //      making this more like a stream. We'll probably have to
  //      modify the object straight up, introducing state into
  //      the tone objects. In terms of paradigm this is probably disastrous.
  //      But practically it's basically nothing, the beginning tone state
  //      can easily be inferred (or recreated via `tonesUtil`). Nothing
  //      will be lost, we'll just have to remember to "change things back"
  //      instead of turning off a filter.
  //
  //
  // 2) On Demand Draws
  //    * we'll still have to tear down / rebuild the whole context while
  //      each animation is taking place. This will look less like a series of
  //      setTimeout recursions and more like the draw loop pausing when
  //      nothing's being drawn.
  //    + bit more efficient
  //    - No streams: Even with the efficiency gain, we probably still do
  //      not want to dup each tone on every draw cycle.
  activateTone: (tid) => {

  }
}

