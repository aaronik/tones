import React from 'react'

const returnFalse = () => { return false };

const InstrumentSelector = React.createClass({
  propTypes: {
    instruments:       React.PropTypes.array.isRequired, // TODO propTypes
    onInstrumentClick: React.PropTypes.func.isRequired
  },

  instrumentIcons() {
    return this.props.instruments.map(instrument => {
      const onClick = this.props.onInstrumentClick.bind(null, instrument.id);

      return (
        <div key={instrument.id} className='instrument-icon-container' onClick={onClick}>
          <i className={instrument.iconClassName}/>
        </div>
      );
    });
  },

  render() {
    return (
      <div>
        <div className='instrument-selector-dropdown'>

          <div className='instrument-switch-icon-container'>
            <i className='fa fa-plus'/>
          </div>

          {this.instrumentIcons()}

        </div>

        <div className='instrument-selector-place-holder'></div>
      </div>
    );
  }
});

export default InstrumentSelector
