import React from 'react'
import Tone from 'components/tone'
import propTypes from 'js/prop_types'
import _ from 'underscore'

const TableRow = React.createClass({
  propTypes: {
    tones:        propTypes.tones.isRequired,
    // TODO I don't need an activeColumn to be passed down
    // if the tones just have a property on them from the store
    // that says if their row / self is active.
    // Or I could just do activeColumn and never combine
    // the data
    activeColumn: React.PropTypes.number.isRequired,
    onToneClick:  React.PropTypes.func.isRequired
  },

  _generateRow() {
    return this.props.tones.map((tone, idx) => {
      const inActiveColumn = (idx === this.props.activeColumn);

      return (
        <td key={`tone-${idx}`}>
          <Tone
            tone={tone}
            inActiveColumn={inActiveColumn}
            onClick={this.props.onToneClick}/>
        </td>
      );
    })
  },

  render() {
    return <tr>{this._generateRow()}</tr>
  }
});

const Table = React.createClass({
  propTypes: {
    tones:        propTypes.tones.isRequired,
    activeColumn: React.PropTypes.number.isRequired,
    onToneClick:  React.PropTypes.func.isRequired
  },

  _generateTable() {
    let matrixLength = Math.sqrt(this.props.tones.length);

    return _.times(matrixLength, (idx) => {
      const startIdx = matrixLength * idx,
            endIdx   = matrixLength * (idx + 1),
            rowTones = this.props.tones.slice(startIdx, endIdx);

      return <TableRow
        key={`table-row-${idx}`}
        tones={rowTones}
        activeColumn={this.props.activeColumn}
        onToneClick={this.props.onToneClick}/>
    })
  },

  render() {
    return (
      <table className='matrix-table'>
        <tbody>
          {this._generateTable()}
        </tbody>
      </table>
    )
  }
});

const Matrix = React.createClass({
  propTypes: {
    tones: propTypes.tones.isRequired,
    activeColumn: React.PropTypes.number.isRequired,
    onToneClick: React.PropTypes.func.isRequired
  },

  render() {
    return (
      <div className='matrix-container'>
        <Table
          tones={this.props.tones}
          activeColumn={this.props.activeColumn}
          onToneClick={this.props.onToneClick}/>
      </div>
    )
  }
});

export default Matrix
