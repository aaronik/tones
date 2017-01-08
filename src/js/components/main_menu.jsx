import React from 'react'
import { PlayButton, StopButton, ClearAllButton } from 'components/buttons'

const MainMenu = React.createClass({
  render() {
    return (
      <div className='main-menu-container'>
        <div className='main-menu-inner'>
          <PlayButton/>
          <StopButton/>
          <ClearAllButton/>
        </div>
      </div>
    )
  }
});

export default MainMenu
