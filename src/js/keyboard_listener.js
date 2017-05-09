// a singleton to abstract keyboard shortcut events

export default class KeyboardListener {

  // TODO when this is pluralized and there are more keys,
  // ensure it's all a big case on a single event listener
  static onSpace(fn) {
    window.addEventListener('keypress', (e) => {
      if (e.code === 'Space') {
        fn();
      }
    });
  }

}
