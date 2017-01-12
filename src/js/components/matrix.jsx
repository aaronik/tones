import React from 'react'
import Tone from 'components/tone'
import propTypes from 'js/prop_types'
import _ from 'underscore'

const TableRow = React.createClass({
  propTypes: {
    tones:       propTypes.tones.isRequired,
    onToneClick: React.PropTypes.func.isRequired
  },

  _generateRow() {
    return this.props.tones.map((tone, idx) => {
      return (
        <td key={`tone-${idx}`}>
          <Tone
            tone={tone}
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
    onToneClick: React.PropTypes.func.isRequired
  },

  componentWillMount() {
    const toneCount    = this.props.tones.length,
          matrixLength = Math.sqrt(toneCount),
          roundedRoot  = Math.round(matrixLength);

    if (roundedRoot != matrixLength) { // TODO make this check in app
      throw new Error('matrix must be given a square grid');
    }
  },

  render() {
    return (
      <div className='matrix-container'>
        <Table tones={this.props.tones} onToneClick={this.props.onToneClick}/>
      </div>
    )
  }
});

export default Matrix
