// whoops, it looks like this isn't being used. In a typical flux app,
// the pattern of information movement is store -> views -> actions -> dispatcher -> store,
// of course unidirectionally. My app still follows the idea, though it's small
// enough to not explicitly need these things spelt out, and instead the "store"
// handles it (the actions are public methods on the store itself). If this grows,
// that'd be a great place to score some extra clarity. I'm going to remove this file,
// but it'll come back if a more obvious flux paradigm is required.

import Flux from 'flux'

var Dispatcher = new Flux.Dispatcher

return new Dispatcher()
