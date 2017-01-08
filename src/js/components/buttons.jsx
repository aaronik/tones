import React from 'react'

const PlayButton = React.createClass({
  onClick() {
    window.history.pushState({}, '', '/?1=fjdiwnckduytwojsvzUGSTPlqu_oqhs-ajfiejd7di8.5')
    window.postMessage('pushstate', '*')
  },

  render() {
    return (
      <i className='fa fa-play' onClick={this.onClick}></i>
    )
  }
});

const PauseButton = React.createClass({
  render() {
    return (
      <i className='fa fa-pause'></i>
    )
  }
});

const StopButton = React.createClass({
  onClick() {
    window.history.pushState({}, '', '/')
    window.postMessage('pushstate', '*')
  },

  render() {
    return (
      <i className='fa fa-stop' onClick={this.onClick}></i>
    )
  }
});

const ClearAllButton = React.createClass({
  render() {
    return (
      <i className='fa fa-times'></i>
    )
  }
});

export { PlayButton, PauseButton, StopButton, ClearAllButton }
