import _ from 'underscore'
import React from 'react'
import propTypes from 'js/prop_types'
import MiniTone from 'components/mini_tone'

const TableRow = React.createClass({
  propTypes: {
    tones: propTypes.binaryString,
    id: React.PropTypes.number.isRequired
  },

  _generateRow() {
    return this.props.tones.split('').map( (tone, idx) => {
      let id = `${this.props.id}.${idx}`

      return (
        <td key={`tone-${idx}`}>
          <MiniTone tone={tone}/>
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
    tones: propTypes.binaryString.isRequired,
    onClick: React.PropTypes.func.isRequired
  },

  _generateTable() {
    let matrixLength = Math.sqrt(this.props.tones.length);

    return _.times(matrixLength, (idx) => {
      let startIdx = matrixLength * idx;
      let endIdx = matrixLength * (idx + 1);
      let rowTones = this.props.tones.split('').slice(startIdx, endIdx).join('');
      return <TableRow
        key={`table-row-${idx}`}
        tones={rowTones}
        id={idx}/>;
    })
  },

  render() {
    let { onClick } = this.props

    return (
      <table className='mini-matrix-table' onClick={onClick}>
        <tbody>
          {this._generateTable()}
        </tbody>
      </table>
    )
  }
});

const MiniMatrix = React.createClass({
  propTypes: {
    tones: propTypes.binaryString.isRequired,
    onClick: React.PropTypes.func.isRequired
  },

  render() {
    let { onClick, tones } = this.props

    return (
      <div className='mini-matrix-container'>
        <Table onClick={onClick} tones={tones}/>
      </div>
    )
  }
});

export default MiniMatrix
