import Tone from 'tone'

// TODO remove
window.Tone = Tone;

// TODO globalize
const MATRIX_SIDE_LEN = 16;

const TUNINGS = [

  {
    id: 0,
    name: 'Major Pentatonic', // unused
    shortName: 'M5', // unused
    iconClassName: 'fa fa-smile-o',
    pitches: [
      'D6', 'C6', 'A5', 'G5', 'E5', 'D5', 'C5', 'A4', 'G4', 'E4', 'D4', 'C4', 'A3', 'G3', 'E3', 'C2'
    ]
  },

  {
    id: 1,
    name: 'Minor Pentatonic',
    shortName: 'm5',
    iconClassName: 'fa fa-frown-o',
    pitches: [
      'D6', 'C6', 'Ab5', 'G5', 'Eb5', 'D5', 'C5', 'Ab4', 'G4', 'Eb4', 'D4', 'C4', 'Ab3', 'G3', 'Eb3', 'C2'
    ]
  },

  {
    id: 2,
    name: 'Whole Tone',
    shortName: 'W',
    iconClassName: 'fa fa-cloud',
    pitches: [
      'F#5', 'E5', 'D5', 'C5', 'Bb4', 'G#4', 'F#4', 'E4', 'D4', 'C4', 'Bb3', 'G#3', 'F#3', 'E3', 'D3', 'C2'
    ]
  }

];

const chorus = new Tone.Chorus(0.4, 2.5, 0.5).toMaster();

const INSTRUMENTS = [

  {
    id: 0,
    iconClassName: 'fa fa-bell',
    name: 'Synth', // for printing purposes?
    synth: new Tone.PolySynth(MATRIX_SIDE_LEN, Tone.Synth).connect(chorus)
  },

  {
    id: 1,
    iconClassName: 'fa fa-adjust',
    name: 'AMSynth',
    synth: new Tone.PolySynth(MATRIX_SIDE_LEN, Tone.AMSynth).connect(chorus)
  },

  {
    id: 2,
    iconClassName: 'fa fa-square',
    name: 'FMSynth',
    synth: new Tone.PolySynth(MATRIX_SIDE_LEN, Tone.FMSynth).connect(chorus)
  }

];

const getTuning = (tuningId) => {
  return TUNINGS.find(tuning => {
    return tuning.id === tuningId;
  });
}

const getInstrument = (instrumentId) => {
  return INSTRUMENTS.find(instrument => {
    return instrument.id === instrumentId;
  });
}

const sounds = { TUNINGS, INSTRUMENTS, getTuning, getInstrument };
export default sounds;
