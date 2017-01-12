import Tone from 'tone'

const TUNINGS = [
  {
    id: '0',
    name: 'Major Pentatonic', // TODO use something more language independent, like M5?
    pitches: [
      'D6', 'C6', 'A5', 'G5', 'E5', 'D5', 'C5', 'A4', 'G4', 'E4', 'D4', 'C4', 'A3', 'G3', 'E3', 'C2'
    ]
  }
];

const INSTRUMENTS = [
  {
    id: '0',
    iconClassName: 'fa fa-bullhorn',
    name: 'Synth', // for printing purposes?
    synth: new Tone.Synth().toMaster() // TODO is this the best spot for this?
  },
  {
    id: '1',
    iconClassName: 'fa fa-bullhorn',
    name: 'AMSynth',
    synth: new Tone.AMSynth().toMaster()
  },
  {
    id: '2',
    iconClassName: 'fa fa-bullhorn',
    name: 'FMSynth',
    synth: new Tone.FMSynth().toMaster()
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
export default sounds
