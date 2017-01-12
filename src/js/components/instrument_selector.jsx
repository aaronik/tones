import React from 'react'

const returnFalse = () => { return false };

const InstrumentSelector = React.createClass({
  propTypes: {
    activeInstrumentId: React.PropTypes.number.isRequired,
    instruments:        React.PropTypes.array.isRequired, // TODO propTypes
    onInstrumentClick:  React.PropTypes.func.isRequired,
    activeTuningId:     React.PropTypes.number.isRequired,
    tunings:            React.PropTypes.array.isRequired, // TODO propTypes
    onTuningClick:      React.PropTypes.func.isRequired
  },

  instrumentIcons() {
    return this.props.instruments.map(instrument => {
      const onClick = this.props.onInstrumentClick.bind(null, instrument.id);

      let containerClassName = 'instrument-icon-container ';
      if (instrument.id === this.props.activeInstrumentId)
        containerClassName += 'active';

      return (
        <div key={instrument.id} className={containerClassName} onClick={onClick}>
          <i className={instrument.iconClassName}/>
        </div>
      );
    });
  },

  tuningIcons() {
    return this.props.tunings.map(tuning => {
      const onClick = this.props.onTuningClick.bind(null, tuning.id);

      let containerClassName = 'tuning-icon-container ';
      if (tuning.id === this.props.activeTuningId)
        containerClassName += 'active';

      return (
        <div key={tuning.id} className={containerClassName} onClick={onClick}>
          <i className={tuning.iconClassName}/>
        </div>
      );
    });
  },

  render() {
    return (
      <div className='instrument-selector-container'>
        <div className='instrument-selector-dropdown'>

          <div className='instrument-switch-icon-container'>
            <i className='fa fa-plus'/>
          </div>

          {this.instrumentIcons()}

          <hr/>

          {this.tuningIcons()}

        </div>

        <div className='instrument-selector-place-holder'></div>
      </div>
    );
  }
});

export default InstrumentSelector
